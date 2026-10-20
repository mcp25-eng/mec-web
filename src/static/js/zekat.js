// Zekât ve fitre hesaplama (veriler yalnızca tarayıcıda işlenir)
(function () {
  var app = document.getElementById('zekat-app');
  if (!app) return;
  var NISAB_GR = parseFloat(app.getAttribute('data-nisab')) || 80.18;
  var ids = ['z-altin-fiyat', 'z-nakit', 'z-altin', 'z-gumus', 'z-doviz', 'z-ticaret', 'z-alacak', 'z-borc'];
  var out = document.getElementById('z-result');
  function num(id) { var v = parseFloat(String(document.getElementById(id).value).replace(',', '.')); return isFinite(v) && v > 0 ? v : 0; }
  function tl(n) { return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺'; }
  function save() { try { var o = {}; ids.forEach(function (i) { o[i] = document.getElementById(i).value; }); localStorage.setItem('mec_zekat', JSON.stringify(o)); } catch (e) {} }
  function load() { try { var o = JSON.parse(localStorage.getItem('mec_zekat') || '{}'); ids.forEach(function (i) { if (o[i]) document.getElementById(i).value = o[i]; }); } catch (e) {} }

  function calc() {
    var fiyat = num('z-altin-fiyat');
    if (!fiyat) { out.innerHTML = '<p class="muted">Önce gram altın fiyatını yazın; nisap miktarı buna göre hesaplanır.</p>'; return; }
    var altinTl = num('z-altin') * fiyat;
    var toplam = num('z-nakit') + altinTl + num('z-gumus') + num('z-doviz') + num('z-ticaret') + num('z-alacak');
    var borc = num('z-borc');
    var net = Math.max(0, toplam - borc);
    var nisab = NISAB_GR * fiyat;
    var rows = '<table class="mini"><tbody>' +
      '<tr><td>Zekâta tabi toplam varlık</td><td>' + tl(toplam) + '</td></tr>' +
      '<tr><td>Borçlar</td><td>− ' + tl(borc) + '</td></tr>' +
      '<tr><td><strong>Net varlık</strong></td><td><strong>' + tl(net) + '</strong></td></tr>' +
      '<tr><td>Nisap (' + NISAB_GR.toLocaleString('tr-TR') + ' gr altın)</td><td>' + tl(nisab) + '</td></tr></tbody></table>';
    if (net >= nisab) {
      var z = net / 40;
      out.innerHTML = rows + '<div class="big-result ok"><span>Ödemeniz gereken zekât (kırkta bir)</span><b>' + tl(z) + '</b></div>' +
        '<p class="small muted">Varlığınız nisabı aşıyor. Malınız üzerinden bir kameri yıl geçmişse bu tutarı zekât olarak vermeniz gerekir.</p>';
    } else {
      out.innerHTML = rows + '<div class="big-result"><span>Net varlığınız nisabın altında</span><b>Zekât gerekmiyor</b></div>' +
        '<p class="small muted">Nisaba ulaşmak için ' + tl(nisab - net) + ' daha gerekir. Nisabın altındaki varlıklar için zekât farz değildir; dilerseniz sadaka verebilirsiniz.</p>';
    }
  }
  ids.forEach(function (i) { document.getElementById(i).addEventListener('input', function () { calc(); save(); }); });
  document.getElementById('z-reset').addEventListener('click', function () {
    ids.forEach(function (i) { document.getElementById(i).value = ''; });
    try { localStorage.removeItem('mec_zekat'); } catch (e) {}
    calc();
  });
  load(); calc();

  // Fitre
  var fk = document.getElementById('f-kisi'), ft = document.getElementById('f-tutar'), fo = document.getElementById('f-result');
  function fitre() {
    var k = parseInt(fk.value, 10), t = parseFloat(String(ft.value).replace(',', '.'));
    if (!(k > 0) || !(t > 0)) { fo.innerHTML = '<p class="muted">Kişi sayısı ve Diyanet\'in açıkladığı kişi başı tutarı girin.</p>'; return; }
    fo.innerHTML = '<div class="big-result ok"><span>' + k + ' kişi için toplam fitre</span><b>' + tl(k * t) + '</b></div>';
  }
  fk.addEventListener('input', fitre); ft.addEventListener('input', fitre);
  try { var s = localStorage.getItem('mec_fitre_tutar'); if (s && !ft.value) ft.value = s; } catch (e) {}
  ft.addEventListener('input', function () { try { localStorage.setItem('mec_fitre_tutar', ft.value); } catch (e) {} });
  fitre();
})();
