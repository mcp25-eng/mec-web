// Kaza namazı borcu hesaplama
(function () {
  var app = document.getElementById('kaza-app');
  if (!app) return;
  var $ = function (id) { return document.getElementById(id); };
  var out = $('k-result');
  var VAKIT = ['Sabah', 'Öğle', 'İkindi', 'Akşam', 'Yatsı', 'Vitir'];

  function n(id) { var v = parseInt($(id).value, 10); return isFinite(v) && v > 0 ? v : 0; }
  function fmt(x) { return x.toLocaleString('tr-TR'); }
  function sureStr(days) {
    var y = Math.floor(days / 365), r = days % 365, m = Math.floor(r / 30), d = r % 30;
    var p = [];
    if (y) p.push(y + ' yıl'); if (m) p.push(m + ' ay'); if (d || !p.length) p.push(d + ' gün');
    return p.join(' ');
  }
  function toggle() {
    var mod = $('k-mod').value;
    $('k-tarih-box').hidden = mod !== 'tarih';
    $('k-sure-box').hidden = mod !== 'sure';
    $('k-hayiz-box').hidden = $('k-cinsiyet').value !== 'k';
  }
  function borcGun() {
    var days = 0;
    if ($('k-mod').value === 'tarih') {
      var dg = $('k-dogum').value, bs = $('k-basla').value;
      if (!dg || !bs) return null;
      var b = new Date(dg + 'T12:00:00');
      b.setFullYear(b.getFullYear() + parseInt($('k-erg').value, 10));
      var s = new Date(bs + 'T12:00:00');
      days = Math.max(0, Math.round((s - b) / 86400000));
    } else {
      days = n('k-yil') * 365 + n('k-ay') * 30 + n('k-gun');
    }
    if ($('k-cinsiyet').value === 'k') {
      var h = Math.min(15, Math.max(0, parseInt($('k-hayiz').value, 10) || 0));
      days = Math.round(days * (1 - h / 30));
    }
    return days;
  }
  function calc() {
    toggle();
    var days = borcGun();
    if (days === null) { out.innerHTML = '<p class="muted">Doğum ve başlangıç tarihlerini seçin.</p>'; return; }
    if (days <= 0) { out.innerHTML = '<div class="big-result ok"><span>Hesaplanan borç</span><b>Kaza namazı borcu yok</b></div>'; return; }
    var total = days * 6;
    var per = parseInt($('k-gunluk').value, 10) || 1;
    var needDays = Math.ceil(total / per);
    var eta = new Date(); eta.setDate(eta.getDate() + needDays);
    var etaStr = eta.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    out.innerHTML =
      '<div class="big-result"><span>Tahmini toplam kaza namazı</span><b>' + fmt(total) + '</b><small>' + fmt(days) + ' gün · ' + sureStr(days) + '</small></div>' +
      '<table class="mini"><tbody>' + VAKIT.map(function (v) { return '<tr><td>' + v + '</td><td>' + fmt(days) + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<div class="big-result ok"><span>Günde ' + per + ' vakit kılarsanız</span><b>' + sureStr(needDays) + '</b><small>Tahmini bitiş: ' + etaStr + '</small></div>' +
      '<div class="k-track"><p class="small"><strong>İlerleme takibi:</strong> Kıldığınız kaza sayısını girin.</p>' +
      '<div class="field-grid"><div class="field"><label for="k-kilinan">Şimdiye kadar kıldığım kaza</label><input id="k-kilinan" type="number" min="0" step="1" value="' + (parseInt(localStorage.getItem('mec_kaza_done') || '0', 10) || 0) + '"></div></div>' +
      '<div class="h-bar"><div id="k-bar" style="width:0%"></div></div><p class="small muted" id="k-bar-txt"></p></div>';
    var inp = $('k-kilinan');
    function upd() {
      var d = Math.max(0, parseInt(inp.value, 10) || 0);
      try { localStorage.setItem('mec_kaza_done', String(d)); } catch (e) {}
      var p = Math.min(100, d / total * 100);
      $('k-bar').style.width = p + '%';
      $('k-bar-txt').textContent = fmt(d) + ' / ' + fmt(total) + ' (%' + p.toFixed(1).replace('.', ',') + ') · Kalan ' + fmt(Math.max(0, total - d));
    }
    inp.addEventListener('input', upd); upd();
  }
  Array.prototype.forEach.call(app.querySelectorAll('input,select'), function (el) {
    el.addEventListener('input', calc); el.addEventListener('change', calc);
  });
  // Başlangıç tarihi varsayılanı: bugün
  var t = new Date(); var iso = t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
  $('k-basla').value = iso;
  calc();
})();
