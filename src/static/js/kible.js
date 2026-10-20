// Kıble pusulası: büyük daire yönü + cihaz pusulası
(function () {
  var app = document.getElementById('kible-app');
  if (!app) return;
  var CITIES = JSON.parse(app.getAttribute('data-cities'));
  var KAABA = { lat: 21.422487, lon: 39.826206 };
  var dial = document.getElementById('dial');
  var kaaba = document.getElementById('kaaba');
  var degEl = document.getElementById('kible-deg');
  var info = document.getElementById('kible-info');
  var geoBtn = document.getElementById('kible-geo');
  var citySel = document.getElementById('kible-city');
  var startBtn = document.getElementById('kible-start');
  var compass = document.getElementById('compass');
  var note = document.getElementById('kible-note');
  var qibla = null, heading = null, listening = false;
  var DIRS = ['kuzey', 'kuzeydoğu', 'doğu', 'güneydoğu', 'güney', 'güneybatı', 'batı', 'kuzeybatı'];

  function calc(lat, lon) {
    var r = Math.PI / 180, p1 = lat * r, p2 = KAABA.lat * r, dl = (KAABA.lon - lon) * r;
    var y = Math.sin(dl) * Math.cos(p2);
    var x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
    var b = ((Math.atan2(y, x) / r) + 360) % 360;
    var a = Math.pow(Math.sin((p2 - p1) / 2), 2) + Math.cos(p1) * Math.cos(p2) * Math.pow(Math.sin(dl / 2), 2);
    return { bearing: b, km: 2 * 6371 * Math.asin(Math.sqrt(a)) };
  }

  function show(label, lat, lon) {
    var q = calc(lat, lon);
    qibla = q.bearing;
    degEl.textContent = q.bearing.toFixed(1) + '°';
    info.textContent = label + ': Kâbe ' + DIRS[Math.round(q.bearing / 45) % 8] + ' yönünde, kuzeyden saat yönünde ' + q.bearing.toFixed(1) +
      '° · yaklaşık ' + Math.round(q.km).toLocaleString('tr-TR') + ' km';
    kaaba.style.transform = 'rotate(' + q.bearing + 'deg)';
    draw();
    var canOrient = 'DeviceOrientationEvent' in window;
    startBtn.hidden = !canOrient || listening;
  }

  function draw() {
    var h = heading == null ? 0 : heading;
    dial.style.transform = 'rotate(' + (-h) + 'deg)';
    if (heading != null && qibla != null) {
      var diff = Math.abs(((qibla - heading + 540) % 360) - 180);
      var aligned = diff < 5; // 5° tolerans
      compass.classList.toggle('aligned', aligned);
      if (aligned && navigator.vibrate && !draw.vib) { navigator.vibrate(40); draw.vib = true; }
      if (!aligned) draw.vib = false;
    }
  }

  function onOrient(e) {
    var h = null;
    if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading; // iOS
    else if (e.absolute && typeof e.alpha === 'number') h = (360 - e.alpha) % 360;
    else if (typeof e.alpha === 'number' && e.type === 'deviceorientationabsolute') h = (360 - e.alpha) % 360;
    if (h == null) return;
    heading = h;
    draw();
  }

  function startCompass() {
    function attach() {
      window.addEventListener('deviceorientationabsolute', onOrient, true);
      window.addEventListener('deviceorientation', onOrient, true);
      listening = true;
      startBtn.hidden = true;
      note.textContent = 'Pusula çalışıyor. Cihazı yatay tutup yavaşça döndürün; Kâbe işareti en üste geldiğinde kıbleye bakıyorsunuz. Pusula sapıyorsa cihazı "8" şeklinde hareket ettirerek kalibre edin.';
    }
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(function (s) {
        if (s === 'granted') attach(); else note.textContent = 'Pusula izni verilmedi. Kıble açısını sayıdan takip edebilirsiniz.';
      }).catch(function () { note.textContent = 'Pusula başlatılamadı.'; });
    } else attach();
  }

  geoBtn.addEventListener('click', function () {
    if (!navigator.geolocation) { info.textContent = 'Tarayıcınız konum özelliğini desteklemiyor. Lütfen şehir seçin.'; return; }
    info.textContent = 'Konum alınıyor…';
    navigator.geolocation.getCurrentPosition(function (p) {
      citySel.value = '';
      show('Konumunuz', p.coords.latitude, p.coords.longitude);
    }, function () {
      info.textContent = 'Konum alınamadı veya izin verilmedi. Lütfen listeden şehir seçin.';
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
  });
  citySel.addEventListener('change', function () {
    if (citySel.value === '') return;
    var c = CITIES[+citySel.value];
    show(c[0], c[1], c[2]);
    try { localStorage.setItem('mec_kible_city', citySel.value); } catch (e) {}
  });
  startBtn.addEventListener('click', startCompass);

  // Kayıtlı şehir
  try {
    var s = localStorage.getItem('mec_kible_city');
    if (s !== null && CITIES[+s]) { citySel.value = s; show(CITIES[+s][0], CITIES[+s][1], CITIES[+s][2]); }
  } catch (e) {}
})();
