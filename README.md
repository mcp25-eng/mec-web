# MEC – Sana İyi Gelen Her Şey

Statik, hızlı ve SEO odaklı İslami içerik sitesi. Sunucu veya veritabanı gerekmez.

## Kullanım

```bash
npm run build     # siteyi dist/ klasörüne üretir
npm start         # http://localhost:8080 adresinde önizleme
npm run dev       # build + önizleme
```

## Yayınlamadan önce

1. `src/config.mjs` dosyasında `url`, `email` ve `social` alanlarını kendi bilgilerinizle değiştirin.
   Alan adını komutla da verebilirsiniz: `SITE_URL=https://www.siteniz.com npm run build`
2. `npm run build` çalıştırın, **`dist/`** klasörünün içeriğini hosting'e yükleyin
   (Netlify, Cloudflare Pages, Vercel veya klasik hosting).
3. Google Search Console'a siteyi ekleyin ve `https://siteniz.com/sitemap.xml` adresini gönderin.
   Doğrulama kodunu `googleVerification` alanına yazabilirsiniz.

## Yeni makale eklemek

`src/data/articles-ibadet.mjs` veya `src/data/articles-diger.mjs` içindeki listeye aynı yapıda yeni bir kayıt ekleyin
(`slug`, `category`, `title`, `description`, `keywords`, `date`, `summary`, `body`, `faq`, `sources`),
sonra `npm run build` çalıştırın. Sitemap, RSS, arama dizini, breadcrumb ve JSON-LD verileri otomatik güncellenir.
Ayet/hadis kutusu için `v(arapça, türkçe, kaynak)` yardımcısını kullanın.

## Diğer içerikler

- Dualar: `src/data/dualar.mjs` · Kısa sureler: `src/data/sureler.mjs` · Şehir koordinatları (kıble): `src/data/cities.mjs`
- Yayın videoları: `src/config.mjs` içindeki `videos` listesi
- Dini günler takvimi ve kıble pusulası tarayıcıda hesaplanır, ek veri gerekmez
- Soru-Cevap: `src/data/sss.mjs` (her kayıt kendi sayfasını alır) · Sözlük: `src/data/sozluk.mjs`
- Kur'an (114 sure): `src/data/quran.json` (Arapça + Elmalılı Hamdi Yazır meali). Yeniden indirmek için `npm run quran`
- `src/config.mjs` içinde yayın alanları:
  - `live` ve `schedule`: canlı yayın videosu ve haftalık yayın akışı (`/canli-yayin/`, takvime ekle `.ics` otomatik üretilir)
  - `programs`: program/seri sayfaları; videolara `program: 'slug'`, `transcript: '…'` ve isteğe bağlı `slug` ekleyin (her video `/yayinlar/<slug>/` sayfası alır)
  - `team`: ekip/yayın kurulu (gerçek kişi bilgilerini siz girin)
  - `forms`: bülten ve "Soru Sor" formları için uç nokta (Formspree, Getform, Web3Forms vb.). Boşsa form e-posta uygulamasını açar
  - `fitre`: Diyanet'in açıkladığı fitre tutarı (zekât sayfasında varsayılan olarak görünür)
- Araçlar: `/zekat-hesaplama/`, `/kaza-namazi-hesaplama/`, `/hatim-takip/`, `/ramazan-imsakiyesi/` (hepsi tarayıcıda çalışır; veriler cihazda saklanır)
- Koyu tema, yazı boyutu ayarı ve PWA (çevrimdışı destek, "Uygulamayı Yükle") hazırdır; service worker `sw.js` build ile otomatik üretilir

## Yapı

- `src/build.mjs` – sayfa şablonları ve derleyici
- `src/config.mjs` – site ayarları ve kategoriler
- `src/data/` – makaleler, Esmaül Hüsna, günün ayet/hadisleri
- `src/static/` – CSS, JS ve görseller (logo `src/static/img/`)
- `tools/check-links.mjs` – build sonrası kırık iç bağlantı kontrolü

## GitHub Pages ile yayınlama

1. GitHub'da boş bir depo açın, projeyi `main` dalına gönderin (`dist/` ve `node_modules/` zaten `.gitignore`'da).
2. Depo > **Settings > Pages > Source: GitHub Actions** seçin.
3. Depo > **Settings > Secrets and variables > Actions > Variables** altına `SITE_URL` ekleyin (örn. `https://www.siteadi.com`).
4. **Settings > Pages > Custom domain** alanına alan adını yazın, **Enforce HTTPS**'i açın.
5. Alan adı DNS ayarları: `www` için `CNAME` kaydı → `KULLANICIADI.github.io`; kök alan (apex) için GitHub'ın dört `A` kaydı (185.199.108.153, .109.153, .110.153, .111.153).
6. `.github/workflows/deploy.yml` her `main` push'unda ve her gün 03:15'te (günlük içerik için) siteyi yeniden üretip yayınlar. Build sırasında `CNAME` dosyası `SITE_URL`'den otomatik oluşur.

Not: GitHub Pages `_headers` dosyasını uygulamaz (önbellek/güvenlik başlıkları için Cloudflare Pages veya Netlify gerekir). Site bunsuz da çalışır.
