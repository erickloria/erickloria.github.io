// Injects the shared system bar, nav, and footer into pages using the shared layout.
document.addEventListener('DOMContentLoaded', () => {
  const inPagesDir = window.location.pathname.includes('/pages/');
  const homeHref = inPagesDir ? '../index.html' : 'index.html';
  const pagePrefix = inPagesDir ? '' : 'pages/';
  const currentYear = new Date().getFullYear();
  const path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const uwcItems = [
    { label: 'Physics Course', href: `${pagePrefix}resources.html`, key: 'resources.html' },
    { label: 'Theory of Knowledge', href: `${pagePrefix}tok.html`, key: 'tok.html' },
    { label: 'AI Guidance', href: `${pagePrefix}ai-tools.html`, key: 'ai-tools.html' },
    { label: 'Student Resources', href: `${pagePrefix}misc.html`, key: 'misc.html' },
  ];

  const uwcSectionPages = new Set([
    'uwc.html', 'resources.html', 'book-hw.html', 'labs.html', 'presentations.html',
    'internal-assessment.html', 'extended-essay.html', 'tools.html', 'manual-viewer.html',
    'tok.html', 'tok-exhibition-guide.html', 'ai-tools.html', 'ai-citation-guide.html',
    'meetings.html', 'sat.html', 'summer-programs.html', 'listening-corner.html', 'misc.html'
  ]);

  const primaryNav = [
    { label: 'Physics', href: `${pagePrefix}physics.html`, key: 'physics.html' },
    { label: 'UWC', href: `${pagePrefix}uwc.html`, key: 'uwc', dropdown: uwcItems },
    { label: 'Astronomy', href: `${pagePrefix}astronomy.html`, key: 'astronomy.html' },
    { label: 'Projects', href: `${pagePrefix}projects.html`, key: 'projects.html' },
    { label: 'About', href: `${pagePrefix}about.html`, key: 'about.html' },
  ];

  const isUwcSection = uwcSectionPages.has(path);
  document.body.dataset.page = path;

  const navLinksHtml = primaryNav.map(item => {
    if (item.dropdown) {
      const open = isUwcSection;
      const menu = item.dropdown.map(sub =>
        `<a href="${sub.href}" class="${sub.key === path ? 'active' : ''}">${sub.label}</a>`
      ).join('');
      return `
        <li class="nav-dropdown"${open ? ' data-open="false"' : ''}>
          <a href="${item.href}" class="nav-dropdown-trigger ${open ? 'active' : ''}" aria-haspopup="true" aria-expanded="false">${item.label}</a>
          <div class="dropdown-menu">${menu}</div>
        </li>`;
    }
    return `<li><a href="${item.href}" class="${item.key === path ? 'active' : ''}">${item.label}</a></li>`;
  }).join('');

  const mobileNavHtml = primaryNav.map(item => {
    if (item.dropdown) {
      const subs = item.dropdown.map(sub =>
        `<a href="${sub.href}" class="nav-mobile-sub ${sub.key === path ? 'active' : ''}">${sub.label}</a>`
      ).join('');
      return `<a href="${item.href}" class="${isUwcSection ? 'active' : ''}">${item.label}</a>${subs}`;
    }
    return `<a href="${item.href}" class="${item.key === path ? 'active' : ''}">${item.label}</a>`;
  }).join('');

  const sysbar = `
  <div class="sysbar">
    <div class="sysbar-inner">
      <span>PERSONAL ARCHIVE · COSTA RICA</span>
      <span>ONLINE · ${new Date().toISOString().slice(0, 10).replace(/-/g, '.')}</span>
    </div>
  </div>`;

  const nav = `
  <header class="nav">
    <div class="nav-inner">
      <a href="${homeHref}" class="nav-brand">
        <span class="nav-brand-text">Erick Loría Soto</span>
      </a>
      <nav aria-label="Primary">
        <ul class="nav-links">${navLinksHtml}</ul>
      </nav>
      <a href="${pagePrefix}meetings.html" class="nav-cta btn-bracket">[ BOOK TUTORIAL ]</a>
      <button class="nav-hamburger" aria-label="Menu" aria-expanded="false" aria-controls="site-nav-mobile">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="site-nav-mobile">
      <div class="nav-mobile-inner">
        ${mobileNavHtml}
        <a href="${pagePrefix}meetings.html" class="btn-bracket nav-mobile-cta">[ BOOK TUTORIAL ]</a>
      </div>
    </div>
  </header>`;

  const footer = `
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-copy">
        <div class="footer-brand">Erick Loría Soto</div>
        <div class="footer-contact"><a href="mailto:erick.loria@uwccostarica.org">erick.loria@uwccostarica.org</a></div>
        <div class="footer-links">
          <a href="${homeHref}">Index</a>
          <a href="${pagePrefix}about.html">About / CV</a>
          <a href="https://github.com/erickloria" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="footer-legal">
        <strong>Copyright ${currentYear} Erick Loría Soto.</strong> All original site content, writing, and design are my own unless otherwise credited. Built with HTML, CSS, JavaScript, and GitHub Pages.
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', sysbar + nav);
  document.body.insertAdjacentHTML('beforeend', footer);

  // ── dropdown interaction (hover, click/touch, keyboard) ──
  document.querySelectorAll('.nav-dropdown').forEach(wrapper => {
    const trigger = wrapper.querySelector('.nav-dropdown-trigger');
    let closeTimer = null;

    const open = () => {
      clearTimeout(closeTimer);
      wrapper.dataset.open = 'true';
      trigger.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      wrapper.dataset.open = 'false';
      trigger.setAttribute('aria-expanded', 'false');
    };
    const scheduleClose = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(close, 150);
    };

    wrapper.addEventListener('mouseenter', open);
    wrapper.addEventListener('mouseleave', scheduleClose);
    wrapper.addEventListener('focusin', open);
    wrapper.addEventListener('focusout', e => {
      if (!wrapper.contains(e.relatedTarget)) scheduleClose();
    });
    wrapper.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); trigger.blur(); }
    });
    trigger.addEventListener('click', e => {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        wrapper.dataset.open === 'true' ? close() : open();
      }
    });
  });

  document.addEventListener('click', e => {
    document.querySelectorAll('.nav-dropdown[data-open="true"]').forEach(wrapper => {
      if (!wrapper.contains(e.target)) wrapper.dataset.open = 'false';
    });
  });

  // ── mobile hamburger ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    const closeNav = () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeNav();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeNav();
    });
  }
});
