// 81 il: [ad, enlem, boylam]
export const cities = [
  ['Adana', 37.0, 35.32], ['Adıyaman', 37.76, 38.28], ['Afyonkarahisar', 38.75, 30.54], ['Ağrı', 39.72, 43.05],
  ['Aksaray', 38.37, 34.03], ['Amasya', 40.65, 35.83], ['Ankara', 39.93, 32.86], ['Antalya', 36.9, 30.7],
  ['Ardahan', 41.11, 42.7], ['Artvin', 41.18, 41.82], ['Aydın', 37.85, 27.85], ['Balıkesir', 39.65, 27.89],
  ['Bartın', 41.64, 32.34], ['Batman', 37.88, 41.13], ['Bayburt', 40.26, 40.23], ['Bilecik', 40.14, 29.98],
  ['Bingöl', 38.88, 40.5], ['Bitlis', 38.4, 42.11], ['Bolu', 40.74, 31.61], ['Burdur', 37.72, 30.29],
  ['Bursa', 40.19, 29.06], ['Çanakkale', 40.15, 26.41], ['Çankırı', 40.6, 33.62], ['Çorum', 40.55, 34.95],
  ['Denizli', 37.78, 29.09], ['Diyarbakır', 37.91, 40.24], ['Düzce', 40.84, 31.16], ['Edirne', 41.68, 26.56],
  ['Elazığ', 38.67, 39.22], ['Erzincan', 39.75, 39.49], ['Erzurum', 39.9, 41.27], ['Eskişehir', 39.78, 30.52],
  ['Gaziantep', 37.07, 37.38], ['Giresun', 40.91, 38.39], ['Gümüşhane', 40.46, 39.48], ['Hakkari', 37.58, 43.74],
  ['Hatay', 36.4, 36.35], ['Iğdır', 39.92, 44.04], ['Isparta', 37.76, 30.55], ['İstanbul', 41.01, 28.98],
  ['İzmir', 38.42, 27.14], ['Kahramanmaraş', 37.58, 36.94], ['Karabük', 41.2, 32.63], ['Karaman', 37.18, 33.22],
  ['Kars', 40.6, 43.1], ['Kastamonu', 41.38, 33.78], ['Kayseri', 38.73, 35.49], ['Kilis', 36.72, 37.12],
  ['Kırıkkale', 39.85, 33.52], ['Kırklareli', 41.74, 27.23], ['Kırşehir', 39.15, 34.16], ['Kocaeli', 40.77, 29.92],
  ['Konya', 37.87, 32.48], ['Kütahya', 39.42, 29.98], ['Malatya', 38.35, 38.31], ['Manisa', 38.61, 27.43],
  ['Mardin', 37.31, 40.74], ['Mersin', 36.8, 34.64], ['Muğla', 37.22, 28.36], ['Muş', 38.74, 41.5],
  ['Nevşehir', 38.62, 34.71], ['Niğde', 37.97, 34.68], ['Ordu', 40.98, 37.88], ['Osmaniye', 37.07, 36.25],
  ['Rize', 41.02, 40.52], ['Sakarya', 40.69, 30.44], ['Samsun', 41.29, 36.33], ['Siirt', 37.93, 41.94],
  ['Sinop', 42.03, 35.15], ['Sivas', 39.75, 37.02], ['Şanlıurfa', 37.16, 38.79], ['Şırnak', 37.52, 42.46],
  ['Tekirdağ', 40.98, 27.51], ['Tokat', 40.31, 36.55], ['Trabzon', 41.0, 39.72], ['Tunceli', 39.11, 39.55],
  ['Uşak', 38.68, 29.41], ['Van', 38.49, 43.38], ['Yalova', 40.65, 29.27], ['Yozgat', 39.82, 34.81],
  ['Zonguldak', 41.45, 31.8],
];

export const KAABA = { lat: 21.422487, lon: 39.826206 };

// Başlangıç noktasından Kâbe'ye büyük daire yönü (derece, kuzeyden saat yönünde) ve mesafe (km)
export function qibla(lat, lon) {
  const r = Math.PI / 180;
  const p1 = lat * r, p2 = KAABA.lat * r, dl = (KAABA.lon - lon) * r;
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  const bearing = ((Math.atan2(y, x) / r) + 360) % 360;
  const a = Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  const km = 2 * 6371 * Math.asin(Math.sqrt(a));
  return { bearing, km };
}
