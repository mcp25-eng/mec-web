// Hatim takip aracı (ilerleme yalnızca bu cihazda saklanır)
(function () {
  var app = document.getElementById('hatim-app');
  if (!app) return;
  var $ = function (id) { return document.getElementById(id); };
  var TOTAL = 604;
  var CUZ = JSON.parse(app.getAttribute('data-cuz') || '[]');
  var KEY = 'mec_hatim';
  var state = null;

  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function parse(s) { return new Date(s + 'T12:00:00'); }
  function fmt(d) { return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }); }
  function load() { try { state = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { state = null; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function todayIso() { return iso(new Date()); }

  $('h-basla').value = todayIso();

  function show(tracking) { $('h-setup').hidden = tracking; $('h-track').hidden = !tracking; }

  function render() {
    if (!state) { show(false); return; }
    show(true);
    var t = todayIso();
    var readToday = (state.log && state.log[t]) || 0;
    var page = state.page;
    var elapsed = Math.max(0, Math.floor((parse(t) - parse(state.start)) / 86400000));
    var daysLeft = Math.max(1, state.days - elapsed);
    var startOfDay = page - readToday;
    var goal = Math.max(0, Math.ceil((TOTAL - startOfDay) / daysLeft));
    var left = Math.max(0, TOTAL - page);
    var pct = Math.min(100, page / TOTAL * 100);

    $('h-pct').textContent = Math.floor(pct) + '%';
    $('h-page').textContent = page + ' / ' + TOTAL + ' sayfa';
    $('h-today-goal').textContent = left === 0 ? '0' : goal;
    $('h-today-read').textContent = readToday;
    $('h-left').textContent = left;
    $('h-days').textContent = left === 0 ? 0 : daysLeft;
    $('h-bar-fill').style.width = pct + '%';

    var plan = parse(state.start); plan.setDate(plan.getDate() + state.days);
    var etaTxt = 'Planlanan: ' + fmt(plan);
    if (page > 0 && elapsed >= 2 && left > 0) {
      var pace = page / (elapsed + 1);
      var proj = new Date(); proj.setDate(proj.getDate() + Math.ceil(left / pace));
      etaTxt += ' · Mevcut hızınla: ' + fmt(proj);
    }
    $('h-eta').textContent = left === 0 ? 'Tamamlandı' : etaTxt;

    var hc = $('h-hatim-count');
    if (state.hatims) { hc.hidden = false; hc.innerHTML = '<span>Tamamlanan hatim:</span> <b>' + state.hatims + '</b>'; } else hc.hidden = true;

    // Cüzler
    var cells = '';
    for (var j = 1; j <= 30; j++) {
      var endPage = j < 30 ? (CUZ[j] || TOTAL) - 1 : TOTAL;
      var startPage = CUZ[j - 1] || 1;
      var cls = page >= endPage ? 'done' : (page >= startPage - 1 ? 'cur' : '');
      cells += '<div class="' + cls + '" title="Sayfa ' + startPage + '–' + endPage + '"><b>' + j + '</b><span>s. ' + startPage + '</span></div>';
    }
    $('h-cuz').innerHTML = cells;

    var msg = $('h-msg');
    if (left === 0) msg.textContent = 'Hatminiz tamamlandı. Allah kabul etsin! Hatim duasını okumayı ve yeni bir hatim başlatmayı unutmayın.';
    else if (readToday >= goal && goal > 0) msg.textContent = 'Bugünkü hedefi tamamladınız, maşallah. Allah devamını nasip etsin.';
    else msg.textContent = 'Bugün hedefe ' + Math.max(0, goal - readToday) + ' sayfa kaldı.';
  }

  function add(nn) {
    if (!state) return;
    var t = todayIso();
    var before = state.page;
    state.page = Math.min(TOTAL, state.page + nn);
    var added = state.page - before;
    if (added <= 0) return;
    state.log = state.log || {};
    state.log[t] = (state.log[t] || 0) + added;
    state.history = state.history || [];
    state.history.push({ d: t, n: added });
    if (state.page >= TOTAL && !state.finished) { state.hatims = (state.hatims || 0) + 1; state.finished = true; try { localStorage.setItem('mec_hatim_n', String(state.hatims)); } catch (e) {} }
    save(); render();
  }

  $('h-start').addEventListener('click', function () {
    var p0 = Math.max(0, Math.min(TOTAL, parseInt($('h-sayfa0').value, 10) || 0));
    state = { start: $('h-basla').value || todayIso(), days: parseInt($('h-gun').value, 10) || 30, page: p0, log: {}, history: [], hatims: parseInt(localStorage.getItem('mec_hatim_n') || '0', 10) || 0 };
    save(); render();
  });
  Array.prototype.forEach.call(app.querySelectorAll('[data-add]'), function (b) {
    b.addEventListener('click', function () { add(parseInt(b.getAttribute('data-add'), 10)); });
  });
  $('h-goal-btn').addEventListener('click', function () {
    var g = parseInt($('h-today-goal').textContent, 10) || 0;
    var r = parseInt($('h-today-read').textContent, 10) || 0;
    if (g > r) add(g - r);
  });
  $('h-undo').addEventListener('click', function () {
    if (!state || !state.history || !state.history.length) return;
    var last = state.history.pop();
    state.page = Math.max(0, state.page - last.n);
    state.log[last.d] = Math.max(0, (state.log[last.d] || 0) - last.n);
    if (state.page < TOTAL) state.finished = false;
    save(); render();
  });
  $('h-reset').addEventListener('click', function () {
    if (!confirm('Mevcut hatim ilerlemesi sıfırlansın mı?')) return;
    state = null;
    try { localStorage.removeItem(KEY); } catch (e) {}
    render();
  });

  load();
  render();
})();
