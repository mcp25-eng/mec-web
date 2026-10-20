// Ramazan imsakiyesi (Diyanet yöntemi – Aladhan API, method=13)
(function () {
  var app = document.getElementById('imsakiye-app');
  if (!app) return;
  var $ = function (id) { return document.getElementById(id); };
  var CITIES = JSON.parse(app.getAttribute('data-cities') || '[]');
  var DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  var GM = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  var info = $('im-info'), body = $('im-body'), citySel = $('im-city'), yearSel = $('im-year');

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function ascii(s) {
    var map = { 'İ': 'I', 'ı': 'i', 'Ş': 'S', 'ş': 's', 'Ğ': 'G', 'ğ': 'g', 'Ü': 'U', 'ü': 'u', 'Ö': 'O', 'ö': 'o', 'Ç': 'C', 'ç': 'c' };
    return s.replace(/[İıŞşĞğÜüÖöÇç]/g, function (c) { return map[c]; });
  }
  function at(d, add) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (add || 0), 12); }
  function key(d) { return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
  function fmtD(d) { return d.getDate() + ' ' + GM[d.getMonth()] + ' ' + d.getFullYear(); }

  var fmt;
  try { fmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }); fmt.format(new Date()); }
  catch (e) { try { fmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }); } catch (e2) { fmt = null; } }
  if (!fmt) { info.textContent = 'Tarayıcınız hicri takvim hesabını desteklemiyor. Lütfen Diyanet imsakiyesine bakın.'; return; }
  function hijri(date) {
    var o = {};
    fmt.formatToParts(date).forEach(function (p) { if (p.type !== 'literal') o[p.type] = parseInt(p.value, 10); });
    return o;
  }

  // Ramazan aralıklarını bul
  var today = at(new Date());
  var ranges = [];
  var cur = null;
  for (var i = -40; i < 760; i++) {
    var d = at(today, i);
    var h = hijri(d);
    if (h.month === 9) {
      if (!cur) { cur = { start: d, days: [], hy: h.year }; }
      cur.days.push(d);
    } else if (cur) {
      if (cur.days[cur.days.length - 1] >= today || ranges.length) { ranges.push(cur); }
      cur = null;
      if (ranges.length >= 2) break;
    }
  }
  if (!ranges.length) { info.textContent = 'Ramazan tarihleri hesaplanamadı.'; return; }

  // Seçiciler
  var saved = store('mec_city') || 'İstanbul';
  CITIES.forEach(function (c) { var o = document.createElement('option'); o.value = c; o.textContent = c; if (c === saved) o.selected = true; citySel.appendChild(o); });
  ranges.forEach(function (r, idx) {
    var o = document.createElement('option'); o.value = idx;
    o.textContent = 'Ramazan ' + r.hy + ' (' + fmtD(r.days[0]) + ')';
    yearSel.appendChild(o);
  });

  function cacheKey(city, y, m) { return 'mec_im_' + city + '_' + y + '_' + m; }
  function fetchMonth(city, y, m) {
    var k = cacheKey(city, y, m);
    var c = store(k);
    if (c) { try { return Promise.resolve(JSON.parse(c)); } catch (e) { /* devam */ } }
    var url = 'https://api.aladhan.com/v1/calendarByCity/' + y + '/' + m + '?city=' + encodeURIComponent(ascii(city)) + '&country=Turkey&method=13';
    return fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); }).then(function (j) {
      if (!j || !j.data) throw new Error('data');
      var map = {};
      j.data.forEach(function (x) {
        var g = x.date.gregorian.date; // GG-AA-YYYY
        map[g] = { f: x.timings.Fajr, s: x.timings.Sunrise, d: x.timings.Dhuhr, a: x.timings.Asr, m: x.timings.Maghrib, i: x.timings.Isha };
      });
      store(k, JSON.stringify(map));
      return map;
    });
  }
  function t5(s) { return String(s || '').slice(0, 5); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function render() {
    var r = ranges[parseInt(yearSel.value, 10) || 0];
    var city = citySel.value;
    store('mec_city', city);
    info.textContent = city + ' için imsakiye yükleniyor…';
    body.innerHTML = '';
    $('im-today').hidden = true;
    var months = {};
    r.days.forEach(function (d) { months[d.getFullYear() + '/' + (d.getMonth() + 1)] = [d.getFullYear(), d.getMonth() + 1]; });
    Promise.all(Object.keys(months).map(function (k) { return fetchMonth(city, months[k][0], months[k][1]); }))
      .then(function (maps) {
        var all = {}; maps.forEach(function (m) { for (var k in m) all[k] = m[k]; });
        var html = '';
        var todayRow = null;
        r.days.forEach(function (d, idx) {
          var t = all[pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear()];
          if (!t) return;
          var isToday = key(d) === key(today);
          if (isToday) todayRow = t;
          html += '<tr' + (isToday ? ' class="today-row"' : '') + '><td>' + (idx + 1) + '</td><td>' + d.getDate() + ' ' + GM[d.getMonth()] + '</td><td>' + DAYS[d.getDay()] + '</td>' +
            '<td><b>' + t5(t.f) + '</b></td><td>' + t5(t.s) + '</td><td>' + t5(t.d) + '</td><td>' + t5(t.a) + '</td><td><b>' + t5(t.m) + '</b></td><td>' + t5(t.i) + '</td></tr>';
        });
        body.innerHTML = html;
        info.textContent = city + ' · Ramazan ' + r.hy + ': ' + fmtD(r.days[0]) + ' – ' + fmtD(r.days[r.days.length - 1]) + ' (' + r.days.length + ' gün). Tarihler hicri takvim hesabıyla bulunur; resmî ilan Diyanet\'e aittir ve 1 gün fark olabilir.';
        if (todayRow) {
          var box = $('im-today');
          box.hidden = false;
          box.innerHTML = '<div><span>Bugün imsak (sahur bitişi)</span><b>' + t5(todayRow.f) + '</b></div><div><span>Bugün iftar</span><b>' + t5(todayRow.m) + '</b></div>';
        }
      })
      .catch(function () {
        info.innerHTML = 'İmsakiye şu anda alınamadı. Lütfen daha sonra tekrar deneyin veya <a href="https://namazvakitleri.diyanet.gov.tr/" rel="noopener">Diyanet</a> sayfasına bakın.';
      });
  }
  citySel.addEventListener('change', render);
  yearSel.addEventListener('change', render);
  $('im-print').addEventListener('click', function () { window.print(); });
  render();
})();
