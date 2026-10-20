import { v } from './helpers.mjs';

export const ibadet = [
  // ------------------------------------------------------------------ NAMAZ
  {
    slug: 'namaz-nasil-kilinir',
    category: 'ibadet',
    title: 'Namaz Nasıl Kılınır? Adım Adım Anlatım ve Rekât Sayıları',
    description:
      'Namaz nasıl kılınır? Namazın şartları, farzları, beş vakit namazın rekât sayıları ve iki rekâtlık namazın adım adım kılınışı. Yeni başlayanlar için sade rehber.',
    keywords: ['namaz nasıl kılınır', 'namaz kılınışı', 'namazın farzları', 'namaz rekat sayıları', 'beş vakit namaz', 'namazın şartları'],
    date: '2026-10-01',
    summary: 'Namazın şartları, farzları, beş vakit namazın rekât sayıları ve iki rekâtlık namazın adım adım kılınışı.',
    body: `
<p>Namaz, İslam'ın beş şartından biri ve dinin direğidir. Allah Teâlâ, namazı belirli vakitlerde kılınması farz olan bir ibadet olarak bildirmiştir. Bu yazıda, Hanefî mezhebi esas alınarak namazın nasıl kılındığını yeni başlayanlar için adım adım anlatıyoruz.</p>

${v('إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا', 'Şüphesiz namaz, müminler üzerine vakitleri belirlenmiş bir farzdır.', 'Nisâ suresi, 103. ayet')}

<h2>Namazın Şartları</h2>
<p>Namaza başlamadan önce yerine getirilmesi gereken, namazın dışındaki farzlara "namazın şartları" denir. Altı tanedir:</p>
<ol>
  <li><strong>Hadesten taharet:</strong> Abdestli olmak, gerekiyorsa boy abdesti almak.</li>
  <li><strong>Necasetten taharet:</strong> Beden, elbise ve namaz kılınan yerin pis olmaması.</li>
  <li><strong>Setr-i avret:</strong> Avret yerlerinin örtülü olması.</li>
  <li><strong>İstikbal-i kıble:</strong> Kâbe'ye yönelmek.</li>
  <li><strong>Vakit:</strong> Namazı vaktinde kılmak.</li>
  <li><strong>Niyet:</strong> Hangi namazı kılacağını kalben bilmek ve kastetmek.</li>
</ol>

<h2>Beş Vakit Namaz ve Rekât Sayıları</h2>
<p>Günde beş vakit namaz farzdır. Hanefî mezhebine göre vakitlere göre kılınan farz, sünnet ve vitir namazlarının rekât sayıları şöyledir:</p>
<table>
  <thead><tr><th>Vakit</th><th>İlk Sünnet</th><th>Farz</th><th>Son Sünnet</th><th>Vitir</th></tr></thead>
  <tbody>
    <tr><td>Sabah</td><td>2</td><td>2</td><td>—</td><td>—</td></tr>
    <tr><td>Öğle</td><td>4</td><td>4</td><td>2</td><td>—</td></tr>
    <tr><td>İkindi</td><td>4</td><td>4</td><td>—</td><td>—</td></tr>
    <tr><td>Akşam</td><td>—</td><td>3</td><td>2</td><td>—</td></tr>
    <tr><td>Yatsı</td><td>4</td><td>4</td><td>2</td><td>3</td></tr>
  </tbody>
</table>
<p>İkindi ve yatsının ilk sünnetleri "gayr-i müekked" yani kılınması tavsiye edilen sünnetlerdir.</p>

<h2>İki Rekâtlık Namazın Adım Adım Kılınışı</h2>
<p>Peygamber Efendimiz (s.a.v.) şöyle buyurmuştur:</p>
${v('صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي', 'Beni nasıl namaz kılarken görüyorsanız, siz de öyle kılın.', 'Buhârî')}
<ol>
  <li><strong>Niyet ve iftitah tekbiri:</strong> Kıbleye dönülür, kalpten niyet edilir. Eller kulak hizasına (kadınlar omuz hizasına) kaldırılır ve "Allahü ekber" diyerek namaza başlanır. Eller bağlanır.</li>
  <li><strong>Kıyam ve kıraat:</strong> Sübhâneke okunur, ardından "Euzü besmele" çekilir, Fâtiha suresi ve ardından bir sure veya birkaç ayet okunur. Sonunda "Âmîn" denir.</li>
  <li><strong>Rükû:</strong> "Allahü ekber" diyerek eğilinir, eller dizlerin üzerine konur. Üç kez "Sübhâne rabbiyel azîm" denir.</li>
  <li><strong>Kavme:</strong> "Semiallahü limen hamideh" diyerek doğrulunur. Tam ayakta "Rabbenâ lekel hamd" denir.</li>
  <li><strong>Secde:</strong> "Allahü ekber" diyerek secdeye gidilir. Alın, burun, eller, dizler ve ayak parmakları yere değer. Üç kez "Sübhâne rabbiyel a'lâ" denir.</li>
  <li><strong>Celse:</strong> "Allahü ekber" diyerek secdeden kalkılıp kısa süre oturulur, sonra ikinci secdeye gidilir.</li>
  <li><strong>İkinci rekât:</strong> "Allahü ekber" diyerek ayağa kalkılır. Bu rekâtta Sübhâneke okunmaz; "Besmele" ile Fâtiha ve bir sure okunup ilk rekâttaki gibi rükû ve secdeler yapılır.</li>
  <li><strong>Ka'de-i ahire (son oturuş):</strong> İkinci secdeden sonra oturulur; Ettehiyyâtü, Allahümme salli ve Allahümme bârik ile Rabbenâ duaları okunur.</li>
  <li><strong>Selam:</strong> Önce sağa, sonra sola "Es-selâmü aleyküm ve rahmetullah" denilerek namaz bitirilir.</li>
</ol>
<p>Üç veya dört rekâtlı namazlarda ilk iki rekâttan sonra ilk oturuşta yalnızca Ettehiyyâtü okunur ve kalkılır. Sonraki rekâtlarda (farz namazlarda) sadece Fâtiha okunur.</p>

<h2>Namazın İçindeki Farzlar</h2>
<ul>
  <li>İftitah tekbiri (namaza "Allahü ekber" diyerek başlamak)</li>
  <li>Kıyam (ayakta durmak)</li>
  <li>Kıraat (Kur'an'dan en az bir ayet okumak)</li>
  <li>Rükû</li>
  <li>Secde</li>
  <li>Ka'de-i ahire (son oturuş)</li>
</ul>

<h2>Namazda Huşû</h2>
<p>Namaz yalnızca bedenin hareketi değil, kalbin Allah'a yönelişidir. Okunanların anlamını öğrenmek, secdede içten dua etmek ve acele etmeden kılmak huşûyu artırır. Namazı vaktinin başında, sakin ve tane tane kılmaya özen gösterin.</p>
<p><em>Not: Mezhepler arasında namazın bazı ayrıntılarında farklılıklar vardır. Burada Hanefî mezhebi esas alınmıştır. Kesin bilgi için Diyanet İlmihali'ne veya bir din görevlisine danışabilirsiniz.</em></p>
`,
    faq: [
      { q: 'Günde kaç vakit namaz farzdır?', a: 'Günde beş vakit namaz farzdır: sabah, öğle, ikindi, akşam ve yatsı. Vitir namazı Hanefî mezhebine göre vaciptir.' },
      { q: 'Sabah namazı kaç rekâttır?', a: 'Sabah namazı iki rekât sünnet ve iki rekât farz olmak üzere toplam dört rekâttır.' },
      { q: 'Namazda niyet nasıl yapılır?', a: 'Niyet kalple yapılır; dil ile söylemek şart değildir. Hangi namazı kılacağınızı bilmeniz ve kastetmeniz yeterlidir.' },
      { q: 'Namazın farzları kaç tanedir?', a: 'Hanefî mezhebine göre namazın dışında altı şart, namazın içinde altı farz vardır: iftitah tekbiri, kıyam, kıraat, rükû, secde ve ka\'de-i ahire.' },
    ],
    sources: ['Buhârî, Ezân 18', 'Nisâ suresi, 103. ayet', 'Diyanet İşleri Başkanlığı, İlmihal'],
  },

  // ----------------------------------------------------------------- ABDEST
  {
    slug: 'abdest-nasil-alinir',
    category: 'ibadet',
    title: 'Abdest Nasıl Alınır? Abdestin Farzları, Sünnetleri ve Abdesti Bozan Durumlar',
    description:
      'Abdest nasıl alınır? Abdestin farzları, sünnetleri, adım adım alınışı ve abdesti bozan durumlar. Hanefî mezhebine göre kapsamlı abdest rehberi.',
    keywords: ['abdest nasıl alınır', 'abdestin farzları', 'abdesti bozan şeyler', 'abdest sünnetleri', 'abdest alma'],
    date: '2026-09-24',
    summary: 'Abdestin farzları, sünnetleri, adım adım alınışı ve abdesti bozan durumlar.',
    body: `
<p>Abdest, namaz, Kur'an'a dokunma ve Kâbe'yi tavaf gibi ibadetler için gereken temizliktir. Temizlik, İslam'da büyük bir yere sahiptir.</p>
${v('الطُّهُورُ شَطْرُ الْإِيمَانِ', 'Temizlik imanın yarısıdır.', 'Müslim, Taharet 1')}

<h2>Abdestin Farzları</h2>
<p>Maide suresi 6. ayette abdestin temel unsurları bildirilmiştir. Hanefî mezhebine göre abdestin farzları dörttür:</p>
<ol>
  <li>Yüzü bir kez yıkamak (saç bitiminden çene altına, iki kulak yumuşağı arası)</li>
  <li>Kolları dirsekler dâhil yıkamak</li>
  <li>Başın dörtte birini mesh etmek (ıslak elle meshetmek)</li>
  <li>Ayakları topuklar dâhil yıkamak</li>
</ol>
${v('يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ', 'Ey iman edenler! Namaza kalkacağınız zaman yüzlerinizi, dirseklere kadar ellerinizi yıkayın, başlarınızı meshedin ve topuklara kadar ayaklarınızı (yıkayın).', 'Mâide suresi, 6. ayet')}

<h2>Abdest Nasıl Alınır? (Adım Adım)</h2>
<ol>
  <li>Niyet edilir ve "Euzü Besmele" çekilir.</li>
  <li>Eller bileklere kadar üç kez yıkanır, parmak araları hilallenir.</li>
  <li>Üç kez ağıza su verilir (mazmaza).</li>
  <li>Üç kez burna su çekilip temizlenir (istinşak).</li>
  <li>Yüz üç kez yıkanır.</li>
  <li>Önce sağ, sonra sol kol dirseklerle birlikte üçer kez yıkanır.</li>
  <li>Islak elle başın tamamı bir kez mesh edilir; ardından kulaklar ve ense meshedilir.</li>
  <li>Önce sağ, sonra sol ayak topuklarla birlikte üçer kez yıkanır, parmak araları temizlenir.</li>
  <li>Abdest sonrası şehadet getirilir ve dua okunur.</li>
</ol>

<h2>Abdestin Sünnetleri</h2>
<ul>
  <li>Niyet etmek ve besmele ile başlamak</li>
  <li>Elleri bileklere kadar yıkamak</li>
  <li>Misvak veya diş fırçasıyla dişleri temizlemek</li>
  <li>Ağıza ve buruna su vermek</li>
  <li>Başın tamamını mesh etmek, kulakları meshetmek</li>
  <li>Parmak aralarını hilallemek</li>
  <li>Sıraya riayet etmek ve organları üçer kez yıkamak</li>
  <li>Su israf etmemek</li>
</ul>

<h2>Abdesti Bozan Durumlar</h2>
<ul>
  <li>Ön veya arka yoldan idrar, gaz, dışkı gibi herhangi bir şeyin çıkması</li>
  <li>Vücuttan kan veya irin çıkıp akması</li>
  <li>Ağız dolusu kusmak</li>
  <li>Yan yatarak veya bir şeye dayanarak uyumak</li>
  <li>Bayılmak, aklî dengeyi kaybetmek veya sarhoş olmak</li>
  <li>Namaz içinde sesli (kahkaha ile) gülmek</li>
</ul>
<p>Abdestli olduğundan emin olan kimse, şüphe ile abdestini bozulmuş saymaz.</p>
`,
    faq: [
      { q: 'Abdestin kaç farzı vardır?', a: 'Hanefî mezhebine göre abdestin dört farzı vardır: yüzü yıkamak, kolları dirseklerle birlikte yıkamak, başın dörtte birini mesh etmek ve ayakları topuklarla birlikte yıkamak.' },
      { q: 'Abdest almadan Kur\'an okunur mu?', a: 'Kur\'an\'ı ezbere okumak için abdest şart değildir; ancak mushafa dokunmak için abdestli olmak gerekir. Abdestli okumak ise daha faziletlidir.' },
      { q: 'Abdest alırken konuşmak abdesti bozar mı?', a: 'Hayır, abdest alırken konuşmak abdesti bozmaz. Ancak gereksiz konuşmamak ve abdest duasını okumak daha uygundur.' },
    ],
    sources: ['Mâide suresi, 6. ayet', 'Müslim, Taharet 1', 'Diyanet İşleri Başkanlığı, İlmihal'],
  },

  // ------------------------------------------------------------------ ZEKAT
  {
    slug: 'zekat-nedir-kimlere-verilir',
    category: 'ibadet',
    title: 'Zekât Nedir? Nisap Miktarı, Zekât Hesaplama ve Zekât Kimlere Verilir?',
    description:
      'Zekât nedir, kimlere farzdır? Nisap miktarı, zekât oranı (kırkta bir), zekâta tabi mallar ve zekâtın verileceği sekiz sınıf. Zekât hakkında bilmeniz gerekenler.',
    keywords: ['zekat nedir', 'zekat nisap miktarı', 'zekat kimlere verilir', 'zekat hesaplama', 'zekat oranı', 'zekatın şartları'],
    date: '2026-09-18',
    summary: 'Zekâtın şartları, nisap miktarı, zekâta tabi mallar ve zekâtın verileceği sekiz sınıf.',
    body: `
<p>Zekât, malî bir ibadettir. Bir Müslümanın belirli bir miktar malı olması ve üzerinden bir yıl geçmesi hâlinde, o malın belli bir kısmını ihtiyaç sahiplerine vermesidir. Kur'an-ı Kerim'de namaz ile birlikte pek çok yerde zekâttan söz edilmiştir.</p>
${v('وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ', 'Namazı dosdoğru kılın, zekâtı verin.', 'Bakara suresi, 43. ayet')}

<h2>Zekâtın Farz Olma Şartları</h2>
<ul>
  <li>Müslüman, akıllı ve ergenlik çağına ermiş olmak</li>
  <li>Hür olmak</li>
  <li>Nisap miktarı mala sahip olmak</li>
  <li>Bu malın temel ihtiyaçlardan ve borçlardan fazla olması</li>
  <li>Nisaba ulaşan malın üzerinden bir yıl geçmesi (hâvelânü'l-havl)</li>
</ul>

<h2>Nisap Miktarı Nedir?</h2>
<p>Nisap, zekât vermekle yükümlü olmanın alt sınırıdır. Diyanet İşleri Başkanlığı'na göre nisap, 80,18 gram altın veya bu değerdeki para ya da ticaret malı olarak kabul edilir. Güncel nisap miktarı altın fiyatlarına göre değiştiği için Diyanet'in yayımladığı güncel rakamlara bakmanız önerilir.</p>

<h2>Zekât Oranı Nedir?</h2>
<p>Altın, gümüş, nakit para ve ticaret mallarında zekât oranı <strong>kırkta bir (%2,5)</strong>'tir. Örneğin zekâta tabi 100.000 birim malı olan biri 2.500 birim zekât verir.</p>

<h2>Zekâta Tabi Mallar</h2>
<ul>
  <li>Altın, gümüş ve nakit para (banka hesapları dâhil)</li>
  <li>Ticaret malları</li>
  <li>Belirli sayıya ulaşan koyun, keçi, sığır, deve gibi hayvanlar</li>
  <li>Tarım ürünleri (öşür olarak ayrı hükümlere tabidir)</li>
</ul>
<p>Oturulan ev, kullanılan araç, ev eşyaları ve meslekî aletler gibi asli ihtiyaçlar zekâta tabi değildir.</p>

<h2>Zekât Kimlere Verilir?</h2>
<p>Zekâtın verileceği sekiz sınıf Tevbe suresi 60. ayette bildirilmiştir:</p>
<ol>
  <li>Fakirler</li>
  <li>Miskinler (yoksullar)</li>
  <li>Zekât toplayan görevliler</li>
  <li>Kalpleri İslam'a ısındırılacak olanlar</li>
  <li>Köleler (hürriyetine kavuşturulacak olanlar)</li>
  <li>Borçlular</li>
  <li>Allah yolunda olanlar</li>
  <li>Yolda kalmışlar</li>
</ol>
<p>Kişi; anne, baba, nine, dede, çocukları ve torunları ile eşine zekât veremez. Kardeş, amca, dayı, hala ve teyze gibi akrabalara ise ihtiyaçları varsa vermek hem zekât hem de sıla-i rahim sevabı kazandırır.</p>

<h2>Zekâtın Hikmeti</h2>
<p>Zekât, malı temizler, nefsi cimrilikten arındırır ve toplumda kardeşliği, yardımlaşmayı güçlendirir. Zenginle fakir arasında sevgi köprüsü kurar. Zekât vermek, malı eksiltmez; aksine bereketlendirir.</p>
<p><em>Zekât hesaplamanız için Diyanet'in güncel nisap açıklamasına bakmanızı ve gerekirse bir din görevlisine danışmanızı öneririz.</em></p>
`,
    faq: [
      { q: 'Zekât oranı yüzde kaçtır?', a: 'Altın, gümüş, nakit para ve ticaret mallarında zekât oranı kırkta bir yani %2,5\'tir.' },
      { q: 'Zekât ne zaman verilir?', a: 'Nisap miktarına ulaşan malın üzerinden bir yıl geçince zekât farz olur. Birçok kişi bunu Ramazan ayında vermeyi tercih eder ancak yıl dolunca her zaman verilebilir.' },
      { q: 'Zekât akrabalara verilir mi?', a: 'Anne, baba, dede, nine, çocuklar, torunlar ve eşe zekât verilemez. İhtiyaç sahibi diğer akrabalara verilebilir.' },
      { q: 'Zekât ile sadaka arasındaki fark nedir?', a: 'Zekât belirli şartlara bağlı farz bir ibadettir; sadaka ise miktarı ve zamanı belirli olmayan, gönüllü yapılan yardımdır.' },
    ],
    sources: ['Bakara suresi, 43. ayet', 'Tevbe suresi, 60. ayet', 'Diyanet İşleri Başkanlığı, İlmihal'],
  },
];
