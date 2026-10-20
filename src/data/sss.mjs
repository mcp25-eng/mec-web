// Soru-Cevap: Hanefî mezhebi esas alınmıştır. Her kayıt kendi sayfasına sahip olur.
// { slug, cat, q, short (arama sonucu/FAQ özeti, düz metin), a (HTML), links: [[href, etiket]] }
export const sssGruplari = ['İman ve İslam', 'Namaz', 'Abdest ve Temizlik', 'Oruç ve Ramazan', 'Zekât, Fitre ve Kurban', 'Hac ve Umre', 'Kur\'an, Dua ve Zikir', 'Genel'];

export const sss = [
  // ---------------------------------------------------------------- İman ve İslam
  {
    slug: 'islamin-sartlari-kactir',
    cat: 'İman ve İslam',
    q: 'İslam\'ın şartları kaçtır, nelerdir?',
    short: 'İslam\'ın şartı beştir: kelime-i şehadet, namaz, zekât, oruç ve gücü yetenler için hac.',
    a: `<p>Hz. Peygamber (s.a.v.) bir hadis-i şerifte şöyle buyurmuştur: "İslam beş temel üzerine kurulmuştur: Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın elçisi olduğuna şahitlik etmek, namaz kılmak, zekât vermek, hacca gitmek ve Ramazan orucunu tutmak." (Buhârî, Îmân, 1; Müslim, Îmân, 22)</p>
<ol><li><strong>Kelime-i şehadet</strong> getirmek</li><li><strong>Namaz</strong> kılmak (günde beş vakit)</li><li><strong>Zekât</strong> vermek (nisap miktarı mala sahip olanlar)</li><li><strong>Oruç</strong> tutmak (Ramazan ayında)</li><li><strong>Hac</strong> yapmak (bedenen ve malen gücü yetenler için ömürde bir kez)</li></ol>`,
    links: [['/temel-bilgiler/islamin-sartlari-ve-imanin-sartlari/', 'İslam\'ın şartları ve imanın şartları (ayrıntılı yazı)']],
  },
  {
    slug: 'imanin-sartlari-kactir',
    cat: 'İman ve İslam',
    q: 'İmanın şartları kaçtır?',
    short: 'İmanın şartı altıdır: Allah\'a, meleklere, kitaplara, peygamberlere, ahiret gününe ve kadere (hayır ve şerrin Allah\'tan olduğuna) inanmak.',
    a: `<p>Cebrâil hadisinde Peygamberimiz (s.a.v.) imanı şöyle tarif etmiştir: "İman; Allah'a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe ve kadere, yani hayrın da şerrin de Allah'tan olduğuna inanmandır." (Müslim, Îmân, 1)</p>
<ol><li>Allah'a inanmak</li><li>Meleklere inanmak</li><li>Kitaplara inanmak</li><li>Peygamberlere inanmak</li><li>Ahiret gününe inanmak</li><li>Kadere inanmak</li></ol>
<p>Ameldeki eksiklik imanı ortadan kaldırmaz; ancak iman, güzel amelle olgunlaşır.</p>`,
    links: [['/temel-bilgiler/islamin-sartlari-ve-imanin-sartlari/', 'İslam\'ın ve imanın şartları (ayrıntılı yazı)']],
  },
  {
    slug: 'islama-nasil-girilir',
    cat: 'İman ve İslam',
    q: 'Müslüman olmak için ne yapmak gerekir?',
    short: 'İslam\'a girmek için kelime-i şehadet\'i anlayarak, inanarak söylemek yeterlidir.',
    a: `<p>İslam'a girmek için bir törene, aracıya ya da belli bir mekâna ihtiyaç yoktur. İnanarak ve anlamını bilerek <strong>kelime-i şehadet</strong> getirmek yeterlidir:</p>
<p class="ar" lang="ar" dir="rtl">أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</p>
<p><em>Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve resûlüh.</em><br>Anlamı: "Allah'tan başka ilah olmadığına ve Muhammed'in O'nun kulu ve elçisi olduğuna şahitlik ederim."</p>
<p>Sonrasında namaz, oruç gibi ibadetleri adım adım öğrenmek ve uygulamak gerekir. Bunun için sitemizdeki ibadet rehberlerinden yararlanabilir, bir din görevlisinden destek alabilirsiniz.</p>`,
    links: [['/ibadet/', 'İbadet rehberleri'], ['/temel-bilgiler/', 'İslam ve İman yazıları']],
  },
  // ---------------------------------------------------------------- Namaz
  {
    slug: 'gunde-kac-vakit-namaz-farzdir',
    cat: 'Namaz',
    q: 'Günde kaç vakit namaz farzdır, kaç rekâttır?',
    short: 'Günde beş vakit namaz farzdır: sabah 2, öğle 4, ikindi 4, akşam 3, yatsı 4 rekât farz. Vitir namazı Hanefî mezhebinde vâciptir.',
    a: `<p>Beş vakit namaz her Müslümana farzdır: sabah, öğle, ikindi, akşam ve yatsı.</p>
<div class="table-wrap"><table class="takvim"><thead><tr><th>Vakit</th><th>Farz rekâtı</th></tr></thead><tbody>
<tr><td>Sabah</td><td>2</td></tr><tr><td>Öğle</td><td>4</td></tr><tr><td>İkindi</td><td>4</td></tr><tr><td>Akşam</td><td>3</td></tr><tr><td>Yatsı</td><td>4</td></tr></tbody></table></div>
<p>Hanefî mezhebine göre yatsıdan sonra üç rekât <strong>vitir</strong> namazı da vâciptir. Her vaktin sünnetleri ayrıca vardır; ayrıntılı tablo namaz rehberimizde yer alır.</p>`,
    links: [['/ibadet/namaz-nasil-kilinir/', 'Namaz nasıl kılınır?'], ['/namaz-vakitleri/', 'Namaz vakitleri']],
  },
  {
    slug: 'namazin-farzlari-kactir',
    cat: 'Namaz',
    q: 'Namazın farzları kaçtır, nelerdir?',
    short: 'Namazın farzı on ikidir: altısı namazın dışında (şartlar), altısı namazın içinde (rükünler).',
    a: `<p>Hanefî mezhebine göre namazın on iki farzı vardır:</p>
<h3>Namazın dışındaki farzlar (şartlar)</h3>
<ol><li>Hadesten taharet (abdestli olmak, gerekiyorsa gusletmek)</li><li>Necasetten taharet (beden, elbise ve yerin temiz olması)</li><li>Setr-i avret (avret yerlerini örtmek)</li><li>İstikbal-i kıble (kıbleye yönelmek)</li><li>Vakit (namazı vaktinde kılmak)</li><li>Niyet</li></ol>
<h3>Namazın içindeki farzlar (rükünler)</h3>
<ol><li>İftitah tekbiri (namaza başlarken tekbir almak)</li><li>Kıyam (ayakta durmak)</li><li>Kıraat (Kur'an'dan en az bir uzun veya üç kısa ayet okumak)</li><li>Rükû</li><li>Secde</li><li>Ka'de-i âhire (son oturuş, en az Tahiyyat kadar)</li></ol>`,
    links: [['/ibadet/namaz-nasil-kilinir/', 'Namaz nasıl kılınır?']],
  },
  {
    slug: 'yolculukta-namaz-nasil-kilinir',
    cat: 'Namaz',
    q: 'Yolculukta (seferîlikte) namaz nasıl kılınır?',
    short: 'Yaklaşık 90 km ve üzeri yolculukta dört rekâtlı farzlar iki rekât olarak kılınır (kasr).',
    a: `<p>Hanefî mezhebine göre yaklaşık 90 km (üç günlük yürüyüş mesafesi) ve daha uzun bir yolculuğa çıkan kişi <strong>mesafe-i seferî</strong> yapmış sayılır. Bu kişi şehirden ayrıldıktan sonra <strong>dört rekâtlı farzları (öğle, ikindi, yatsı) iki rekât</strong> olarak kılar. Buna <em>kasr</em> denir. Sabah, akşam ve vitir namazları aynen kılınır.</p>
<p>Gidilen yerde on beş gün veya daha fazla kalma niyeti varsa kişi mukim olur ve namazı tam kılar. Kasr, Hanefî mezhebinde ruhsat değil, azimettir; yani seferî olan kimse namazı kısaltarak kılar.</p>
<p>Seferîlikte sünnetlerin kılınması konusunda tercih edilen görüş, acele durumu yoksa kılınmasıdır; acelesi olan kişi sabahın sünneti dışındaki sünnetleri terk edebilir.</p>`,
    links: [],
  },
  {
    slug: 'kaza-namazi-nasil-kilinir',
    cat: 'Namaz',
    q: 'Kaza namazı nasıl kılınır, borcum nasıl hesaplanır?',
    short: 'Kaza namazı, her borç için niyet edilerek kılınır; vitir dâhil günde 6 vakit sayılır. Borç, bülûğ yaşından itibaren hesaplanır.',
    a: `<p>Vaktinde kılınamayan farz ve vitir namazlarının sonradan kılınmasına <strong>kaza</strong> denir. Kaza edilirken şu hususlara dikkat edilir:</p>
<ul><li>Niyet edilirken hangi vaktin kazası olduğu belirtilir: "Kılmadığım ilk sabah namazının kazasına niyet ettim" gibi.</li><li>Kazaya sadece farzlar (ve vitir) kaza edilir; sünnetler kaza edilmez.</li><li>Kaza namazı, bir mazeret yoksa gecikmeden kılınmalıdır. Borcu olan kişi bunu bir plan çerçevesinde bitirmeye çalışır.</li><li>Dört rekâtlı farzların kazası dört rekât, seferîlikte vaktinde kılınmayan namazın kazası ise iki rekât olarak yapılır.</li></ul>
<p>Borcunuzu tahmini olarak hesaplamak ve ne kadar sürede bitirebileceğinizi görmek için <a href="/kaza-namazi-hesaplama/">kaza namazı hesaplama aracını</a> kullanabilirsiniz.</p>`,
    links: [['/kaza-namazi-hesaplama/', 'Kaza namazı hesaplama aracı']],
  },
  {
    slug: 'cuma-namazi-kimlere-farzdir',
    cat: 'Namaz',
    q: 'Cuma namazı kimlere farzdır, kaç rekâttır?',
    short: 'Cuma namazı; hür, erkek, mukim, akıllı, ergen ve sağlıklı Müslümanlara farzdır. Farzı iki rekâttır.',
    a: `<p>Hanefî mezhebine göre Cuma namazı; erkek, akıllı, ergen, hür, mukim (yolcu olmayan), sağlıklı ve engeli bulunmayan Müslümanlara farzdır. Kadınlara farz değildir, ancak kılarlarsa geçerlidir ve öğle namazı yerine geçer.</p>
<p>Cuma namazı şöyle kılınır: dört rekât ilk sünnet, hutbe, iki rekât farz ve dört rekât son sünnet.</p>`,
    links: [['/ibadet/cuma-namazi-ve-cuma-gunu-adabi/', 'Cuma namazı ve Cuma günü adabı']],
  },
  {
    slug: 'cenaze-namazi-nasil-kilinir',
    cat: 'Namaz',
    q: 'Cenaze namazı nasıl kılınır?',
    short: 'Cenaze namazı farz-ı kifayedir; ayakta ve dört tekbirle kılınır, rükû ve secde yoktur.',
    a: `<p>Cenaze namazı <strong>farz-ı kifâye</strong>dir; bir kısım Müslümanlar kılınca diğerlerinden sorumluluk düşer. Namaz ayakta kılınır; rükû, secde ve oturuş yoktur. İki farzı vardır: dört tekbir ve kıyam.</p>
<ol><li>Niyet edilir ve ilk tekbir alınarak eller bağlanır; <em>Sübhâneke</em> okunur.</li><li>İkinci tekbirden sonra <em>Salli-Bârik</em> (Salavatlar) okunur.</li><li>Üçüncü tekbirden sonra cenaze duası okunur.</li><li>Dördüncü tekbir alınır; sağa ve sola selâm verilir.</li></ol>
<p>Cenaze namazı, abdestli olarak kılınır ve cenazenin önünde (imam, erkek cenazenin göğsü hizasında) durulur.</p>`,
    links: [],
  },
  // ---------------------------------------------------------------- Abdest
  {
    slug: 'abdestin-farzlari-kactir',
    cat: 'Abdest ve Temizlik',
    q: 'Abdestin farzları kaçtır, nelerdir?',
    short: 'Hanefî mezhebine göre abdestin farzı dörttür: yüzü yıkamak, kolları dirseklerle birlikte yıkamak, başın dörtte birini mesh etmek, ayakları topuklarla birlikte yıkamak.',
    a: `<p>Mâide Suresi 6. ayete göre Hanefî mezhebinde abdestin farzları dörttür:</p>
<ol><li>Yüzü yıkamak</li><li>Kolları dirseklerle birlikte yıkamak</li><li>Başın dörtte birini mesh etmek</li><li>Ayakları topuklarla birlikte yıkamak</li></ol>
<p>Besmele, el yıkama, ağza ve buruna su verme, diş fırçalama (misvak) gibi uygulamalar ise abdestin sünnetleridir.</p>`,
    links: [['/ibadet/abdest-nasil-alinir/', 'Abdest nasıl alınır?']],
  },
  {
    slug: 'abdesti-bozan-seyler',
    cat: 'Abdest ve Temizlik',
    q: 'Abdesti ne bozar?',
    short: 'Ön ve arka yoldan bir şey çıkması, vücuttan kan veya irin akması, ağız dolusu kusmak, bayılmak ve yatarak uyumak abdesti bozar.',
    a: `<p>Hanefî mezhebine göre abdesti bozan başlıca durumlar şunlardır:</p>
<ul><li>Ön veya arka yoldan idrar, dışkı, yel, meni, mezi gibi bir şeyin çıkması</li><li>Vücudun herhangi bir yerinden kan veya irin çıkıp, akıp yara yerinden dışarı yayılması</li><li>Ağız dolusu kusmak</li><li>Yatarak, bir şeye dayanarak veya yaslanarak uyumak</li><li>Bayılmak, aklı gidecek derecede sarhoş olmak veya delirmek</li><li>Rükû ve secdeli bir namazda sesli gülmek (kahkaha)</li></ul>
<p>Hanefî mezhebinde kadına veya cinsel organa dokunmak abdesti bozmaz. Bu konuda mezhepler arasında görüş farklılıkları vardır.</p>`,
    links: [['/ibadet/abdest-nasil-alinir/', 'Abdest nasıl alınır?']],
  },
  {
    slug: 'teyemmum-nasil-yapilir',
    cat: 'Abdest ve Temizlik',
    q: 'Teyemmüm nasıl yapılır, ne zaman yapılır?',
    short: 'Su bulunmadığında veya kullanılamadığında, niyet edip ellerle toprak cinsi bir yere iki kez vurarak yüz ve kolları meshetmekle yapılır.',
    a: `<p>Su bulunmayan, suyu kullanmanın zarar vereceği (hastalık gibi) veya suya ulaşmanın mümkün olmadığı durumlarda abdest ve gusül yerine <strong>teyemmüm</strong> yapılır.</p>
<ol><li>Niyet edilir ve besmele çekilir.</li><li>Eller toprak, taş, kum gibi toprak cinsi temiz bir yere vurulur; ellerdeki fazla toz silkelenir ve tüm yüz mesh edilir.</li><li>Eller tekrar yere vurulur; sol elle sağ kol, sağ elle sol kol dirseklerle birlikte mesh edilir.</li></ol>
<p>Teyemmümün farzları niyet, yüzü mesh ve kolları dirseklerle birlikte mesh etmektir. Teyemmüm, abdesti bozan şeylerle ve suyun bulunmasıyla bozulur.</p>`,
    links: [],
  },
  {
    slug: 'gusul-abdesti-nasil-alinir',
    cat: 'Abdest ve Temizlik',
    q: 'Gusül abdesti nasıl alınır, farzları nelerdir?',
    short: 'Gusülün farzı üçtür: ağıza su vermek, buruna su vermek ve bütün vücudu yıkamak.',
    a: `<p>Hanefî mezhebine göre guslün farzları üçtür:</p>
<ol><li>Ağıza su vermek (gargara yapmak)</li><li>Burna su vermek</li><li>Bütün vücudu bir kuru yer kalmayacak şekilde yıkamak</li></ol>
<p>Gusle niyet edilir ve besmele çekilir; önce eller ve avret yeri yıkanır, abdest alınır (ayaklar sona bırakılabilir), ardından baştan başlayıp önce sağ omuz, sonra sol omuza su dökülür ve vücudun tamamı yıkanır.</p>
<p>Cünüplük, hayız ve nifas hâlinde gusül gereklidir. Cünüp kişi gusül yapmadan namaz kılamaz, Kur'an okuyamaz ve mescide giremez.</p>`,
    links: [],
  },
  {
    slug: 'hayiz-halinde-namaz-ve-oruc',
    cat: 'Abdest ve Temizlik',
    q: 'Hayız ve nifas döneminde namaz ve oruç ne olur?',
    short: 'Hayız ve nifas hâlinde kadın namaz kılmaz ve oruç tutmaz. Namazları kaza etmez, tutamadığı oruçları sonradan kaza eder.',
    a: `<p>Hayız (aybaşı) ve nifas (lohusalık) dönemlerinde kadınlar <strong>namaz kılmaz ve oruç tutmaz</strong>. Bu bir ruhsat değil, hükümdür.</p>
<ul><li><strong>Namaz:</strong> Bu günlerde kılınmayan namazlar kaza edilmez.</li><li><strong>Oruç:</strong> Tutulamayan Ramazan oruçları, temizlendikten sonra, diğer günlerde kaza edilir.</li></ul>
<p>Hayız ve nifas bittiğinde gusül yapmak gerekir. Bu dönemde Kur'an okumak ve mushafa dokunmak Hanefî mezhebinde caiz değildir; dua ve zikir yapılabilir.</p>`,
    links: [],
  },
  // ---------------------------------------------------------------- Oruç
  {
    slug: 'orucu-bozan-seyler',
    cat: 'Oruç ve Ramazan',
    q: 'Orucu bozan şeyler nelerdir?',
    short: 'Bile bile yemek, içmek ve cinsel ilişki orucu bozar. Unutarak yemek içmek orucu bozmaz.',
    a: `<p>Orucu bozan hâller iki grupta incelenir:</p>
<h3>Hem kaza hem kefaret gerektirenler</h3>
<p>Ramazan orucu sırasında, bile bile ve isteyerek yemek, içmek veya cinsel ilişkide bulunmak.</p>
<h3>Sadece kaza gerektirenler</h3>
<ul><li>Bilerek ağız dolusu kusmak</li><li>Hata ile bir şey yutmak (örneğin gargara yaparken istemeden su yutmak)</li><li>Gıda ve ilaç niteliğinde olmayan şeyleri yutmak</li><li>Sahurun bittiğinden habersiz yemek-içmek (sabah vakti girmiş olduğu sonradan anlaşılırsa)</li></ul>
<h3>Orucu bozmayanlar</h3>
<p>Unutarak yemek ve içmek, diş fırçalamak, kendiliğinden kusmak, gözdeki ilaç, boğaza kaçan toz veya sinek gibi şeyler orucu bozmaz.</p>`,
    links: [['/dini-gunler/ramazan-ayi-ve-oruc/', 'Ramazan ayı ve oruç rehberi']],
  },
  {
    slug: 'fidye-kimlere-gerekir',
    cat: 'Oruç ve Ramazan',
    q: 'Fidye kimlere gerekir, miktarı nedir?',
    short: 'Oruç tutamayacak kadar yaşlı olanlar ve iyileşmesi umulmayan hastalar için her gün bir fakiri doyuracak kadar (bir fitre miktarı) fidye verilir.',
    a: `<p>Oruç tutmaya gücü yetmeyen yaşlılar ile iyileşme ümidi bulunmayan kronik hastalar, tutamadıkları her bir gün için <strong>fidye</strong> verirler.</p>
<ul><li>Fidye miktarı bir fitre miktarına (yarım sa' buğday) eşittir; her yıl Diyanet bu miktarı açıklar.</li><li>Bir fakire, günün öğle ve akşam yemeği olarak doyuracak şekilde yemek verilebilir veya karşılığı para olarak ödenebilir.</li><li>Geçici hastalık, yolculuk gibi mazeretlerde fidye değil, kaza gerekir.</li></ul>
<p>Fidye verdikten sonra tekrar tutacak gücü bulursa, fidye yerine kaza oruç tutmak gerekir.</p>`,
    links: [],
  },
  {
    slug: 'kadir-gecesi-ne-zaman',
    cat: 'Oruç ve Ramazan',
    q: 'Kadir Gecesi ne zaman, nasıl değerlendirilir?',
    short: 'Kadir Gecesi Ramazan ayının son on gününde aranır; çoğunlukla 27. gece olarak kabul edilir. Bin aydan hayırlıdır.',
    a: `<p>Kadir Suresi'nde Kur'an'ın indirildiği bu gecenin "bin aydan daha hayırlı" olduğu bildirilir. Peygamberimiz (s.a.v.) bu geceyi Ramazan'ın son on gününün tek gecelerinde aramamızı tavsiye etmiştir. (Buhârî, Leyletü'l-Kadr, 3) Halk arasında en yaygın kabul 27. gecedir.</p>
<p>Bu geceyi değerlendirmek için nafile namaz, Kur'an okumak, tevbe istiğfar etmek, zikir ve dua etmek tavsiye edilir. Hz. Âişe'ye "Kadir Gecesi'ni bulursam ne diyeyim?" diye sorulduğunda Peygamberimiz şu duayı öğretmiştir: <em>"Allâhümme inneke afüvvün tuhıbbü'l-afve fa'fü annî."</em> (Allah'ım! Sen affedicisin, affetmeyi seversin; beni de affet.) (Tirmizî, Da'avât, 85)</p>`,
    links: [['/dini-gunler-takvimi/', 'Dini günler takvimi']],
  },
  // ---------------------------------------------------------------- Zekât
  {
    slug: 'zekat-nisabi-nedir',
    cat: 'Zekât, Fitre ve Kurban',
    q: 'Zekât nisabı nedir, zekât oranı kaçtır?',
    short: 'Nisap, Diyanet\'e göre 80,18 gram altın değerindeki mal varlığıdır. Üzerinden bir yıl geçince kırkta bir (%2,5) zekât verilir.',
    a: `<p>Zekât, ihtiyaç fazlası malı nisap miktarına ulaşan ve üzerinden bir kameri yıl geçen Müslümanlara farzdır. Diyanet İşleri Başkanlığı nisabı <strong>80,18 gram altın</strong> değerinde kabul etmektedir. Zekât oranı <strong>kırkta bir</strong>, yani %2,5'tir.</p>
<p>Altın, gümüş, nakit para, ticaret malları ve alacaklar zekâta tabidir; borçlar ve temel ihtiyaçlar düşüldükten sonra kalan miktar hesaplanır. Güncel altın fiyatına göre nisap miktarını ve zekât tutarını bulmak için <a href="/zekat-hesaplama/">zekât hesaplama aracını</a> kullanabilirsiniz.</p>`,
    links: [['/zekat-hesaplama/', 'Zekât hesaplama aracı'], ['/ibadet/zekat-nedir-kimlere-verilir/', 'Zekât rehberi']],
  },
  {
    slug: 'zekat-kimlere-verilir',
    cat: 'Zekât, Fitre ve Kurban',
    q: 'Zekât kimlere verilir, kimlere verilmez?',
    short: 'Zekât, Tevbe Suresi 60. ayette sayılan sekiz sınıfa verilir: fakirler, miskinler, zekât görevlileri, kalpleri ısındırılacaklar, köleler, borçlular, Allah yolunda olanlar ve yolcular.',
    a: `<p>Zekâtın verileceği sekiz sınıf Tevbe Suresi 60. ayette bildirilmiştir: fakirler, miskinler, zekât toplayan görevliler, kalpleri İslam'a ısındırılacak olanlar, köleler (hürriyetini kazanmak isteyenler), borçlular, Allah yolunda olanlar ve yolcular.</p>
<p>Zekât şu kişilere verilmez: nisap miktarı mala sahip olanlara, kişinin usûlü ve fürûuna (anne-baba, dede-nine ve çocukları, torunları) ve eşine. Kardeşlere ve diğer akrabalara, ihtiyaç sahibi iseler verilebilir ve bu daha faziletlidir.</p>`,
    links: [['/zekat-hesaplama/', 'Zekât hesaplama aracı']],
  },
  {
    slug: 'fitre-ne-zaman-verilir',
    cat: 'Zekât, Fitre ve Kurban',
    q: 'Fitre ne zaman ve kimlere verilir? Miktarı nedir?',
    short: 'Fitre Ramazan ayı içinde ve en geç bayram namazına kadar verilir. Miktarı her yıl Diyanet tarafından ilan edilir.',
    a: `<p>Sadaka-i fıtır (fitre), temel ihtiyaçlarının dışında nisap miktarı mala sahip olan Müslümanlar için vâciptir. Kişi kendisi ve bakmakla yükümlü olduğu kişiler (eş, küçük çocuklar) adına verir.</p>
<ul><li>Ramazan ayı içinde veya Ramazan Bayramı namazından önce verilmesi uygundur.</li><li>Miktarı, buğday ve benzeri gıdaların fiyatına göre her yıl Diyanet İşleri Başkanlığı tarafından açıklanır; kişi başı tutar o açıklamaya göre ödenir.</li><li>Zekâtın verildiği sekiz sınıfa verilir; ana-babaya, çocuğa ve eşe verilmez.</li></ul>
<p>Hane halkınız için toplam tutarı <a href="/zekat-hesaplama/#fitre">fitre hesaplayıcıdan</a> bulabilirsiniz.</p>`,
    links: [['/zekat-hesaplama/#fitre', 'Fitre hesaplayıcı']],
  },
  {
    slug: 'kurban-kimlere-vacip',
    cat: 'Zekât, Fitre ve Kurban',
    q: 'Kurban kimlere vâciptir, ne zaman kesilir?',
    short: 'Hanefî mezhebine göre kurban, mukim ve nisap miktarı mala sahip Müslümanlara vâciptir. Bayramın ilk üç günü kesilir.',
    a: `<p>Hanefî mezhebine göre kurban kesmek; akıllı, ergen, mukim ve temel ihtiyaçlarının dışında nisap miktarı mala sahip olan Müslümanlara vâciptir.</p>
<ul><li><strong>Zamanı:</strong> Kurban Bayramı'nın birinci günü bayram namazından sonra, üçüncü günün akşamına kadar.</li><li><strong>Hayvan:</strong> Koyun ve keçi (en az 1 yaşında), sığır ve manda (en az 2 yaşında), deve (en az 5 yaşında).</li><li><strong>Hisse:</strong> Koyun-keçi bir kişi adına, sığır-manda ve deve en çok yedi kişi adına kesilebilir.</li><li><strong>Dağıtım:</strong> Etin üçte birinin ihtiyaç sahiplerine verilmesi müstehaptır; kalan kısım kişi ve ailesi tarafından yenilebilir veya akraba ve komşulara dağıtılabilir.</li></ul>`,
    links: [['/dini-gunler/kurban-ibadeti-ve-kurban-bayrami/', 'Kurban ibadeti ve Kurban Bayramı']],
  },
  // ---------------------------------------------------------------- Hac
  {
    slug: 'hac-kimlere-farzdir',
    cat: 'Hac ve Umre',
    q: 'Hac kimlere farzdır, umre farz mıdır?',
    short: 'Hac, bedenen ve malen gücü yeten Müslümana ömürde bir kez farzdır. Umre Hanefî mezhebinde müekked sünnettir.',
    a: `<p>Âl-i İmrân Suresi 97. ayete göre hac, yoluna gücü yeten herkese farzdır. Güç yetirmek; sağlıklı olmak, yolculuk masrafını ve dönüşe kadar ailenin geçimini karşılayabilmek ve yolun güvenli olmasıdır. Hac ömürde bir kez farzdır.</p>
<p>Umre, Hanefî mezhebinde müekked sünnettir; yılın her günü yapılabilir. Hac ayları ve belirli günlerde yapılan umre ayrı bir sevap taşır.</p>
<p>Haccın farzları: ihrama girmek, Arafat'ta vakfe yapmak ve ziyaret (ifâda) tavafı yapmaktır.</p>`,
    links: [['/ibadet/hac-ve-umre-nasil-yapilir/', 'Hac ve umre nasıl yapılır?']],
  },
  // ---------------------------------------------------------------- Kur'an, dua
  {
    slug: 'kuran-okurken-abdest-sart-mi',
    cat: 'Kur\'an, Dua ve Zikir',
    q: 'Kur\'an okumak için abdest şart mı?',
    short: 'Mushafa dokunmak için abdest gerekir. Ezberden okumak için abdest şart değildir ama abdestli okumak daha güzeldir. Cünüp, hayızlı ve nifaslı kişi Kur\'an okuyamaz.',
    a: `<p>Hanefî mezhebine göre mushafa (Arapça Kur'an'a) dokunmak için abdestli olmak gerekir. Abdestsiz olarak ezberden okumak caizdir; ancak abdestli olarak okumak daha faziletlidir.</p>
<p>Cünüp, hayızlı ve nifaslı kimsenin Kur'an okuması caiz değildir; bu kişiler dua ve zikir yapabilir. Kur'an meali ve tercümeleri için de abdest tavsiye edilir.</p>
<p>Telefon veya bilgisayar ekranından Kur'an okumak için abdest şartı olmadığı görüşü yaygındır; yine de saygı gereği abdestli olunması güzeldir.</p>`,
    links: [['/kuran-i-kerim/kuran-okuma-adabi-ve-hatim/', 'Kur\'an okuma adabı ve hatim'], ['/kuran/', 'Kur\'an-ı Kerim oku']],
  },
  {
    slug: 'hatim-nasil-yapilir',
    cat: 'Kur\'an, Dua ve Zikir',
    q: 'Hatim nasıl yapılır, günde kaç sayfa okunmalı?',
    short: 'Kur\'an 604 sayfa ve 30 cüzdür. Günde 20 sayfa okunursa 30 günde, 5 sayfa okunursa yaklaşık 4 ayda hatim tamamlanır.',
    a: `<p>Hatim, Kur'an-ı Kerim'in baştan sona okunmasıdır. Medine mushafında 604 sayfa ve 30 cüz bulunur. Okuma planı tamamen kişiye bağlıdır:</p>
<ul><li>Günde 20 sayfa (1 cüz): 30 günde</li><li>Günde 10 sayfa (yarım cüz): 60 günde</li><li>Günde 5 sayfa (her namazdan sonra 1 sayfa): yaklaşık 121 günde</li></ul>
<p>Hatim ilerlemenizi takip etmek ve günlük hedefinizi hesaplamak için <a href="/hatim-takip/">hatim takip aracını</a> kullanabilirsiniz. Ramazan ayında 30 günde hatim yapmak yaygın bir gelenektir.</p>`,
    links: [['/hatim-takip/', 'Hatim takip aracı']],
  },
  {
    slug: 'istihare-namazi-nasil-kilinir',
    cat: 'Kur\'an, Dua ve Zikir',
    q: 'İstihare namazı ve duası nasıl yapılır?',
    short: 'İstihare, karar verirken hayırlısını istemek için iki rekât nafile namaz kılıp istihare duasını okumaktır.',
    a: `<p>İstihare, bir işte karar vermekte zorlandığımızda Allah'tan hayırlısını dilemektir. Cabir (r.a.) anlatıyor: "Peygamberimiz bize Kur'an'dan bir sureyi öğretir gibi her işte istihareyi öğretirdi." (Buhârî, Da'avât, 48)</p>
<ol><li>Abdest alınır ve (mekruh vakit değilse) iki rekât nafile namaz kılınır.</li><li>Selamdan sonra istihare duası okunur: <em>"Allâhümme innî estehıruke bi ilmike…"</em></li><li>Dua sırasında kişi, yapmak istediği işi aklından geçirir.</li></ol>
<p>İstihare sonucunda rüya görmek şart değildir; kalbin bir tarafa meyletmesi ve işlerin kolaylaşması ya da zorlaşması bir işarettir. Bu arada danışılması gereken kimselere danışmak da gerekir.</p>`,
    links: [['/ibadet/nafile-namazlar-teheccud-duha-istihare/', 'Nafile namazlar ve istihare']],
  },
  {
    slug: 'teheccud-namazi-kac-rekattir',
    cat: 'Kur\'an, Dua ve Zikir',
    q: 'Teheccüd namazı kaç rekâttır, ne zaman kılınır?',
    short: 'Teheccüd namazı yatsıdan sonra uyuyup kalkıldığında gecenin son üçte birinde kılınır; iki rekât olarak başlar, çoğunlukla sekiz rekâta kadar kılınır.',
    a: `<p>Teheccüd, gece uykudan kalkıp kılınan nafile namazdır. En faziletli zaman gecenin son üçte biridir. İkişer rekât halinde kılınır; en az iki rekât, çoğunlukla sekiz rekâta kadar kılınabilir. Hz. Peygamber (s.a.v.) bu namazı çok önemser ve devam ettirirdi.</p>
<p>Gecenin son üçte birini hesaplamak için yatsı ve imsak (sabah) vakitleri arasındaki süreyi üçe bölebilirsiniz. <a href="/namaz-vakitleri/">Namaz vakitleri</a> sayfamızdan şehrinizin vakitlerine bakabilirsiniz.</p>`,
    links: [['/ibadet/nafile-namazlar-teheccud-duha-istihare/', 'Nafile namazlar rehberi']],
  },
  {
    slug: 'namaz-sonrasi-tesbihat-nasil-yapilir',
    cat: 'Kur\'an, Dua ve Zikir',
    q: 'Namaz sonrası tesbihat nasıl yapılır?',
    short: 'Farz namazdan sonra 33 Sübhânallah, 33 Elhamdülillah, 33 (ya da 34) Allâhü ekber söylenir.',
    a: `<p>Farz namazların ardından Peygamberimizin (s.a.v.) tavsiye ettiği tesbihat şöyledir: 33 defa <em>Sübhânallah</em>, 33 defa <em>Elhamdülillah</em> ve 33 defa <em>Allâhü ekber</em>; toplam 99'u tamamlamak için ardından <em>"Lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehü'l-mülkü ve lehü'l-hamdü ve hüve alâ külli şey'in kadîr"</em> denir. (Müslim, Mesâcid, 146) Ayrıca Âyetü'l-Kürsî ve Fâtiha okunması tavsiye edilir.</p>
<p>Sayıyı <a href="/zikirmatik/">zikirmatik</a> ile kolayca takip edebilir, Âyetü'l-Kürsî'yi <a href="/kisa-sureler/#ayetel-kursi">sureler sayfasından</a> okuyabilirsiniz.</p>`,
    links: [['/zikirmatik/', 'Zikirmatik'], ['/dua-ve-zikir/gunluk-zikirler-ve-dua-adabi/', 'Günlük zikirler ve dua adabı']],
  },
  // ---------------------------------------------------------------- Genel
  {
    slug: 'hicri-takvim-miladi-takvim-farki',
    cat: 'Genel',
    q: 'Hicri takvim ile miladi takvim arasındaki fark nedir?',
    short: 'Hicri takvim ay yılıdır (354-355 gün); miladi takvim güneş yılıdır (365-366 gün). Bu yüzden dinî günler her yıl yaklaşık 11 gün öne kayar.',
    a: `<p>Hicri takvim, Ay'ın hareketlerine göre belirlenir ve 12 aydan oluşan yıl 354 veya 355 gündür. Miladi takvim ise Güneş'e göre hesaplanır ve 365 (artık yıllarda 366) gündür. Aradaki yaklaşık 11 günlük fark nedeniyle Ramazan, bayramlar ve kandiller miladi takvimde her yıl 10-11 gün önceye kayar.</p>
<p>Hicri takvimin başlangıcı, Hz. Peygamber'in Mekke'den Medine'ye hicretidir (milâdî 622). Hicri yıl, ayın hilalinin görülmesiyle başlar.</p>`,
    links: [['/dini-gunler/hicri-takvim-ve-aylar-asure/', 'Hicri takvim ve aylar'], ['/dini-gunler-takvimi/', 'Dini günler takvimi']],
  },
  {
    slug: 'hz-muhammed-ne-zaman-dogdu',
    cat: 'Genel',
    q: 'Hz. Muhammed (s.a.v.) ne zaman doğdu, ne zaman vefat etti?',
    short: 'Peygamberimiz yaklaşık 571 yılında Mekke\'de doğdu, 610\'da ilk vahiy geldi, 622\'de hicret etti ve 632\'de Medine\'de vefat etti.',
    a: `<p>Hz. Muhammed (s.a.v.) Fil Yılı olarak bilinen yılda, yaklaşık milâdi 570-571 yılında Mekke'de doğdu. Kabul gören görüşe göre doğum günü Rebîülevvel ayının 12. gecesidir (Mevlid Kandili).</p>
<ul><li><strong>610 civarı:</strong> Hira Mağarası'nda ilk vahiy (Alak Suresi'nin ilk ayetleri) geldi.</li><li><strong>622:</strong> Mekke'den Medine'ye hicret etti.</li><li><strong>632:</strong> Medine'de 63 yaşında vefat etti.</li></ul>`,
    links: [['/siyer/hz-muhammed-in-hayati/', 'Hz. Muhammed\'in hayatı']],
  },
  {
    slug: 'kandil-geceleri-nasil-degerlendirilir',
    cat: 'Genel',
    q: 'Kandil geceleri nasıl değerlendirilir?',
    short: 'Kandil geceleri için özel bir ibadet şekli yoktur; nafile namaz, Kur\'an, zikir, dua, tevbe ve istiğfarla değerlendirilir.',
    a: `<p>Kandiller; Mevlid, Regaib, Miraç, Berat ve Kadir geceleri olmak üzere beş gecedir. Bu geceler için dinen belirlenmiş özel bir ibadet şekli veya sayısı yoktur. Bu geceleri nafile namaz, Kur'an okumak, zikir, dua, tevbe ve istiğfar, akrabaları ve hasta ziyaretleri, sadaka vermek ve kaza namazı borcu olanlar için kaza namazı kılmakla değerlendirmek güzeldir.</p>
<p>Kandil gecelerinin tarihlerini <a href="/dini-gunler-takvimi/">dini günler takvimi</a> sayfasından görebilirsiniz.</p>`,
    links: [['/dini-gunler/kandil-geceleri-ve-onemi/', 'Kandil geceleri ve önemi'], ['/dini-gunler-takvimi/', 'Dini günler takvimi']],
  },
  {
    slug: 'namaz-vakitleri-nasil-belirlenir',
    cat: 'Genel',
    q: 'Namaz vakitleri nasıl belirlenir?',
    short: 'Namaz vakitleri Güneş\'in gökyüzündeki konumuna ve gölge uzunluğuna göre astronomik olarak hesaplanır. Türkiye\'de Diyanet vakitleri esas alınır.',
    a: `<p>Namaz vakitleri Güneş'in hareketine göre belirlenir: sabah namazı fecr-i sadık (gerçek tan) ile başlar ve güneş doğana kadar sürer. Öğle, güneşin zeval noktasını geçmesiyle girer. İkindi, Hanefî mezhebinde cismin gölgesinin kendisinin iki katına ulaşmasıyla; akşam, güneşin batışıyla; yatsı ise ufuktaki kızıllığın (şafağın beyazlığı) kaybolmasıyla başlar.</p>
<p>Türkiye'de Diyanet İşleri Başkanlığı'nın hesapladığı vakitler esas alınır. Sitemizdeki <a href="/namaz-vakitleri/">namaz vakitleri</a> sayfası da Diyanet yöntemini kullanır.</p>`,
    links: [['/namaz-vakitleri/', 'Namaz vakitleri']],
  },
];
