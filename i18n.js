(function () {
  const SUPPORTED   = ['en', 'cs'];
  const DEFAULT     = 'en';
  const STORAGE_KEY = 'bf_lang';

  let currentLang = DEFAULT;

  function resolveLang() {
    // 1. URL param
    const params  = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && SUPPORTED.includes(urlLang)) return urlLang;

    // 2. localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;

    // 3. Browser language
    const browserLang = (navigator.language || '').toLowerCase().split('-')[0];
    if (SUPPORTED.includes(browserLang)) return browserLang;

    // 4. Fallback
    return DEFAULT;
  }

  function t(key) {
    const keys = key.split('.');
    function lookup(obj) {
      let val = obj;
      for (const k of keys) {
        if (val == null || typeof val !== 'object') return null;
        val = val[k];
      }
      return val != null ? val : null;
    }
    const val = lookup(window.translations[currentLang]);
    if (val !== null) return val;
    return lookup(window.translations[DEFAULT]) || key;
  }

  function updateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    // Page title
    var titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = t('page.title');
  }

  function updateToggle() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      if (btn.dataset.langBtn === currentLang) {
        btn.classList.add('text-orange', 'font-semibold');
        btn.classList.remove('text-gray-400');
      } else {
        btn.classList.remove('text-orange', 'font-semibold');
        btn.classList.add('text-gray-400');
      }
    });
  }

  window.setLang = function (lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;

    document.documentElement.lang = lang;

    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());

    localStorage.setItem(STORAGE_KEY, lang);

    updateDOM();
    updateToggle();
  };

  // Expose t() globally so inline JS (form validation, modal reset) can use it
  window.t = t;

  function init() {
    currentLang = resolveLang();
    setLang(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
