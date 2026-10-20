// Canlı yayın akışı: şu an yayında mı, sıradaki yayın ne zaman? (Türkiye saati)
(function () {
  var box = document.getElementById('live');
  if (!box) return;
  var items = [];
  try { items = JSON.parse(box.getAttribute('data-schedule') || '[]'); } catch (e) {}
  var hasLive = !!box.getAttribute('data-live');
  var GUNLER = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  var titleEl = document.getElementById('live-title');
  var nextEl = document.getElementById('live-next');
  var badge = document.getElementById('live-badge');
  if (!items.length) return;

  // Türkiye saatine göre şimdi: haftanın dakikası (Pazartesi 00:00 = 0)
  function nowMinutes() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return en.indexOf(o.weekday) * 1440 + (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
  }
  var WEEK = 7 * 1440;
  var slots = items.map(function (s) {
    var di = GUNLER.indexOf(s.day);
    var hm = String(s.time).split(':');
    var start = di * 1440 + parseInt(hm[0], 10) * 60 + parseInt(hm[1], 10);
    return { s: s, start: start, end: start + (s.duration || 60) };
  }).filter(function (x) { return x.s && GUNLER.indexOf(x.s.day) >= 0; });

  function rel(min) {
    if (min < 60) return min + ' dakika sonra';
    if (min < 1440) return Math.floor(min / 60) + ' saat ' + (min % 60 ? (min % 60) + ' dakika ' : '') + 'sonra';
    var d = Math.floor(min / 1440);
    return d + ' gün sonra';
  }
  function tick() {
    var now = nowMinutes();
    var live = null, next = null, best = Infinity;
    slots.forEach(function (x) {
      if ((now >= x.start && now < x.end) || (x.end > WEEK && now < x.end - WEEK)) live = x;
      var diff = x.start - now; if (diff <= 0) diff += WEEK;
      if (diff < best) { best = diff; next = x; }
    });
    if (live && !hasLive) {
      badge.textContent = 'Program Saati'; badge.className = 'live-badge';
      titleEl.textContent = live.s.title + ' – yayın saati';
    }
    if (next) nextEl.textContent = 'Sıradaki yayın: ' + next.s.title + ' · ' + next.s.day + ' ' + next.s.time + ' (' + rel(best) + ')';
    // Bugünün bloğunu vurgula
    var today = Math.floor(now / 1440);
    Array.prototype.forEach.call(document.querySelectorAll('.sched-day'), function (el) {
      el.classList.toggle('is-today', parseInt(el.getAttribute('data-day'), 10) === today);
    });
  }
  tick();
  setInterval(tick, 30000);
})();
