// MEC statik site derleyicisi:  npm run build  ->  dist/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { site, categories, videos, youtubeChannel, forms } from './config.mjs';
import { buildExtra } from './extra.mjs';
import { buildKuran, buildBilgi } from './extra-kuran.mjs';
import { ibadet } from './data/articles-ibadet.mjs';
import { diger } from './data/articles-diger.mjs';
import { ek } from './data/articles-ek.mjs';
import { dualar, duaGruplari } from './data/dualar.mjs';
import { sureler } from './data/sureler.mjs';
import { cities, qibla } from './data/cities.mjs';
import { esma } from './data/esma.mjs';
import { daily } from './data/daily.mjs';
import { sozluk } from './data/sozluk.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const STATIC = path.join(__dirname, 'static');

// ------------------------------------------------------------------ yardımcılar
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const trMap = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u', İ: 'i' };
const slugify = (s) =>
  s.toLowerCase().replace(/[çğıöşüâîûİ]/g, (c) => trMap[c]).replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const stripTags = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const abs = (p) => site.url + p;
const fmtDate = (d) =>
  new Date(d + 'T12:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const jsonld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const write = (rel, content) => {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const copyDir = (from, to) => {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
};

// ------------------------------------------------------------------ veri hazırlığı
const articles = [...ibadet, ...diger, ...ek]
  .map((a) => {
    const text = stripTags(a.body);
    const toc = [];
    const body = a.body.replace(/<h2>(.*?)<\/h2>/g, (_, t) => {
      const id = slugify(t);
      toc.push({ id, text: stripTags(t) });
      return `<h2 id="${id}">${t}</h2>`;
    });
    const cat = categories.find((c) => c.slug === a.category);
    if (!cat) throw new Error(`Bilinmeyen kategori: ${a.category}`);
    return {
      ...a,
      body,
      toc,
      cat,
      updated: a.updated || a.date,
      minutes: Math.max(1, Math.round(text.split(/\s+/).length / 200)),
      url: `/${a.category}/${a.slug}/`,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

// CSS sürüm damgası (önbellek yenileme)
const cssHash = (f) => crypto.createHash('md5').update(fs.readFileSync(path.join(STATIC, f))).digest('hex').slice(0, 8);
const V = { css: cssHash('css/style.css'), main: cssHash('js/main.js') };

// ------------------------------------------------------------------ ortak şablon parçaları
const tools = [
  ['/namaz-vakitleri/', 'Namaz Vakitleri'],
  ['/ramazan-imsakiyesi/', 'Ramazan İmsakiyesi'],
  ['/kible-pusulasi/', 'Kıble Pusulası'],
  ['/dini-gunler-takvimi/', 'Dini Günler Takvimi'],
  ['/zekat-hesaplama/', 'Zekât ve Fitre Hesaplama'],
  ['/kaza-namazi-hesaplama/', 'Kaza Namazı Hesaplama'],
  ['/hatim-takip/', 'Hatim Takip'],
  ['/zikirmatik/', 'Zikirmatik'],
];
const nav = [
  ['/', 'Anasayfa'],
  { label: 'Yayınlar', items: [['/yayinlar/', 'Tüm Yayınlar'], ['/canli-yayin/', 'Canlı Yayın ve Akış'], ['/programlar/', 'Programlar']] },
  ['/makaleler/', 'Makaleler'],
  { label: 'Kur\'an ve Dua', items: [['/kuran/', 'Kur\'an-ı Kerim (114 Sure)'], ['/kisa-sureler/', 'Namaz Sureleri'], ['/dualar/', 'Dualar'], ['/esmaul-husna/', 'Esmaül Hüsna']] },
  { label: 'Öğren', items: [['/soru-cevap/', 'Soru-Cevap'], ['/sozluk/', 'İslami Terimler Sözlüğü'], ['/soru-sor/', 'Soru Sor']] },
  { label: 'Araçlar', items: tools },
  { label: 'Kurumsal', items: [['/hakkimizda/', 'Hakkımızda'], ['/ekip/', 'Ekibimiz ve İlkeler'], ['/iletisim/', 'İletişim'], ['/bulten/', 'E-posta Bülteni']] },
];
const navHtml = (current) =>
  nav
    .map((n) =>
      Array.isArray(n)
        ? `<li><a href="${n[0]}"${current === n[0] ? ' aria-current="page"' : ''}>${n[1]}</a></li>`
        : `<li class="has-sub"><button type="button" class="sub-btn" aria-expanded="false"${n.items.some((i) => i[0] === current) ? ' aria-current="true"' : ''}>${n.label}<span aria-hidden="true"> ▾</span></button><ul class="sub">${n.items
            .map((i) => `<li><a href="${i[0]}"${current === i[0] ? ' aria-current="page"' : ''}>${i[1]}</a></li>`)
            .join('')}</ul></li>`
    )
    .join('');

// Kurumsal görünüm için minimal çizgi ikonlar
const icon = {
  clock: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
  beads: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="1.6"/><circle cx="18" cy="8" r="1.6"/><circle cx="19" cy="15" r="1.6"/><circle cx="14" cy="20" r="1.6"/><circle cx="7" cy="19" r="1.6"/><circle cx="4.5" cy="12" r="1.6"/><circle cx="6.5" cy="6" r="1.6"/></svg>',
  play: '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
  book: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  feather: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4c-8 0-13 5-13 12v4M20 4c0 8-5 13-12 13M7 20l6-6"/></svg>',
};

const socialLinks = () =>
  Object.entries(site.social)
    .filter(([, u]) => u)
    .map(([k, u]) => `<a href="${esc(u)}" rel="noopener me" target="_blank">${esc(k[0].toUpperCase() + k.slice(1))}</a>`)
    .join('');

function header(current) {
  return `
<a class="skip" href="#icerik">İçeriğe geç</a>
<div class="topbar"><div class="wrap topbar-in">
  <span class="topbar-slogan">${esc(site.slogan)}</span>
  <span class="topbar-links"><a href="/iletisim/">İletişim</a>${Object.entries(site.social).filter(([, u]) => u).map(([k, u]) => `<a href="${esc(u)}" rel="noopener me" target="_blank">${esc(k[0].toUpperCase() + k.slice(1))}</a>`).join('')}<button type="button" id="theme-btn" class="theme-icon" aria-label="Koyu temayı aç/kapat" title="Koyu / Açık tema" aria-pressed="false"><svg class="i-moon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><svg class="i-sun" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button></span>
</div></div>
<header class="site-header">
  <div class="wrap header-in">
    <a class="brand" href="/" aria-label="${esc(site.name)} – ${esc(site.slogan)} anasayfa">
      <img src="/img/logo-96.png" srcset="/img/logo-96.png 1x, /img/logo-192.png 2x" width="48" height="48" alt="${esc(site.name)} logosu">
      <span class="brand-text"><strong>${esc(site.name)}</strong><small>${esc(site.slogan)}</small></span>
    </a>
    <button class="menu-btn" aria-expanded="false" aria-controls="ana-menu" aria-label="Menüyü aç/kapat"><span></span><span></span><span></span></button>
    <nav id="ana-menu" class="main-nav" aria-label="Ana menü">
      <ul>${navHtml(current)}</ul>
      <form class="search" action="/ara/" method="get" role="search">
        <label class="sr" for="q-header">Sitede ara</label>
        <input id="q-header" name="q" type="search" placeholder="Sitede ara…" autocomplete="off">
        <button type="submit" aria-label="Ara">🔍</button>
      </form>
    </nav>
  </div>
  <div class="cat-strip"><div class="wrap"><ul>${categories
    .map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`)
    .join('')}</ul></div></div>
</header>`;
}

function newsletterBand() {
  return `
<section class="nl-band" aria-labelledby="nl-baslik">
  <div class="wrap nl-in">
    <div><h2 id="nl-baslik">Yeni içeriklerden haberdar olun</h2><p>Makaleler, yayınlar ve kandil-bayram hatırlatmaları e-postanıza gelsin.</p></div>
    <form class="mec-form nl-form" data-form="newsletter" data-endpoint="${esc(forms.newsletterEndpoint)}" data-mailto="${esc(site.email)}" data-subject="${esc(site.name)} Bülten Aboneliği" action="${forms.newsletterEndpoint ? esc(forms.newsletterEndpoint) : '/bulten/'}" method="post">
      <label class="sr" for="nl-mail">E-posta adresiniz</label>
      <input id="nl-mail" name="email" type="email" placeholder="E-posta adresiniz" required autocomplete="email">
      ${forms.fields(site.name + ' Bülten Aboneliği')}
      <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
      <button class="btn" type="submit">Abone Ol</button>
      <p class="form-msg small" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;
}

function footer() {
  return `${newsletterBand()}
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <a class="brand brand-foot" href="/"><img src="/img/logo-96.png" width="56" height="56" alt="${esc(site.name)} logosu" loading="lazy"><span class="brand-text"><strong>${esc(site.name)}</strong><small>${esc(site.slogan)}</small></span></a>
      <p class="muted">Sade, güvenilir ve kaynaklı İslami içerikler. Kalbe iyi gelen, hayata dokunan bilgiler.</p>
      <p class="social">${socialLinks()}</p>
    </div>
    <div><h2>Kategoriler</h2><ul>${categories.map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul></div>
    <div><h2>Keşfet</h2><ul>
      <li><a href="/yayinlar/">Yayınlarımız</a></li>
      <li><a href="/canli-yayin/">Canlı Yayın</a></li>
      <li><a href="/makaleler/">Tüm Makaleler</a></li>
      <li><a href="/kuran/">Kur'an-ı Kerim</a></li>
      <li><a href="/dualar/">Dualar</a></li>
      <li><a href="/kisa-sureler/">Namaz Sureleri</a></li>
      <li><a href="/soru-cevap/">Soru-Cevap</a></li>
      <li><a href="/sozluk/">Sözlük</a></li>
      <li><a href="/esmaul-husna/">Esmaül Hüsna</a></li></ul></div>
    <div><h2>Araçlar</h2><ul>
      <li><a href="/namaz-vakitleri/">Namaz Vakitleri</a></li>
      <li><a href="/ramazan-imsakiyesi/">Ramazan İmsakiyesi</a></li>
      <li><a href="/kible-pusulasi/">Kıble Pusulası</a></li>
      <li><a href="/dini-gunler-takvimi/">Dini Günler Takvimi</a></li>
      <li><a href="/zekat-hesaplama/">Zekât ve Fitre</a></li>
      <li><a href="/kaza-namazi-hesaplama/">Kaza Namazı</a></li>
      <li><a href="/hatim-takip/">Hatim Takip</a></li>
      <li><a href="/zikirmatik/">Zikirmatik</a></li></ul></div>
    <div><h2>Kurumsal</h2><ul>
      <li><a href="/hakkimizda/">Hakkımızda</a></li>
      <li><a href="/ekip/">Ekibimiz ve İlkeler</a></li>
      <li><a href="/soru-sor/">Soru Sor</a></li>
      <li><a href="/iletisim/">İletişim</a></li>
      <li><a href="/gizlilik-politikasi/">Gizlilik Politikası</a></li>
      <li><a href="/feed.xml">RSS</a></li>
      <li><a href="/sitemap.xml">Site Haritası</a></li></ul></div>
  </div>
  <div class="wrap footer-bottom">
    <p>© ${new Date().getFullYear()} ${esc(site.name)} – ${esc(site.slogan)}. Tüm hakları saklıdır.</p>
    <p class="muted small">Sitedeki bilgiler genel bilgilendirme amaçlıdır. Fıkhî konularda mezhepler arası farklılıklar olabilir; kesin hüküm için yetkili bir din görevlisine danışınız.</p>
  </div>
</footer>`;
}

function layout({ title, description, path: p, type = 'website', ld = [], body, noindex = false, current = p, scripts = [], ogType, published, modified, keywords }) {
  const fullTitle = title === site.title ? title : `${title} | ${site.name}`;
  const url = abs(p);
  const og = abs('/img/og-image.png');
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': abs('/#org'),
      name: site.name,
      alternateName: `${site.name} – ${site.slogan}`,
      slogan: site.slogan,
      url: abs('/'),
      logo: { '@type': 'ImageObject', url: abs('/img/logo-512.png'), width: 512, height: 512 },
      email: site.email,
      sameAs: Object.values(site.social).filter(Boolean),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': abs('/#website'),
      url: abs('/'),
      name: site.name,
      description: site.description,
      inLanguage: 'tr-TR',
      publisher: { '@id': abs('/#org') },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: abs('/ara/?q={search_term_string}') },
        'query-input': 'required name=search_term_string',
      },
    },
    ...ld,
  ];
  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${keywords ? `<meta name="keywords" content="${esc(keywords.join(', '))}">` : ''}
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="author" content="${esc(site.name)}">
${site.googleVerification ? `<meta name="google-site-verification" content="${esc(site.googleVerification)}">` : ''}
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:type" content="${ogType || type}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)} – ${esc(site.slogan)}">
${published ? `<meta property="article:published_time" content="${published}">\n<meta property="article:modified_time" content="${modified || published}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/img/favicon-48.png">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="alternate" type="application/rss+xml" title="${esc(site.name)} RSS" href="/feed.xml">
<script>try{var d=document.documentElement,t=localStorage.getItem('mec_theme'),f=localStorage.getItem('mec_fs');if(t==='dark'||(!t&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches))d.setAttribute('data-theme','dark');if(f)d.setAttribute('data-fs',f)}catch(e){}</script>
<link rel="stylesheet" href="/css/style.css?v=${V.css}">
${jsonld(graph.length === 1 ? graph[0] : graph)}
</head>
<body>
${header(current)}
<main id="icerik">
${body}
</main>
${footer()}
<script src="/js/main.js?v=${V.main}" defer></script>
${scripts.map((s) => `<script src="/js/${s}" defer></script>`).join('\n')}
</body>
</html>`;
}

const breadcrumbHtml = (items) =>
  `<nav class="breadcrumb" aria-label="Sayfa yolu"><ol>${items
    .map((it, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(it[1])}</li>`
        : `<li><a href="${it[0]}">${esc(it[1])}</a></li>`
    )
    .join('')}</ol></nav>`;

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it[1],
    item: abs(it[0]),
  })),
});

const faqLd = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const faqHtml = (faq, title = 'Sık Sorulan Sorular') =>
  faq && faq.length
    ? `<section class="faq" aria-labelledby="sss"><h2 id="sss">${title}</h2>${faq
        .map((f) => `<div class="faq-item"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`)
        .join('')}</section>`
    : '';

const card = (a) => `
<article class="card">
  <a class="card-link" href="${a.url}" aria-label="${esc(a.title)}">
    <div class="card-top"><span class="tag">${esc(a.cat.name)}</span></div>
    <h3>${esc(a.title)}</h3>
    <p>${esc(a.summary)}</p>
    <div class="meta"><time datetime="${a.date}">${fmtDate(a.date)}</time><span>${a.minutes} dk okuma</span></div>
  </a>
</article>`;

const sortedVideos = videos
  .map((v) => ({ ...v, slug: v.slug || slugify(v.title) }))
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const videoCard = (v, big = false) => `
<article class="vcard${big ? ' vcard-big' : ''}">
  <a class="vthumb" href="https://www.youtube.com/watch?v=${esc(v.id)}" data-id="${esc(v.id)}" data-title="${esc(v.title)}" target="_blank" rel="noopener" aria-label="${esc(v.title)} videosunu oynat">
    <img src="https://i.ytimg.com/vi/${esc(v.id)}/${big ? 'maxresdefault' : 'hqdefault'}.jpg" alt="${esc(v.title)}" width="480" height="360" loading="lazy">
    <span class="vplay">${icon.play}</span>
  </a>
  <div class="vbody">
    ${v.category ? `<span class="tag">${esc(v.category)}</span>` : ''}
    <h3>${esc(v.title)}</h3>
    ${v.description ? `<p>${esc(v.description)}</p>` : ''}
    ${v.date ? `<div class="meta"><time datetime="${v.date}">${fmtDate(v.date)}</time></div>` : ''}
    <a class="more" href="/yayinlar/${v.slug}/">Yayın sayfası${v.transcript ? ' ve metin' : ''} →</a>
  </div>
</article>`;
const videoLd = (v) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: v.title,
  description: v.description || v.title,
  thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
  uploadDate: v.date || today0(),
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
  publisher: { '@id': abs('/#org') },
});
function today0() { return new Date().toISOString().slice(0, 10); }
const studioFig = (file, alt, cap, cls = '') =>
  `<figure class="media ${cls}"><img src="/img/${file}" width="1024" height="576" alt="${esc(alt)}" loading="lazy" decoding="async">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;

// ------------------------------------------------------------------ SAYFALAR
const pages = []; // sitemap için {url, lastmod, priority, changefreq}
const addPage = (url, lastmod, priority = 0.6, changefreq = 'monthly') => pages.push({ url, lastmod, priority, changefreq });
const today = new Date().toISOString().slice(0, 10);

// ---- Anasayfa
{
  const feat = articles.slice(0, 6);
  const dayIdx = Math.floor(Date.now() / 86400000) % daily.length;
  const d0 = daily[dayIdx];
  const body = `
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-text">
      <p class="eyebrow">İslami İçerik ve Yayın Platformu</p>
      <h1>Sana İyi Gelen Her Şey<span>İslami İçerikler, İbadet Rehberi ve Özgün Yayınlar</span></h1>
      <p class="lead">Namaz, abdest, oruç, zekât, dualar, Kur'an-ı Kerim, siyer ve güzel ahlak üzerine sade, kaynaklı ve güvenilir içerikler; MEC stüdyosundan özgün yayınlar.</p>
      <p class="hero-links"><a class="btn" href="/yayinlar/">Yayınlarımız</a> <a class="btn btn-ghost" href="/makaleler/">Makaleleri Keşfet</a></p>
      <form class="hero-search" action="/ara/" method="get" role="search">
        <label class="sr" for="q-hero">Sitede ara</label>
        <input id="q-hero" name="q" type="search" placeholder="Sitede ara: namaz nasıl kılınır, kandil, zekât…" autocomplete="off">
        <button type="submit">Ara</button>
      </form>
    </div>
    <figure class="hero-media">
      <img src="/img/studio-masa.jpg" width="1024" height="576" alt="${esc(site.name)} yayın stüdyosu" fetchpriority="high">
      <span class="media-badge"><img src="/img/logo-96.png" width="56" height="56" alt="${esc(site.name)} logosu"></span>
    </figure>
  </div>
  <div class="trust"><div class="wrap trust-in">
    <div>${icon.shield}<strong>Kaynaklı İçerik</strong><span>Ayet ve hadisler kaynağıyla</span></div>
    <div>${icon.feather}<strong>Sade Anlatım</strong><span>Herkesin anlayacağı dil</span></div>
    <div>${icon.clock}<strong>Güncel Vakitler</strong><span>81 il için ezan vakitleri</span></div>
    <div>${icon.play}<strong>Özgün Yayınlar</strong><span>MEC stüdyosundan</span></div>
  </div></div>
</section>

<section class="wrap today" aria-label="Günün bilgileri">
  <div class="today-grid">
    <div class="panel daily" id="daily" data-items="${esc(JSON.stringify(daily))}">
      <p class="kicker"><span id="daily-type">${esc(d0.type)}</span> · Günün Sözü</p>
      <p class="ar" id="daily-ar" lang="ar" dir="rtl">${d0.ar}</p>
      <p class="tr" id="daily-tr">${esc(d0.tr)}</p>
      <p class="src" id="daily-src">${esc(d0.source)}</p>
    </div>
    <div class="panel prayer-widget" id="prayer-widget" data-mode="compact">
      <p class="kicker">Namaz Vakitleri <span class="dates"><span id="date-greg"></span> · <span id="date-hijri"></span></span></p>
      <div class="prayer-top">
        <label class="sr" for="city-compact">Şehir seçin</label>
        <select id="city-compact" class="city-select" aria-label="Şehir seçin"></select>
        <p class="next" id="prayer-next" aria-live="polite">Vakitler yükleniyor…</p>
      </div>
      <ul class="times" id="prayer-times"></ul>
      <p class="small"><a href="/namaz-vakitleri/">Tüm detaylar →</a></p>
      <noscript><p>Namaz vakitlerini görmek için JavaScript gereklidir. <a href="https://namazvakitleri.diyanet.gov.tr/" rel="noopener">Diyanet</a> sitesini ziyaret edebilirsiniz.</p></noscript>
    </div>
  </div>
</section>

<section class="wrap upcoming" aria-labelledby="yakin-baslik">
  <div class="section-head"><h2 id="yakin-baslik" class="section-title">Yaklaşan Dini Günler</h2><a href="/dini-gunler-takvimi/">Tüm takvim →</a></div>
  <ol class="upcoming-list" id="upcoming" data-limit="4"><li class="muted">Takvim yükleniyor…</li></ol>
  <noscript><p class="muted">Yaklaşan dinî günleri görmek için <a href="/dini-gunler-takvimi/">Dini Günler Takvimi</a> sayfasına bakın.</p></noscript>
</section>

<section class="wrap section" aria-labelledby="kat-baslik">
  <h2 id="kat-baslik" class="section-title">Konulara Göz Atın</h2>
  <div class="cat-grid">${categories
    .map(
      (c, i) => `<a class="cat-card" href="/${c.slug}/"><span class="cat-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${esc(c.name)}</h3><p>${esc(c.description)}</p><span class="more">Yazıları incele →</span></a>`
    )
    .join('')}</div>
</section>

<section class="wrap duo" aria-label="Kur'an, dualar ve sureler">
  <a class="duo-card" href="/kuran/"><p class="eyebrow dark">Kur'an-ı Kerim</p><h3>114 Sure: Arapça Metin ve Türkçe Meal</h3><p>Kur'an'ın tamamını ayet ayet okuyun; cüz başlangıçlarına tek tıkla ulaşın. Hatim ilerlemenizi takip edin.</p><span class="more">Kur'an oku →</span></a>
  <a class="duo-card" href="/soru-cevap/"><p class="eyebrow dark">Soru-Cevap ve Sözlük</p><h3>Sık Sorulan Dinî Sorular</h3><p>Namaz, abdest, oruç, zekât ve daha fazlası için kısa, kaynaklı cevaplar; ${sozluk.length} terimlik İslami sözlük.</p><span class="more">Sorulara göz at →</span></a>
  <a class="duo-card" href="/dualar/"><p class="eyebrow dark">Dua Koleksiyonu</p><h3>${dualar.length} Dua: Arapçası, Okunuşu ve Anlamı</h3><p>Günlük dualar, Kur'an'dan dualar, sıkıntı ve af duaları. Kolayca kopyalayıp paylaşın.</p><span class="more">Dualara git →</span></a>
  <a class="duo-card" href="/kisa-sureler/"><p class="eyebrow dark">Namaz Sureleri</p><h3>Fâtiha, İhlâs, Felak, Nâs ve Daha Fazlası</h3><p>Namazda okunan kısa surelerin Arapça yazılışı, Türkçe okunuşu ve meali; Âyetü'l-Kürsî dahil.</p><span class="more">Surelere git →</span></a>
</section>

<section class="studio-sec" aria-labelledby="yayin-baslik">
  <div class="wrap studio-in">
    ${studioFig('studio-genel.jpg', `${site.name} yayın stüdyosu genel görünüm`, '')}
    <div class="studio-text">
      <p class="eyebrow">Yayınlarımız</p>
      <h2 id="yayin-baslik">MEC Stüdyo'dan Özgün Yayınlar</h2>
      <p>Konuklarımızla yaptığımız sohbetler, söyleşiler ve programlar profesyonel stüdyomuzda kaydediliyor. İbadet, Kur'an, siyer ve manevi hayat üzerine yayınlarımıza buradan ulaşabilirsiniz.</p>
      <p><a class="btn" href="/yayinlar/">Tüm Yayınları Gör</a>${youtubeChannel ? ` <a class="btn btn-ghost-dark" href="${esc(youtubeChannel)}" target="_blank" rel="noopener">YouTube'da Abone Ol</a>` : ''}</p>
    </div>
  </div>
  ${sortedVideos.length ? `<div class="wrap vgrid-wrap"><div class="vgrid">${sortedVideos.slice(0, 3).map((v) => videoCard(v)).join('')}</div></div>` : ''}
</section>

<section class="wrap section" aria-labelledby="son-baslik">
  <div class="section-head"><h2 id="son-baslik" class="section-title">Son Eklenen Yazılar</h2><a href="/makaleler/">Tümünü gör →</a></div>
  <div class="grid">${feat.map(card).join('')}</div>
  <div class="topics"><h3>Sık Aranan Konular</h3><ul class="chips">${articles.map((a) => `<li><a href="${a.url}">${esc(a.keywords[0])}</a></li>`).join('')}<li><a href="/dualar/">kısa dualar</a></li><li><a href="/kisa-sureler/">fatiha suresi okunuşu</a></li><li><a href="/kible-pusulasi/">kıble yönü bulma</a></li></ul></div>
</section>

<section class="tools" aria-labelledby="arac-baslik">
  <div class="wrap">
    <h2 id="arac-baslik" class="section-title light">Günlük Hayatınıza Yardımcı Araçlar</h2>
    <div class="tool-grid">
      <a class="tool" href="/namaz-vakitleri/">${icon.clock}<h3>Namaz Vakitleri</h3><p>81 il için güncel ezan vakitleri ve bir sonraki vaktin geri sayımı.</p></a>
      <a class="tool" href="/esmaul-husna/">${icon.star}<h3>Esmaül Hüsna</h3><p>Allah'ın 99 güzel ismi; Arapçası, okunuşu ve anlamlarıyla.</p></a>
      <a class="tool" href="/kible-pusulasi/">${icon.compass}<h3>Kıble Pusulası</h3><p>Bulunduğunuz yerden Kâbe'nin yönünü derece ve pusula ile bulun.</p></a>
      <a class="tool" href="/dini-gunler-takvimi/">${icon.calendar}<h3>Dini Günler Takvimi</h3><p>Kandiller, bayramlar ve Ramazan'ın tarihleri; kalan gün sayısıyla.</p></a>
      <a class="tool" href="/ramazan-imsakiyesi/">${icon.clock}<h3>Ramazan İmsakiyesi</h3><p>81 il için sahur ve iftar vakitleri; yazdırılabilir günlük tablo.</p></a>
      <a class="tool" href="/zekat-hesaplama/">${icon.calendar}<h3>Zekât ve Fitre Hesaplama</h3><p>Nisap miktarını ve zekât tutarınızı birkaç adımda hesaplayın.</p></a>
      <a class="tool" href="/kaza-namazi-hesaplama/">${icon.shield}<h3>Kaza Namazı Hesaplama</h3><p>Namaz borcunuzu ve bitirme planınızı hesaplayın.</p></a>
      <a class="tool" href="/hatim-takip/">${icon.book}<h3>Hatim Takip</h3><p>Günlük okuma hedefinizi belirleyin, ilerlemenizi takip edin.</p></a>
      <a class="tool" href="/zikirmatik/">${icon.beads}<h3>Zikirmatik</h3><p>Dijital tesbih: hedef belirleyin, zikrinizi kolayca sayın.</p></a>
    </div>
  </div>
</section>

<section class="wrap section prose-block" aria-labelledby="hak-baslik">
  <h2 id="hak-baslik" class="section-title">${esc(site.name)} Nedir?</h2>
  <p><strong>${esc(site.name)}</strong>, "<em>${esc(site.slogan)}</em>" sloganıyla yola çıkan bir İslami içerik platformudur. Amacımız; ibadetlerin nasıl yapıldığını, ayet ve hadislerin ne anlattığını, Peygamber Efendimiz'in (s.a.v.) hayatını ve güzel ahlakı herkesin anlayabileceği sade bir dille, kaynaklarıyla birlikte sunmaktır.</p>
  <p>Sitemizde <a href="/ibadet/namaz-nasil-kilinir/">namaz nasıl kılınır</a>, <a href="/ibadet/abdest-nasil-alinir/">abdest nasıl alınır</a>, <a href="/ibadet/zekat-nedir-kimlere-verilir/">zekât kimlere verilir</a>, <a href="/dini-gunler/kandil-geceleri-ve-onemi/">kandil geceleri</a> ve <a href="/dua-ve-zikir/gunluk-zikirler-ve-dua-adabi/">günlük zikirler</a> gibi en çok merak edilen konuların yanı sıra namaz vakitleri, Esmaül Hüsna ve zikirmatik gibi pratik araçlar da bulabilirsiniz. İçeriklerimizi hazırlarken Kur'an-ı Kerim, sahih hadis kaynakları ve Diyanet İşleri Başkanlığı'nın yayınlarını esas alıyoruz. <a href="/hakkimizda/">Yayın ilkelerimizi</a> inceleyebilirsiniz.</p>
</section>`;
  write(
    'index.html',
    layout({
      title: site.title,
      description: site.description,
      path: '/',
      current: '/',
      body,
      ld: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: site.title,
          url: abs('/'),
          description: site.description,
          isPartOf: { '@id': abs('/#website') },
        },
      ],
      scripts: ['prayer.js', 'home.js', 'takvim.js', ...(sortedVideos.length ? ['yt.js'] : [])],
    })
  );
  addPage('/', today, 1.0, 'daily');
}

// ---- Yayınlar
{
  const crumbs = [['/', 'Anasayfa'], ['/yayinlar/', 'Yayınlar']];
  const desc = `${site.name} stüdyosundan özgün yayınlar: İslami sohbetler, söyleşiler ve programlar. Yeni yayınlardan haberdar olmak için takip edin.`;
  const [first, ...rest] = sortedVideos;
  const listing = sortedVideos.length
    ? `<section class="wrap section" aria-labelledby="son-yayin">
        <h2 id="son-yayin" class="section-title">Son Yayın</h2>
        ${videoCard(first, true)}
      </section>
      ${rest.length ? `<section class="wrap section" aria-labelledby="diger-yayin"><h2 id="diger-yayin" class="section-title">Diğer Yayınlar</h2><div class="vgrid">${rest.map((v) => videoCard(v)).join('')}</div></section>` : ''}`
    : `<section class="wrap section">
        <div class="coming">
          <p class="eyebrow dark">Çok Yakında</p>
          <h2>İlk Yayınlarımız Hazırlanıyor</h2>
          <p>MEC stüdyosunda kaydedilen programlar, sohbetler ve söyleşiler burada yayınlanacak. Yeni yayınlardan haberdar olmak için bizi takip edin; bu arada yazılarımıza göz atabilirsiniz.</p>
          <p><a class="btn" href="/makaleler/">Makalelere Göz At</a>${youtubeChannel ? ` <a class="btn btn-ghost-dark" href="${esc(youtubeChannel)}" target="_blank" rel="noopener">YouTube Kanalımız</a>` : ''}</p>
        </div>
      </section>`;
  const body = `
<div class="page-hero">
  <div class="wrap page-hero-in">
    <div>
      ${breadcrumbHtml(crumbs)}
      <p class="eyebrow">MEC Yayınları</p>
      <h1>Yayınlarımız</h1>
      <p class="lead">Profesyonel stüdyomuzda hazırlanan programlar, sohbetler ve söyleşiler. İslami değerleri sade, saygılı ve güvenilir bir dille sizlerle buluşturuyoruz.</p>
      ${youtubeChannel ? `<p><a class="btn" href="${esc(youtubeChannel)}" target="_blank" rel="noopener">YouTube'da Abone Ol</a></p>` : ''}
    </div>
    ${studioFig('studio-genel.jpg', `${site.name} yayın stüdyosu`, 'MEC Stüdyo', 'on-dark')}
  </div>
</div>
${listing}
<section class="wrap section" aria-labelledby="studyo">
  <div class="split">
    ${studioFig('studio-masa.jpg', `${site.name} stüdyosunda sunucu masası ve mikrofon`, 'Sunucu masası')}
    <div>
      <p class="eyebrow dark">Stüdyomuz</p>
      <h2 id="studyo">Kaliteli Yayın İçin Profesyonel Ortam</h2>
      <p>Özenle tasarlanmış stüdyomuzda; profesyonel mikrofonlar ve aydınlatma ile yayınlarımızı kayda alıyoruz. Konuklarımızı ağırladığımız sohbet köşesi ve sunucu masamızla izleyicilerimize rahat, samimi ve nitelikli bir yayın deneyimi sunmayı amaçlıyoruz.</p>
      <h3>Yayın Konularımız</h3>
      <ul class="check">
        ${categories.map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
  write(
    'yayinlar/index.html',
    layout({
      title: 'Yayınlarımız: MEC Stüdyo Programları, Sohbetler ve Söyleşiler',
      description: desc,
      path: '/yayinlar/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Yayınlarımız', url: abs('/yayinlar/'), description: desc },
        ...sortedVideos.map(videoLd),
      ],
      scripts: sortedVideos.length ? ['yt.js'] : [],
    })
  );
  addPage('/yayinlar/', today, 0.9, 'weekly');
}

// ---- Makaleler listesi
{
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml([['/', 'Anasayfa'], ['/makaleler/', 'Makaleler']])}
  <h1>Tüm Makaleler</h1>
  <p class="lead">İbadet, Kur'an-ı Kerim, dua ve zikir, siyer, ahlak ve dinî günler hakkında hazırladığımız tüm yazılar.</p>
  <ul class="chips">${categories.map((c) => `<li><a href="/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul>
</div>
<div class="wrap section"><div class="grid">${articles.map(card).join('')}</div></div>`;
  const crumbs = [['/', 'Anasayfa'], ['/makaleler/', 'Makaleler']];
  write(
    'makaleler/index.html',
    layout({
      title: 'İslami Makaleler: İbadet, Dua, Siyer ve Ahlak Yazıları',
      description: 'Namaz, abdest, zekât, oruç, kandiller, dualar, zikirler, siyer ve güzel ahlak üzerine kaynaklı İslami makaleler.',
      path: '/makaleler/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(a.url), name: a.title })),
        },
      ],
    })
  );
  addPage('/makaleler/', today, 0.9, 'weekly');
}

// ---- Kategori sayfaları
for (const c of categories) {
  const list = articles.filter((a) => a.category === c.slug);
  const crumbs = [['/', 'Anasayfa'], ['/makaleler/', 'Makaleler'], [`/${c.slug}/`, c.name]];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>${esc(c.name)}</h1>
  <p class="lead">${esc(c.intro)}</p>
</div>
<div class="wrap section"><div class="grid">${list.map(card).join('')}</div></div>`;
  write(
    `${c.slug}/index.html`,
    layout({
      title: `${c.name} Yazıları ve Rehberleri`,
      description: c.description,
      path: `/${c.slug}/`,
      body,
      ld: [
        breadcrumbLd(crumbs),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: c.name,
          description: c.description,
          url: abs(`/${c.slug}/`),
        },
      ],
    })
  );
  addPage(`/${c.slug}/`, list[0]?.updated || today, 0.8, 'weekly');
}

// ---- Makale sayfaları
for (const a of articles) {
  const crumbs = [['/', 'Anasayfa'], [`/${a.cat.slug}/`, a.cat.name], [a.url, a.title]];
  const related = [...articles.filter((x) => x.slug !== a.slug && x.category === a.category), ...articles.filter((x) => x.slug !== a.slug && x.category !== a.category)].slice(0, 3);
  const shareUrl = encodeURIComponent(abs(a.url));
  const shareTitle = encodeURIComponent(a.title);
  const body = `
<div class="wrap article-wrap">
  ${breadcrumbHtml(crumbs)}
  <article class="article" itemscope itemtype="https://schema.org/Article">
    <header class="article-head">
      <a class="tag" href="/${a.cat.slug}/">${esc(a.cat.name)}</a>
      <h1 itemprop="headline">${esc(a.title)}</h1>
      <p class="lead">${esc(a.description)}</p>
      <p class="meta">
        <span>Yayın: <time datetime="${a.date}" itemprop="datePublished">${fmtDate(a.date)}</time></span>
        ${a.updated !== a.date ? `<span>Güncelleme: <time datetime="${a.updated}" itemprop="dateModified">${fmtDate(a.updated)}</time></span>` : ''}
        <span>${a.minutes} dk okuma</span>
      </p>
    </header>
    ${a.toc.length >= 3 ? `<nav class="toc" aria-label="İçindekiler"><strong>İçindekiler</strong><ol>${a.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol></nav>` : ''}
    <div class="prose" itemprop="articleBody">${a.body}</div>
    ${faqHtml(a.faq)}
    ${a.sources?.length ? `<section class="sources"><h2>Kaynaklar</h2><ul>${a.sources.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>` : ''}
    <div class="share"><strong>Paylaş:</strong>
      <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" rel="noopener nofollow">WhatsApp</a>
      <a href="https://t.me/share/url?url=${shareUrl}&text=${shareTitle}" target="_blank" rel="noopener nofollow">Telegram</a>
      <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}" target="_blank" rel="noopener nofollow">X</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener nofollow">Facebook</a>
    </div>
    <p class="note small">Bu yazıdaki bilgiler genel bilgilendirme amaçlıdır. Fıkhî hükümlerde mezhepler arası farklılıklar olabilir; kesin bilgi için yetkili bir din görevlisine danışınız.</p>
  </article>
  <section class="related" aria-labelledby="ilgili"><h2 id="ilgili" class="section-title">İlginizi Çekebilir</h2><div class="grid">${related.map(card).join('')}</div></section>
</div>`;
  write(
    `${a.category}/${a.slug}/index.html`,
    layout({
      title: a.title,
      description: a.description,
      path: a.url,
      type: 'article',
      published: a.date,
      modified: a.updated,
      keywords: a.keywords,
      current: '/makaleler/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.description,
          image: [abs('/img/og-image.png')],
          datePublished: a.date,
          dateModified: a.updated,
          inLanguage: 'tr-TR',
          keywords: a.keywords.join(', '),
          articleSection: a.cat.name,
          mainEntityOfPage: { '@type': 'WebPage', '@id': abs(a.url) },
          author: { '@type': 'Organization', name: site.name, url: abs('/') },
          publisher: { '@id': abs('/#org') },
        },
        ...(a.faq?.length ? [faqLd(a.faq)] : []),
      ],
    })
  );
  addPage(a.url, a.updated, 0.9, 'monthly');
}

// ---- Namaz Vakitleri
{
  const faq = [
    { q: 'Namaz vakitleri nasıl hesaplanır?', a: 'Namaz vakitleri güneşin gökyüzündeki konumuna göre hesaplanır: imsak (fecr-i sadık), güneş, öğle, ikindi, akşam (güneşin batışı) ve yatsı. Bu sayfadaki vakitler Diyanet İşleri Başkanlığı hesaplama yöntemine göre alınır.' },
    { q: 'İmsak ile sabah ezanı arasındaki fark nedir?', a: 'İmsak, fecr-i sadığın (gerçek tan yeri ağarmasının) başladığı, orucun başladığı vakittir. Sabah ezanı ve sabah namazı imsakla birlikte başlar ve güneş doğana kadar devam eder.' },
    { q: 'Kerahat vakitleri nelerdir?', a: 'Güneşin doğuşu, tam tepede olduğu zaman ve batışı sırasındaki kısa zaman dilimleri nafile namaz kılmanın mekruh olduğu kerahat vaktidir.' },
    { q: 'Vakitler tam doğru mu?', a: 'Vakitler hesaplama yöntemiyle alınır ve bölgesel farklılıklar oluşabilir. Kesin vakitler için bulunduğunuz yerin Diyanet takvimine ve camilerin ezan saatlerine bakmanız önerilir.' },
  ];
  const crumbs = [['/', 'Anasayfa'], ['/namaz-vakitleri/', 'Namaz Vakitleri']];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Namaz Vakitleri</h1>
  <p class="lead">81 il için bugünün imsak, güneş, öğle, ikindi, akşam ve yatsı vakitleri. Şehrinizi seçin; seçiminiz bu cihazda hatırlanır.</p>
</div>
<div class="wrap section">
  <div class="panel prayer-widget big" id="prayer-widget" data-mode="full">
    <div class="prayer-top">
      <label for="city-full"><strong>Şehir:</strong></label>
      <select id="city-full" class="city-select"></select>
      <p class="dates"><span id="date-greg"></span> · <span id="date-hijri"></span></p>
    </div>
    <p class="next big-next" id="prayer-next" aria-live="polite">Vakitler yükleniyor…</p>
    <ul class="times" id="prayer-times"></ul>
    <p class="small muted">Vakitler Diyanet İşleri Başkanlığı hesaplama yöntemine göre Aladhan servisinden alınır. Kesin vakitler için yerel Diyanet takvimini esas alınız.</p>
    <noscript><p>Namaz vakitlerini görmek için JavaScript gereklidir. <a href="https://namazvakitleri.diyanet.gov.tr/" rel="noopener">Diyanet Namaz Vakitleri</a> sayfasını ziyaret edebilirsiniz.</p></noscript>
  </div>

  <div class="prose prose-block">
    <h2>Beş Vakit Namaz ve Vakit Aralıkları</h2>
    <ul>
      <li><strong>Sabah (İmsak):</strong> Fecr-i sadığın doğuşundan güneşin doğuşuna kadar.</li>
      <li><strong>Öğle:</strong> Güneşin tepe noktasını geçmesinden ikindi vaktine kadar.</li>
      <li><strong>İkindi:</strong> Öğle vaktinin çıkmasından güneş batışına yakın kerahat vaktine kadar.</li>
      <li><strong>Akşam:</strong> Güneşin batışından kızıllığın kaybolmasına (şafak) kadar.</li>
      <li><strong>Yatsı:</strong> Akşam vaktinin bitiminden imsaka kadar.</li>
    </ul>
    <p>Namazın nasıl kılındığını öğrenmek için <a href="/ibadet/namaz-nasil-kilinir/">Namaz Nasıl Kılınır?</a> yazımıza, abdest için <a href="/ibadet/abdest-nasil-alinir/">Abdest Nasıl Alınır?</a> rehberimize göz atabilirsiniz.</p>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'namaz-vakitleri/index.html',
    layout({
      title: 'Namaz Vakitleri: 81 İl İçin Bugünün İmsak, Öğle, İkindi, Akşam ve Yatsı Vakitleri',
      description: 'Bugünün namaz vakitleri: 81 il için imsak, güneş, öğle, ikindi, akşam ve yatsı saatleri. Bir sonraki vaktin geri sayımı ve hicrî tarih.',
      path: '/namaz-vakitleri/',
      body,
      ld: [breadcrumbLd(crumbs), faqLd(faq)],
      scripts: ['prayer.js'],
    })
  );
  addPage('/namaz-vakitleri/', today, 0.9, 'daily');
}

// ---- Esmaül Hüsna
{
  const faq = [
    { q: 'Esmaül Hüsna nedir?', a: 'Esmaül Hüsna, "Allah\'ın en güzel isimleri" anlamına gelir. Kur\'an-ı Kerim\'de "En güzel isimler Allah\'ındır, O\'na o isimlerle dua edin" (A\'râf, 180) buyrulur.' },
    { q: 'Esmaül Hüsna kaç isimdir?', a: 'Hadis-i şerifte Allah\'ın doksan dokuz ismi olduğu bildirilmiştir (Buhârî, Müslim). Allah lafzı bunlara ek olarak zâtın özel adıdır.' },
    { q: 'Esmaül Hüsna ezberlemenin fazileti nedir?', a: 'Peygamberimiz (s.a.v.), "Allah\'ın doksan dokuz ismi vardır; kim bunları (anlayarak, inanarak ve gereğini yaparak) sayarsa cennete girer" buyurmuştur (Buhârî, Müslim).' },
  ];
  const crumbs = [['/', 'Anasayfa'], ['/esmaul-husna/', 'Esmaül Hüsna']];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Esmaül Hüsna: Allah'ın 99 Güzel İsmi ve Anlamları</h1>
  <p class="lead">Allah Teâlâ'nın en güzel isimleri; Arapçası, okunuşu ve kısa anlamlarıyla.</p>
  <blockquote class="verse"><p class="ar" lang="ar" dir="rtl">وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا</p><p class="tr">En güzel isimler Allah'ındır; O'na o isimlerle dua edin.</p><cite>A'râf suresi, 180. ayet</cite></blockquote>
</div>
<div class="wrap section">
  <div class="esma-tools">
    <label class="sr" for="esma-q">Esmaül Hüsna'da ara</label>
    <input id="esma-q" type="search" placeholder="İsim veya anlam ara… (örn: rızık, bağışlayan)" autocomplete="off">
    <p class="small muted" id="esma-count">${esma.length} isim</p>
  </div>
  <div class="esma-grid" id="esma-grid">
    <article class="esma-card allah"><span class="n">☪</span><p class="ar" lang="ar" dir="rtl">اللَّهُ</p><h2>Allah</h2><p>Zâtın özel adı; bütün güzel isim ve sıfatları kendinde toplayan, tek ilah.</p></article>
    ${esma
      .map(
        ([ar, name, meaning], i) =>
          `<article class="esma-card" data-s="${esc((name + ' ' + meaning).toLowerCase())}"><span class="n">${i + 1}</span><p class="ar" lang="ar" dir="rtl">${ar}</p><h2>${esc(name)}</h2><p>${esc(meaning)}</p></article>`
      )
      .join('')}
  </div>
  <div class="prose prose-block">
    <h2>Esmaül Hüsna Hakkında</h2>
    <p>Esmaül Hüsna, Allah'ı tanımanın ve O'na yaklaşmanın en güzel yollarından biridir. Her bir isim, Allah'ın bir sıfatını ve kullarına olan bir tecellisini ifade eder. Bu isimleri öğrenmek, onların anlamlarını düşünmek ve Allah'a bu isimlerle dua etmek müminin kalbini nurlandırır.</p>
    <p>Rivayetlerde isimlerin sayısı ve sıralamasında bazı farklılıklar bulunmaktadır; burada Türkiye'de yaygın olan liste esas alınmıştır. Günlük zikrinizde bu isimleri sayabilmek için <a href="/zikirmatik/">Zikirmatik</a> sayfamızı kullanabilirsiniz.</p>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'esmaul-husna/index.html',
    layout({
      title: 'Esmaül Hüsna: Allah\'ın 99 İsmi, Arapçası, Okunuşu ve Anlamları',
      description: 'Esmaül Hüsna: Allah\'ın 99 güzel ismi Arapça yazılışı, okunuşu ve anlamlarıyla. İsim veya anlam arayarak kolayca bulun.',
      path: '/esmaul-husna/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        faqLd(faq),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Esmaül Hüsna',
          numberOfItems: esma.length,
          itemListElement: esma.map(([, n, m], i) => ({ '@type': 'ListItem', position: i + 1, name: n, description: m })),
        },
      ],
      scripts: ['esma.js'],
    })
  );
  addPage('/esmaul-husna/', today, 0.8, 'monthly');
}

// ---- Zikirmatik
{
  const faq = [
    { q: 'Zikirmatik nasıl kullanılır?', a: 'Büyük daireye dokunarak sayacı artırın. Hedef seçerseniz hedefe ulaşınca cihaz titrer. Sayınız tarayıcınızda saklanır; sıfırlamak için "Sıfırla" düğmesine basın.' },
    { q: 'Tesbih kaç çekilir?', a: 'Namaz sonrası tesbihatta 33 Sübhânallah, 33 Elhamdülillah ve 33 (veya 34) Allâhü ekber söylenir. Diğer zikirlerde sayı serbesttir.' },
  ];
  const crumbs = [['/', 'Anasayfa'], ['/zikirmatik/', 'Zikirmatik']];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Zikirmatik: Online Dijital Tesbih</h1>
  <p class="lead">Zikrinizi kolayca sayın. Hedef seçin, daireye dokunun; sayınız bu cihazda saklanır.</p>
</div>
<div class="wrap section">
  <div class="zikir-app" id="zikir-app">
    <div class="zikir-select">
      <label for="zikir-name">Zikir:</label>
      <select id="zikir-name">
        <option>Sübhânallah</option><option>Elhamdülillah</option><option>Allâhü ekber</option>
        <option>Lâ ilâhe illallah</option><option>Estağfirullah</option><option>Salavat-ı Şerife</option>
        <option>Lâ havle ve lâ kuvvete illâ billâh</option><option>Serbest zikir</option>
      </select>
      <label for="zikir-target">Hedef:</label>
      <select id="zikir-target"><option value="33">33</option><option value="99">99</option><option value="100">100</option><option value="500">500</option><option value="1000">1000</option><option value="0">Sınırsız</option></select>
    </div>
    <button class="zikir-btn" id="zikir-btn" aria-label="Zikir sayısını artır"><span id="zikir-count">0</span><small id="zikir-sub">dokun</small></button>
    <div class="zikir-actions"><button id="zikir-reset" class="btn btn-ghost">Sıfırla</button><button id="zikir-undo" class="btn btn-ghost">Geri al</button></div>
    <p class="small muted">Toplam bugünkü zikir: <strong id="zikir-total">0</strong></p>
  </div>
  <div class="prose prose-block">
    <h2>Zikrin Önemi</h2>
    <p>Zikir, kalbin huzuru ve Allah ile bağın canlı kalması için en kolay ibadetlerden biridir. Detaylı bilgi, namaz sonrası tesbihat ve duanın adabı için <a href="/dua-ve-zikir/gunluk-zikirler-ve-dua-adabi/">Günlük Zikirler ve Dua Adabı</a> yazımızı okuyabilirsiniz.</p>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'zikirmatik/index.html',
    layout({
      title: 'Zikirmatik: Online Dijital Tesbih ve Zikir Sayacı',
      description: 'Ücretsiz online zikirmatik: Sübhânallah, Elhamdülillah, Allâhü ekber ve diğer zikirler için dijital tesbih. Hedef belirleyin, kolayca sayın.',
      path: '/zikirmatik/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        faqLd(faq),
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'MEC Zikirmatik',
          url: abs('/zikirmatik/'),
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
        },
      ],
      scripts: ['zikirmatik.js'],
    })
  );
  addPage('/zikirmatik/', today, 0.7, 'monthly');
}

// ---- Dualar
{
  const crumbs = [['/', 'Anasayfa'], ['/dualar/', 'Dualar']];
  const faq = [
    { q: 'Dua nasıl yapılır?', a: 'Allah\'a hamd ve Peygamber Efendimize salavat ile başlanır, ihtiyaçlar kalpten ve ümitle istenir, dua "âmin" ile bitirilir. Dua Türkçe veya Arapça, kişinin kendi diliyle yapılabilir.' },
    { q: 'Kur\'an\'daki dualar neden önemlidir?', a: 'Kur\'an\'da geçen dualar, peygamberlerin ve salih kulların Allah\'a nasıl yöneldiğini gösterir. Bu dualar hem anlam hem de ifade bakımından en güzel dua örnekleridir.' },
    { q: 'Dua okurken abdest gerekir mi?', a: 'Dua için abdest şart değildir; ancak abdestli, temiz ve kıbleye dönük olarak dua etmek daha güzeldir.' },
  ];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Dualar: Arapça Yazılışı, Okunuşu ve Anlamı</h1>
  <p class="lead">Günlük hayatta ve zor zamanlarda okunabilecek ${dualar.length} dua; Arapçası, Türkçe okunuşu, anlamı ve kaynağıyla.</p>
  <div class="filters" role="group" aria-label="Dua grupları">
    <button type="button" class="chip is-on" data-g="">Tümü (${dualar.length})</button>
    ${duaGruplari.map((g) => `<button type="button" class="chip" data-g="${esc(g)}">${esc(g)} (${dualar.filter((d) => d.grup === g).length})</button>`).join('')}
  </div>
</div>
<div class="wrap section">
  <div class="dua-list" id="dua-list">
    ${dualar
      .map(
        (d) => `<article class="dua" id="${d.id}" data-g="${esc(d.grup)}">
      <header><span class="tag">${esc(d.grup)}</span><h2>${esc(d.baslik)}</h2></header>
      <p class="ar" lang="ar" dir="rtl">${d.ar}</p>
      <p class="okunus"><strong>Okunuşu:</strong> ${esc(d.okunus)}</p>
      <p class="anlam"><strong>Anlamı:</strong> ${esc(d.anlam)}</p>
      <footer><cite>${esc(d.kaynak)}</cite>
        <button type="button" class="copy" data-copy="${esc(`${d.baslik}\n${d.ar}\n${d.okunus}\n${d.anlam} (${d.kaynak})\n${abs('/dualar/#' + d.id)}`)}">Kopyala</button>
        <a class="perma" href="#${d.id}" aria-label="${esc(d.baslik)} bağlantısı">#</a></footer>
    </article>`
      )
      .join('')}
  </div>
  <div class="prose prose-block">
    <h2>Dua Hakkında</h2>
    <p>Dua, kulun Rabbine yönelişi ve O'ndan istemesidir. Allah Teâlâ, "Bana dua edin, size icabet edeyim" buyurmuştur (Mü'min, 60). Dua adabı, zikir ve günlük tesbihat hakkında ayrıntılı bilgi için <a href="/dua-ve-zikir/gunluk-zikirler-ve-dua-adabi/">Günlük Zikirler ve Dua Adabı</a> yazımızı okuyabilirsiniz. Zikrinizi saymak için <a href="/zikirmatik/">Zikirmatik</a>'i kullanabilirsiniz.</p>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'dualar/index.html',
    layout({
      title: 'Dualar: Günlük, Kur\'an\'dan ve Sıkıntı Duaları (Arapça, Okunuş, Anlam)',
      description: `${dualar.length} dua Arapça yazılışı, Türkçe okunuşu, anlamı ve kaynağıyla: yemek duası, uyku duası, Rabbenâ duaları, sıkıntı ve af duaları.`,
      path: '/dualar/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        faqLd(faq),
        { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Dualar', numberOfItems: dualar.length, itemListElement: dualar.map((d, i) => ({ '@type': 'ListItem', position: i + 1, name: d.baslik, url: abs('/dualar/#' + d.id) })) },
      ],
      scripts: ['dualar.js'],
    })
  );
  addPage('/dualar/', today, 0.9, 'monthly');
}

// ---- Kısa sureler
{
  const crumbs = [['/', 'Anasayfa'], ['/kisa-sureler/', 'Namaz Sureleri']];
  const faq = [
    { q: 'Namazda Fâtiha\'dan sonra hangi sure okunur?', a: 'Farz namazların ilk iki rekâtında Fâtiha\'dan sonra Kur\'an\'dan bir sure veya en az üç kısa ayet okunur. Yaygın olarak Kevser, İhlâs, Nasr, Asr gibi kısa sureler okunur.' },
    { q: 'Namaz sureleri hangileridir?', a: 'Namazda en çok okunan sureler Fâtiha, Fîl\'den Nâs\'a kadar olan kısa surelerdir. Bu sayfada Fâtiha, Asr, Kevser, Kâfirûn, Nasr, İhlâs, Felak, Nâs ve Âyetü\'l-Kürsî yer almaktadır.' },
    { q: 'Muavvizeteyn nedir?', a: 'Felak ve Nâs surelerine birlikte "Muavvizeteyn" (iki sığınma suresi) denir. Peygamberimiz bu sureleri yatmadan önce okurdu.' },
  ];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Namaz Sureleri: Fâtiha, İhlâs, Felak, Nâs ve Kısa Sureler</h1>
  <p class="lead">Namazda ve günlük hayatta en çok okunan sureler; ayet ayet Arapça yazılışı, Türkçe okunuşu ve meali.</p>
  <ul class="chips">${sureler.map((s) => `<li><a href="#${s.slug}">${esc(s.ad)}</a></li>`).join('')}</ul>
</div>
<div class="wrap section">
  ${sureler
    .map(
      (s) => `<section class="sure" id="${s.slug}" aria-labelledby="h-${s.slug}">
    <header class="sure-head"><h2 id="h-${s.slug}">${esc(s.baslik || s.ad)}</h2><p class="muted small">${s.slug === 'ayetel-kursi' ? 'Bakara suresi, 255. ayet' : `Kur'an'daki sırası: ${s.no} · ${s.ayet} ayet`}</p></header>
    <p>${esc(s.giris)}</p>
    <div class="ayahs">
      ${s.ayetler
        .map(
          (a, i) => `<div class="ayah"><span class="no">${s.ayetler.length > 1 ? i + 1 : ''}</span><div>
        <p class="ar" lang="ar" dir="rtl">${a[0]}</p>
        <p class="okunus">${esc(a[1])}</p>
        <p class="meal">${esc(a[2])}</p></div></div>`
        )
        .join('')}
    </div>
  </section>`
    )
    .join('')}
  <div class="prose prose-block">
    <h2>Namaz Sureleri Hakkında</h2>
    <p>Namazda, her rekâtta Fâtiha suresi okunur; farz namazların ilk iki rekâtında ve vitir ile sünnet-nafile namazların her rekâtında Fâtiha'dan sonra bir sure veya birkaç ayet eklenir. Surelerin anlamını öğrenmek, namazda huşûyu artırır. Namazın kılınışı için <a href="/ibadet/namaz-nasil-kilinir/">Namaz Nasıl Kılınır?</a> yazımıza, Kur'an okuma adabı için <a href="/kuran-i-kerim/kuran-okuma-adabi-ve-hatim/">Kur'an Okuma Adabı ve Hatim</a> rehberimize bakabilirsiniz.</p>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'kisa-sureler/index.html',
    layout({
      title: 'Namaz Sureleri: Fâtiha, İhlâs, Felak, Nâs, Kevser ve Âyetü\'l-Kürsî (Arapça, Okunuş, Meal)',
      description: 'Namazda okunan kısa sureler: Fâtiha, Asr, Kevser, Kâfirûn, Nasr, İhlâs, Felak, Nâs ve Âyetü\'l-Kürsî. Arapça yazılışı, Türkçe okunuşu ve meali.',
      path: '/kisa-sureler/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        faqLd(faq),
        { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Namaz Sureleri', numberOfItems: sureler.length, itemListElement: sureler.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.baslik || s.ad, url: abs('/kisa-sureler/#' + s.slug) })) },
      ],
    })
  );
  addPage('/kisa-sureler/', today, 0.9, 'monthly');
}

// ---- Kıble pusulası
{
  const crumbs = [['/', 'Anasayfa'], ['/kible-pusulasi/', 'Kıble Pusulası']];
  const dirName = (deg) => ['kuzey', 'kuzeydoğu', 'doğu', 'güneydoğu', 'güney', 'güneybatı', 'batı', 'kuzeybatı'][Math.round(deg / 45) % 8];
  const rows = cities.map(([n, la, lo]) => ({ n, ...qibla(la, lo) }));
  const faq = [
    { q: 'Kıble nedir?', a: 'Kıble, Müslümanların namazda yöneldiği Mekke\'deki Kâbe\'nin bulunduğu yöndür. Namaz kılarken kıbleye dönmek namazın şartlarındandır.' },
    { q: 'Türkiye\'de kıble hangi yöndedir?', a: 'Türkiye\'de kıble batı illerinde güneydoğu, doğu illerinde güney (güney-güneybatıya yakın) yönündedir. Şehre göre kuzeyden saat yönünde yaklaşık 140° ile 195° arasında değişir.' },
    { q: 'Kıble pusulası ne kadar doğrudur?', a: 'Hesaplama büyük daire (en kısa yol) yöntemiyle yapılır ve doğrudur. Telefon pusulası ise manyetik etkilerden ve sensör kalitesinden etkilenebilir; metal eşyalardan uzak durup cihazı yatay tutmanız önerilir.' },
    { q: 'Kıble yönü nasıl bulunur?', a: 'Bu sayfada konumunuzu paylaşarak ya da şehrinizi seçerek kıble açısını görebilirsiniz. Cep telefonunuzun pusulasını kullanarak, ekrandaki Kâbe işareti en üstte hizalandığında kıbleye dönmüş olursunuz.' },
  ];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Kıble Pusulası: Bulunduğunuz Yerden Kıble Yönü</h1>
  <p class="lead">Konumunuzu kullanın veya şehrinizi seçin; Kâbe'nin yönünü derece olarak görün ve telefonunuzun pusulasıyla kıbleyi bulun.</p>
</div>
<div class="wrap section">
  <div class="kible-app" id="kible-app" data-cities="${esc(JSON.stringify(cities))}">
    <div class="compass" id="compass" aria-hidden="true">
      <div class="pointer"></div>
      <div class="dial" id="dial">
        <span class="mk n">K</span><span class="mk e">D</span><span class="mk s">G</span><span class="mk w">B</span>
        <div class="kaaba" id="kaaba"><svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="#111"/><rect x="3" y="8" width="18" height="2.6" fill="#d4a85a"/></svg></div>
      </div>
    </div>
    <p class="kible-deg" id="kible-deg">—</p>
    <p class="kible-info" id="kible-info" aria-live="polite">Başlamak için konumunuzu kullanın veya şehir seçin.</p>
    <div class="kible-controls">
      <button type="button" class="btn" id="kible-geo">Konumumu Kullan</button>
      <label class="sr" for="kible-city">Şehir seçin</label>
      <select id="kible-city" class="city-select"><option value="">Şehir seçin…</option>${cities.map((c, i) => `<option value="${i}">${esc(c[0])}</option>`).join('')}</select>
      <button type="button" class="btn btn-ghost-dark" id="kible-start" hidden>Pusulayı Başlat</button>
    </div>
    <p class="small muted" id="kible-note">Pusula, cihazınızın sensörünü kullanır. Konum bilgisi yalnızca tarayıcınızda işlenir, sunucuya gönderilmez.</p>
  </div>
  <div class="prose prose-block">
    <h2>Kıble Nasıl Bulunur?</h2>
    <ol>
      <li>"Konumumu Kullan" düğmesine basıp izin verin veya listeden şehrinizi seçin.</li>
      <li>Ekranda kuzeyden saat yönünde kıble açısı gösterilir.</li>
      <li>Telefonunuzda pusula varsa "Pusulayı Başlat"a dokunun; cihazı yatay tutarak döndürün. Kâbe işareti üstteki ok ile hizalandığında kıbleye dönmüş olursunuz.</li>
    </ol>
    <p>Pusula manyetik alandan etkilenir. Doğru sonuç için metal eşya, hoparlör ve elektronik cihazlardan uzak durun. Camilerde mihrap kıble yönünü gösterir.</p>
    <h2>81 İl İçin Kıble Açısı</h2>
    <p>Aşağıdaki tabloda her ilin merkezinden Kâbe'ye olan yön (kuzeyden saat yönünde derece) ve yaklaşık mesafe verilmiştir.</p>
    <div class="table-wrap"><table>
      <thead><tr><th>İl</th><th>Kıble Açısı</th><th>Yön</th><th>Mesafe (km)</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${esc(r.n)}</td><td>${r.bearing.toFixed(1)}°</td><td>${dirName(r.bearing)}</td><td>${Math.round(r.km).toLocaleString('tr-TR')}</td></tr>`).join('')}</tbody>
    </table></div>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'kible-pusulasi/index.html',
    layout({
      title: 'Kıble Pusulası: Kıble Yönü Bulma ve 81 İl İçin Kıble Açısı',
      description: 'Online kıble pusulası: konumunuza göre kıble yönünü derece olarak bulun. 81 il için kıble açısı tablosu ve telefon pusulası ile kıble bulma rehberi.',
      path: '/kible-pusulasi/',
      body,
      ld: [
        breadcrumbLd(crumbs),
        faqLd(faq),
        { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'MEC Kıble Pusulası', url: abs('/kible-pusulasi/'), applicationCategory: 'LifestyleApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' } },
      ],
      scripts: ['kible.js'],
    })
  );
  addPage('/kible-pusulasi/', today, 0.8, 'monthly');
}

// ---- Dini günler takvimi
{
  const crumbs = [['/', 'Anasayfa'], ['/dini-gunler-takvimi/', 'Dini Günler Takvimi']];
  const aciklama = [
    ['Hicri Yılbaşı (1 Muharrem)', 'Hicri takvimin ilk günüdür. Hicret olayını hatırlatır ve yeni bir yıla Allah\'a dua ile girilir.'],
    ['Aşure Günü (10 Muharrem)', 'Muharrem ayının onuncu günüdür. Oruç tutmak sünnettir; aşure tatlısı yapıp paylaşmak yaygın bir gelenektir.'],
    ['Mevlid Kandili (12 Rebiülevvel)', 'Peygamber Efendimiz\'in (s.a.v.) doğumu anılır; salavat ve siyer okumasıyla değerlendirilir.'],
    ['Üç Aylar ve Regaib Kandili', 'Recep, Şaban ve Ramazan aylarına "üç aylar" denir. Regaib Kandili, Recep ayının ilk Cuma gecesidir.'],
    ['Miraç Kandili (27 Recep)', 'İsrâ ve Miraç mucizesinin anıldığı gecedir; beş vakit namaz bu olayda farz kılınmıştır.'],
    ['Berat Kandili (15 Şaban)', 'Tevbe, istiğfar ve arınma gecesidir.'],
    ['Ramazan ve Kadir Gecesi', 'Ramazan oruç ayıdır; Kadir Gecesi Kur\'an\'ın indirilmeye başlandığı, bin aydan hayırlı gecedir (27. gece).'],
    ['Ramazan Bayramı (1-3 Şevval)', 'Ramazan orucunun ardından gelen bayramdır. Fitre bayram namazından önce verilir.'],
    ['Kurban Bayramı (10-13 Zilhicce)', 'Arefe günü ile başlayan, kurbanın kesildiği dört günlük bayramdır.'],
  ];
  const faq = [
    { q: 'Kandil geceleri neden her yıl farklı tarihe denk gelir?', a: 'Hicri takvim ay yılına dayandığından miladi takvimden 10-11 gün kısadır; bu nedenle dinî günler miladi takvimde her yıl 10-11 gün öne kayar.' },
    { q: 'Kandil gecesi hangi gün başlar?', a: 'Hicri günler gün batımıyla başladığı için kandil geceleri, ilgili günden bir önceki akşam gün batımıyla başlar. Takvimde gösterilen tarih kandil akşamıdır.' },
    { q: 'Bu takvim resmî midir?', a: 'Hayır. Tarihler Ümmü\'l-Kurâ hicri takvimine göre bilgisayar tarafından hesaplanır ve Diyanet İşleri Başkanlığı\'nın ilan ettiği tarihlerden bir gün farklı olabilir. Resmî tarihler için Diyanet takvimini esas alınız.' },
  ];
  const body = `
<div class="wrap page-head">
  ${breadcrumbHtml(crumbs)}
  <h1>Dini Günler Takvimi: Kandiller, Bayramlar ve Ramazan</h1>
  <p class="lead">Önümüzdeki dinî günlerin ve gecelerin tarihleri, hicri karşılıkları ve kalan gün sayısı. Tarihler cihazınızın saatine göre otomatik hesaplanır.</p>
  <p class="today-hijri"><strong>Bugün:</strong> <span id="date-greg"></span> · <span id="date-hijri"></span></p>
</div>
<div class="wrap section">
  <div class="table-wrap"><table class="takvim" id="takvim-table">
    <thead><tr><th>Dinî Gün</th><th>Hicrî Tarih</th><th>Miladî Tarih</th><th>Kalan</th></tr></thead>
    <tbody id="takvim-body"><tr><td colspan="4">Takvim yükleniyor…</td></tr></tbody>
  </table></div>
  <noscript><p>Takvimi görmek için JavaScript gereklidir. Resmî takvim için <a href="https://diyanet.gov.tr/tr-TR/Kurumsal/Detay/11/dini-gunler-ve-geceler" rel="noopener">Diyanet Dinî Günler ve Geceler</a> sayfasına bakabilirsiniz.</p></noscript>
  <p class="small muted">Kandil geceleri için gösterilen tarih, kandilin başladığı akşamdır. Tarihler hicri takvim hesabıyla bulunur; Diyanet ilanından bir gün farklı olabilir.</p>
  <div class="prose prose-block">
    <h2>Mübarek Gün ve Geceler</h2>
    <dl class="gunler">${aciklama.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>
    <p>Hicri takvimin yapısı ve ayları için <a href="/dini-gunler/hicri-takvim-ve-aylar-asure/">Hicri Takvim ve Aylar</a>; kandillerin anlamı için <a href="/dini-gunler/kandil-geceleri-ve-onemi/">Kandil Geceleri</a>; Ramazan için <a href="/dini-gunler/ramazan-ayi-ve-oruc/">Ramazan ve Oruç</a> yazılarımıza bakabilirsiniz.</p>
    ${faqHtml(faq)}
  </div>
</div>`;
  write(
    'dini-gunler-takvimi/index.html',
    layout({
      title: 'Dini Günler Takvimi: Kandiller, Ramazan ve Bayram Tarihleri',
      description: 'Önümüzdeki kandil geceleri, Ramazan, Ramazan Bayramı, Kurban Bayramı ve diğer dinî günlerin hicri ve miladi tarihleri, kalan gün sayısıyla.',
      path: '/dini-gunler-takvimi/',
      body,
      ld: [breadcrumbLd(crumbs), faqLd(faq)],
      scripts: ['takvim.js'],
    })
  );
  addPage('/dini-gunler-takvimi/', today, 0.8, 'weekly');
}

// ---- Arama
{
  const body = `
<div class="wrap page-head">
  <h1>Sitede Ara</h1>
  <form class="hero-search dark" action="/ara/" method="get" role="search">
    <label class="sr" for="q-page">Arama</label>
    <input id="q-page" name="q" type="search" placeholder="Aramak istediğiniz kelimeyi yazın…" autocomplete="off" autofocus>
    <button type="submit">Ara</button>
  </form>
  <p class="muted" id="search-status" aria-live="polite"></p>
</div>
<div class="wrap section"><div class="grid" id="search-results"></div></div>`;
  write(
    'ara/index.html',
    layout({
      title: 'Arama',
      description: `${site.name} sitesinde makale ve sayfalarda arama yapın.`,
      path: '/ara/',
      noindex: true,
      body,
      scripts: ['search.js'],
    })
  );
}

// ---- Kurumsal sayfalar
function simplePage({ slug, title, description, h1, content, priority = 0.4, ld = [] }) {
  const p = `/${slug}/`;
  const crumbs = [['/', 'Anasayfa'], [p, h1 || title]];
  const body = `
<div class="wrap page-head">${breadcrumbHtml(crumbs)}<h1>${esc(h1 || title)}</h1></div>
<div class="wrap section"><div class="prose prose-block narrow">${content}</div></div>`;
  write(`${slug}/index.html`, layout({ title, description, path: p, body, ld: [breadcrumbLd(crumbs), ...ld] }));
  addPage(p, today, priority, 'yearly');
}

simplePage({
  slug: 'hakkimizda',
  title: 'Hakkımızda',
  h1: 'Hakkımızda',
  description: `${site.name} – ${site.slogan}: Amacımız, yayın ilkelerimiz ve içerik kaynaklarımız hakkında bilgi.`,
  priority: 0.6,
  ld: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Hakkımızda', url: abs('/hakkimizda/') }],
  content: `
<p><strong>${esc(site.name)}</strong>, "<em>${esc(site.slogan)}</em>" anlayışıyla hazırlanmış bir İslami içerik platformudur. Kalbe huzur veren, hayata dokunan ve doğru bilgiye ulaşmayı kolaylaştıran içerikler sunmak için yola çıktık.</p>
${studioFig('studio-genel.jpg', `${site.name} yayın stüdyosu`, 'MEC Stüdyo: yayınlarımızın hazırlandığı mekân')}
<h2>Misyonumuz</h2>
<p>İslam'ın temel kaynaklarına dayanan bilgileri, herkesin anlayabileceği sade bir dille, doğru ve güvenilir şekilde paylaşmak; ibadet hayatını kolaylaştıran araçlar sunmak.</p>
<h2>Yayın İlkelerimiz</h2>
<ul>
  <li><strong>Kaynak gösterme:</strong> Ayet ve hadisleri kaynaklarıyla birlikte veriyoruz.</li>
  <li><strong>Güvenilir referanslar:</strong> Kur'an-ı Kerim, Kütüb-i Sitte gibi hadis kaynakları ve Diyanet İşleri Başkanlığı yayınlarını esas alıyoruz.</li>
  <li><strong>Mezhep hassasiyeti:</strong> Fıkhî konularda Hanefî mezhebini esas alıyor, farklılık olan yerlerde bunu belirtiyoruz.</li>
  <li><strong>Sadelik ve saygı:</strong> Ayrıştırıcı, kışkırtıcı ve doğrulanmamış bilgilerden uzak duruyoruz.</li>
  <li><strong>Düzeltme:</strong> Hata fark ederseniz <a href="/iletisim/">bize bildirin</a>; en kısa sürede düzeltiriz.</li>
</ul>
<h2>Sorumluluk Reddi</h2>
<p>Sitedeki bilgiler genel bilgilendirme amaçlıdır; bir fetva veya bağlayıcı dinî hüküm yerine geçmez. Özel durumlarınız için yetkili bir din görevlisine veya Diyanet İşleri Başkanlığı'na danışınız.</p>`,
});

simplePage({
  slug: 'iletisim',
  title: 'İletişim',
  h1: 'İletişim',
  description: `${site.name} ile iletişime geçin: öneri, düzeltme ve işbirliği talepleriniz için bize yazın.`,
  priority: 0.4,
  ld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'İletişim', url: abs('/iletisim/') }],
  content: `
<p>Görüş, öneri, düzeltme ve işbirliği talepleriniz için bize e-posta ile ulaşabilirsiniz:</p>
<p class="contact-mail"><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
<p>Mesajlarınıza en kısa sürede dönüş yapmaya çalışıyoruz. Bir içerikte hata veya eksiklik gördüyseniz, sayfanın adresiyle birlikte bildirmeniz bizim için çok değerlidir.</p>
<div class="social">${socialLinks() || '<p class="muted">Sosyal medya hesaplarımız yakında burada olacak.</p>'}</div>`,
});

simplePage({
  slug: 'gizlilik-politikasi',
  title: 'Gizlilik Politikası',
  h1: 'Gizlilik Politikası',
  description: `${site.name} gizlilik politikası: hangi verilerin toplandığı, çerezler ve haklarınız hakkında bilgi.`,
  priority: 0.3,
  content: `
<p>${esc(site.name)} olarak ziyaretçilerimizin gizliliğine saygı duyuyoruz. Bu sayfa, sitemizi kullanırken hangi bilgilerin işlendiğini açıklar.</p>
<h2>Toplanan Bilgiler</h2>
<p>Sitemiz, kayıt veya üyelik gerektirmez ve kişisel verilerinizi doğrudan toplamaz. Namaz vakitleri için seçtiğiniz şehir ve zikirmatik sayacınız yalnızca <strong>sizin tarayıcınızın yerel deposunda</strong> (localStorage) saklanır; sunucularımıza gönderilmez.</p>
<h2>Üçüncü Taraf Hizmetler</h2>
<p>Namaz vakitleri, Aladhan (aladhan.com) servisinden alınır. Bu istek sırasında seçtiğiniz şehir adı ve IP adresiniz ilgili servise iletilir. Sitemize ileride istatistik veya reklam hizmetleri eklenirse bu politika güncellenecektir.</p>
<h2>Çerezler</h2>
<p>Sitemiz zorunlu çerez kullanmaz. İstatistik veya reklam amaçlı çerezler eklenirse, ziyaretçilerimiz bilgilendirilecek ve gerekli izinler alınacaktır.</p>
<h2>Haklarınız</h2>
<p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız için <a href="/iletisim/">iletişim</a> sayfamızdan bize ulaşabilirsiniz.</p>
<p class="muted small">Son güncelleme: ${fmtDate(today)}</p>`,
});

// ---- Ek modüller (Kur'an, soru-cevap, sözlük, araçlar, canlı yayın, programlar, formlar, ekip)
const extraCtx = { layout, write, addPage, esc, abs, slugify, stripTags, breadcrumbHtml, breadcrumbLd, faqHtml, faqLd, icon, studioFig, videoCard, videoLd, sortedVideos, fmtDate, today, articles, site };
const extraSearch = [...buildKuran(extraCtx), ...buildBilgi(extraCtx), ...buildExtra(extraCtx)];

// ---- 404
write(
  '404.html',
  layout({
    title: 'Sayfa Bulunamadı',
    description: 'Aradığınız sayfa bulunamadı.',
    path: '/404.html',
    noindex: true,
    body: `
<div class="wrap page-head center">
  <p class="big-404" aria-hidden="true">404</p>
  <h1>Aradığınız sayfa bulunamadı</h1>
  <p class="lead">Adres değişmiş ya da yanlış yazılmış olabilir. Aşağıdaki yazılara göz atabilirsiniz.</p>
  <p><a class="btn" href="/">Anasayfaya dön</a> <a class="btn btn-ghost" href="/makaleler/">Tüm makaleler</a></p>
</div>
<div class="wrap section"><div class="grid">${articles.slice(0, 3).map(card).join('')}</div></div>`,
  })
);

// ------------------------------------------------------------------ teknik dosyalar
// Sitemap
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${abs(p.url)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
);

// robots.txt
write(
  'robots.txt',
  `User-agent: *
Allow: /
Disallow: /ara/

Sitemap: ${abs('/sitemap.xml')}
`
);

// RSS
write(
  'feed.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)} – ${esc(site.slogan)}</title>
  <link>${abs('/')}</link>
  <description>${esc(site.description)}</description>
  <language>tr-TR</language>
  <atom:link href="${abs('/feed.xml')}" rel="self" type="application/rss+xml"/>
${articles
  .map(
    (a) => `  <item>
    <title>${esc(a.title)}</title>
    <link>${abs(a.url)}</link>
    <guid isPermaLink="true">${abs(a.url)}</guid>
    <pubDate>${new Date(a.date + 'T12:00:00Z').toUTCString()}</pubDate>
    <category>${esc(a.cat.name)}</category>
    <description>${esc(a.description)}</description>
  </item>`
  )
  .join('\n')}
</channel>
</rss>
`
);

// Site içi arama dizini
write(
  'search.json',
  JSON.stringify([
    ...articles.map((a) => ({
      t: a.title,
      d: a.summary,
      u: a.url,
      c: a.cat.name,
      k: a.keywords.join(' '),
      x: stripTags(a.body).slice(0, 1500),
    })),
    ...[
      ['Dualar: Arapça, Okunuş ve Anlam', 'Günlük, Kur\'an\'dan ve sıkıntı duaları.', '/dualar/', 'dua yemek duası uyku duası rabbena kısa dualar', dualar.map((d) => d.baslik + ' ' + d.okunus + ' ' + d.anlam).join(' ')],
      ['Namaz Sureleri ve Kısa Sureler', 'Fâtiha, İhlâs, Felak, Nâs, Kevser, Âyetü\'l-Kürsî.', '/kisa-sureler/', 'fatiha suresi ihlas suresi felak nas kevser ayetel kürsi okunuşu meali namaz sureleri', sureler.map((s) => s.ad + ' ' + s.ayetler.map((a) => a[1] + ' ' + a[2]).join(' ')).join(' ')],
      ['Kıble Pusulası', 'Bulunduğunuz yerden kıble yönü.', '/kible-pusulasi/', 'kıble yönü kıble bulma pusula kıble açısı', 'kıble pusulası kâbe yönü şehir'],
      ['Dini Günler Takvimi', 'Kandiller, Ramazan ve bayramların tarihleri.', '/dini-gunler-takvimi/', 'dini günler takvimi kandil tarihleri bayram ramazan ne zaman', 'kandil ramazan bayram kurban hicri takvim'],
      ['Namaz Vakitleri', '81 il için namaz vakitleri.', '/namaz-vakitleri/', 'namaz vakitleri ezan vakti imsak iftar', 'namaz vakitleri imsak öğle ikindi akşam yatsı'],
      ['Esmaül Hüsna', 'Allah\'ın 99 ismi ve anlamları.', '/esmaul-husna/', 'esmaül hüsna 99 isim', 'esmaül hüsna allah\'ın güzel isimleri'],
      ['Zikirmatik', 'Online dijital tesbih.', '/zikirmatik/', 'zikirmatik tesbih zikir sayacı', 'zikirmatik tesbih'],
      ['Yayınlarımız', 'MEC stüdyo yayınları.', '/yayinlar/', 'yayınlar video program sohbet', 'yayınlar stüdyo video'],
    ].map(([t, d, u, k, x]) => ({ t, d, u, c: 'Sayfa', k, x: x.slice(0, 1500) })),
    ...extraSearch.map((e) => ({ ...e, x: (e.x || '').slice(0, 1200) })),
  ])
);

// PWA manifest
write(
  'manifest.webmanifest',
  JSON.stringify(
    {
      name: `${site.name} – ${site.slogan}`,
      short_name: site.name,
      description: site.description,
      lang: 'tr',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: site.themeColor,
      icons: [
        { src: '/img/logo-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/img/logo-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

// Netlify / Cloudflare Pages başlıkları (önbellek + güvenlik)
write(
  '_headers',
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=()
/sw.js
  Cache-Control: no-cache
/css/*
  Cache-Control: public, max-age=31536000, immutable
/js/*
  Cache-Control: public, max-age=31536000, immutable
/img/*
  Cache-Control: public, max-age=31536000, immutable
`
);

// ------------------------------------------------------------------ statik dosyalar
copyDir(STATIC, DIST);
fs.rmSync(path.join(DIST, 'img', 'logo-original.png'), { force: true });

// Service worker (çevrimdışı destek + hızlı yükleme)
{
  const ver = crypto.createHash('md5').update(V.css + V.main + Date.now()).digest('hex').slice(0, 8);
  write(
    'sw.js',
    `// MEC service worker (otomatik üretilir)
const CACHE = 'mec-${ver}';
const PRE = ['/', '/offline.html', '/css/style.css?v=${V.css}', '/js/main.js?v=${V.main}', '/img/logo-96.png', '/img/logo-192.png', '/manifest.webmanifest'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); return r; }).catch(() => caches.match(req).then((m) => m || caches.match('/offline.html'))));
    return;
  }
  e.respondWith(caches.match(req).then((m) => { const net = fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return r; }).catch(() => m); return m || net; }));
});
self.addEventListener('notificationclick', (e) => { e.notification.close(); e.waitUntil(self.clients.openWindow('/namaz-vakitleri/')); });
`
  );
}
// favicon.ico (PNG gömülü)
{
  const png = fs.readFileSync(path.join(STATIC, 'img', 'favicon-48.png'));
  const head = Buffer.alloc(22);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(1, 4);
  head[6] = 48;
  head[7] = 48;
  head.writeUInt16LE(1, 10); // planes
  head.writeUInt16LE(32, 12); // bit count
  head.writeUInt32LE(png.length, 14); // boyut
  head.writeUInt32LE(22, 18); // ofset
  fs.writeFileSync(path.join(DIST, 'favicon.ico'), Buffer.concat([head, png]));
}

// GitHub Pages: Jekyll'i kapat + özel alan adı (CNAME) — alan adı ayarlıysa
write('.nojekyll', '');
if (!site.url.includes('example.com') && /^https?:\/\/[^/]+$/.test(site.url) && !/localhost/.test(site.url)) {
  write('CNAME', new URL(site.url).hostname + '\n');
}

console.log(`✔ ${pages.length} sayfa üretildi → dist/  (alan adı: ${site.url})`);
if (site.url.includes('example.com')) {
  console.log('⚠ Uyarı: Alan adı henüz ayarlanmadı. src/config.mjs içindeki "url" değerini veya SITE_URL ortam değişkenini güncelleyin.');
}
