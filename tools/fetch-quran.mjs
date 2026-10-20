// Kur'an metnini bir kez indirip src/data/quran/ altına kaydeder (npm run quran).
// Arapça: Uthmani metin (alquran.cloud). Meal: Elmalılı Muhammed Hamdi Yazır (vefat 1942, telif süresi dolmuş).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'quran.json');
const get = async (u) => {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(u);
      if (r.ok) return (await r.json()).data;
    } catch {}
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error('İndirilemedi: ' + u);
};

const ar = await get('https://api.alquran.cloud/v1/quran/quran-uthmani');
const tr = await get('https://api.alquran.cloud/v1/quran/tr.yazir');

const surahs = ar.surahs.map((s, i) => ({
  n: s.number,
  ar: s.name,
  en: s.englishName,
  type: s.revelationType,
  a: s.ayahs.map((x) => ({ t: x.text, p: x.page, j: x.juz })),
  m: tr.surahs[i].ayahs.map((x) => x.text),
}));
fs.writeFileSync(out, JSON.stringify(surahs));
console.log('Kaydedildi:', out, surahs.length, 'sure,', surahs.reduce((t, s) => t + s.a.length, 0), 'ayet');
