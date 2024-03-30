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
      }
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
      }
    );
  }, 500);
}

function loadContent(contentId) {
  const contentNode = document.getElementById(contentId);

  if (contentNode.nodeName === 'TEMPLATE') {
    document
      .getElementById('content-slot')
      .replaceChildren(contentNode.content.cloneNode(true));
    setUpEmailLinks();
  }
}

function scrollToPageStart() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const locationHashRegex = /^#([a-z-]+)(?:\:([0-9A-Za-z-]+))?$/;

function loadContentFromHash() {
  const { hash } = window.location;
  const templateId = hash.replace(locationHashRegex, '$1');

  if (templateId === '') {
    loadContent('home-content');
  } else {
    const anchor = hash.replace(locationHashRegex, '$2');

    loadContent(`${templateId}-content`);

    if (anchor !== '') {
      // needs to be invoked after the page has finished rendering
      window.setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView();
      }, 0);
    }
  }
}

function applyUserSettings() {
  const disableInclusiveLanguage =
    window.localStorage.getItem('disable-inclusive-language') === 'true';

  document.getElementById('accessiblity-toggle').checked =
    disableInclusiveLanguage;

  document.title = disableInclusiveLanguage
    ? 'Trans SHG Linz'
    : 'Trans* SHG Linz';
  document
    .getElementById('trans-shg-logo')
    .setAttribute(
      'alt',
      disableInclusiveLanguage ? 'Trans SHG Linz Logo' : 'Trans* SHG Linz Logo'
    );
  document.documentElement.style.setProperty(
    '--inclusive-language-display',
    disableInclusiveLanguage ? 'none' : 'inline'
  );
  document.documentElement.style.setProperty(
    '--generic-masculine-prefix-display',
    disableInclusiveLanguage ? 'inline' : 'none'
  );
}

(() => {
  applyUserSettings();
  loadContentFromHash();

  document
    .getElementById('accessiblity-toggle')
    .addEventListener('change', (e) => {
      const disableInclusiveLanguage = e.target.checked;
      const currentlyStoredValue =
        window.localStorage.getItem('disable-inclusive-language') === 'true';

      if (currentlyStoredValue !== disableInclusiveLanguage) {
        window.localStorage.setItem(
          'disable-inclusive-language',
          disableInclusiveLanguage
        );
        applyUserSettings();
      }
    });
  window.addEventListener('hashchange', () => {
    loadContentFromHash();
    scrollToPageStart();
  });
})();
