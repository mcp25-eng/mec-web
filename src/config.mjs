// ============================================================
//  SİTE AYARLARI — yayınlamadan önce burayı düzenleyin
//  (Alan adını ayrıca şu şekilde de verebilirsiniz:
//   SITE_URL=https://www.siteniz.com npm run build)
// ============================================================
export const site = {
  name: 'MEC',
  slogan: 'Sana İyi Gelen Her Şey',
  title: 'MEC – Sana İyi Gelen Her Şey | İslami İçerikler, İbadet Rehberi ve Dualar',
  description:
    'MEC; namaz, abdest, oruç, zekât, dualar, zikirler, Kur\'an-ı Kerim, siyer ve güzel ahlak üzerine sade, güvenilir ve kaynaklı İslami içerikler sunar. Namaz vakitleri, Esmaül Hüsna ve zikirmatik bir arada.',
  url: (process.env.SITE_URL || 'https://mecmedya.org').replace(/\/+$/, ''),
  email: 'info@mecmedya.org',
  lang: 'tr',
  locale: 'tr_TR',
  themeColor: '#0d8b97',
  // Sosyal medya hesaplarınızı ekleyin (boş bırakılanlar gösterilmez)
  social: {
    youtube: '',
    instagram: '',
    facebook: '',
    x: '',
    telegram: '',
  },
  // Google Search Console doğrulama kodu (isteğe bağlı)
  googleVerification: '',
};

// ============================================================
//  YAYINLAR (YouTube videoları)
//  Yeni yayın eklemek için listeye şu şekilde bir kayıt ekleyin:
//  { id: 'YOUTUBE_VIDEO_ID', title: 'Başlık', description: 'Kısa açıklama', date: '2026-10-20', category: 'Sohbet' }
//  id: videonun adresindeki v= değeri (örn. youtube.com/watch?v=ABC123 -> ABC123)
// ============================================================
export const videos = [
  // { id: 'ABC123xyz00', title: 'İlk Yayınımız', description: 'Yayının kısa açıklaması.', date: '2026-10-20', category: 'Sohbet' },
];

// Kanal adresiniz (boş bırakılırsa "Abone ol" butonu gösterilmez)
export const youtubeChannel = '';

export const categories = [
  {
    slug: 'temel-bilgiler',
    name: 'İslam ve İman',
    icon: '',
    description: 'İslam\'ın ve imanın şartları, temel dinî kavramlar ve İslam\'ı tanımak isteyenler için başlangıç rehberi.',
    intro: 'İslam\'ı doğru ve sağlam temellerle tanımak için gereken temel bilgiler: iman esasları, İslam\'ın şartları ve ihsan bilinci.',
  },
  {
    slug: 'ibadet',
    name: 'İbadet',
    icon: '🕌',
    description: 'Namaz, abdest, zekât ve oruç başta olmak üzere ibadetlerin nasıl yapılacağını adım adım anlatan rehberler.',
    intro:
      'İbadet, kulun Rabbine yönelişinin en güzel ifadesidir. Bu bölümde namaz, abdest, zekât ve diğer ibadetleri sade bir dille, kaynaklara dayanarak ve adım adım öğrenebilirsiniz.',
  },
  {
    slug: 'kuran-i-kerim',
    name: 'Kur\'an-ı Kerim',
    icon: '📖',
    description: 'Kur\'an-ı Kerim okuma adabı, hatim, meal okuma ve Kur\'an ile ilişki kurma üzerine yazılar.',
    intro: 'Kur\'an-ı Kerim, hidayet rehberimiz ve kalplerin şifasıdır. Onunla bağ kurmanın yollarını ve okuma adabını bu bölümde bulabilirsiniz.',
  },
  {
    slug: 'dua-ve-zikir',
    name: 'Dua ve Zikir',
    icon: '🤲',
    description: 'Sabah-akşam duaları, namaz sonrası tesbihat, günlük zikirler ve dua adabı.',
    intro: 'Dua ibadetin özü, zikir ise kalbin huzurudur. Günlük hayatınıza kolayca katabileceğiniz dua ve zikirleri keşfedin.',
  },
  {
    slug: 'siyer',
    name: 'Siyer',
    icon: '🌙',
    description: 'Hz. Muhammed\'in (s.a.v.) hayatı, örnek ahlakı ve İslam tarihinden önemli kesitler.',
    intro: 'Siyer, Peygamber Efendimiz\'in (s.a.v.) hayatını ve örnek ahlakını anlatır. O\'nun yolunu tanımak, O\'nu sevmenin ilk adımıdır.',
  },
  {
    slug: 'ahlak-ve-manevi-hayat',
    name: 'Ahlak ve Manevi Hayat',
    icon: '💚',
    description: 'Sabır, tevekkül, doğruluk, komşuluk ve güzel ahlak üzerine ayet ve hadislerle yazılar.',
    intro: 'Güzel ahlak, imanın meyvesidir. Sabır, tevekkül, doğruluk ve iyilik gibi değerleri ayet ve hadisler ışığında ele alıyoruz.',
  },
  {
    slug: 'dini-gunler',
    name: 'Dini Günler ve Geceler',
    icon: '✨',
    description: 'Ramazan, kandil geceleri, bayramlar ve mübarek günlerin anlamı ve nasıl değerlendirileceği.',
    intro: 'Mübarek gün ve geceler, rahmetin bol, tevbenin makbul olduğu fırsat zamanlarıdır. Bu günleri nasıl değerlendireceğinizi öğrenin.',
  },
];

// ============================================================
//  CANLI YAYIN ve YAYIN AKIŞI
//  live.videoId: YouTube canlı yayın (veya premiere) video kimliği; boşsa "yayın yok" durumu gösterilir.
//  schedule: haftalık program akışı. day: Pazartesi…Pazar, time: 'SS:DD' (Türkiye saati), duration: dakika
//  { day: 'Cuma', time: '21:00', duration: 60, title: 'Cuma Sohbeti', description: 'Haftalık sohbet programı.' }
// ============================================================
export const live = { videoId: '', note: '' };
export const schedule = [
  // { day: 'Cuma', time: '21:00', duration: 60, title: 'Cuma Sohbeti', description: 'Haftalık sohbet programı.' },
];

// ============================================================
//  PROGRAMLAR (seri sayfaları)
//  { slug: 'sohbet-saati', name: 'Sohbet Saati', description: '...', host: 'Sunucu adı (isteğe bağlı)' }
//  Videoları programa bağlamak için videos kaydına  program: 'sohbet-saati'  ekleyin.
//  Her videoya isteğe bağlı  transcript: 'Metin…\n\nİkinci paragraf…'  ve  slug  ekleyebilirsiniz.
// ============================================================
export const programs = [
  // { slug: 'sohbet-saati', name: 'Sohbet Saati', description: 'Haftalık sohbet programı.', host: '' },
];

// ============================================================
//  EKİP / YAYIN KURULU  (gerçek kişi bilgilerini siz ekleyin)
//  { name: 'Ad Soyad', role: 'Editör', bio: 'Kısa özgeçmiş', photo: '/img/ekip/ad.jpg' (isteğe bağlı) }
// ============================================================
export const team = [];

// ============================================================
//  FORMLAR (Soru Sor / Bülten)
//  Sunucu gerektirmeyen servislerden biriyle çalışır (örn. Formspree, Getform, Web3Forms, Netlify Forms).
//  endpoint: formun POST edileceği adres. Boşsa form, e-posta uygulamasını (mailto) açar.
// ============================================================
//  Web3Forms: mailler site e-postasına (info@mecmedya.org) düşer. Anahtar herkese açıktır (yalnızca bu adrese gönderim yapar).
const WEB3FORMS_KEY = '8e4cdab3-9133-4b4d-8ec0-bc724e9f1f3d';
const W3F = 'https://api.web3forms.com/submit';
export const forms = {
  askEndpoint: WEB3FORMS_KEY ? W3F : '',
  newsletterEndpoint: WEB3FORMS_KEY ? W3F : '',
  // Formlara eklenen gizli alanlar (anahtar, konu, spam tuzağı)
  fields(subject) {
    if (!WEB3FORMS_KEY) return '';
    const s = String(subject).replace(/"/g, '&quot;');
    return `<input type="hidden" name="access_key" value="${WEB3FORMS_KEY}"><input type="hidden" name="subject" value="${s}"><input type="hidden" name="from_name" value="MEC Web Sitesi">`;
  },
};

// ============================================================
//  FİTRE: Diyanet her yıl açıklar. Açıklanınca buraya yazın (TL). Boşsa kullanıcı kendisi girer.
// ============================================================
export const fitre = { amount: null, year: null };
