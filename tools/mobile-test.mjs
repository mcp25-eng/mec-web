// Mobil yatay taşma testi.  Kurulum: npm i --no-save puppeteer-core   |   Çalıştırma: npm run dev (ayrı terminal), sonra node tools/mobile-test.mjs
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base = 'http://localhost:8080';
const widths = (process.env.WIDTHS || '320,360,390,414,600,768').split(',').map(Number);
const sitemap = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'sitemap.xml'), 'utf8');
let urls = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
if (true) {
  // Kur'an sayfalarından örnek al (hepsi aynı şablon)
  const k = urls.filter((u) => u.startsWith('/kuran/') && u !== '/kuran/');
  urls = urls.filter((u) => !k.includes(u)).concat(['/kuran/bakara-suresi/', '/kuran/fatiha-suresi/', '/kuran/yasin-suresi/', '/kuran/ihlas-suresi/']);
}
urls.push('/404.html', '/offline.html', '/ara/?q=namaz');

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new' });
const bad = [];
for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 740, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  await page.setRequestInterception(true);
  page.on('request', (r) => (/ytimg|youtube/.test(r.url()) ? r.abort() : r.continue()));
  for (const u of urls) {
    try {
      await page.goto(base + u, { waitUntil: 'load', timeout: 20000 });
      await new Promise((r) => setTimeout(r, 350));
    } catch (e) { /* devam */ }
    const res = await page.evaluate(() => {
      const de = document.documentElement;
      const cw = de.clientWidth;
      const over = de.scrollWidth - cw;
      const offenders = [];
      {
        const scrollable = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(auto|scroll|hidden)/.test(s.overflowX)) return true; } return false; };
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > cw + 1 && !scrollable(el)) offenders.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').join('.') : '') + ' r=' + Math.round(r.right));
        });
      }
      return { over, cw, offenders: offenders.slice(0, 6) };
    });
    if (res.over > 1 || res.offenders.length) bad.push({ w, u, ...res });
  }
  await page.close();
}
await browser.close();
console.log(`Kontrol: ${urls.length} sayfa x ${widths.length} genişlik`);
console.log(bad.length ? JSON.stringify(bad, null, 1) : 'Yatay taşma yok.');
