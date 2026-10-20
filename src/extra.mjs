// Ek sayfalar: canlı yayın, programlar, hesaplama araçları, hatim, imsakiye, soru sor, ekip, çevrimdışı
import { site, youtubeChannel, live, schedule, programs, team, forms, fitre } from './config.mjs';
import { cities } from './data/cities.mjs';
import { kuranCuzSayfalari } from './extra-kuran.mjs';

const GUNLER = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const ICS_DAY = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

export function buildExtra(ctx) {
  const { layout, write, addPage, esc, abs, slugify, breadcrumbHtml, breadcrumbLd, faqHtml, faqLd, icon, studioFig, videoCard, videoLd, sortedVideos, fmtDate, today } = ctx;
  const search = [];

  const appLd = (name, url, desc) => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: abs(url),
    description: desc,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    inLanguage: 'tr-TR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
  });

  const toolPage = ({ slug, title, h1, lead, desc, app, prose = '', faq = [], scripts = [], keywords = [], priority = 0.8, searchText = '', searchKeys = '' }) => {
    const p = `/${slug}/`;
    const crumbs = [['/', 'Anasayfa'], [p, h1]];
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>${esc(h1)}</h1>
  <p class="lead">${lead}</p>
</div>
<div class="wrap section">
  ${app}
  <div class="prose prose-block">
    ${prose}
    ${faqHtml(faq)}
    <div class="note">Bu araç genel bilgilendirme ve tahmini hesap amaçlıdır; bağlayıcı bir dinî hüküm (fetva) yerine geçmez. Kesin bilgi için Diyanet İşleri Başkanlığı'na veya yetkili bir din görevlisine danışınız.</div>
  </div>
</div>`;
    write(
      `${slug}/index.html`,
      layout({ title, description: desc, path: p, body, ld: [breadcrumbLd(crumbs), ...(faq.length ? [faqLd(faq)] : []), appLd(h1, p, desc)], scripts, keywords, current: p })
    );
    addPage(p, today, priority, 'monthly');
    search.push({ t: h1, d: desc, u: p, c: 'Araç', k: searchKeys, x: searchText });
  };

  const field = (id, label, extra = '', hint = '') =>
    `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="number" inputmode="decimal" min="0" step="any" placeholder="0" ${extra}>${hint ? `<small>${hint}</small>` : ''}</div>`;

  // ================================================================ Zekât + Fitre
  toolPage({
    slug: 'zekat-hesaplama',
    title: 'Zekât Hesaplama Aracı: Nisap Miktarı ve Zekât Tutarı',
    h1: 'Zekât ve Fitre Hesaplama',
    lead: 'Altın, nakit ve ticaret mallarınıza göre ödemeniz gereken zekâtı ve ailenizin fitre tutarını kolayca hesaplayın. Bilgileriniz yalnızca tarayıcınızda kalır.',
    desc: 'Ücretsiz zekât hesaplama aracı: güncel gram altın fiyatına göre nisap miktarını bulun, kırkta bir (%2,5) zekât tutarınızı ve fitre bedelinizi hesaplayın.',
    keywords: ['zekat hesaplama', 'zekat nisap miktarı', 'zekat nasıl hesaplanır', 'fitre hesaplama', 'fitre ne kadar'],
    scripts: ['zekat.js'],
    searchKeys: 'zekat hesaplama nisap fitre hesaplayıcı kırkta bir altın nakit',
    searchText: 'zekât nisap altın gram kırkta bir %2,5 fitre kişi sayısı',
    app: `
<div class="calc" id="zekat-app" data-nisab="80.18">
  <h2>Zekât Hesaplama</h2>
  <p class="small muted">Nisap miktarı: Diyanet'e göre 80,18 gram altın değeri. Aşağıya güncel <strong>gram altın fiyatını</strong> yazın; nisap miktarı buna göre hesaplanır.</p>
  <form id="zekat-form" autocomplete="off" onsubmit="return false">
    <div class="field-grid">
      ${field('z-altin-fiyat', 'Gram altın fiyatı (₺)', 'required', 'Güncel fiyatı bir altın sitesinden yazın')}
      ${field('z-nakit', 'Nakit para ve banka hesapları (₺)')}
      ${field('z-altin', 'Altın (gram)', '', 'Takı dâhil; ziynet eşyasındaki altın da sayılır')}
      ${field('z-gumus', 'Gümüş (₺ değeri)')}
      ${field('z-doviz', 'Döviz ve diğer değerler (₺ karşılığı)')}
      ${field('z-ticaret', 'Ticaret malları (₺)')}
      ${field('z-alacak', 'Tahsili mümkün alacaklar (₺)')}
      ${field('z-borc', 'Vadesi gelmiş borçlar (₺)', '', 'Borçlar toplamdan düşülür')}
    </div>
    <div class="actions"><button type="button" class="btn btn-ghost-dark" id="z-reset">Temizle</button></div>
  </form>
  <div class="result" id="z-result" aria-live="polite"><p class="muted">Değerleri girdikçe sonuç burada görünür.</p></div>
</div>

<div class="calc" id="fitre">
  <h2>Fitre Hesaplama</h2>
  <p class="small muted">Fitre, Ramazan Bayramı'ndan önce verilir ve kişi başına belirlenir. Tutarı her yıl Diyanet İşleri Başkanlığı açıklar${fitre.amount ? ` (${fitre.year || ''}: ${fitre.amount} ₺)` : ''}; açıklanan tutarı aşağıya yazın.</p>
  <div class="field-grid">
    ${field('f-kisi', 'Kişi sayısı', 'value="1" min="1" step="1"', 'Kendiniz ve bakmakla yükümlü olduklarınız')}
    ${field('f-tutar', 'Kişi başı fitre tutarı (₺)', fitre.amount ? `value="${fitre.amount}"` : '', 'Diyanet\'in o yıl ilan ettiği tutar')}
  </div>
  <div class="result" id="f-result" aria-live="polite"><p class="muted">Kişi sayısı ve tutarı girin.</p></div>
</div>`,
    prose: `
<h2>Zekât Nasıl Hesaplanır?</h2>
<ol>
  <li><strong>Nisabı belirleyin:</strong> Diyanet İşleri Başkanlığı'na göre nisap miktarı 80,18 gram altın değeridir. Gram altın fiyatı ile çarpılarak TL karşılığı bulunur.</li>
  <li><strong>Zekâta tabi malları toplayın:</strong> Nakit, altın, gümüş, döviz, ticaret malları ve tahsili mümkün alacaklar toplanır.</li>
  <li><strong>Borçları düşün:</strong> Vadesi gelmiş borçlar toplamdan çıkarılır.</li>
  <li><strong>Nisabı kontrol edin:</strong> Kalan miktar nisaba ulaşmışsa ve üzerinden bir kameri yıl geçmişse zekât verilir.</li>
  <li><strong>Kırkta biri ödeyin:</strong> Net varlığın %2,5'i zekât olarak verilir.</li>
</ol>
<p>Oturduğunuz ev, binek aracı, ev eşyası gibi temel ihtiyaçlar zekâta tabi değildir. Zekât ve verileceği yerler hakkında ayrıntılı bilgi için <a href="/ibadet/zekat-nedir-kimlere-verilir/">Zekât rehberimize</a> ve <a href="/soru-cevap/zekat-kimlere-verilir/">Zekât kimlere verilir?</a> sorusuna bakabilirsiniz.</p>`,
    faq: [
      { q: 'Zekâtta nisap miktarı nedir?', a: 'Diyanet İşleri Başkanlığı\'na göre zekât nisabı 80,18 gram altın değerindeki mal varlığıdır.' },
      { q: 'Zekât oranı yüzde kaçtır?', a: 'Zekât oranı kırkta bir, yani yüzde 2,5\'tir.' },
      { q: 'Borçlar zekât hesabında düşülür mü?', a: 'Evet. Vadesi gelmiş borçlar zekâta tabi mal varlığından düşüldükten sonra kalan miktar nisaba ulaşıyorsa zekât verilir.' },
      { q: 'Fitre ne zaman verilir?', a: 'Fitre Ramazan ayı içinde, en geç Ramazan Bayramı namazına kadar verilir. Tutarı her yıl Diyanet İşleri Başkanlığı tarafından açıklanır.' },
    ],
  });

  // ================================================================ Kaza namazı
  toolPage({
    slug: 'kaza-namazi-hesaplama',
    title: 'Kaza Namazı Hesaplama: Borcunuzu ve Bitirme Süresini Bulun',
    h1: 'Kaza Namazı Hesaplama',
    lead: 'Namaz borcunuzu tahmini olarak hesaplayın, günlük kılacağınız kaza sayısına göre ne zaman bitireceğinizi görün ve ilerlemenizi takip edin.',
    desc: 'Kaza namazı borcu hesaplama aracı: ergenlik yaşı ve kılınmayan süreye göre toplam kaza namazı sayısını, vitir dâhil vakit vakit borcu ve bitirme süresini hesaplayın.',
    keywords: ['kaza namazı hesaplama', 'kaza namazı borcu', 'kaza namazı nasıl kılınır', 'namaz borcu hesaplama'],
    scripts: ['kaza.js'],
    searchKeys: 'kaza namazı hesaplama borç namaz borcu vitir',
    searchText: 'kaza namazı borcu hesaplama ergenlik yaşı hayız günlük kaza plan',
    app: `
<div class="calc" id="kaza-app">
  <h2>Borç Hesabı</h2>
  <form id="kaza-form" autocomplete="off" onsubmit="return false">
    <div class="field"><label for="k-mod">Hesaplama yöntemi</label>
      <select id="k-mod"><option value="tarih">Doğum tarihine göre</option><option value="sure">Kılmadığım süreyi kendim gireyim</option></select></div>
    <div id="k-tarih-box" class="field-grid">
      <div class="field"><label for="k-dogum">Doğum tarihiniz</label><input id="k-dogum" type="date"></div>
      <div class="field"><label for="k-erg">Ergenlik (bülûğ) yaşı</label>
        <select id="k-erg"><option>12</option><option>13</option><option>14</option><option selected>15</option></select>
        <small>Kesin yaşı bilmiyorsanız Hanefî mezhebinde en geç 15 kabul edilir.</small></div>
      <div class="field"><label for="k-basla">Düzenli namaza başladığınız tarih</label><input id="k-basla" type="date">
        <small>Bu tarihten önceki süre borç sayılır. Bugün başlıyorsanız bugünün tarihini seçin.</small></div>
    </div>
    <div id="k-sure-box" class="field-grid" hidden>
      ${field('k-yil', 'Yıl', 'value="0" min="0" step="1"')}
      ${field('k-ay', 'Ay', 'value="0" min="0" step="1"')}
      ${field('k-gun', 'Gün', 'value="0" min="0" step="1"')}
    </div>
    <div class="field-grid">
      <div class="field"><label for="k-cinsiyet">Cinsiyet</label><select id="k-cinsiyet"><option value="e">Erkek</option><option value="k">Kadın</option></select></div>
      <div class="field" id="k-hayiz-box" hidden><label for="k-hayiz">Aylık ortalama hayız/nifas günü</label><input id="k-hayiz" type="number" min="0" max="15" step="1" value="7"><small>Bu günlerde kılınmayan namaz borç sayılmaz.</small></div>
      <div class="field"><label for="k-gunluk">Günde kaç vakit kaza kılacaksınız?</label>
        <select id="k-gunluk"><option value="1">1 vakit</option><option value="2">2 vakit</option><option value="3">3 vakit</option><option value="5" selected>5 vakit</option><option value="6">6 vakit (vitir dâhil)</option><option value="12">12 vakit</option></select></div>
    </div>
  </form>
  <div class="result" id="k-result" aria-live="polite"><p class="muted">Bilgileri girin; sonuç burada görünür.</p></div>
</div>`,
    prose: `
<h2>Kaza Namazı Nasıl Hesaplanır?</h2>
<p>Hanefî mezhebine göre ergenlik çağına giren (bülûğa eren) her Müslümana beş vakit farz ve vitir namazı gerekir. Namaza başlamadan önceki süre için gün sayısı hesaplanır; her gün için <strong>sabah, öğle, ikindi, akşam, yatsı ve vitir</strong> olmak üzere altı namaz kaza edilir. Kadınlarda hayız ve nifas günleri bu süreden düşülür.</p>
<p>Hesap, tahmini bir rakamdır. Tam sayıyı bilemiyorsanız, "yeterince kıldım" diyecek kadar kaza etmek ve gönül rahatlığıyla devam etmek esastır. Kazaların nasıl kılınacağı için <a href="/soru-cevap/kaza-namazi-nasil-kilinir/">Kaza namazı nasıl kılınır?</a> sayfasına bakabilirsiniz.</p>
<h2>Kaza Kılmak İçin Pratik Öneriler</h2>
<ul><li>Her farz namazın ardından aynı vaktin kazasını da kılmak (örneğin her gün öğle kazasını) en pratik yoldur.</li><li>Sünnet namazların yerine kaza kılmak caizdir, ancak sabah sünneti terk edilmemelidir.</li><li>Kazaları tek tek saymak yerine bir plan yapıp düzenli devam edin.</li></ul>`,
    faq: [
      { q: 'Kaza namazında vitir de kaza edilir mi?', a: 'Hanefî mezhebinde vitir namazı vâcip olduğu için vaktinde kılınamadığında kaza edilir. Bu yüzden günde altı namaz hesaplanır.' },
      { q: 'Kaza namazlarının sırası önemli midir?', a: 'Hanefî mezhebinde sıraya riayet esastır; ancak borç çok olan kimselerden bu şart düşer. Pratikte kişi, kaza namazlarını sırayla ya da vakit vakit kılabilir.' },
    ],
  });

  // ================================================================ Hatim takip
  {
    const cuz = kuranCuzSayfalari();
    toolPage({
      slug: 'hatim-takip',
      title: 'Hatim Takip Aracı: Günlük Okuma Hedefi ve İlerleme',
      h1: 'Hatim Takip Aracı',
      lead: 'Kur\'an-ı Kerim\'i bitirme hedefinizi belirleyin; günlük sayfa hedefinizi, ilerlemenizi ve tahmini bitiş tarihinizi takip edin. Verileriniz yalnızca bu cihazda saklanır.',
      desc: 'Ücretsiz hatim takip aracı: 604 sayfalık Kur\'an için günlük okuma hedefini hesaplayın, okuduğunuz sayfaları işaretleyin, cüz ilerlemesini ve tahmini bitiş tarihini görün.',
      keywords: ['hatim takip', 'hatim planı', 'günde kaç sayfa kuran', 'ramazan hatim', '30 günde hatim'],
      scripts: ['hatim.js'],
      searchKeys: 'hatim takip kuran okuma planı günlük sayfa cüz ramazan hatim',
      searchText: 'hatim 604 sayfa 30 cüz günlük hedef ilerleme',
      app: `
<div class="calc hatim" id="hatim-app" data-cuz="${esc(JSON.stringify(cuz.map((c) => c.p)))}">
  <div id="h-setup">
    <h2>Hatim Hedefi Belirleyin</h2>
    <div class="field-grid">
      <div class="field"><label for="h-gun">Kaç günde bitirmek istiyorsunuz?</label>
        <select id="h-gun"><option value="30">30 gün (günde 1 cüz)</option><option value="60">60 gün</option><option value="90">90 gün</option><option value="120">120 gün</option><option value="180">180 gün</option><option value="365">1 yıl</option></select></div>
      <div class="field"><label for="h-basla">Başlangıç tarihi</label><input id="h-basla" type="date"></div>
      <div class="field"><label for="h-sayfa0">Şimdiye kadar okuduğunuz sayfa</label><input id="h-sayfa0" type="number" min="0" max="604" step="1" value="0"><small>Kaldığınız yerden devam edebilirsiniz (0–604).</small></div>
    </div>
    <p><button type="button" class="btn" id="h-start">Takibi Başlat</button></p>
  </div>
  <div id="h-track" hidden>
    <div class="h-top">
      <div class="h-ring"><b id="h-pct">0%</b><span id="h-page">0 / 604 sayfa</span></div>
      <div class="h-info">
        <p class="h-goal"><span>Bugünkü hedef</span><b id="h-today-goal">–</b> sayfa</p>
        <p class="h-line"><span>Bugün okunan:</span> <b id="h-today-read">0</b> sayfa</p>
        <p class="h-line"><span>Kalan:</span> <b id="h-left">–</b> sayfa · <b id="h-days">–</b> gün</p>
        <p class="h-line"><span>Tahmini bitiş:</span> <b id="h-eta">–</b></p>
        <p class="h-line" id="h-hatim-count" hidden></p>
      </div>
    </div>
    <div class="h-bar"><div id="h-bar-fill"></div></div>
    <div class="h-add">
      <span>Okuduğum sayfa ekle:</span>
      <button type="button" class="btn btn-ghost-dark" data-add="1">+1</button>
      <button type="button" class="btn btn-ghost-dark" data-add="5">+5</button>
      <button type="button" class="btn btn-ghost-dark" data-add="10">+10</button>
      <button type="button" class="btn btn-ghost-dark" id="h-goal-btn">Günlük hedefi tamamladım</button>
      <button type="button" class="btn btn-ghost-dark" id="h-undo">Geri al</button>
    </div>
    <h3>Cüzler</h3>
    <div class="h-cuz" id="h-cuz"></div>
    <p class="small muted" id="h-msg" aria-live="polite"></p>
    <p><button type="button" class="btn btn-ghost-dark" id="h-reset">Yeni hatim başlat / sıfırla</button> <a class="btn btn-ghost-dark" href="/kuran/">Kur'an Oku</a></p>
  </div>
</div>`,
      prose: `
<h2>Hatim Nasıl Yapılır?</h2>
<p>Kur'an-ı Kerim'in baştan sona okunmasına <strong>hatim</strong> denir. Medine mushafında 604 sayfa ve 30 cüz vardır. Gün sayısını seçtiğinizde günlük hedefiniz otomatik hesaplanır; okuduğunuz sayfaları ekledikçe hedef, kalan güne göre güncellenir.</p>
<table><thead><tr><th>Hedef</th><th>Günlük sayfa</th></tr></thead><tbody><tr><td>30 günde (Ramazan)</td><td>≈ 20 sayfa (1 cüz)</td></tr><tr><td>60 günde</td><td>≈ 10 sayfa</td></tr><tr><td>90 günde</td><td>≈ 7 sayfa</td></tr><tr><td>1 yılda</td><td>≈ 2 sayfa</td></tr></tbody></table>
<p>Okuma adabı, hatim duası ve ayrıntılar için <a href="/kuran-i-kerim/kuran-okuma-adabi-ve-hatim/">Kur'an Okuma Adabı ve Hatim</a> yazımızı okuyabilirsiniz. Sitemizden <a href="/kuran/">Kur'an'ı Arapça ve Türkçe meal ile</a> da okuyabilirsiniz.</p>`,
      faq: [
        { q: 'Kur\'an kaç sayfa, kaç cüzdür?', a: 'Medine mushafına göre Kur\'an-ı Kerim 604 sayfa ve 30 cüzdür; 114 sure ve 6236 ayetten oluşur.' },
        { q: 'Hatim kaç günde yapılır?', a: 'Belirli bir süre şartı yoktur. Günde bir cüz (yaklaşık 20 sayfa) okuyan kişi 30 günde hatim yapar. Önemli olan düzenli okumaktır.' },
      ],
    });
  }

  // ================================================================ İmsakiye
  toolPage({
    slug: 'ramazan-imsakiyesi',
    title: 'Ramazan İmsakiyesi: 81 İl İçin Sahur ve İftar Vakitleri',
    h1: 'Ramazan İmsakiyesi',
    lead: 'Şehrinizi seçin; Ramazan ayı boyunca imsak, sahur ve iftar vakitlerini günlük tablo olarak görün ve yazdırın.',
    desc: 'Ramazan imsakiyesi: 81 il için günlük imsak (sahur), güneş, öğle, ikindi, iftar (akşam) ve yatsı vakitleri. Diyanet yöntemiyle hesaplanır, yazdırılabilir.',
    keywords: ['ramazan imsakiyesi', 'imsakiye', 'sahur vakti', 'iftar vakti', 'ramazan takvimi', 'diyanet imsakiye'],
    scripts: ['imsakiye.js'],
    searchKeys: 'imsakiye ramazan sahur iftar imsak vakti il il',
    searchText: 'ramazan imsakiyesi sahur iftar vakitleri şehir seçin yazdır',
    priority: 0.9,
    app: `
<div class="imsakiye" id="imsakiye-app" data-cities="${esc(JSON.stringify(cities.map((c) => c[0])))}">
  <div class="imsak-tools">
    <div class="field"><label for="im-city">Şehir</label><select id="im-city" class="city-select"></select></div>
    <div class="field"><label for="im-year">Ramazan</label><select id="im-year" class="city-select"></select></div>
    <button type="button" class="btn" id="im-print">Yazdır</button>
  </div>
  <p class="small muted" id="im-info" aria-live="polite">İmsakiye yükleniyor…</p>
  <div id="im-today" class="im-today" hidden></div>
  <div class="table-wrap"><table class="takvim imsak-table" id="im-table"><thead><tr><th>#</th><th>Tarih</th><th>Gün</th><th>İmsak</th><th>Güneş</th><th>Öğle</th><th>İkindi</th><th>İftar</th><th>Yatsı</th></tr></thead><tbody id="im-body"></tbody></table></div>
</div>`,
    prose: `
<h2>İmsakiye Nedir?</h2>
<p>İmsakiye, Ramazan ayı boyunca günlük namaz vakitlerini, özellikle <strong>imsak (sahur bitişi)</strong> ve <strong>iftar (akşam ezanı)</strong> vakitlerini gösteren takvimdir. Ramazan'ın başlangıcı ve bitişi hicri takvime göre belirlenir; sitemiz bu tarihleri otomatik hesaplar ve vakitleri Diyanet yöntemiyle getirir.</p>
<h2>Sahur ve İftar Adabı</h2>
<ul><li>Peygamberimiz (s.a.v.): "Sahur yapın, çünkü sahurda bereket vardır." buyurmuştur. (Buhârî, Savm, 20)</li><li>İftar vakit girer girmez, mümkünse hurma veya su ile açılır; ardından akşam namazı kılınır.</li><li>İftar duası: <em>"Allâhümme leke sumtü ve bike âmentü ve alâ rızkıke eftartü."</em></li></ul>
<p>Ramazan, oruç ve fitre hakkında ayrıntılı bilgi için <a href="/dini-gunler/ramazan-ayi-ve-oruc/">Ramazan Ayı ve Oruç</a> rehberimize, Ramazan tarihleri için <a href="/dini-gunler-takvimi/">Dini Günler Takvimi</a>ne bakabilirsiniz.</p>`,
    faq: [
      { q: 'İmsakiye vakitleri nasıl hesaplanıyor?', a: 'Vakitler, Diyanet İşleri Başkanlığı hesaplama yöntemiyle (Aladhan servisi, method=13) şehir bazında alınır ve cihazınızda saklanır.' },
      { q: 'Ramazan ne zaman başlıyor?', a: 'Ramazan, hicri takvimin dokuzuncu ayıdır. Bu sayfa, hicri takvim hesabına göre Ramazan başlangıcını otomatik bulur; resmî ilan Diyanet tarafından yapılır ve bir gün fark olabilir.' },
    ],
  });

  // ================================================================ Canlı yayın
  {
    const crumbs = [['/', 'Anasayfa'], ['/canli-yayin/', 'Canlı Yayın']];
    const desc = `${site.name} canlı yayın sayfası: şu anda canlı yayın olup olmadığını görün, haftalık yayın akışını takip edin ve yayınları kaçırmayın.`;
    const byDay = GUNLER.map((g) => [g, schedule.filter((s) => s.day === g).sort((a, b) => a.time.localeCompare(b.time))]).filter((x) => x[1].length);
    const player = live.videoId
      ? `<div class="live-player"><iframe src="https://www.youtube-nocookie.com/embed/${esc(live.videoId)}?rel=0" title="${esc(site.name)} canlı yayın" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`
      : `<div class="live-player off">${studioFig('studio-genel.jpg', `${site.name} yayın stüdyosu`, '')}<div class="live-off"><span class="live-badge off">Yayın Dışı</span><p>Şu anda canlı yayın yok</p></div></div>`;
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Canlı Yayın</h1>
  <p class="lead">${esc(site.name)} stüdyosundan canlı yayınlar ve haftalık yayın akışı.</p>
</div>
<div class="wrap section">
  <div class="live-box" id="live" data-schedule="${esc(JSON.stringify(schedule))}" data-live="${live.videoId ? '1' : ''}">
    ${player}
    <div class="live-status">
      <p class="live-state"><span class="live-badge${live.videoId ? '' : ' off'}" id="live-badge">${live.videoId ? 'Canlı' : 'Yayın Dışı'}</span> <strong id="live-title">${live.videoId ? esc(live.note || 'Canlı yayın devam ediyor') : 'Şu anda canlı yayın yok'}</strong></p>
      <p class="muted" id="live-next" aria-live="polite">${schedule.length ? 'Sıradaki yayın hesaplanıyor…' : 'Yayın takvimi yakında burada olacak.'}</p>
      <p>${youtubeChannel ? `<a class="btn" href="${esc(youtubeChannel)}" target="_blank" rel="noopener">YouTube'da Takip Et</a> ` : ''}${schedule.length ? '<a class="btn btn-ghost-dark" href="/yayin-akisi.ics">Takvime Ekle (.ics)</a>' : ''}</p>
    </div>
  </div>
  <h2 class="section-title" style="margin-top:3rem">Haftalık Yayın Akışı</h2>
  ${
    byDay.length
      ? `<div class="sched">${byDay
          .map(
            ([g, items]) => `<section class="sched-day" data-day="${GUNLER.indexOf(g)}"><h3>${g}</h3>${items
              .map((s) => `<div class="sched-item"><time>${esc(s.time)}</time><div><strong>${esc(s.title)}</strong>${s.description ? `<p>${esc(s.description)}</p>` : ''}</div></div>`)
              .join('')}</section>`
          )
          .join('')}</div><p class="small muted">Saatler Türkiye saatine (UTC+3) göredir.</p>`
      : `<div class="coming"><p class="eyebrow dark">Çok Yakında</p><h2>Yayın Akışı Hazırlanıyor</h2><p>Haftalık yayın saatlerimizi burada duyuracağız. Bu arada <a href="/yayinlar/">yayınlarımıza</a> ve <a href="/makaleler/">makalelerimize</a> göz atabilirsiniz.</p></div>`
  }
</div>`;
    write(
      'canli-yayin/index.html',
      layout({
        title: 'Canlı Yayın ve Haftalık Yayın Akışı',
        description: desc,
        path: '/canli-yayin/',
        body,
        ld: [
          breadcrumbLd(crumbs),
          { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Canlı Yayın', url: abs('/canli-yayin/'), description: desc },
          ...(live.videoId
            ? [{ '@context': 'https://schema.org', '@type': 'VideoObject', name: `${site.name} Canlı Yayın`, description: desc, thumbnailUrl: [`https://i.ytimg.com/vi/${live.videoId}/hqdefault.jpg`], uploadDate: today, embedUrl: `https://www.youtube.com/embed/${live.videoId}`, publication: { '@type': 'BroadcastEvent', isLiveBroadcast: true, startDate: today } }]
            : []),
        ],
        scripts: ['canli.js'],
        keywords: ['canlı yayın', 'dini canlı yayın', 'yayın akışı'],
      })
    );
    addPage('/canli-yayin/', today, 0.7, 'weekly');
    search.push({ t: 'Canlı Yayın', d: 'Canlı yayın ve haftalık yayın akışı.', u: '/canli-yayin/', c: 'Sayfa', k: 'canlı yayın yayın akışı program saatleri', x: schedule.map((s) => s.title).join(' ') });

    // iCalendar (haftalık tekrar)
    if (schedule.length) {
      const pad = (n) => String(n).padStart(2, '0');
      const ref = new Date();
      const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${site.name}//Yayin Akisi//TR`, 'CALSCALE:GREGORIAN', `X-WR-CALNAME:${site.name} Yayın Akışı`, 'X-WR-TIMEZONE:Europe/Istanbul',
        'BEGIN:VTIMEZONE', 'TZID:Europe/Istanbul', 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:+0300', 'TZOFFSETTO:+0300', 'TZNAME:+03', 'END:STANDARD', 'END:VTIMEZONE'];
      schedule.forEach((s, i) => {
        const di = GUNLER.indexOf(s.day);
        if (di < 0) return;
        const d = new Date(ref);
        const jsDay = (di + 1) % 7; // Pazartesi=1 … Pazar=0
        d.setDate(d.getDate() + ((jsDay - d.getDay() + 7) % 7));
        const [h, m] = s.time.split(':').map(Number);
        const start = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(h)}${pad(m)}00`;
        const endMin = h * 60 + m + (s.duration || 60);
        const end = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(Math.floor(endMin / 60) % 24)}${pad(endMin % 60)}00`;
        lines.push('BEGIN:VEVENT', `UID:mec-${i}@${site.url.replace(/^https?:\/\//, '')}`, `DTSTAMP:${today.replace(/-/g, '')}T000000Z`, `DTSTART;TZID=Europe/Istanbul:${start}`, `DTEND;TZID=Europe/Istanbul:${end}`, `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAY[di]}`, `SUMMARY:${site.name} – ${s.title}`, `DESCRIPTION:${(s.description || '').replace(/\n/g, ' ')}`, `URL:${abs('/canli-yayin/')}`, 'END:VEVENT');
      });
      lines.push('END:VCALENDAR');
      write('yayin-akisi.ics', lines.join('\r\n') + '\r\n');
    }
  }

  // ================================================================ Programlar ve video sayfaları
  {
    const progOf = (v) => programs.find((p) => p.slug === v.program);
    const vPage = (v) => `/yayinlar/${v.slug}/`;

    // Video sayfaları
    sortedVideos.forEach((v) => {
      const pr = progOf(v);
      const crumbs = [['/', 'Anasayfa'], ['/yayinlar/', 'Yayınlar'], [vPage(v), v.title]];
      const others = sortedVideos.filter((x) => x.id !== v.id).slice(0, 3);
      const paras = (v.transcript || '').split(/\n{2,}/).map((t) => t.trim()).filter(Boolean);
      const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  ${pr ? `<p class="eyebrow dark"><a href="/programlar/${pr.slug}/">${esc(pr.name)}</a></p>` : v.category ? `<p class="eyebrow dark">${esc(v.category)}</p>` : ''}
  <h1>${esc(v.title)}</h1>
  ${v.date ? `<p class="muted"><time datetime="${v.date}">${fmtDate(v.date)}</time></p>` : ''}
</div>
<div class="wrap section">
  <div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}?rel=0" title="${esc(v.title)}" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
  <div class="prose prose-block narrow">
    ${v.description ? `<p class="lead">${esc(v.description)}</p>` : ''}
    ${paras.length ? `<h2 id="metin">Yayın Metni</h2>${paras.map((t) => `<p>${esc(t)}</p>`).join('')}` : ''}
  </div>
  ${others.length ? `<h2 class="section-title" style="margin-top:3rem">Diğer Yayınlar</h2><div class="vgrid">${others.map((x) => videoCard(x)).join('')}</div>` : ''}
</div>`;
      write(
        `yayinlar/${v.slug}/index.html`,
        layout({
          title: v.title,
          description: v.description || `${v.title} – ${site.name} yayını.`,
          path: vPage(v),
          body,
          ld: [breadcrumbLd(crumbs), { ...videoLd(v), ...(paras.length ? { transcript: paras.join('\n\n') } : {}) }],
          current: '/yayinlar/',
          ogType: 'video.other',
        })
      );
      addPage(vPage(v), v.date || today, 0.7, 'monthly');
      search.push({ t: v.title, d: v.description || 'MEC yayını', u: vPage(v), c: 'Yayın', k: (v.category || '') + ' video yayın', x: paras.join(' ').slice(0, 1500) });
    });

    // Program sayfaları
    programs.forEach((p) => {
      const list = sortedVideos.filter((v) => v.program === p.slug);
      const crumbs = [['/', 'Anasayfa'], ['/programlar/', 'Programlar'], [`/programlar/${p.slug}/`, p.name]];
      const desc = p.description || `${site.name} ${p.name} programının tüm bölümleri.`;
      const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <p class="eyebrow dark">Program</p>
  <h1>${esc(p.name)}</h1>
  <p class="lead">${esc(desc)}</p>
  ${p.host ? `<p class="muted">Sunucu: <strong>${esc(p.host)}</strong></p>` : ''}
</div>
<div class="wrap section">${list.length ? `<div class="vgrid">${list.map((v) => videoCard(v)).join('')}</div>` : '<div class="coming"><h2>Bölümler Yakında</h2><p>Bu programın bölümleri yayınlandıkça burada listelenecek.</p></div>'}</div>`;
      write(
        `programlar/${p.slug}/index.html`,
        layout({
          title: `${p.name}: Tüm Bölümler`,
          description: desc,
          path: `/programlar/${p.slug}/`,
          body,
          ld: [breadcrumbLd(crumbs), { '@context': 'https://schema.org', '@type': 'TVSeries', name: p.name, description: desc, url: abs(`/programlar/${p.slug}/`), numberOfEpisodes: list.length, productionCompany: { '@id': abs('/#org') } }, ...list.map(videoLd)],
          current: '/programlar/',
        })
      );
      addPage(`/programlar/${p.slug}/`, list[0]?.date || today, 0.7, 'weekly');
      search.push({ t: p.name, d: desc, u: `/programlar/${p.slug}/`, c: 'Program', k: 'program seri yayın', x: desc });
    });

    // Programlar dizini
    const crumbs = [['/', 'Anasayfa'], ['/programlar/', 'Programlar']];
    const desc = `${site.name} stüdyosunda hazırlanan programlar ve seriler. Sohbetler, söyleşiler ve özel yayınlar.`;
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Programlar</h1>
  <p class="lead">${esc(site.name)} stüdyosunda hazırlanan programlar ve seriler.</p>
</div>
<div class="wrap section">
  ${
    programs.length
      ? `<div class="cat-grid">${programs
          .map((p) => `<a class="cat-card" href="/programlar/${p.slug}/"><h3>${esc(p.name)}</h3><p>${esc(p.description || '')}</p><span class="more">${sortedVideos.filter((v) => v.program === p.slug).length} bölüm →</span></a>`)
          .join('')}</div>`
      : `<div class="coming"><p class="eyebrow dark">Çok Yakında</p><h2>Programlarımız Hazırlanıyor</h2><p>Stüdyomuzda hazırlanan program ve seriler burada listelenecek. Şimdilik <a href="/yayinlar/">yayınlar</a> sayfasına göz atabilirsiniz.</p></div>`
  }
</div>`;
    write('programlar/index.html', layout({ title: 'Programlar ve Seriler', description: desc, path: '/programlar/', body, ld: [breadcrumbLd(crumbs), { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Programlar', url: abs('/programlar/'), description: desc }], current: '/programlar/' }));
    addPage('/programlar/', today, 0.6, 'weekly');
  }

  // ================================================================ Soru sor
  {
    const crumbs = [['/', 'Anasayfa'], ['/soru-sor/', 'Soru Sor']];
    const desc = `${site.name} ekibine dinî soru, öneri veya konu talebinizi iletin; genel nitelikli sorulara makale ve yayınlarımızda yer verelim.`;
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Soru Sor</h1>
  <p class="lead">Merak ettiğiniz bir konu mu var? Sorunuzu iletin; genel nitelikli sorulara <a href="/soru-cevap/">Soru-Cevap</a> bölümümüzde, makalelerimizde ve yayınlarımızda yer verelim.</p>
</div>
<div class="wrap section">
  <div class="form-card">
    <form class="mec-form" data-form="ask" data-endpoint="${esc(forms.askEndpoint)}" data-mailto="${esc(site.email)}" data-subject="${esc(site.name)} Soru Formu" action="${forms.askEndpoint ? esc(forms.askEndpoint) : '#'}" method="post">
      <div class="field"><label for="a-ad">Adınız (isteğe bağlı)</label><input id="a-ad" name="ad" type="text" autocomplete="name"></div>
      <div class="field"><label for="a-mail">E-posta (cevap istiyorsanız)</label><input id="a-mail" name="email" type="email" autocomplete="email"></div>
      <div class="field"><label for="a-konu">Konu</label><select id="a-konu" name="konu"><option>Namaz</option><option>Abdest ve temizlik</option><option>Oruç ve Ramazan</option><option>Zekât ve fitre</option><option>Hac ve umre</option><option>Kur'an ve dua</option><option>İslam ve iman</option><option>Diğer</option></select></div>
      <div class="field"><label for="a-soru">Sorunuz</label><textarea id="a-soru" name="soru" rows="6" required></textarea></div>
      <div class="field check"><label><input type="checkbox" name="yayin" value="evet"> Sorum, adım belirtilmeden sitede yayınlanabilir.</label></div>
      <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
      <button class="btn" type="submit">Gönder</button>
      <p class="form-msg small" role="status" aria-live="polite"></p>
    </form>
    <p class="small muted">${forms.askEndpoint ? '' : 'Gönder düğmesi e-posta uygulamanızı açar. '}Kişisel fetva verilmez; özel durumlar için bir din görevlisine veya Diyanet İşleri Başkanlığı'nın Alo 190 Dinî Bilgi Hattı'na başvurabilirsiniz.</p>
  </div>
</div>`;
    write('soru-sor/index.html', layout({ title: 'Soru Sor', description: desc, path: '/soru-sor/', body, ld: [breadcrumbLd(crumbs), { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Soru Sor', url: abs('/soru-sor/') }], current: '/soru-sor/' }));
    addPage('/soru-sor/', today, 0.5, 'yearly');
    search.push({ t: 'Soru Sor', d: 'Sorunuzu bize iletin.', u: '/soru-sor/', c: 'Sayfa', k: 'soru sor iletişim form', x: 'soru sor dinî soru öneri konu talebi' });
  }

  // ================================================================ Bülten
  {
    const crumbs = [['/', 'Anasayfa'], ['/bulten/', 'Bülten']];
    const desc = `${site.name} e-posta bültenine abone olun: yeni makaleler, yayınlar ve mübarek gün hatırlatmaları e-postanıza gelsin.`;
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>E-posta Bülteni</h1>
  <p class="lead">Yeni makaleler, yayınlar ve kandil-bayram hatırlatmaları e-postanıza gelsin. Spam yok; istediğiniz zaman ayrılabilirsiniz.</p>
</div>
<div class="wrap section"><div class="form-card">
  <form class="mec-form" data-form="newsletter" data-endpoint="${esc(forms.newsletterEndpoint)}" data-mailto="${esc(site.email)}" data-subject="${esc(site.name)} Bülten Aboneliği" action="${forms.newsletterEndpoint ? esc(forms.newsletterEndpoint) : '#'}" method="post">
    <div class="field"><label for="b-mail">E-posta adresiniz</label><input id="b-mail" name="email" type="email" required autocomplete="email"></div>
    <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
    <button class="btn" type="submit">Abone Ol</button>
    <p class="form-msg small" role="status" aria-live="polite"></p>
  </form>
  <p class="small muted">E-posta adresiniz yalnızca bülten göndermek için kullanılır ve üçüncü kişilerle paylaşılmaz. Ayrıntılar için <a href="/gizlilik-politikasi/">Gizlilik Politikası</a>.</p>
</div></div>`;
    write('bulten/index.html', layout({ title: 'E-posta Bülteni', description: desc, path: '/bulten/', body, ld: [breadcrumbLd(crumbs)], current: '/bulten/' }));
    addPage('/bulten/', today, 0.4, 'yearly');
  }

  // ================================================================ Ekip
  {
    const crumbs = [['/', 'Anasayfa'], ['/ekip/', 'Ekibimiz ve Yayın İlkeleri']];
    const desc = `${site.name} yayın kurulu, editöryal süreç, kaynak politikası ve düzeltme ilkeleri: içeriklerimiz nasıl hazırlanıyor ve denetleniyor?`;
    const people = team
      .map(
        (t) => `<article class="person">${t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}" width="160" height="160" loading="lazy">` : `<div class="avatar" aria-hidden="true">${esc(t.name.charAt(0))}</div>`}<h3>${esc(t.name)}</h3><p class="role">${esc(t.role || '')}</p>${t.bio ? `<p>${esc(t.bio)}</p>` : ''}</article>`
      )
      .join('');
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Ekibimiz ve Yayın İlkeleri</h1>
  <p class="lead">${esc(site.name)} içeriklerinin nasıl hazırlandığını, hangi kaynaklara dayandığını ve hatalara karşı nasıl davrandığımızı şeffaf biçimde paylaşıyoruz.</p>
</div>
<div class="wrap section">
  ${people ? `<h2 class="section-title">Yayın Kurulu</h2><div class="team-grid">${people}</div>` : ''}
  <div class="prose prose-block narrow">
    <h2>Editöryal Süreç</h2>
    <ol>
      <li><strong>Araştırma:</strong> Her içerik, Kur'an-ı Kerim, Kütüb-i Sitte hadis kaynakları ve Diyanet İşleri Başkanlığı yayınları gibi güvenilir kaynaklardan hazırlanır.</li>
      <li><strong>Kaynak gösterme:</strong> Ayet ve hadisler, sure-ayet numarası veya hadis kaynağıyla birlikte verilir.</li>
      <li><strong>İnceleme:</strong> Yayından önce içerikler editör kontrolünden geçer; fıkhî hükümler Hanefî mezhebi esas alınarak yazılır.</li>
      <li><strong>Güncelleme:</strong> İçerikler düzenli olarak gözden geçirilir; güncellenen yazılarda "güncelleme" tarihi görünür.</li>
    </ol>
    <h2>Mezhep ve Yaklaşım</h2>
    <p>Fıkhî konularda Hanefî mezhebini esas alıyor, mezhepler arasında görüş ayrılığı bulunan yerlerde bunu belirtmeye çalışıyoruz. Ayrıştırıcı ve kışkırtıcı dilden uzak, sade ve saygılı bir üslubu benimsiyoruz.</p>
    <h2>Düzeltme Politikası</h2>
    <p>Bir hata fark ettiğinizde <a href="/iletisim/">iletişim</a> sayfamızdan sayfa adresiyle birlikte bildirmeniz bizim için çok değerlidir. Doğrulanan hatalar en kısa sürede düzeltilir.</p>
    <h2>Sorumluluk Reddi</h2>
    <p>Sitedeki içerikler genel bilgilendirme amaçlıdır ve bağlayıcı bir fetva değildir. Özel durumlar için yetkili bir din görevlisine danışılmalıdır.</p>
    <h2>Bize Katılın</h2>
    <p>İçerik üretimine katkı vermek, konu önermek veya yayınlarımızda yer almak isterseniz <a href="/iletisim/">bize yazın</a>.</p>
  </div>
</div>`;
    write(
      'ekip/index.html',
      layout({
        title: 'Ekibimiz ve Yayın İlkeleri',
        description: desc,
        path: '/ekip/',
        body,
        ld: [breadcrumbLd(crumbs), { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Ekibimiz ve Yayın İlkeleri', url: abs('/ekip/'), description: desc }, ...team.map((t) => ({ '@context': 'https://schema.org', '@type': 'Person', name: t.name, jobTitle: t.role, description: t.bio, worksFor: { '@id': abs('/#org') } }))],
        current: '/hakkimizda/',
      })
    );
    addPage('/ekip/', today, 0.5, 'yearly');
  }

  // ================================================================ Çevrimdışı sayfa
  write(
    'offline.html',
    layout({
      title: 'Çevrimdışısınız',
      description: 'İnternet bağlantısı yok.',
      path: '/offline.html',
      noindex: true,
      body: `<div class="wrap page-head center"><h1>Şu anda çevrimdışısınız</h1><p class="lead">İnternet bağlantınız yok. Bağlantı geldiğinde sayfayı yenileyin; daha önce açtığınız sayfalara çevrimdışı da ulaşabilirsiniz.</p><p><a class="btn" href="/">Anasayfa</a></p></div>`,
    })
  );

  return search;
}
