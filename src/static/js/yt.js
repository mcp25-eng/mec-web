// YouTube videosu: tıklanınca yüklenir (sayfa hızını korur, gizlilik dostu domain)
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('.vthumb') : null;
    if (!a) return;
    e.preventDefault();
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(a.getAttribute('data-id')) + '?autoplay=1&rel=0';
    iframe.title = a.getAttribute('data-title') || 'Video';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.className = 'vframe';
    a.replaceWith(iframe);
  });
  // maxresdefault yoksa hqdefault'a düş
  document.querySelectorAll('.vthumb img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.src.indexOf('maxresdefault') > -1) img.src = img.src.replace('maxresdefault', 'hqdefault');
    });
    img.addEventListener('load', function () {
      if (img.naturalWidth === 120) img.src = img.src.replace('maxresdefault', 'hqdefault');
    });
  });
})();
