// Makale içinde ayet/hadis kutusu üretir
export const v = (ar, tr, source) =>
  `<blockquote class="verse"><p class="ar" lang="ar" dir="rtl">${ar}</p><p class="tr">${tr}</p><cite>${source}</cite></blockquote>`;
