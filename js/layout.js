// Inject shared nav and footer into pages that still use the shared layout system.
document.addEventListener('DOMContentLoaded', () => {
  const inPagesDir = window.location.pathname.includes('/pages/');
  const homeHref = inPagesDir ? '../index.html' : 'index.html';
  const pagePrefix = inPagesDir ? '' : 'pages/';
  const currentYear = new Date().getFullYear();
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const sectionPages = {
    home: new Set(['index.html', '']),
    physics: new Set([
      'resources.html',
      'book-hw.html',
      'tools.html',
      'extended-essay.html',
      'internal-assessment.html',
      'labs.html',
      'presentations.html'
    ]),
    tok: new Set([
      'tok.html',
      'tok-exhibition-guide.html'
    ]),
    misc: new Set([
      'misc.html',
      'listening-corner.html',
      'sat.html',
      'summer-programs.html'
    ]),
    ai: new Set([
      'ai-tools.html',
      'ai-citation-guide.html'
    ]),
    meetings: new Set([
      'meetings.html'
    ])
  };

  const section = Object.entries(sectionPages).find(([, pages]) => pages.has(path))?.[0] || 'default';
  document.body.dataset.page = path;
  document.body.dataset.section = section;

  const nav = `
  <nav class="nav">
    <div class="nav-inner">
      <a href="${homeHref}" class="nav-brand">
        <div class="nav-brand-text">The Physics Lab</div>
      </a>
      <ul class="nav-links">
        <li><a href="${pagePrefix}resources.html" data-nav-key="physics">IB Physics</a></li>
        <li><a href="${pagePrefix}tok.html" data-nav-key="tok">TOK</a></li>
        <li><a href="${pagePrefix}misc.html" data-nav-key="misc">Resources</a></li>
        <li><a href="${pagePrefix}ai-tools.html" data-nav-key="ai">AI Tools</a></li>
        <li><a href="${pagePrefix}meetings.html" data-nav-key="meetings">Meetings</a></li>
      </ul>
      <a href="${pagePrefix}meetings.html" class="nav-cta btn-primary">Meetings</a>
      <button class="nav-hamburger" aria-label="Menu" aria-expanded="false" aria-controls="site-nav-mobile">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
    <div class="nav-mobile" id="site-nav-mobile">
      <div class="nav-mobile-inner">
        <a href="${pagePrefix}resources.html" data-nav-key="physics">IB Physics</a>
        <a href="${pagePrefix}tok.html" data-nav-key="tok">TOK</a>
        <a href="${pagePrefix}misc.html" data-nav-key="misc">Resources</a>
        <a href="${pagePrefix}ai-tools.html" data-nav-key="ai">AI Tools</a>
        <a href="${pagePrefix}meetings.html" data-nav-key="meetings">Meetings</a>
        <a href="${pagePrefix}meetings.html" class="nav-mobile-cta btn-primary">Meetings</a>
      </div>
    </div>
  </nav>`;

  const footer = `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-copy">
          <div class="footer-brand">IB Physics &amp; TOK — UWC Costa Rica</div>
          <div class="footer-contact">Erick Loria Soto · <a href="mailto:erick.loria@uwccostarica.org">erick.loria@uwccostarica.org</a></div>
        </div>
        <div class="footer-legal">
          <strong>Copyright ${currentYear} Erick Loria Soto.</strong> All original site content, course materials, design, and writing are my own unless otherwise credited. Built with HTML, CSS, JavaScript, and GitHub Pages.
        </div>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', footer);

  document.querySelectorAll(`[data-nav-key="${section}"]`).forEach(link => {
    link.classList.add('active');
  });

  if (typeof window.initSiteNavDropdowns === 'function') {
    window.initSiteNavDropdowns();
  }

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

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        closeNav();
      }
    });
  }
});
