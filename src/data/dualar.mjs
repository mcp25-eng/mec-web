// Dua koleksiyonu: Arapça, okunuş, anlam, kaynak
export const duaGruplari = ['Günlük Dualar', 'Kur\'an\'dan Dualar', 'Sıkıntı ve Af Duaları'];

export const dualar = [
  // ---------------- Günlük dualar
  {
    id: 'yemege-baslarken', grup: 'Günlük Dualar', baslik: 'Yemeğe Başlarken',
    ar: 'بِسْمِ اللَّهِ', okunus: 'Bismillâh.',
    anlam: 'Allah\'ın adıyla (başlıyorum).',
    kaynak: 'Ebû Dâvûd, Et\'ime; Tirmizî, Et\'ime',
  },
  {
    id: 'yemekten-sonra', grup: 'Günlük Dualar', baslik: 'Yemekten Sonra',
    ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    okunus: 'Elhamdülillâhillezî et\'amenâ ve sekânâ ve cealenâ müslimîn.',
    anlam: 'Bizi yediren, içiren ve bizi Müslümanlardan kılan Allah\'a hamdolsun.',
    kaynak: 'Ebû Dâvûd, Et\'ime; Tirmizî, Da\'avât',
  },
  {
    id: 'uyumadan-once', grup: 'Günlük Dualar', baslik: 'Uyumadan Önce',
    ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', okunus: 'Bismikellâhümme emûtü ve ahyâ.',
    anlam: 'Allah\'ım! Senin adınla ölür (uyur) ve dirilirim (uyanırım).',
    kaynak: 'Buhârî, Da\'avât',
  },
  {
    id: 'uyaninca', grup: 'Günlük Dualar', baslik: 'Uyanınca',
    ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    okunus: 'Elhamdülillâhillezî ahyânâ ba\'de mâ emâtenâ ve ileyhin-nüşûr.',
    anlam: 'Bizi öldürdükten (uyuttuktan) sonra dirilten Allah\'a hamdolsun. Dönüş de O\'nadır.',
    kaynak: 'Buhârî, Da\'avât',
  },
  {
    id: 'evden-cikarken', grup: 'Günlük Dualar', baslik: 'Evden Çıkarken',
    ar: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    okunus: 'Bismillâhi tevekkeltü alallâhi ve lâ havle ve lâ kuvvete illâ billâh.',
    anlam: 'Allah\'ın adıyla, Allah\'a tevekkül ettim. Güç ve kuvvet ancak Allah\'tandır.',
    kaynak: 'Ebû Dâvûd, Edeb; Tirmizî, Da\'avât',
  },
  // ---------------- Kur'an'dan dualar
  {
    id: 'rabbena-atina', grup: 'Kur\'an\'dan Dualar', baslik: 'Rabbenâ Âtinâ Duası',
    ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    okunus: 'Rabbenâ âtinâ fid-dünyâ haseneten ve fîl-âhirati haseneten ve kınâ azâben-nâr.',
    anlam: 'Rabbimiz! Bize dünyada da iyilik ver, âhirette de iyilik ver ve bizi cehennem azabından koru.',
    kaynak: 'Bakara suresi, 201. ayet',
  },
  {
    id: 'rabbi-zidni-ilma', grup: 'Kur\'an\'dan Dualar', baslik: 'İlim İçin Dua',
    ar: 'رَبِّ زِدْنِي عِلْمًا', okunus: 'Rabbi zidnî ilmâ.',
    anlam: 'Rabbim! İlmimi artır.', kaynak: 'Tâhâ suresi, 114. ayet',
  },
  {
    id: 'rabbisrah', grup: 'Kur\'an\'dan Dualar', baslik: 'İşlerin Kolaylığı İçin (Hz. Mûsâ\'nın Duası)',
    ar: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي', okunus: 'Rabbişrah lî sadrî ve yessir lî emrî.',
    anlam: 'Rabbim! Gönlüme ferahlık ver ve işimi kolaylaştır.', kaynak: 'Tâhâ suresi, 25-26. ayetler',
  },
  {
    id: 'hasbunallah', grup: 'Kur\'an\'dan Dualar', baslik: 'Hasbünallâhü ve Ni\'me\'l-Vekîl',
    ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', okunus: 'Hasbünallâhü ve ni\'mel vekîl.',
    anlam: 'Allah bize yeter, O ne güzel vekildir.', kaynak: 'Âl-i İmrân suresi, 173. ayet',
  },
  {
    id: 'rabbena-la-tuzig', grup: 'Kur\'an\'dan Dualar', baslik: 'Hidayette Sebat İçin',
    ar: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ',
    okunus: 'Rabbenâ lâ tüziğ kulûbenâ ba\'de iz hedeytenâ ve heb lenâ min ledünke rahmeh, inneke entel vehhâb.',
    anlam: 'Rabbimiz! Bizi doğru yola ilettikten sonra kalplerimizi eğriltme. Bize katından bir rahmet bağışla. Şüphesiz çok bağışlayan sensin.',
    kaynak: 'Âl-i İmrân suresi, 8. ayet',
  },
  {
    id: 'aile-duasi', grup: 'Kur\'an\'dan Dualar', baslik: 'Aile ve Çocuklar İçin',
    ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    okunus: 'Rabbenâ heb lenâ min ezvâcinâ ve zürriyyâtinâ kurrate a\'yünin vec\'alnâ lil müttekîne imâmâ.',
    anlam: 'Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl ve bizi takva sahiplerine önder yap.',
    kaynak: 'Furkân suresi, 74. ayet',
  },
  {
    id: 'anne-baba', grup: 'Kur\'an\'dan Dualar', baslik: 'Anne Baba İçin',
    ar: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    okunus: 'Rabbenâğfir lî ve li vâlideyye ve lil mü\'minîne yevme yekûmül hisâb.',
    anlam: 'Rabbimiz! Hesabın görüleceği gün beni, anne babamı ve bütün müminleri bağışla.',
    kaynak: 'İbrâhîm suresi, 41. ayet',
  },
  {
    id: 'rabbirhamhuma', grup: 'Kur\'an\'dan Dualar', baslik: 'Anne Babaya Merhamet İçin',
    ar: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', okunus: 'Rabbirhamhümâ kemâ rabbeyânî sağîrâ.',
    anlam: 'Rabbim! Küçükken beni yetiştirdikleri gibi sen de onlara merhamet et.',
    kaynak: 'İsrâ suresi, 24. ayet',
  },
  // ---------------- Sıkıntı ve af duaları
  {
    id: 'yunus-duasi', grup: 'Sıkıntı ve Af Duaları', baslik: 'Hz. Yûnus\'un Duası',
    ar: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    okunus: 'Lâ ilâhe illâ ente sübhâneke innî küntü minez-zâlimîn.',
    anlam: 'Senden başka ilah yoktur. Seni tenzih ederim. Gerçekten ben zalimlerden oldum.',
    kaynak: 'Enbiyâ suresi, 87. ayet',
  },
  {
    id: 'adem-havva', grup: 'Sıkıntı ve Af Duaları', baslik: 'Hz. Âdem ve Havvâ\'nın Duası',
    ar: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    okunus: 'Rabbenâ zalemnâ enfüsenâ ve in lem tağfir lenâ ve terhamnâ le nekûnenne minel hâsirîn.',
    anlam: 'Rabbimiz! Kendimize zulmettik. Eğer bizi bağışlamaz ve bize merhamet etmezsen mutlaka ziyana uğrayanlardan oluruz.',
    kaynak: 'A\'râf suresi, 23. ayet',
  },
  {
    id: 'kerb-duasi', grup: 'Sıkıntı ve Af Duaları', baslik: 'Sıkıntı Anında (Kerb Duası)',
    ar: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
    okunus: 'Lâ ilâhe illallâhül azîmül halîm, lâ ilâhe illallâhü rabbül arşil azîm, lâ ilâhe illallâhü rabbüs semâvâti ve rabbül ardı ve rabbül arşil kerîm.',
    anlam: 'Yüce ve halîm olan Allah\'tan başka ilah yoktur. Yüce arşın Rabbi olan Allah\'tan başka ilah yoktur. Göklerin, yerin ve kerîm arşın Rabbi olan Allah\'tan başka ilah yoktur.',
    kaynak: 'Buhârî, Da\'avât; Müslim, Zikr',
  },
  {
    id: 'afuvv-duasi', grup: 'Sıkıntı ve Af Duaları', baslik: 'Af Dileme Duası (Kadir Gecesi Duası)',
    ar: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    okunus: 'Allâhümme inneke afüvvün tühıbbül afve fa\'fü annî.',
    anlam: 'Allah\'ım! Sen affedicisin, affı seversin; beni de affet.',
    kaynak: 'Tirmizî, Da\'avât; İbn Mâce, Dua',
  },
  {
    id: 'ya-mukallibel', grup: 'Sıkıntı ve Af Duaları', baslik: 'Din Üzere Sebat İçin',
    ar: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ', okunus: 'Yâ mukallibel kulûb, sebbit kalbî alâ dînik.',
    anlam: 'Ey kalpleri evirip çeviren Allah\'ım! Kalbimi dinin üzerinde sabit kıl.',
    kaynak: 'Tirmizî, Da\'avât',
  },
];
