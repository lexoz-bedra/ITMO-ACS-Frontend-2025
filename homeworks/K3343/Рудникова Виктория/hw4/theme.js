(function () {
  var STORAGE_KEY = 'theme';
  var LIGHT = 'light';
  var DARK = 'dark';

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function getCurrent() {
    var stored = getStored();
    return stored === LIGHT || stored === DARK ? stored : LIGHT;
  }

  function setTheme(theme) {
    if (theme !== LIGHT && theme !== DARK) return;
    document.documentElement.setAttribute('data-theme', theme);
    setStored(theme);
    updateToggleButtons();
    updateMetaThemeColor(theme);
  }

  function updateMetaThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = theme === DARK ? '#0d1117' : '#212529';
  }

  function toggleTheme() {
    var current = getCurrent();
    setTheme(current === LIGHT ? DARK : LIGHT);
  }

  var SPRITE_URL = 'icons.svg';

  function updateToggleButtons() {
    var current = getCurrent();
    var nextLabel = current === LIGHT ? 'Включить тёмную тему' : 'Включить светлую тему';
    var iconId = current === LIGHT ? 'icon-sun' : 'icon-moon';

    document.querySelectorAll('#themeToggle').forEach(function (btn) {
      btn.setAttribute('aria-label', nextLabel);
      btn.setAttribute('title', nextLabel);
      var useEl = btn.querySelector('use');
      if (useEl) useEl.setAttribute('href', SPRITE_URL + '#' + iconId);
    });
  }

  function init() {
    setTheme(getCurrent());

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('#themeToggle');
      if (btn) {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
