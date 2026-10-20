// Soru Sor formunu gerçekten gönderir (info@ adresine 1 test maili düşer). Önce: npm run dev
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new' });
const page = await browser.newPage();
await page.setUserAgent((await browser.userAgent()).replace('HeadlessChrome', 'Chrome').replace('Headless', ''));
await page.goto('http://localhost:8080/soru-sor/', { waitUntil: 'load' });
await page.type('#a-ad', 'TEST (silebilirsiniz)');
await page.type('#a-mail', 'info@mecmedya.org');
await page.type('#a-soru', 'Bu bir test mesajidir; form kurulumu dogrulaniyor.');
page.on('response', async (r) => { if (r.url().includes('web3forms')) console.log('web3forms', r.status(), (await r.text().catch(() => '')).slice(0, 300)); });
page.on('requestfailed', (r) => console.log('FAILED', r.url(), r.failure()?.errorText));
await page.click('form[data-form=ask] button[type=submit]');
await new Promise((r) => setTimeout(r, 5000));
console.log(await page.$eval('.form-msg', (e) => e.className + ' | ' + e.textContent));
await browser.close();
