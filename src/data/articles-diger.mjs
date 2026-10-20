import { v } from './helpers.mjs';

export const diger = [
  // ---------------------------------------------------------------- RAMAZAN
  {
    slug: 'ramazan-ayi-ve-oruc',
    category: 'dini-gunler',
    title: 'Ramazan Ayı ve Oruç: Orucun Şartları, Orucu Bozanlar ve Faziletleri',
    description:
      'Ramazan ayının önemi, orucun farzları ve şartları, orucu bozan ve bozmayan durumlar, sahur ve iftar adabı, fitre hakkında kısa ve kapsamlı rehber.',
    keywords: ['ramazan ayı', 'oruç nasıl tutulur', 'orucu bozan şeyler', 'orucun şartları', 'sahur ve iftar', 'fitre nedir'],
    date: '2026-09-12',
    summary: 'Orucun şartları, orucu bozan ve bozmayan durumlar, sahur ve iftar adabı ile Ramazan\'ın faziletleri.',
    body: `
<p>Ramazan, hicrî takvimin dokuzuncu ayıdır. Kur'an-ı Kerim bu ayda indirilmeye başlanmış, oruç bu ayda farz kılınmıştır. Ramazan; rahmetin, mağfiretin ve bereketin yağmur gibi yağdığı mübarek bir aydır.</p>
${v('يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ', 'Ey iman edenler! Oruç, sizden öncekilere farz kılındığı gibi size de farz kılındı. Umulur ki korunursunuz.', 'Bakara suresi, 183. ayet')}

<h2>Oruç Kimlere Farzdır?</h2>
<p>Müslüman, akıllı ve ergenlik çağına ermiş, oruç tutmasına engel bir hâli (hastalık, yolculuk, hayız ve nifas gibi) bulunmayan herkese Ramazan orucu farzdır.</p>

<h2>Orucun Farzları</h2>
<ol>
  <li><strong>Niyet:</strong> Oruca kalben niyet etmek. Ramazan orucunda niyet, imsaktan önce veya gün ortasından (zeval) önce yapılabilir.</li>
  <li><strong>İmsak:</strong> Fecrin doğuşundan (imsak) güneşin batışına (iftar) kadar orucu bozan şeylerden uzak durmak.</li>
</ol>

<h2>Orucu Bozan Durumlar</h2>
<ul>
  <li>Kasten yemek ve içmek</li>
  <li>Cinsel ilişki</li>
  <li>Kasten ağız dolusu kusmak</li>
  <li>Yiyecek veya ilaç niteliğindeki bir şeyi bilerek yutmak</li>
</ul>
<p>Kan aldırma, iğne yaptırma gibi tıbbî durumlarda hüküm farklı olabilir; bu konuda bir din görevlisine danışmak uygundur. Unutarak yemek veya içmek orucu bozmaz. Bunu hatırlayan kişi orucuna devam eder.</p>

<h2>Oruç Tutmayı Kolaylaştıran Mazeretler</h2>
<p>Hastalık ve yolculuk gibi mazeretler sebebiyle oruç tutamayanlar, mazeretleri kalktıktan sonra tutamadıkları günleri kaza eder. Oruç tutacak gücü olmayan yaşlı veya devamlı hastalar ise fidye verir.</p>
${v('فَمَنْ كَانَ مِنْكُمْ مَرِيضًا أَوْ عَلَى سَفَرٍ فَعِدَّةٌ مِنْ أَيَّامٍ أُخَرَ', 'Sizden kim hasta olur veya yolculukta bulunursa tutamadığı günler sayısınca başka günlerde oruç tutar.', 'Bakara suresi, 184. ayet')}

<h2>Sahur ve İftar</h2>
<p>Sahur yapmak sünnettir. Resûlullah (s.a.v.) şöyle buyurmuştur:</p>
${v('تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً', 'Sahur yapın, çünkü sahurda bereket vardır.', 'Buhârî, Müslim')}
<p>İftarı vakit girer girmez, mümkünse hurma veya su ile açmak sünnettir. İftar sofrasında israftan kaçınmak, komşuya ve yoksula ikram etmek Ramazan'ın ruhuna daha uygundur.</p>

<h2>Teravih Namazı ve Fitre</h2>
<p>Teravih, Ramazan gecelerinde yatsı namazından sonra kılınan sünnet bir namazdır. Hanefî mezhebine göre yirmi rekâttır. Fitre ise Ramazan bayramı namazından önce, maddî imkânı olan Müslümanların aile fertleri adına verdikleri sadakadır. Güncel miktarı her yıl Diyanet tarafından açıklanır.</p>

<h2>Ramazan'ı Değerlendirmek</h2>
<p>Oruç, sadece aç kalmak değil; dili, gözü, kulağı ve kalbi günahlardan korumaktır. Bu ayda Kur'an okumaya, dua ve zikre, sadaka vermeye, akrabayı ziyarete ve gönül kırmamaya özel önem vermek gerekir.</p>
`,
    faq: [
      { q: 'Oruç niyeti nasıl yapılır?', a: 'Niyet kalple yapılır. "Yarın Ramazan orucunu tutmaya niyet ettim" diye düşünmek yeterlidir. Dil ile söylemek şart değildir.' },
      { q: 'Unutarak yemek orucu bozar mı?', a: 'Hayır, unutarak yiyip içmek orucu bozmaz. Hatırladığı anda yemeyi bırakıp orucuna devam etmelidir.' },
      { q: 'Fitre nedir, kimler verir?', a: 'Fitre, Ramazan bayramından önce temel ihtiyaçlarının dışında nisap miktarı mala sahip olan Müslümanların, kendileri ve bakmakla yükümlü oldukları kişiler adına verdiği sadakadır.' },
    ],
    sources: ['Bakara suresi, 183-185. ayetler', 'Buhârî, Savm', 'Diyanet İşleri Başkanlığı, İlmihal'],
  },

  // ---------------------------------------------------------------- KANDİLLER
  {
    slug: 'kandil-geceleri-ve-onemi',
    category: 'dini-gunler',
    title: 'Kandil Geceleri ve Mübarek Günler: Regaib, Miraç, Berat, Kadir ve Mevlid',
    description:
      'Kandil geceleri nelerdir? Regaib, Miraç, Berat, Kadir ve Mevlid kandillerinin anlamı, hangi aylarda olduğu ve bu geceleri nasıl değerlendirebileceğiniz.',
    keywords: ['kandil geceleri', 'regaib kandili', 'miraç kandili', 'berat kandili', 'kadir gecesi', 'mevlid kandili', 'kandil günü ne yapılır'],
    date: '2026-09-05',
    summary: 'Beş kandil gecesinin anlamı, hicrî takvimdeki yeri ve bu mübarek geceleri değerlendirme yolları.',
    body: `
<p>Kandil geceleri, Müslümanların asırlardır önem verdiği, bol dua ve ibadetle geçirdiği mübarek gecelerdir. Osmanlı döneminde minarelere kandil yakıldığı için "kandil" adını almıştır. Hicrî günler gün batımı ile başladığı için kandil geceleri, ilgili günden bir önceki akşam gün batımında başlar.</p>

<h2>Beş Kandil Gecesi</h2>
<h3>1. Regaib Kandili</h3>
<p>Recep ayının ilk Cuma gecesidir. "Regaib", çokça rağbet edilen, istenilen demektir. Üç ayların başlangıcı olarak kabul edilir ve bu geceden itibaren bir manevî hazırlık dönemine girilir.</p>

<h3>2. Miraç Kandili</h3>
<p>Recep ayının 27. gecesidir. Peygamber Efendimiz'in (s.a.v.) Mescid-i Haram'dan Mescid-i Aksâ'ya, oradan da Allah'ın izniyle yüce katına yükseltildiği mucizevî yolculuk, İsrâ ve Miraç, bu gece anılır. Beş vakit namaz bu olayda farz kılınmıştır.</p>

<h3>3. Berat Kandili</h3>
<p>Şaban ayının 15. gecesidir. "Berat", beraat etmek, kurtuluş ve arınma anlamına gelir. Müslümanlar bu gece bol bol tevbe ve istiğfar eder, dua eder; ertesi gün oruç tutmayı da tercih ederler.</p>

<h3>4. Kadir Gecesi</h3>
<p>Ramazan ayının son on gecesinde aranan, Kur'an'ın indirilmeye başlandığı gecedir. Türkiye'de genellikle Ramazan'ın 27. gecesi olarak kutlanır.</p>
${v('لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ', 'Kadir gecesi bin aydan daha hayırlıdır.', 'Kadir suresi, 3. ayet')}
<p>Hz. Âişe (r.anha) Resûlullah'a "Kadir gecesine rastlarsam ne diyeyim?" diye sorunca şu duayı tavsiye etmiştir:</p>
${v('اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي', 'Allah\'ım! Sen affedicisin, affı seversin; beni de affet.', 'Tirmizî, Daavât 85; İbn Mâce, Dua 5')}

<h3>5. Mevlid Kandili</h3>
<p>Peygamber Efendimiz'in (s.a.v.) dünyayı şereflendirdiği Rebiülevvel ayının 12. gecesidir. Bu geceyi salavat getirerek, siyer okuyarak ve O'nun güzel ahlakını hatırlayarak değerlendirmek mümkündür. Bu geceye ilişkin kutlamalar gelenekten gelmektedir.</p>

<h2>Kandil Gecelerini Nasıl Değerlendirmeli?</h2>
<ul>
  <li>Yatsı namazını cemaatle kılmak, mümkünse nafile namaz kılmak</li>
  <li>Kur'an okumak, zikir ve istiğfarda bulunmak</li>
  <li>Salavat getirmek ve dua etmek</li>
  <li>Vefat etmiş yakınlarımız için hayır ve dua etmek</li>
  <li>Küs olanlarla barışmak, kırdığımız gönülleri onarmak</li>
  <li>Yoksulları gözetmek ve sadaka vermek</li>
</ul>
<p>Önemli olan, bu geceleri bir "görev" gibi değil, Allah'a yönelmek için bir fırsat olarak görmektir. Tarihleri her yıl Diyanet İşleri Başkanlığı'nın Dinî Günler ve Geceler takviminden takip edebilirsiniz.</p>
`,
    faq: [
      { q: 'Kaç kandil gecesi vardır?', a: 'Yılda beş kandil gecesi vardır: Regaib, Miraç, Berat, Kadir ve Mevlid. Kadir gecesi Ramazan\'da, diğerleri hicrî aylar içinde farklı zamanlarda yer alır.' },
      { q: 'Kandil gecesi hangi dua okunur?', a: 'Belirli bir okunuşa bağlı değildir. Kur\'an okunabilir, salavat getirilebilir, istiğfar edilebilir, ihtiyaçlarınız için Türkçe dahi dua edebilirsiniz.' },
      { q: 'Kandil günleri her yıl neden farklı tarihte olur?', a: 'Hicrî takvim ay yılına dayandığı için miladi takvimden yaklaşık 10-11 gün daha kısadır; bu nedenle kandiller her yıl miladi takvimde yaklaşık 11 gün öne kayar.' },
    ],
    sources: ['Kadir suresi', 'Tirmizî, Daavât', 'Diyanet İşleri Başkanlığı, Dinî Günler ve Geceler'],
  },

  // ------------------------------------------------------------------ KUR'AN
  {
    slug: 'kuran-okuma-adabi-ve-hatim',
    category: 'kuran-i-kerim',
    title: 'Kur\'an-ı Kerim Okuma Adabı ve Hatim Nasıl Yapılır?',
    description:
      'Kur\'an-ı Kerim okuma adabı nedir? Abdestli okumak, tertil, tefekkür, hatim planı ve Kur\'an ile bağ kurma yolları. Hatim nasıl yapılır, günde kaç sayfa okunmalı?',
    keywords: ['kuran okuma adabı', 'hatim nasıl yapılır', 'kuran okuma planı', 'tertil', 'meal okuma', 'kuran-ı kerim'],
    date: '2026-08-28',
    summary: 'Kur\'an okuma adabı, tertil ve tefekkür, hatim planı ve Kur\'an ile ilişki kurmanın yolları.',
    body: `
<p>Kur'an-ı Kerim, Allah'ın insanlığa gönderdiği son kitaptır. 114 sure ve 30 cüzden oluşur. Peygamber Efendimiz (s.a.v.) Kur'an'ın değerini şöyle ifade etmiştir:</p>
${v('خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', 'Sizin en hayırlınız, Kur\'an\'ı öğrenen ve öğretendir.', 'Buhârî, Fezâilü\'l-Kur\'ân 21')}

<h2>Kur'an Okuma Adabı</h2>
<ol>
  <li><strong>Temizlik:</strong> Abdestli olmak, temiz bir yerde ve temiz elbiseyle okumak. Mushafa dokunmak için abdest gerekir.</li>
  <li><strong>Niyet:</strong> Sırf Allah rızası için, öğrenmek ve amel etmek niyetiyle okumak.</li>
  <li><strong>Euzü-Besmele:</strong> Okumaya "Eûzü billâhi mineşşeytânirracîm, Bismillâhirrahmânirrahîm" ile başlamak.</li>
  <li><strong>Tertil:</strong> Harflerin mahrecini gözeterek, acele etmeden ve güzel okumak.</li>
  <li><strong>Huşû:</strong> Dikkatle, anlamını düşünerek ve kalbi hazır olarak okumak.</li>
  <li><strong>Mushafa saygı:</strong> Mushafı yere koymamak, üzerine bir şey koymamak, açık bırakmamak.</li>
  <li><strong>Dinlemek:</strong> Kur'an okunurken sessizce ve dikkatle dinlemek.</li>
</ol>
${v('وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا', 'Kur\'an\'ı tane tane, ağır ağır oku.', 'Müzzemmil suresi, 4. ayet')}

<h2>Anlayarak Okumak: Meal ve Tefekkür</h2>
<p>Kur'an'ı sadece lafzıyla okumak sevaptır; ancak asıl maksat, onu anlamak ve hayata uygulamaktır. Arapçayı bilmeyenler güvenilir bir meal veya tefsirden faydalanabilir. Her gün birkaç ayetin mealini okuyup üzerinde düşünmek, kalbin Kur'an'la yakınlaşmasını sağlar.</p>
${v('أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ', 'Hâlâ Kur\'an\'ı düşünüp anlamaya çalışmıyorlar mı?', 'Muhammed suresi, 24. ayet')}

<h2>Hatim Nasıl Yapılır?</h2>
<p>Hatim, Kur'an-ı Kerim'i baştan sona okuyarak bitirmektir. Yaygın baskılarda mushaf 604 sayfadır ve 30 cüze bölünmüştür.</p>
<ul>
  <li><strong>Günde 1 cüz (20 sayfa):</strong> 30 günde hatim. Her namazdan sonra 4 sayfa okunursa günlük 20 sayfa tamamlanır.</li>
  <li><strong>Günde 2 sayfa:</strong> Yaklaşık 10 ayda hatim.</li>
  <li><strong>Günde 5 sayfa:</strong> Yaklaşık 4 ayda hatim.</li>
</ul>
<p>Önemli olan miktardan çok devamlılıktır. Peygamberimiz (s.a.v.) şöyle buyurmuştur:</p>
${v('أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ', 'Allah katında amellerin en sevimlisi, az da olsa devamlı olanıdır.', 'Buhârî, Müslim')}

<h2>Kur'an'la Bağ Kurmak İçin Öneriler</h2>
<ul>
  <li>Her gün belirli bir saati Kur'an'a ayırın; sabah namazından sonrası güzel bir zamandır.</li>
  <li>Okuyuşunuzu düzeltmek için bir hocadan veya güvenilir bir eğitim platformundan faydalanın.</li>
  <li>Bildiğiniz sureleri namazlarda okuyun ve manalarını öğrenin.</li>
  <li>Ailecek Kur'an sohbeti yapın; çocuklarınıza Kur'an sevgisi aşılayın.</li>
</ul>
`,
    faq: [
      { q: 'Kur\'an-ı Kerim kaç cüz, kaç suredir?', a: 'Kur\'an-ı Kerim 30 cüz ve 114 sureden oluşur. Yaygın baskılarda mushaf 604 sayfadır.' },
      { q: 'Abdestsiz Kur\'an okunur mu?', a: 'Ezberden abdestsiz okumak caizdir; ancak mushafa dokunmak için abdest gerekir. Abdestli okumak daha faziletlidir.' },
      { q: 'Kur\'an\'ı Türkçe okuyarak ibadet edilir mi?', a: 'Kur\'an\'ın ibadet olarak okunması Arapça metniyle yapılır. Mealler anlamayı kolaylaştırır; ancak Kur\'an\'ın yerine geçmez.' },
    ],
    sources: ['Müzzemmil suresi, 4. ayet', 'Muhammed suresi, 24. ayet', 'Buhârî, Fezâilü\'l-Kur\'ân'],
  },

  // ----------------------------------------------------------------- ZİKİR
  {
    slug: 'gunluk-zikirler-ve-dua-adabi',
    category: 'dua-ve-zikir',
    title: 'Günlük Zikirler, Namaz Sonrası Tesbihat ve Dua Adabı',
    description:
      'Sabah-akşam zikirleri, namaz sonrası tesbihat (33 Sübhanallah, 33 Elhamdülillah, 34 Allahü ekber), salavat, istiğfar ve duanın kabul adabı. Günlük zikir rehberi.',
    keywords: ['günlük zikirler', 'namaz sonrası tesbihat', 'sabah akşam duaları', 'dua adabı', 'salavat', 'istiğfar', 'zikir nedir'],
    date: '2026-08-20',
    summary: 'Günlük hayatta kolayca yapılabilecek zikirler, namaz sonrası tesbihat ve duada dikkat edilecek adaplar.',
    body: `
<p>Zikir, Allah'ı anmak demektir. Dil ile, kalp ile ve davranışlarla yapılabilir. Kur'an-ı Kerim'de Allah Teâlâ kullarını zikre davet eder ve karşılık vereceğini müjdeler.</p>
${v('فَاذْكُرُونِي أَذْكُرْكُمْ', 'Öyleyse beni anın ki ben de sizi anayım.', 'Bakara suresi, 152. ayet')}
${v('أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', 'Dikkat edin! Kalpler ancak Allah\'ı anmakla huzur bulur.', 'Ra\'d suresi, 28. ayet')}

<h2>Namaz Sonrası Tesbihat</h2>
<p>Farz namazların ardından şu tesbihat yapılır:</p>
<ul>
  <li><strong>33 kez Sübhânallah</strong> (Allah her türlü eksiklikten münezzehtir)</li>
  <li><strong>33 kez Elhamdülillâh</strong> (Hamd Allah'a mahsustur)</li>
  <li><strong>33 veya 34 kez Allâhü ekber</strong> (Allah en büyüktür)</li>
</ul>
<p>Ardından Âyetü'l-Kürsî (Bakara, 255) okunur, "Lâ ilâhe illallâhü vahdehû lâ şerîke leh..." tevhid cümlesi getirilir ve dua edilir.</p>

<h2>Hafif Ama Mizanda Ağır İki Kelime</h2>
${v('كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ ثَقِيلَتَانِ فِي الْمِيزَانِ حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ', 'İki kelime vardır ki dile hafiftir, mizanda ağırdır, Rahmân\'a sevimlidir: Sübhânallâhi ve bihamdihî, Sübhânallâhil azîm.', 'Buhârî, Müslim')}

<h2>Günlük Zikir Önerileri</h2>
<ul>
  <li><strong>Sübhânallâhi ve bihamdihî:</strong> Günde yüz kez söylenmesi tavsiye edilir. Hadiste, bunu söyleyenin hatalarının deniz köpüğü kadar da olsa bağışlanacağı bildirilir (Buhârî, Müslim).</li>
  <li><strong>İstiğfar (Estağfirullâh):</strong> Peygamberimiz (s.a.v.) günde yüz kez tevbe ettiğini bildirmiştir (Müslim).</li>
  <li><strong>Salavat:</strong> "Allâhümme salli alâ Muhammed" gibi salavatlar getirmek. Kim Peygamber'e bir salavat getirirse Allah ona on rahmet eder (Müslim).</li>
  <li><strong>Lâ ilâhe illallâh:</strong> Tevhid kelimesi; kalbi nurlandıran, en faziletli zikirlerdendir.</li>
  <li><strong>Lâ havle ve lâ kuvvete illâ billâh:</strong> Güç ve kuvvetin yalnız Allah'tan olduğunu hatırlatır.</li>
</ul>

<h2>Sabah ve Akşam Okunabilecekler</h2>
<ul>
  <li>İhlâs, Felak ve Nâs sureleri</li>
  <li>Âyetü'l-Kürsî</li>
  <li>Salavat ve istiğfar</li>
  <li>Kendi dilinizle şükür ve dua</li>
</ul>

<h2>Dua Adabı</h2>
${v('ادْعُونِي أَسْتَجِبْ لَكُمْ', 'Bana dua edin, size icabet edeyim.', 'Mü\'min suresi, 60. ayet')}
<ol>
  <li>Allah'a hamd ve Peygamber'e salavat ile başlamak</li>
  <li>Kalbin hazır olduğu, tam bir güven ve ümitle dua etmek</li>
  <li>Dua ederken ellerini açmak</li>
  <li>Haram yemekten, günahlardan sakınmak</li>
  <li>Başkaları için de dua etmek</li>
  <li>Acele etmemek: Resûlullah (s.a.v.), "Biriniz acele etmediği sürece duası kabul olunur" buyurmuştur (Buhârî, Müslim).</li>
  <li>Duayı "âmin" diyerek bitirmek</li>
</ol>
<p>Zikir için bizim <a href="/zikirmatik/">Zikirmatik</a> sayfamızı kullanarak sayınızı kolayca takip edebilirsiniz.</p>
`,
    faq: [
      { q: 'Namaz sonrası tesbihat nasıl yapılır?', a: 'Farz namazdan sonra 33 kez Sübhânallah, 33 kez Elhamdülillah ve 33 (bazı rivayetlere göre 34) kez Allahü ekber denir. Ardından Âyetü\'l-Kürsî okunur ve dua edilir.' },
      { q: 'Zikir yapmak için abdest şart mı?', a: 'Hayır, zikir için abdest şart değildir. Ancak abdestli olmak ve temiz bir ortamda zikretmek daha güzeldir.' },
      { q: 'Dua Türkçe yapılabilir mi?', a: 'Evet. Dua kişinin kendi diliyle, içinden geldiği gibi yapılabilir. Namazın içinde okunacak dualar ise Arapça olur.' },
    ],
    sources: ['Bakara suresi, 152. ayet', 'Mü\'min suresi, 60. ayet', 'Buhârî, Müslim'],
  },

  // ------------------------------------------------------------------ SİYER
  {
    slug: 'hz-muhammed-in-hayati',
    category: 'siyer',
    title: 'Hz. Muhammed (s.a.v.)\'in Hayatı: Doğumdan Vefatına Kısa Siyer',
    description:
      'Hz. Muhammed (s.a.v.)\'in hayatı: doğumu, çocukluğu, ilk vahiy, Mekke dönemi, hicret, Medine dönemi, Mekke\'nin fethi ve vefatı. Önemli olaylar ve tarihleriyle kısa siyer.',
    keywords: ['hz muhammed hayatı', 'peygamber efendimizin hayatı', 'siyer', 'hicret', 'ilk vahiy', 'mekke fethi', 'mevlid'],
    date: '2026-08-12',
    summary: 'Peygamber Efendimiz\'in doğumundan vefatına kadar önemli olayları kronolojik olarak anlatan kısa siyer.',
    body: `
<p>Hz. Muhammed (s.a.v.), Allah'ın gönderdiği son peygamberdir. Hayatı, her devirde insanlık için örnek bir modeldir.</p>
${v('وَإِنَّكَ لَعَلَى خُلُقٍ عَظِيمٍ', 'Şüphesiz sen pek büyük bir ahlak üzerindesin.', 'Kalem suresi, 4. ayet')}

<h2>Doğumu ve Çocukluğu (570-595)</h2>
<p>Peygamber Efendimiz, miladi 570 yılında, Mekke'de Kureyş kabilesinin Hâşimoğulları kolundan dünyaya geldi. Babası Abdullah, doğumundan önce vefat etti. Süt annesi Halime'nin yanında bir süre kaldı. Annesi Âmine altı yaşındayken, dedesi Abdülmuttalib ise sekiz yaşındayken vefat etti; bundan sonra amcası Ebû Tâlib'in himayesinde büyüdü. Doğruluğu ve güvenilirliği sebebiyle gençlik yıllarında "el-Emîn" (güvenilir kişi) lakabıyla anıldı.</p>

<h2>Evlilik ve Peygamberlik (595-610)</h2>
<p>25 yaşında, iş ahlakına hayran kaldığı Hz. Hatice ile evlendi. Kırk yaşına yaklaşırken Hıra Mağarası'nda tefekkür ve ibadetle vakit geçirmeye başladı. Miladi 610 yılında Cebrâil (a.s.) ile ilk vahiy, Alak suresinin ilk ayetleriyle geldi.</p>
${v('اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', 'Yaratan Rabbinin adıyla oku!', 'Alak suresi, 1. ayet')}

<h2>Mekke Dönemi (610-622)</h2>
<p>İlk üç yıl davet gizli yapıldı; ardından açık davete geçildi. Müşriklerin baskı ve işkenceleri artınca bazı Müslümanlar Habeşistan'a hicret etti. Bu dönemde Hz. Hatice ve amcası Ebû Tâlib'in vefatı "hüzün yılı" olarak anılır. Yine bu dönemde İsrâ ve Miraç mucizesi yaşandı ve beş vakit namaz farz kılındı. Akabe biatları ile Medineliler Müslüman oldu.</p>

<h2>Hicret ve Medine Dönemi (622-632)</h2>
<p>622 yılında Peygamber Efendimiz Hz. Ebû Bekir ile birlikte Mekke'den Medine'ye hicret etti. İslam takvimi bu olayla başlar. Medine'de Mescid-i Nebevî inşa edildi, Muhacir ve Ensar arasında kardeşlik tesis edildi, farklı din ve kabilelerin birlikte yaşamasını düzenleyen Medine Vesikası hazırlandı.</p>
<ul>
  <li><strong>624:</strong> Bedir Savaşı</li>
  <li><strong>625:</strong> Uhud Savaşı</li>
  <li><strong>627:</strong> Hendek Savaşı</li>
  <li><strong>628:</strong> Hudeybiye Antlaşması</li>
  <li><strong>630:</strong> Mekke'nin fethi; Peygamberimiz genel af ilan etti</li>
  <li><strong>632:</strong> Veda Haccı ve Veda Hutbesi</li>
</ul>

<h2>Vefatı</h2>
<p>Peygamber Efendimiz, 632 yılında (hicrî 11, Rebiülevvel) Medine'de 63 yaşında vefat etti. Kabri, Mescid-i Nebevî içindeki Ravza-i Mutahhara'dadır. Veda Hutbesi'nde insan hakları, kadın hakları, kan davalarının kaldırılması ve kardeşlik gibi konuları ilan etmiştir.</p>

<h2>Peygamberimizi Örnek Almak</h2>
<p>Resûlullah (s.a.v.); merhametli bir baba, adaletli bir önder, güvenilir bir ticaret insanı ve iyi bir komşuydu. Gülümsemeyi, güzel sözü, yetim ve fakirleri gözetmeyi, bağışlayıcı olmayı öğretti. O'nu sevmek, sünnetini yaşamakla ve salavat getirmekle olur.</p>
`,
    faq: [
      { q: 'Hz. Muhammed (s.a.v.) ne zaman doğdu?', a: 'Miladi 570 yılında, Rebiülevvel ayında Mekke\'de doğdu. Doğduğu yıl Fil Vakası ile aynı yıl olarak anılır.' },
      { q: 'İlk vahiy ne zaman ve nerede geldi?', a: 'Miladi 610 yılında Mekke yakınlarındaki Hıra Mağarası\'nda, Alak suresinin ilk ayetleriyle geldi.' },
      { q: 'Hicret ne zaman gerçekleşti?', a: '622 yılında Peygamber Efendimiz Mekke\'den Medine\'ye hicret etti. Hicrî takvimin başlangıcı bu olaydır.' },
      { q: 'Peygamber Efendimiz kaç yaşında vefat etti?', a: '632 yılında Medine\'de 63 yaşında vefat etti.' },
    ],
    sources: ['İbn Hişâm, es-Sîre', 'Kalem suresi, 4. ayet', 'Diyanet İslam Ansiklopedisi, "Muhammed" maddesi'],
  },

  // ------------------------------------------------------------ SABIR/TEVEKKÜL
  {
    slug: 'sabir-ve-tevekkul',
    category: 'ahlak-ve-manevi-hayat',
    title: 'Sabır ve Tevekkül Nedir? Zor Zamanlarda Ayet ve Hadislerle Teselli',
    description:
      'Sabır ve tevekkül nedir, aralarındaki fark nedir? Zorluklar karşısında sabrın ve Allah\'a güvenmenin ayet ve hadislerle anlatımı. Huzur arayanlar için manevi rehber.',
    keywords: ['sabır nedir', 'tevekkül nedir', 'sabır ayetleri', 'tevekkül hadisi', 'zorluklarla başa çıkmak', 'huzur'],
    date: '2026-08-05',
    summary: 'Sabır ve tevekkülün anlamı, Kur\'an ve sünnetteki yeri, zor zamanlarda kalbi ferahlatan ayet ve hadisler.',
    body: `
<p>Hayat; sevinçlerle olduğu kadar sıkıntılarla da doludur. Müslüman bu iniş çıkışlara iki kıymetli erdemle karşılık verir: <strong>sabır</strong> ve <strong>tevekkül</strong>. Bu iki kavram, kalbin dengesini korur ve insana güç verir.</p>

<h2>Sabır Nedir?</h2>
<p>Sabır, hoşa gitmeyen durumlar karşısında isyan etmemek, dilini ve davranışlarını kontrol altında tutmak, Allah'ın takdirine razı olmaktır. Üç çeşit sabırdan söz edilir:</p>
<ul>
  <li><strong>İbadetlere sabır:</strong> İbadeti devamlı ve düzenli yapmak</li>
  <li><strong>Günahlara karşı sabır:</strong> Nefsin isteklerine karşı durmak</li>
  <li><strong>Musibetlere sabır:</strong> Sıkıntılar karşısında metanet göstermek</li>
</ul>
${v('إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُمْ بِغَيْرِ حِسَابٍ', 'Sabredenlere mükâfatları şüphesiz hesapsız olarak ödenecektir.', 'Zümer suresi, 10. ayet')}
${v('فَصَبْرٌ جَمِيلٌ', 'Artık bana düşen güzel bir sabırdır.', 'Yûsuf suresi, 18. ayet')}

<h2>Zorluğun Ardından Kolaylık Gelir</h2>
<p>Kur'an-ı Kerim, her zorluğun ardından bir kolaylık geleceğini müjdeler. Bu müjde, umutsuzluğa düşen kalplere ilaçtır.</p>
${v('فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا', 'Şüphesiz zorluğun yanında bir kolaylık vardır. Gerçekten, zorlukla beraber bir kolaylık vardır.', 'İnşirah suresi, 5-6. ayetler')}
${v('لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا', 'Allah kimseye gücünün yeteceğinden fazlasını yüklemez.', 'Bakara suresi, 286. ayet')}

<h2>Tevekkül Nedir?</h2>
<p>Tevekkül, gerekli sebeplere sarıldıktan sonra sonucu Allah'a bırakmak, O'na güvenmektir. Tevekkül, tembellik ya da çalışmamak değildir; çalışmak ve sonra sonucunu Allah'tan beklemektir.</p>
${v('وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', 'Kim Allah\'a tevekkül ederse, O kendisine yeter.', 'Talâk suresi, 3. ayet')}
<p>Peygamber Efendimiz (s.a.v.) tevekkülün gerçek anlamını şu örnekle açıklamıştır: "Siz Allah'a hakkıyla tevekkül etseniz, kuşları rızıklandırdığı gibi sizi de rızıklandırırdı. Kuşlar sabah aç çıkar, akşam tok dönerler." (Tirmizî, İbn Mâce) Kuşlar yuvalarında oturmaz, rızık için sebeplere sarılır; fakat sonucu Allah'a bırakırlar.</p>

<h2>Sabırla Namaz: Yardım Dileme Yolu</h2>
${v('يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', 'Ey iman edenler! Sabır ve namazla yardım dileyin. Şüphesiz Allah sabredenlerle beraberdir.', 'Bakara suresi, 153. ayet')}
<p>Peygamberimiz (s.a.v.) üzüldüğü zaman namaza koşardı. Sıkıntı anlarında abdest alıp iki rekât namaz kılmak, dua etmek ve Kur'an okumak kalbi rahatlatır.</p>

<h2>Müminin Hâli</h2>
<p>Peygamberimiz (s.a.v.) müminin durumunun ne kadar güzel olduğunu şöyle anlatır: Mümin için her durum hayırdır. Sevinirse şükreder, bu onun için hayırdır; başına bir sıkıntı gelirse sabreder, bu da onun için hayırdır. (Müslim)</p>

<h2>Pratik Öneriler</h2>
<ul>
  <li>Sıkıntıda "İnnâ lillâhi ve innâ ileyhi râciûn" demek</li>
  <li>Dua ve istiğfarı artırmak</li>
  <li>Allah'ın size verdiği nimetleri hatırlayıp şükretmek</li>
  <li>Güvendiğiniz kimselerle dertleşmek, yalnız kalmamak</li>
  <li>"Hayır nerede, şer nerede bilemem" bilinciyle olaylara bakmak</li>
</ul>
`,
    faq: [
      { q: 'Sabır ile tevekkül arasındaki fark nedir?', a: 'Sabır, hoşa gitmeyen durumlar karşısında dayanmak ve isyan etmemektir. Tevekkül ise sebeplere sarıldıktan sonra sonucu Allah\'a bırakmaktır. İkisi birbirini tamamlar.' },
      { q: 'Tevekkül çalışmamak mıdır?', a: 'Hayır. Tevekkül, gerekli çabayı gösterdikten sonra sonucu Allah\'a bırakmaktır. Çalışmadan beklemek tevekkül değil, tembelliktir.' },
      { q: 'Sıkıntıda hangi dua okunur?', a: '"İnnâ lillâhi ve innâ ileyhi râciûn" (Biz Allah\'a aitiz ve O\'na döneceğiz) denir; ayrıca istiğfar, salavat ve kişinin kendi diliyle yaptığı dualar okunabilir.' },
    ],
    sources: ['Zümer suresi, 10. ayet', 'İnşirah suresi, 5-6. ayetler', 'Talâk suresi, 3. ayet', 'Tirmizî, Zühd 14', 'Müslim, Zühd 64'],
  },

  // ---------------------------------------------------------- GÜZEL AHLAK
  {
    slug: 'guzel-ahlak-niyet-dogruluk-komsuluk',
    category: 'ahlak-ve-manevi-hayat',
    title: 'Güzel Ahlak: Niyet, Doğruluk, Komşuluk ve Tebessümün Önemi',
    description:
      'İslam\'da güzel ahlak nedir? Niyetin önemi, doğruluk, komşuluk hakları, güzel söz ve tebessüm üzerine ayet ve hadislerle günlük hayata dönük rehber yazı.',
    keywords: ['güzel ahlak', 'islam ahlakı', 'komşu hakkı', 'doğruluk hadisi', 'niyet hadisi', 'güzel söz sadakadır'],
    date: '2026-07-30',
    summary: 'Niyetin, doğruluğun, komşuluğun ve güzel sözün İslam ahlakındaki yeri.',
    body: `
<p>Peygamber Efendimiz (s.a.v.) gönderiliş amacını şöyle özetlemiştir:</p>
${v('إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ', 'Ben ancak güzel ahlakı tamamlamak için gönderildim.', 'Ahmed b. Hanbel, el-Müsned')}
<p>İslam yalnızca ibadetlerden ibaret değildir; insan ilişkilerinde dürüstlük, merhamet ve iyilik de dinin ayrılmaz parçasıdır.</p>

<h2>1. Niyet: Her Şeyin Temeli</h2>
${v('إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', 'Ameller niyetlere göredir.', 'Buhârî, Müslim')}
<p>Aynı davranış, niyete göre ibadet olabilir ya da boş bir iş olabilir. Ailesini geçindirmek için çalışmak, doğru niyetle yapıldığında ibadet sayılır. Bu hadis, İslam'ın temel prensiplerinden biridir; her işe başlarken kendimize "Bunu neden yapıyorum?" sorusunu sormayı öğretir.</p>

<h2>2. Doğruluk</h2>
<p>Resûlullah (s.a.v.), doğruluğun iyiliğe, iyiliğin de cennete götürdüğünü bildirmiştir; yalanın ise günaha ve cehenneme sürüklediğini söylemiştir (Buhârî, Müslim). Gençlik yıllarından beri "el-Emîn" olarak tanınan Peygamberimiz, ticarette, sözde ve davranışta doğruluğun en güzel örneğidir.</p>

<h2>3. Komşuluk Hakkı</h2>
<p>Peygamber Efendimiz (s.a.v.) şöyle buyurur: "Cebrâil bana komşu hakkında o kadar tavsiyede bulundu ki, onu mirasçı kılacak sandım." (Buhârî, Müslim) Yine bir hadiste: "Allah'a ve ahiret gününe inanan kimse komşusuna ikramda bulunsun." (Buhârî, Müslim)</p>
<ul>
  <li>Komşunun hâlini hatırını sormak</li>
  <li>Yemekten ikramda bulunmak</li>
  <li>Rahatsız edecek gürültü ve davranışlardan sakınmak</li>
  <li>Hastalandığında ziyaret etmek, zor günlerinde yanında olmak</li>
</ul>

<h2>4. Güzel Söz ve Tebessüm</h2>
${v('الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ', 'Güzel söz sadakadır.', 'Buhârî, Müslim')}
<p>Peygamberimiz (s.a.v.), "Kardeşinin yüzüne tebessüm etmen sadakadır" buyurmuştur (Tirmizî). Hayatı kolaylaştıran, kalpleri birbirine yaklaştıran en basit ama en etkili ibadetlerden biri güler yüzlü olmaktır.</p>

<h2>5. Kardeşliği Güçlendirmek</h2>
${v('لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ', 'Sizden biriniz, kendisi için istediğini kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz.', 'Buhârî, Müslim')}
${v('الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ', 'Müslüman, diğer Müslümanların elinden ve dilinden emin olduğu kimsedir.', 'Buhârî, Müslim')}

<h2>Günlük Hayatta Güzel Ahlak İçin Küçük Adımlar</h2>
<ul>
  <li>Her işe Allah rızası niyetiyle başlamak</li>
  <li>Söz verdiğinde sözünde durmak</li>
  <li>Birine kırıldığında af yolunu seçmek</li>
  <li>Gıybetten, alaydan ve kötü lakap takmaktan uzak durmak</li>
  <li>Ebeveyne ve yaşlılara saygı göstermek</li>
  <li>Her gün birine güzel bir söz söylemek veya yardımda bulunmak</li>
</ul>
`,
    faq: [
      { q: '"Ameller niyetlere göredir" hadisi ne anlama gelir?', a: 'Bir davranışın ibadet olup olmaması, yapılma niyetine bağlıdır. İyi niyetle yapılan mübah işler dahi ibadet hükmü kazanabilir.' },
      { q: 'Komşu hakkı neden önemlidir?', a: 'Peygamberimiz (s.a.v.), Cebrâil\'in komşu hakkında sıkça tavsiyede bulunduğunu, hatta komşuyu mirasçı kılacak sandığını bildirmiştir. Bu, İslam\'da komşuluğun ne kadar önemli olduğunu gösterir.' },
      { q: 'Güzel ahlakın ölçüsü nedir?', a: 'Kur\'an ve Peygamberimizin (s.a.v.) hayatı; doğruluk, merhamet, adalet, sabır, tevazu ve af gibi değerler güzel ahlakın ölçüsüdür.' },
    ],
    sources: ['Kalem suresi, 4. ayet', 'Buhârî, Müslim', 'Tirmizî, Birr 36', 'Ahmed b. Hanbel, el-Müsned'],
  },
];
