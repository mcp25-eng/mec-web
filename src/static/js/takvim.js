// Dinî günler takvimi (hicri takvim hesabıyla; Diyanet ilanından 1 gün fark olabilir)
(function () {
  var upcomingEl = document.getElementById('upcoming');
  var bodyEl = document.getElementById('takvim-body');
  if (!upcomingEl && !bodyEl) return;

  var MONTHS = ['Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir', 'Cemaziyelevvel', 'Cemaziyelahir', 'Recep', 'Şaban', 'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'];
  var EV = [
    { ad: 'Hicri Yılbaşı', m: 1, d: 1, tip: 'Dinî Gün' },
    { ad: 'Aşure Günü', m: 1, d: 10, tip: 'Dinî Gün' },
    { ad: 'Mevlid Kandili', m: 3, d: 12, tip: 'Kandil', eve: true },
    { ad: 'Üç Ayların Başlangıcı', m: 7, d: 1, tip: 'Dinî Gün' },
    { ad: 'Regaib Kandili', m: 7, first: 5, tip: 'Kandil', eve: true },
    { ad: 'Miraç Kandili', m: 7, d: 27, tip: 'Kandil', eve: true },
    { ad: 'Berat Kandili', m: 8, d: 15, tip: 'Kandil', eve: true },
    { ad: 'Ramazan Başlangıcı', m: 9, d: 1, tip: 'Ramazan' },
    { ad: 'Kadir Gecesi', m: 9, d: 27, tip: 'Kandil', eve: true },
    { ad: 'Ramazan Bayramı (1. gün)', m: 10, d: 1, tip: 'Bayram' },
    { ad: 'Kurban Bayramı Arefesi', m: 12, d: 9, tip: 'Dinî Gün' },
    { ad: 'Kurban Bayramı (1. gün)', m: 12, d: 10, tip: 'Bayram' }
  ];
  var DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  var GM = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  var fmt;
  try { fmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }); fmt.format(new Date()); }
  catch (e) {
    try { fmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }); }
    catch (e2) { fmt = null; }
  }
  if (!fmt) {
    var msg = 'Tarayıcınız hicri takvim hesabını desteklemiyor. Lütfen Diyanet takvimine bakın.';
    if (upcomingEl) upcomingEl.innerHTML = '<li class="muted">' + msg + '</li>';
    if (bodyEl) bodyEl.innerHTML = '<tr><td colspan="4">' + msg + '</td></tr>';
    return;
  }

  function hijri(date) {
    var o = {};
    fmt.formatToParts(date).forEach(function (p) { if (p.type !== 'literal') o[p.type] = parseInt(p.value, 10); });
    return o; // day, month, year
  }
  function at(d, add) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (add || 0), 12); }
  function dstr(d) { return d.getDate() + ' ' + GM[d.getMonth()] + ' ' + d.getFullYear() + ' ' + DAYS[d.getDay()]; }

  var today = at(new Date());
  var start = at(today, -1);
  var list = [];
  var seenFirst = {};
  for (var i = 0; i < 800; i++) {
    var date = at(start, i);
    var h = hijri(date);
    EV.forEach(function (ev, idx) {
      var hit = false;
      if (ev.first) {
        var key = idx + '-' + h.year;
        if (h.month === ev.m && date.getDay() === ev.first && !seenFirst[key]) { seenFirst[key] = true; hit = true; }
      } else if (h.month === ev.m && h.day === ev.d) hit = true;
      if (hit) {
        var shown = ev.eve ? at(date, -1) : date; // kandiller: akşamı (bir önceki gün)
        list.push({ ev: ev, date: shown, h: h, hdate: date });
      }
    });
  }
  list = list.filter(function (x) { return x.date >= today; }).sort(function (a, b) { return a.date - b.date; });

  function left(d) {
    var n = Math.round((d - today) / 86400000);
    return n === 0 ? 'Bugün' : n === 1 ? 'Yarın' : n + ' gün kaldı';
  }

  // Anasayfa: yaklaşan günler
  if (upcomingEl) {
    var limit = parseInt(upcomingEl.getAttribute('data-limit') || '4', 10);
    upcomingEl.innerHTML = list.slice(0, limit).map(function (x) {
      return '<li><div class="ud"><b>' + x.date.getDate() + '</b><span>' + GM[x.date.getMonth()] + '</span></div>' +
        '<div class="ut"><strong>' + x.ev.ad + '</strong><span>' + DAYS[x.date.getDay()] + (x.ev.eve ? ' akşamı' : '') + ' · ' + left(x.date) + '</span></div></li>';
    }).join('');
  }

  // Takvim sayfası: tüm liste
  if (bodyEl) {
    var cutoff = at(today, 730);
    bodyEl.innerHTML = list.filter(function (x) { return x.date <= cutoff; }).map(function (x) {
      var hd = x.h.day + ' ' + MONTHS[x.h.month - 1] + ' ' + x.h.year;
      var tag = x.ev.tip === 'Kandil' ? 'kandil' : x.ev.tip === 'Bayram' ? 'bayram' : '';
      return '<tr><td><span class="pill ' + tag + '">' + x.ev.tip + '</span> <strong>' + x.ev.ad + '</strong></td><td>' + hd + '</td><td>' +
        dstr(x.date) + (x.ev.eve ? ' (akşamı)' : '') + '</td><td>' + left(x.date) + '</td></tr>';
    }).join('');
    // Bugünün tarihleri
    var g = document.getElementById('date-greg'), hh = document.getElementById('date-hijri');
    var now = new Date();
    if (g && !g.textContent) g.textContent = now.getDate() + ' ' + GM[now.getMonth()] + ' ' + now.getFullYear() + ' ' + DAYS[now.getDay()];
    if (hh && !hh.textContent) { var t = hijri(now); hh.textContent = 'Hicri ' + t.day + ' ' + MONTHS[t.month - 1] + ' ' + t.year; }
  }
})();
