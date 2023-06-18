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
  const pageHeader = document.querySelector('#page-content h1');

  if (pageHeader) {
    pageHeader.scrollIntoView();
  }
}

function loadContentFromHash() {
  const { hash } = window.location;

  loadContent(
    /^#[a-z-]+$/.test(hash)
      ? `${hash.substring(hash.indexOf('#') + 1)}-content`
      : 'home-content'
  );
}

(() => {
  loadContentFromHash();

  window.addEventListener('hashchange', () => {
    loadContentFromHash();
    //scrollToPageStart(); // FIXME does not work correctly due to fixed header
  });
})();
