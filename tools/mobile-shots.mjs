// Mobil ekran görüntüleri (menü açık dahil) → %TEMP%/mec-shots.  Kullanım: node tools/mobile-shots.mjs
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const out = path.join(os.tmpdir(), 'mec-shots');
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 360, height: 740, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await page.setRequestInterception(true);
page.on('request', (r) => (/ytimg|youtube/.test(r.url()) ? r.abort() : r.continue()));
const go = async (u) => { await page.goto('http://localhost:8080' + u, { waitUntil: 'load' }); await new Promise((r) => setTimeout(r, 400)); };

await go('/');
await page.screenshot({ path: path.join(out, 'home.png') });
await page.click('.nav-toggle, #menu-btn, .menu-btn').catch(() => {});
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: path.join(out, 'menu.png') });
const info = await page.evaluate(() => {
  const n = document.querySelector('.main-nav');
  return { nav: n && { h: n.clientHeight, sh: n.scrollHeight, ov: getComputedStyle(n).overflowY, disp: getComputedStyle(n).display } };
});
console.log(JSON.stringify(info), out);
await page.evaluate(() => localStorage.setItem('mec_theme', 'dark'));
await go('/soru-cevap/');
await page.screenshot({ path: path.join(out, 'qa-dark.png') });
await go('/kuran/yasin-suresi/');
await page.screenshot({ path: path.join(out, 'sure-dark.png') });
await browser.close();
