// Günün ayeti / hadisi: gün sırasına göre döner
(function () {
  var box = document.getElementById('daily');
  if (!box) return;
  try {
    var items = JSON.parse(box.getAttribute('data-items'));
    var now = new Date();
    var dayNo = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    var it = items[(dayNo + now.getFullYear()) % items.length];
    document.getElementById('daily-type').textContent = it.type;
    document.getElementById('daily-ar').textContent = it.ar;
    document.getElementById('daily-tr').textContent = it.tr;
    document.getElementById('daily-src').textContent = it.source;
  } catch (e) { /* sessizce varsayılan içerik kalır */ }
})();
