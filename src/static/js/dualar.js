// Dua listesi: gruba göre filtreleme + kopyalama
(function () {
  var list = document.getElementById('dua-list');
  if (!list) return;
  var chips = document.querySelectorAll('.filters .chip');
  var items = list.querySelectorAll('.dua');

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var g = c.getAttribute('data-g');
      chips.forEach(function (x) { x.classList.toggle('is-on', x === c); });
      items.forEach(function (d) { d.hidden = !!g && d.getAttribute('data-g') !== g; });
    });
  });

  list.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.copy') : null;
    if (!b) return;
    var text = b.getAttribute('data-copy');
    function done() { var o = b.textContent; b.textContent = 'Kopyalandı ✓'; setTimeout(function () { b.textContent = o; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done);
    else {
      var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (err) {}
      document.body.removeChild(t);
    }
  });

  // Bağlantıyla gelinen duayı göster (gizliyse filtreyi sıfırla)
  if (location.hash) {
    var el = document.getElementById(location.hash.slice(1));
    if (el) { el.classList.add('flash'); }
  }
})();
