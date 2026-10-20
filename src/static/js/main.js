// Mobil menü + alt menü
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('ana-menu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.sub-btn').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var li = b.parentNode;
      var open = li.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      li.classList.remove('open');
      li.querySelector('.sub-btn').setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      li.classList.remove('open');
      li.querySelector('.sub-btn').setAttribute('aria-expanded', 'false');
    });
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
})();

// Okuma ilerleme çubuğu (makale sayfaları) + yukarı çık düğmesi
(function () {
  var article = document.querySelector('.article');
  var bar = null;
  if (article) {
    bar = document.createElement('div');
    bar.className = 'progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
  }
  var top = document.createElement('button');
  top.type = 'button';
  top.className = 'to-top';
  top.setAttribute('aria-label', 'Sayfanın başına dön');
  top.innerHTML = '&uarr;';
  top.hidden = true;
  document.body.appendChild(top);
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var ticking = false;
  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    top.hidden = y < 600;
    if (bar && article) {
      var start = article.offsetTop;
      var h = article.offsetHeight - window.innerHeight * 0.6;
      var p = Math.max(0, Math.min(1, (y - start) / Math.max(h, 1)));
      bar.style.transform = 'scaleX(' + p + ')';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

// Görünüm ayarları: koyu tema ve yazı boyutu
(function () {
  var d = document.documentElement;
  var themeBtn = document.getElementById('theme-btn');
  var inc = document.getElementById('fs-inc');
  var dec = document.getElementById('fs-dec');
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sync() { if (themeBtn) themeBtn.setAttribute('aria-pressed', d.getAttribute('data-theme') === 'dark' ? 'true' : 'false'); }
  sync();
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var dark = d.getAttribute('data-theme') === 'dark';
    if (dark) d.removeAttribute('data-theme'); else d.setAttribute('data-theme', 'dark');
    store('mec_theme', dark ? 'light' : 'dark');
    sync();
  });
  function fs(delta) {
    var cur = parseInt(d.getAttribute('data-fs') || '0', 10);
    var n = Math.max(-1, Math.min(3, cur + delta));
    if (n === 0) d.removeAttribute('data-fs'); else d.setAttribute('data-fs', String(n));
    store('mec_fs', n === 0 ? '' : String(n));
  }
  if (inc) inc.addEventListener('click', function () { fs(1); });
  if (dec) dec.addEventListener('click', function () { fs(-1); });
})();

// PWA: service worker + "Uygulamayı Yükle"
(function () {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('/sw.js').catch(function () {}); });
  }
  var btn = document.getElementById('install-btn');
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (btn) btn.hidden = false;
  });
  if (btn) btn.addEventListener('click', function () {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.then(function () { deferred = null; btn.hidden = true; });
  });
  window.addEventListener('appinstalled', function () { if (btn) btn.hidden = true; });
})();

// Formlar (bülten / soru sor): uç nokta varsa gönderir, yoksa e-posta uygulamasını açar
(function () {
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');
    function say(t, ok) { if (msg) { msg.textContent = t; msg.className = 'form-msg small ' + (ok ? 'ok' : 'err'); } }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      if (fd.get('_gotcha')) return;
      var endpoint = form.getAttribute('data-endpoint');
      var kind = form.getAttribute('data-form');
      if (endpoint) {
        say('Gönderiliyor…', true);
        fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('http');
            form.reset();
            say(kind === 'newsletter' ? 'Teşekkürler! Aboneliğiniz alındı.' : 'Teşekkürler! Sorunuz bize ulaştı.', true);
          })
          .catch(function () { say('Gönderilemedi. Lütfen daha sonra tekrar deneyin.', false); });
        return;
      }
      var to = form.getAttribute('data-mailto');
      var lines = [];
      fd.forEach(function (v, k) { if (k !== '_gotcha' && v) lines.push(k + ': ' + v); });
      var url = 'mailto:' + to + '?subject=' + encodeURIComponent(form.getAttribute('data-subject') || 'Form') + '&body=' + encodeURIComponent(lines.join('\n'));
      say('E-posta uygulamanız açılıyor; gönder düğmesine basarak tamamlayabilirsiniz.', true);
      window.location.href = url;
    });
  });
})();
