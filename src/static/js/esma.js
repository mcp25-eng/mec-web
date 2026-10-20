// Esmaül Hüsna arama filtresi
(function () {
  var input = document.getElementById('esma-q');
  var cards = document.querySelectorAll('.esma-card[data-s]');
  var count = document.getElementById('esma-count');
  if (!input) return;
  function norm(s) {
    return s.toLocaleLowerCase('tr').replace(/[âàá]/g, 'a').replace(/[îíì]/g, 'i').replace(/[ûúù]/g, 'u')
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
      .replace(/[’'\-]/g, '');
  }
  var data = Array.prototype.map.call(cards, function (c) { return norm(c.getAttribute('data-s')); });
  input.addEventListener('input', function () {
    var q = norm(input.value.trim());
    var shown = 0;
    cards.forEach(function (c, i) {
      var ok = !q || data[i].indexOf(q) !== -1;
      c.hidden = !ok;
      if (ok) shown++;
    });
    var allah = document.querySelector('.esma-card.allah');
    if (allah) allah.hidden = !!q;
    count.textContent = shown + ' isim' + (q ? ' bulundu' : '');
  });
})();
