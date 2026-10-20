// Liste filtreleme (Kur'an sureleri, soru-cevap, sözlük)
(function () {
  var input = document.getElementById('list-q');
  var root = document.getElementById('list-items');
  if (!input || !root) return;
  var items = Array.prototype.slice.call(root.querySelectorAll('.fi'));
  var groups = Array.prototype.slice.call(root.querySelectorAll('.fgroup'));
  var count = document.getElementById('list-count');
  var unit = count ? (count.textContent.replace(/^\d+\s*/, '') || '') : '';

  function norm(s) { return s.toLocaleLowerCase('tr').trim(); }
  function run() {
    var q = norm(input.value);
    var n = 0;
    items.forEach(function (el) {
      var hit = !q || (el.getAttribute('data-t') || '').indexOf(q) !== -1;
      el.hidden = !hit;
      if (hit) n++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('.fi:not([hidden])'); });
    if (count) count.textContent = n + ' ' + unit;
  }
  input.addEventListener('input', run);
  var m = /[?&]q=([^&]*)/.exec(location.search);
  if (m) { input.value = decodeURIComponent(m[1].replace(/\+/g, ' ')); run(); }
})();
