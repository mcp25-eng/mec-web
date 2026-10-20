// Namaz vakitleri (Diyanet yöntemi – Aladhan API, method=13)
(function () {
  var widget = document.getElementById('prayer-widget');
  if (!widget) return;

  var CITIES = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya','Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkari','Hatay','Iğdır','Isparta','İstanbul','İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kilis','Kırıkkale','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Şanlıurfa','Şırnak','Tekirdağ','Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak'];
  var NAMES = [['Fajr', 'İmsak'], ['Sunrise', 'Güneş'], ['Dhuhr', 'Öğle'], ['Asr', 'İkindi'], ['Maghrib', 'Akşam'], ['Isha', 'Yatsı']];

  var select = widget.querySelector('.city-select');
  var nextEl = document.getElementById('prayer-next');
  var listEl = document.getElementById('prayer-times');
  var timer = null;
  var times = null;

  function ascii(s) {
    var map = { 'İ': 'I', 'ı': 'i', 'Ş': 'S', 'ş': 's', 'Ğ': 'G', 'ğ': 'g', 'Ü': 'U', 'ü': 'u', 'Ö': 'O', 'ö': 'o', 'Ç': 'C', 'ç': 'c' };
    return s.replace(/[İıŞşĞğÜüÖöÇç]/g, function (c) { return map[c]; });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dateKey(d) { return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear(); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Tarihler
  (function dates() {
    var g = document.getElementById('date-greg');
    var h = document.getElementById('date-hijri');
    var now = new Date();
    try {
      if (g) g.textContent = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
      if (h) h.textContent = new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    } catch (e) { /* desteklenmiyorsa boş kalır */ }
  })();

  // Şehir listesi
  var saved = store('mec_city') || 'İstanbul';
  CITIES.forEach(function (c) {
    var o = document.createElement('option');
    o.value = c; o.textContent = c;
    if (c === saved) o.selected = true;
    select.appendChild(o);
  });
  select.addEventListener('change', function () {
    store('mec_city', select.value);
    // Aynı sayfada başka bir seçici varsa onu da eşitle
    load(select.value);
  });

  function parse(t) {
    return NAMES.map(function (n) {
      var hm = String(t[n[0]]).slice(0, 5).split(':');
      return { key: n[0], label: n[1], h: +hm[0], m: +hm[1], text: String(t[n[0]]).slice(0, 5) };
    });
  }

  function load(city) {
    var now = new Date();
    var key = 'mec_pt_' + city + '_' + dateKey(now);
    nextEl.textContent = 'Vakitler yükleniyor…';
    var cached = store(key);
    if (cached) {
      try { times = parse(JSON.parse(cached)); render(); return; } catch (e) { /* devam */ }
    }
    var url = 'https://api.aladhan.com/v1/timingsByCity/' + dateKey(now) +
      '?city=' + encodeURIComponent(ascii(city)) + '&country=Turkey&method=13';
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (j) {
        if (!j || !j.data || !j.data.timings) throw new Error('data');
        store(key, JSON.stringify(j.data.timings));
        times = parse(j.data.timings);
        render();
      })
      .catch(function () {
        listEl.innerHTML = '';
        nextEl.innerHTML = 'Vakitler şu anda alınamadı. Lütfen daha sonra tekrar deneyin veya <a href="https://namazvakitleri.diyanet.gov.tr/" rel="noopener">Diyanet</a> sayfasına bakın.';
      });
  }

  function at(t, addDay) {
    var d = new Date();
    d.setHours(t.h, t.m, 0, 0);
    if (addDay) d.setDate(d.getDate() + 1);
    return d;
  }

  function render() {
    if (!times) return;
    var now = new Date();
    var current = -1;
    for (var i = 0; i < times.length; i++) if (at(times[i]) <= now) current = i;
    var nextIdx = current + 1;
    var tomorrow = false;
    if (nextIdx >= times.length) { nextIdx = 0; tomorrow = true; }

    listEl.innerHTML = times.map(function (t, i) {
      return '<li' + (i === current ? ' class="active"' : '') + '><span>' + t.label + '</span><b>' + t.text + '</b></li>';
    }).join('');

    clearInterval(timer);
    function tick() {
      var diff = at(times[nextIdx], tomorrow) - new Date();
      if (diff <= 0) { render(); return; }
      var s = Math.floor(diff / 1000);
      var hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
      nextEl.innerHTML = times[nextIdx].label + ' vaktine <b>' + pad(hh) + ':' + pad(mm) + ':' + pad(ss) + '</b> kaldı';
    }
    tick();
    timer = setInterval(tick, 1000);

    scheduleNotify(times[nextIdx], tomorrow);
  }

  // Vakit bildirimi (sayfa/uygulama açıkken çalışır)
  var notifyTimer = null;
  function notifyOn() { return store('mec_notify') === '1' && 'Notification' in window && Notification.permission === 'granted'; }
  function scheduleNotify(t, addDay) {
    clearTimeout(notifyTimer);
    if (!notifyOn()) return;
    var ms = at(t, addDay) - new Date();
    if (ms <= 0 || ms > 24 * 3600 * 1000) return;
    notifyTimer = setTimeout(function () {
      var title = t.label + ' vakti girdi';
      var opts = { body: select.value + ' için ' + t.text, icon: '/img/logo-192.png', tag: 'mec-vakit' };
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(function (reg) { reg.showNotification(title, opts); }).catch(function () { new Notification(title, opts); });
      } else { new Notification(title, opts); }
    }, ms);
  }
  (function notifyUi() {
    if (widget.getAttribute('data-mode') !== 'full' || !('Notification' in window)) return;
    var wrap = document.createElement('div');
    wrap.className = 'notify-box';
    wrap.innerHTML = '<label><input type="checkbox" id="notify-chk"> Vakit girince bildirim gönder</label><small>Bildirimler, bu sayfa veya yüklü uygulama açıkken çalışır. Cihazınız uyku modundayken gecikebilir.</small>';
    widget.appendChild(wrap);
    var chk = wrap.querySelector('input');
    chk.checked = notifyOn();
    chk.addEventListener('change', function () {
      if (chk.checked) {
        Notification.requestPermission().then(function (p) {
          if (p === 'granted') { store('mec_notify', '1'); render(); }
          else { chk.checked = false; store('mec_notify', '0'); }
        });
      } else { store('mec_notify', '0'); clearTimeout(notifyTimer); }
    });
  })();
  load(saved);
})();
