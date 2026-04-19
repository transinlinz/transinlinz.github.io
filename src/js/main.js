function setUpEmailLinks() {
  window.setTimeout(() => {
    const codes = [
      116, 114, 97, 110, 115, 105, 110, 108, 105, 110, 122, 0x2709, 112, 114,
      111, 116, 111, 110, 109, 97, 105, 108, 46, 99, 111, 109,
    ];
    const name = codes.map((n) => String.fromCharCode(n)).join('');

    Array.prototype.forEach.call(
      document.querySelectorAll('a.ml'),
      (anchor) => {
        anchor.textContent = name;
      },
    );
  }, 0);

  window.setTimeout(() => {
    const codes = [
      109, 97, 105, 108, 116, 111, 58, 116, 114, 97, 110, 115, 105, 110, 108,
      105, 110, 122, 64, 112, 114, 111, 116, 111, 110, 109, 97, 105, 108, 46,
      99, 111, 109,
    ];
    const str = codes.map((n) => String.fromCharCode(n)).join('');

    Array.prototype.forEach.call(
      document.querySelectorAll('a.ml'),
      (anchor) => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          window.open(str);
        });
      },
    );
  }, 500);
}

function applyUserSettings() {
  const disableInclusiveLanguage =
    window.localStorage.getItem('disable-inclusive-language') === 'true';

  document.getElementById('accessiblity-toggle').checked =
    disableInclusiveLanguage;

  document.title = 'Trans SHG Linz';
  document
    .getElementById('trans-shg-logo')
    .setAttribute('alt', 'Trans SHG Linz Logo');
  document.documentElement.style.setProperty(
    '--inclusive-language-display',
    disableInclusiveLanguage ? 'none' : 'inline',
  );
  document.documentElement.style.setProperty(
    '--generic-masculine-prefix-display',
    disableInclusiveLanguage ? 'inline' : 'none',
  );
}

// Hamburger menu toggle
function setupHamburgerMenu() {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('main-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    btn.classList.toggle('is-active', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  // Close menu when a nav link is clicked (mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      menu.classList.remove('is-open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Menü öffnen');
    }
  });
}

// Redirect legacy hash-based URLs to new page paths
function redirectLegacyHash() {
  const { hash } = window.location;
  if (!hash) return;

  const match = hash.match(/^#([a-z-]+)(?::([0-9A-Za-z-]+))?$/);
  if (!match) return;

  const page = match[1];
  const anchor = match[2];

  const routes = {
    home: '/',
    shg: '/shg/',
    'code-of-conduct': '/code-of-conduct/',
    demands: '/demands/',
    meetup: '/meetup/',
    counseling: '/counseling/',
    transition: '/transition/',
    wiki: '/wiki/',
    'queer-in-linz': '/queer-in-linz/',
    legal: '/legal/',
  };

  const target = routes[page];
  if (target) {
    window.location.replace(target + (anchor ? '#' + anchor : ''));
  }
}

(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }

  redirectLegacyHash();
  applyUserSettings();
  setUpEmailLinks();
  setupHamburgerMenu();

  document
    .getElementById('accessiblity-toggle')
    .addEventListener('change', (e) => {
      const disableInclusiveLanguage = e.target.checked;
      const currentlyStoredValue =
        window.localStorage.getItem('disable-inclusive-language') === 'true';

      if (currentlyStoredValue !== disableInclusiveLanguage) {
        window.localStorage.setItem(
          'disable-inclusive-language',
          disableInclusiveLanguage,
        );
        applyUserSettings();
      }
    });
})();
