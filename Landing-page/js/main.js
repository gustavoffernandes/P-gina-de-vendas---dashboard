(function initAnnounceDismiss() {
  var bar = document.getElementById('top-announcement');
  var btn = document.getElementById('announce-close');
  var body = document.body;
  if (!bar || !btn) return;

  function dismiss() {
    bar.classList.add('hidden');
    bar.setAttribute('aria-hidden', 'true');
    body.classList.add('announce-dismissed');
  }

  btn.addEventListener('click', dismiss);
})();

(function initCountdown() {
  var target = new Date('2026-05-26T00:00:00-03:00');
  var els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  if (!els.days || !els.hours || !els.minutes || !els.seconds) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var now = new Date();
    var diff = target - now;
    if (diff <= 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      return;
    }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400);
    s %= 86400;
    var h = Math.floor(s / 3600);
    s %= 3600;
    var m = Math.floor(s / 60);
    s %= 60;
    els.days.textContent = pad(d);
    els.hours.textContent = pad(h);
    els.minutes.textContent = pad(m);
    els.seconds.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

(function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-trigger');
    var panel = item.querySelector('.faq-panel');
    var icon = btn && btn.querySelector('span:last-child');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var wasOpen = !panel.classList.contains('hidden');
      document.querySelectorAll('.faq-panel').forEach(function (p) {
        p.classList.add('hidden');
      });
      document.querySelectorAll('.faq-trigger').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        var ic = b.querySelector('span:last-child');
        if (ic) ic.textContent = '+';
      });
      if (wasOpen) return;
      panel.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      if (icon) icon.textContent = '\u2212';
    });
  });
})();

(function initBillingToggle() {
  var group = document.getElementById('billing-toggle');
  if (!group) return;

  var btnMonthly = document.getElementById('billing-monthly');
  var btnYearly = document.getElementById('billing-yearly');
  if (!btnMonthly || !btnYearly) return;

  function setMode(yearly) {
    btnMonthly.setAttribute('aria-pressed', yearly ? 'false' : 'true');
    btnYearly.setAttribute('aria-pressed', yearly ? 'true' : 'false');
    document.querySelectorAll('[data-price-row]').forEach(function (row) {
      var oldEl = row.querySelector('[data-price-old]');
      var newEl = row.querySelector('[data-price-new]');
      if (!oldEl || !newEl) return;
      if (yearly) {
        oldEl.textContent = oldEl.getAttribute('data-yearly') || '';
        newEl.textContent = newEl.getAttribute('data-yearly') || '';
      } else {
        oldEl.textContent = oldEl.getAttribute('data-monthly') || '';
        newEl.textContent = newEl.getAttribute('data-monthly') || '';
      }
      row.querySelectorAll('.js-price-period').forEach(function (el) {
        el.textContent = yearly
          ? el.getAttribute('data-suffix-year') || '/ano'
          : el.getAttribute('data-suffix-month') || '/mês';
      });
    });
  }

  var yearlyDefault = btnYearly.getAttribute('aria-pressed') === 'true';
  setMode(yearlyDefault);

  btnMonthly.addEventListener('click', function () {
    setMode(false);
  });
  btnYearly.addEventListener('click', function () {
    setMode(true);
  });
})();
