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

  const lectureSectionPages = new Set([
    'physics.html', 'lectures.html',
    'lecture-1-si-units.html', 'lecture-2-vectors.html', 'lecture-3-motion-sensor.html',
    'lecture-4-ripple-tank.html', 'lecture-5-light-box.html', 'lecture-6-refraction.html',
    'lecture-7-tir.html', 'lecture-8-single-slit-first-look.html',
    'lecture-9-single-slit-quant.html', 'lecture-10-lunar-eclipse.html',
  ]);

  const primaryNav = [
    { label: 'Physics', href: `${pagePrefix}physics.html`, key: 'physics.html' },
    { label: 'UWC', href: `${pagePrefix}uwc.html`, key: 'uwc', dropdown: uwcItems },
    { label: 'Astronomy', href: `${pagePrefix}astronomy.html`, key: 'astronomy.html' },
    { label: 'Projects', href: `${pagePrefix}projects.html`, key: 'projects.html' },
    { label: 'About', href: `${pagePrefix}about.html`, key: 'about.html' },
  ];

  const isUwcSection = uwcSectionPages.has(path);
  const isLectureSection = lectureSectionPages.has(path);
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
    const isActive = item.key === path || (item.key === 'physics.html' && isLectureSection);
    return `<li><a href="${item.href}" class="${isActive ? 'active' : ''}">${item.label}</a></li>`;
  }).join('');

  const mobileNavHtml = primaryNav.map(item => {
    if (item.dropdown) {
      const subs = item.dropdown.map(sub =>
        `<a href="${sub.href}" class="nav-mobile-sub ${sub.key === path ? 'active' : ''}">${sub.label}</a>`
      ).join('');
      return `<a href="${item.href}" class="${isUwcSection ? 'active' : ''}">${item.label}</a>${subs}`;
    }
    const isActive = item.key === path || (item.key === 'physics.html' && isLectureSection);
    return `<a href="${item.href}" class="${isActive ? 'active' : ''}">${item.label}</a>`;
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
          <a href="https://www.linkedin.com/in/erick-loria-soto/" target="_blank" rel="noopener"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:4px;" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>LinkedIn</a>
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
