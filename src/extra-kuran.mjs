// Kur'an-ı Kerim okuma sayfaları (114 sure) + sözlük ve soru-cevap
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sureAdlari, okunuslu } from './data/kuran-meta.mjs';
import { sss, sssGruplari } from './data/sss.mjs';
import { sozluk } from './data/sozluk.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const quran = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'quran.json'), 'utf8'));
const BESMELE = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

export const kuranData = quran.map((s) => {
  const ad = sureAdlari[s.n - 1];
  const slug = ad.replace(/['’]/g, '').replace(/İ/g, 'i').toLowerCase().replace(/[çğıöşüâîûİ]/g, (c) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u', İ: 'i' }[c])).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-suresi';
  const ayet = s.a.map((x, i) => {
    let t = x.t;
    if (i === 0 && s.n !== 1 && t.startsWith('بِسْمِ')) t = t.split(' ').slice(4).join(' ');
    const tr = (s.m[i] || '').trim();
    return { no: i + 1, ar: t, tr: (tr.match(/\(/g) || []).length > (tr.match(/\)/g) || []).length ? tr + ')' : tr, p: x.p, j: x.j };
  });
  return {
    n: s.n,
    ad,
    slug,
    url: `/kuran/${slug}/`,
    arAd: s.ar,
    medeni: s.type === 'Medinan',
    ayet,
    cuz: [...new Set(ayet.map((x) => x.j))],
    sayfa: [ayet[0].p, ayet[ayet.length - 1].p],
  };
});

export function kuranCuzSayfalari() {
  // Her cüzün başladığı mushaf sayfası (Medine mushafı, 604 sayfa)
  const out = [];
  for (let j = 1; j <= 30; j++) {
    for (const s of kuranData) {
      const a = s.ayet.find((x) => x.j === j);
      if (a) { out.push({ j, p: a.p, sure: s, ayet: a.no }); break; }
    }
  }
  return out;
}

export function buildKuran(ctx) {
  const { layout, write, addPage, esc, abs, breadcrumbHtml, breadcrumbLd, today } = ctx;
  const search = [];
  const cuz = kuranCuzSayfalari();

  // ---- Sure sayfaları
  kuranData.forEach((s, i) => {
    const prev = kuranData[i - 1];
    const next = kuranData[i + 1];
    const crumbs = [['/', 'Anasayfa'], ['/kuran/', 'Kur\'an-ı Kerim'], [s.url, `${s.ad} Suresi`]];
    const yer = s.medeni ? 'Medine\'de' : 'Mekke\'de';
    const desc = `${s.ad} Suresi (Kur'an'ın ${s.n}. suresi, ${s.ayet.length} ayet, ${yer} inmiştir): Arapça metni ve Elmalılı Hamdi Yazır meali ile ayet ayet oku.`;
    const ok = okunuslu[s.n];
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <p class="eyebrow dark">Kur'an-ı Kerim · ${s.n}. Sure</p>
  <h1>${esc(s.ad)} Suresi</h1>
  <p class="sure-ar" lang="ar" dir="rtl">${s.arAd}</p>
  <ul class="facts">
    <li><b>${s.ayet.length}</b> ayet</li>
    <li><b>${s.medeni ? 'Medenî' : 'Mekkî'}</b></li>
    <li>Cüz <b>${s.cuz.join('–')}</b></li>
    <li>Sayfa <b>${s.sayfa[0] === s.sayfa[1] ? s.sayfa[0] : s.sayfa[0] + '–' + s.sayfa[1]}</b></li>
  </ul>
  ${ok ? `<p class="small"><a href="/kisa-sureler/#${s.n === 112 ? 'ihlas' : ok}">Bu surenin Türkçe okunuşu için tıklayın →</a></p>` : ''}
</div>
<div class="wrap section kuran-sure">
  <div class="sure kuran-card">
    ${s.n !== 9 && s.n !== 1 ? `<p class="besmele" lang="ar" dir="rtl">${BESMELE}</p>` : s.n === 9 ? '<p class="muted small center">Tevbe Suresi besmelesiz başlar.</p>' : ''}
    <div class="kv-list">
${s.ayet
  .map(
    (a) => `      <div class="kv" id="ayet-${a.no}"><a class="kv-no" href="#ayet-${a.no}" aria-label="${a.no}. ayet">${a.no}</a><p class="ar" lang="ar" dir="rtl">${a.ar}</p><p class="meal">${esc(a.tr)}</p></div>`
  )
  .join('\n')}
    </div>
  </div>
  <nav class="sure-nav" aria-label="Önceki ve sonraki sure">
    ${prev ? `<a href="${prev.url}">← ${esc(prev.ad)} Suresi</a>` : '<span></span>'}
    <a href="/kuran/">Tüm sureler</a>
    ${next ? `<a href="${next.url}">${esc(next.ad)} Suresi →</a>` : '<span></span>'}
  </nav>
  <p class="small muted">Arapça metin: Osmanlı (Uthmani) mushaf yazısı. Meal: Elmalılı Muhammed Hamdi Yazır, <em>Hak Dîni Kur'an Dili</em>. Meal, Kur'an'ın anlamının Türkçe ifadesidir; Kur'an'ın kendisi Arapça metnidir. Ayrıntılı anlayış için tefsirlere ve yetkili din görevlilerine başvurunuz.</p>
</div>`;
    write(
      `kuran/${s.slug}/index.html`,
      layout({
        title: `${s.ad} Suresi: Arapça Metni ve Türkçe Meali (${s.ayet.length} Ayet)`,
        description: desc,
        path: s.url,
        body,
        ld: [
          breadcrumbLd(crumbs),
          { '@context': 'https://schema.org', '@type': 'WebPage', name: `${s.ad} Suresi`, url: abs(s.url), description: desc, inLanguage: ['tr', 'ar'], isPartOf: { '@id': abs('/#website') } },
        ],
        current: '/kuran/',
        keywords: [`${s.ad} suresi`, `${s.ad} suresi meali`, `${s.ad} suresi okunuşu`, `${s.ad} suresi arapça`, `${s.ad} suresi türkçe anlamı`],
      })
    );
    addPage(s.url, today, s.n <= 1 || okunuslu[s.n] ? 0.8 : 0.5, 'yearly');
    search.push({
      t: `${s.ad} Suresi`,
      d: `Kur'an'ın ${s.n}. suresi, ${s.ayet.length} ayet. Arapça metni ve Türkçe meali.`,
      u: s.url,
      c: 'Kur\'an',
      k: `${s.ad} suresi meali okunuşu arapça kuran sure ${s.arAd}`,
      x: s.ayet.slice(0, 6).map((a) => a.tr).join(' ').slice(0, 600),
    });
  });

  // ---- Kur'an dizin sayfası
  {
    const crumbs = [['/', 'Anasayfa'], ['/kuran/', 'Kur\'an-ı Kerim']];
    const desc = 'Kur\'an-ı Kerim\'in 114 suresini Arapça metni ve Türkçe meali ile oku. Sure listesi, cüz başlangıçları ve Fâtiha\'dan Nâs\'a bütün sureler tek sayfada.';
    const body = `
<div class="page-hero">
  <div class="wrap page-hero-in" style="grid-template-columns:1fr">
    <div>
      ${breadcrumbHtml(crumbs)}
      <p class="eyebrow">Kur'an-ı Kerim</p>
      <h1>Kur'an-ı Kerim Oku: 114 Sure, Arapça ve Türkçe Meal</h1>
      <p class="lead">Kur'an-ı Kerim'in tamamını, her ayetin Arapça metni ve Elmalılı Hamdi Yazır mealiyle birlikte okuyabilirsiniz. Okuma ilerlemenizi takip etmek için <a href="/hatim-takip/" style="color:var(--gold-light)">hatim takip aracını</a> kullanın.</p>
    </div>
  </div>
</div>
<div class="wrap section">
  <div class="filters"><label class="sr" for="list-q">Sure ara</label><input id="list-q" type="search" class="filter-input" placeholder="Sure ara… (örn. Bakara, Yâsîn, İhlâs)" autocomplete="off"><p class="small muted" id="list-count">114 sure</p></div>
  <div class="table-wrap"><table class="takvim sure-table"><thead><tr><th>#</th><th>Sure</th><th>Arapça</th><th>Ayet</th><th>Cüz</th><th>Yer</th></tr></thead><tbody id="list-items">
  ${kuranData
    .map(
      (s) => `<tr class="fi" data-t="${esc((s.n + ' ' + s.ad + ' ' + s.slug.replace(/-/g, ' ')).toLocaleLowerCase('tr'))}"><td>${s.n}</td><td><a href="${s.url}"><strong>${esc(s.ad)} Suresi</strong></a></td><td class="ar-cell" lang="ar" dir="rtl">${s.arAd.replace('سُورَةُ ', '')}</td><td>${s.ayet.length}</td><td>${s.cuz.join('–')}</td><td>${s.medeni ? 'Medenî' : 'Mekkî'}</td></tr>`
    )
    .join('\n  ')}
  </tbody></table></div>
  <h2 class="section-title" style="margin-top:3rem">Cüzler</h2>
  <p class="muted">Kur'an 30 cüzden oluşur. Bir cüzün başladığı yere gitmek için tıklayın.</p>
  <div class="cuz-grid">
    ${cuz.map((c) => `<a href="${c.sure.url}#ayet-${c.ayet}"><b>${c.j}. Cüz</b><span>${esc(c.sure.ad)} ${c.ayet}. ayet · s. ${c.p}</span></a>`).join('')}
  </div>
  <div class="prose prose-block" style="margin-top:3rem">
    <h2>Kur'an-ı Kerim Hakkında</h2>
    <p>Kur'an-ı Kerim, 23 yıllık bir süreçte Hz. Muhammed'e (s.a.v.) indirilen ilahi kitaptır. 114 sure ve 6236 ayetten oluşur. Sureler Mekkî ve Medenî olarak ikiye ayrılır; Mekke döneminde inen sureler genelde iman, ahiret ve ahlak konularını; Medine döneminde inenler ise toplumsal hükümleri ele alır.</p>
    <p>Kur'an'ı okurken abdestli olmak, okumaya besmele ile başlamak, anlayarak ve tefekkürle okumak adabındandır. Detaylar için <a href="/kuran-i-kerim/kuran-okuma-adabi-ve-hatim/">Kur'an okuma adabı ve hatim</a> yazımıza bakabilirsiniz. Namazda okunan kısa sureleri okunuşuyla birlikte <a href="/kisa-sureler/">Namaz Sureleri</a> sayfamızda bulabilirsiniz.</p>
    <p class="small muted">Meal olarak Elmalılı Muhammed Hamdi Yazır'ın <em>Hak Dîni Kur'an Dili</em> eseri kullanılmıştır. Meal, Kur'an'ın aslının yerini tutmaz.</p>
  </div>
</div>`;
    write(
      'kuran/index.html',
      layout({
        title: 'Kur\'an-ı Kerim Oku: 114 Sure Arapça Metni ve Türkçe Meali',
        description: desc,
        path: '/kuran/',
        body,
        ld: [
          breadcrumbLd(crumbs),
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Kur\'an-ı Kerim', url: abs('/kuran/'), description: desc },
          { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Kur\'an-ı Kerim Sureleri', numberOfItems: 114, itemListElement: kuranData.map((s) => ({ '@type': 'ListItem', position: s.n, name: `${s.ad} Suresi`, url: abs(s.url) })) },
        ],
        scripts: ['filter.js'],
        keywords: ['kuran oku', 'kuran-ı kerim', 'sureler', 'kuran meali', '114 sure', 'cüzler', 'elmalılı meali'],
      })
    );
    addPage('/kuran/', today, 0.9, 'monthly');
    search.push({ t: 'Kur\'an-ı Kerim: 114 Sure', d: 'Kur\'an\'ı Arapça ve Türkçe meal ile oku.', u: '/kuran/', c: 'Sayfa', k: 'kuran oku sure listesi cüz meal', x: kuranData.map((s) => s.ad).join(' ') });
  }
  return search;
}

// ------------------------------------------------------------------ Soru-Cevap + Sözlük
export function buildBilgi(ctx) {
  const { layout, write, addPage, esc, abs, breadcrumbHtml, breadcrumbLd, faqLd, stripTags, today } = ctx;
  const search = [];

  // Soru-Cevap detay sayfaları
  sss.forEach((q) => {
    q.url = `/soru-cevap/${q.slug}/`;
  });
  sss.forEach((q) => {
    const crumbs = [['/', 'Anasayfa'], ['/soru-cevap/', 'Soru-Cevap'], [q.url, q.q]];
    const rel = [...sss.filter((x) => x !== q && x.cat === q.cat), ...sss.filter((x) => x !== q && x.cat !== q.cat)].slice(0, 5);
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <p class="eyebrow dark">${esc(q.cat)}</p>
  <h1>${esc(q.q)}</h1>
  <p class="lead">${esc(q.short)}</p>
</div>
<div class="wrap section"><div class="prose prose-block narrow">
  <h2>Ayrıntılı Cevap</h2>
  ${q.a}
  ${q.links && q.links.length ? `<h2>İlgili Sayfalar</h2><ul>${q.links.map((l) => `<li><a href="${l[0]}">${esc(l[1])}</a></li>`).join('')}</ul>` : ''}
  <div class="note">Cevaplar, Hanefî mezhebi ve Diyanet İşleri Başkanlığı kaynakları esas alınarak hazırlanmış genel bilgilerdir. Özel durumunuz için bir din görevlisine danışınız. Sorunuz için <a href="/soru-sor/">bize yazabilirsiniz</a>.</div>
  <h2>Diğer Sorular</h2>
  <ul>${rel.map((r) => `<li><a href="${r.url}">${esc(r.q)}</a></li>`).join('')}</ul>
</div></div>`;
    write(
      `soru-cevap/${q.slug}/index.html`,
      layout({
        title: q.q,
        description: q.short.length > 155 ? q.short.slice(0, 152) + '…' : q.short,
        path: q.url,
        body,
        ld: [breadcrumbLd(crumbs), faqLd([{ q: q.q, a: stripTags(q.a) }])],
        current: '/soru-cevap/',
      })
    );
    addPage(q.url, today, 0.7, 'monthly');
    search.push({ t: q.q, d: q.short, u: q.url, c: 'Soru-Cevap', k: q.q, x: stripTags(q.a).slice(0, 1200) });
  });

  // Soru-Cevap merkezi
  {
    const crumbs = [['/', 'Anasayfa'], ['/soru-cevap/', 'Soru-Cevap']];
    const desc = 'En çok sorulan dinî sorulara kısa ve kaynaklı cevaplar: namaz, abdest, oruç, zekât, hac, Kur\'an ve daha fazlası. Hanefî mezhebine göre hazırlanmıştır.';
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Soru-Cevap: Sık Sorulan Dinî Sorular</h1>
  <p class="lead">Namaz, abdest, oruç, zekât ve diğer konularda en çok merak edilen soruların kısa, net ve kaynaklı cevapları. Sorunuz burada yoksa <a href="/soru-sor/">bize sorabilirsiniz</a>.</p>
  <div class="filters"><label class="sr" for="list-q">Soru ara</label><input id="list-q" type="search" class="filter-input" placeholder="Soru ara… (örn. abdest, oruç, zekât)" autocomplete="off"><p class="small muted" id="list-count">${sss.length} soru</p></div>
</div>
<div class="wrap section" id="list-items">
${sssGruplari
  .map((g) => {
    const items = sss.filter((q) => q.cat === g);
    if (!items.length) return '';
    return `<section class="fgroup qa-group"><h2>${esc(g)}</h2><div class="qa-list">${items
      .map(
        (q) => `<a class="qa fi" href="${q.url}" data-t="${esc((q.q + ' ' + q.short).toLocaleLowerCase('tr'))}"><strong>${esc(q.q)}</strong><span>${esc(q.short)}</span></a>`
      )
      .join('')}</div></section>`;
  })
  .join('\n')}
</div>`;
    write(
      'soru-cevap/index.html',
      layout({
        title: 'Soru-Cevap: Sık Sorulan Dinî Sorular ve Cevapları',
        description: desc,
        path: '/soru-cevap/',
        body,
        ld: [
          breadcrumbLd(crumbs),
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Soru-Cevap', url: abs('/soru-cevap/'), description: desc },
          { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Sık Sorulan Dinî Sorular', numberOfItems: sss.length, itemListElement: sss.map((q, i) => ({ '@type': 'ListItem', position: i + 1, name: q.q, url: abs(q.url) })) },
        ],
        scripts: ['filter.js'],
        keywords: ['dini sorular', 'islam soru cevap', 'namaz soruları', 'abdest soruları', 'oruç soruları'],
      })
    );
    addPage('/soru-cevap/', today, 0.9, 'weekly');
    search.push({ t: 'Soru-Cevap', d: 'Sık sorulan dinî sorular.', u: '/soru-cevap/', c: 'Sayfa', k: 'soru cevap dini sorular', x: sss.map((q) => q.q).join(' ') });
  }

  // Sözlük
  {
    const crumbs = [['/', 'Anasayfa'], ['/sozluk/', 'İslami Terimler Sözlüğü']];
    const desc = `İslami terimler sözlüğü: ${sozluk.length} kavramın kısa ve anlaşılır tanımı. Abdest, farz, vâcip, nafile, nisap, kaza, fidye, mushaf ve daha fazlası.`;
    const sorted = [...sozluk].sort((a, b) => a[0].localeCompare(b[0], 'tr'));
    const letters = {};
    sorted.forEach((t) => {
      const L = t[0].charAt(0).toLocaleUpperCase('tr');
      (letters[L] = letters[L] || []).push(t);
    });
    const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>İslami Terimler Sözlüğü</h1>
  <p class="lead">Dinî metinlerde ve sohbetlerde sık karşılaşılan ${sozluk.length} terimin kısa tanımı. Aradığınız kelimeyi yazın veya harfe göre gezinin.</p>
  <div class="filters"><label class="sr" for="list-q">Terim ara</label><input id="list-q" type="search" class="filter-input" placeholder="Terim ara… (örn. nisap, vâcip, hatim)" autocomplete="off"><p class="small muted" id="list-count">${sozluk.length} terim</p></div>
  <ul class="chips letters">${Object.keys(letters).map((L) => `<li><a href="#h-${L}">${L}</a></li>`).join('')}</ul>
</div>
<div class="wrap section" id="list-items">
${Object.entries(letters)
  .map(
    ([L, items]) => `<section class="fgroup glossary" id="h-${L}"><h2>${L}</h2><dl>${items
      .map(
        (t) => `<div class="fi" data-t="${esc((t[0] + ' ' + t[1]).toLocaleLowerCase('tr'))}"><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`
      )
      .join('')}</dl></section>`
  )
  .join('\n')}
</div>`;
    write(
      'sozluk/index.html',
      layout({
        title: 'İslami Terimler Sözlüğü: Dinî Kavramların Anlamları',
        description: desc,
        path: '/sozluk/',
        body,
        ld: [
          breadcrumbLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'İslami Terimler Sözlüğü',
            url: abs('/sozluk/'),
            hasDefinedTerm: sorted.map((t) => ({ '@type': 'DefinedTerm', name: t[0], description: t[1], inDefinedTermSet: abs('/sozluk/') })),
          },
        ],
        scripts: ['filter.js'],
        keywords: ['islami terimler', 'dini terimler sözlüğü', 'islam sözlüğü', 'dini kavramlar'],
      })
    );
    addPage('/sozluk/', today, 0.8, 'monthly');
    search.push({ t: 'İslami Terimler Sözlüğü', d: 'Dinî kavramların kısa tanımları.', u: '/sozluk/', c: 'Sayfa', k: 'sözlük terimler anlamı nedir', x: sozluk.map((t) => t[0] + ' ' + t[1]).join(' ').slice(0, 1500) });
  }
  return search;
}
