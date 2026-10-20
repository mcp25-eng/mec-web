// Site içi arama (search.json üzerinden)
(function () {
  var status = document.getElementById('search-status');
  var out = document.getElementById('search-results');
  var input = document.getElementById('q-page');
  if (!out) return;

  function norm(s) {
    return String(s).toLocaleLowerCase('tr').replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u')
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u');
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var q = (new URLSearchParams(location.search).get('q') || '').trim();
  if (input) input.value = q;
  if (!q) { status.textContent = 'Aramak istediğiniz kelimeyi yazın.'; return; }
  status.textContent = 'Aranıyor…';

  fetch('/search.json').then(function (r) { return r.json(); }).then(function (data) {
    var tokens = norm(q).split(/\s+/).filter(Boolean);
    var res = data.map(function (a) {
      var t = norm(a.t), k = norm(a.k), d = norm(a.d), x = norm(a.x);
      var score = 0, ok = true;
      tokens.forEach(function (w) {
        var s = 0;
        if (t.indexOf(w) > -1) s += 5;
        if (k.indexOf(w) > -1) s += 3;
        if (d.indexOf(w) > -1) s += 2;
        if (x.indexOf(w) > -1) s += 1;
        if (!s) ok = false;
        score += s;
      });
      return ok ? { a: a, s: score } : null;
    }).filter(Boolean).sort(function (m, n) { return n.s - m.s; });

    status.textContent = res.length ? '“' + q + '” için ' + res.length + ' sonuç bulundu.' : '“' + q + '” için sonuç bulunamadı. Farklı bir kelime deneyin.';
    out.innerHTML = res.map(function (r) {
      var a = r.a;
      return '<article class="card"><a class="card-link" href="' + a.u + '"><div class="card-top"><span class="tag">' + esc(a.c) + '</span></div><h3>' + esc(a.t) + '</h3><p>' + esc(a.d) + '</p></a></article>';
    }).join('');
  }).catch(function () { status.textContent = 'Arama şu anda kullanılamıyor.'; });
})();
