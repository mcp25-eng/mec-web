// Zikirmatik – tarayıcıda (localStorage) saklanır
(function () {
  var btn = document.getElementById('zikir-btn');
  if (!btn) return;
  var countEl = document.getElementById('zikir-count');
  var subEl = document.getElementById('zikir-sub');
  var totalEl = document.getElementById('zikir-total');
  var nameSel = document.getElementById('zikir-name');
  var targetSel = document.getElementById('zikir-target');
  var today = new Date().toISOString().slice(0, 10);
  var state = { count: 0, total: 0, day: today, name: '', target: '33' };

  try { var s = JSON.parse(localStorage.getItem('mec_zikir') || 'null'); if (s) state = s; } catch (e) {}
  if (state.day !== today) { state.day = today; state.total = 0; }
  if (state.name) nameSel.value = state.name;
  if (state.target) targetSel.value = state.target;

  function save() { try { localStorage.setItem('mec_zikir', JSON.stringify(state)); } catch (e) {} }
  function vib(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
  function draw() {
    var t = +targetSel.value;
    countEl.textContent = state.count;
    totalEl.textContent = state.total;
    btn.classList.toggle('done', t > 0 && state.count >= t);
    subEl.textContent = t > 0 ? state.count + ' / ' + t : 'dokun';
  }

  btn.addEventListener('click', function () {
    state.count++; state.total++;
    var t = +targetSel.value;
    vib(t > 0 && state.count === t ? 250 : 12);
    state.name = nameSel.value; state.target = targetSel.value;
    save(); draw();
  });
  document.getElementById('zikir-reset').addEventListener('click', function () { state.count = 0; save(); draw(); });
  document.getElementById('zikir-undo').addEventListener('click', function () {
    if (state.count > 0) { state.count--; state.total = Math.max(0, state.total - 1); save(); draw(); }
  });
  nameSel.addEventListener('change', function () { state.name = nameSel.value; state.count = 0; save(); draw(); });
  targetSel.addEventListener('change', function () { state.target = targetSel.value; save(); draw(); });
  draw();
})();
