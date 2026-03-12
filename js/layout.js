// Inject shared nav and footer into every page after the DOM is parsed.
document.addEventListener('DOMContentLoaded', () => {
  const inPagesDir = window.location.pathname.includes('/pages/');
  const homeHref = inPagesDir ? '../index.html' : 'index.html';
  const pagePrefix = inPagesDir ? '' : 'pages/';
  const assetPrefix = inPagesDir ? '../' : '';

  const nav = `
  <nav class="nav">
    <a href="${homeHref}" class="nav-brand">
      <picture class="nav-brand-logo">
        <source media="(prefers-color-scheme: dark)" srcset="${assetPrefix}Images/Logo-Main-White.png">
        <img src="${assetPrefix}Images/Logo-Main-Color.png" alt="UWC Costa Rica logo">
      </picture>
      <div class="nav-brand-copy">
        <div class="nav-brand-text">Home</div>
      </div>
    </a>
    <ul class="nav-links">
      <li class="nav-dropdown">
        <a href="${pagePrefix}resources.html">IB Physics</a>
        <ul class="dropdown-menu">
          <li><a href="${pagePrefix}book-hw.html">Book &amp; HW</a></li>
          <li><a href="${pagePrefix}tools.html">Course Tools</a></li>
          <li><a href="${pagePrefix}extended-essay.html">Extended Essay</a></li>
          <li><a href="${pagePrefix}internal-assessment.html">Internal Assessment</a></li>
          <li><a href="${pagePrefix}labs.html">Labs</a></li>
          <li><a href="${pagePrefix}presentations.html">Presentations</a></li>
        </ul>
      </li>
      <li><a href="${pagePrefix}tok.html">TOK</a></li>
      <li class="nav-dropdown">
        <a href="${pagePrefix}misc.html">Misc</a>
        <ul class="dropdown-menu">
          <li><a href="${pagePrefix}listening-corner.html">Listening Corner</a></li>
          <li><a href="${pagePrefix}sat.html">SAT</a></li>
          <li><a href="${pagePrefix}summer-programs.html">Summer Programs</a></li>
        </ul>
      </li>
      <li><a href="${pagePrefix}meetings.html">Meetings</a></li>
      <li><a href="${pagePrefix}ai-tools.html">AI Tools</a></li>
    </ul>
    <button class="nav-hamburger" aria-label="Menu" aria-expanded="false" aria-controls="site-nav-links">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  const footer = `
  <footer class="footer">
    <div class="footer-brand-wrap">
      <img class="footer-logo" src="${assetPrefix}Images/Logo-Main-White.png" alt="UWC Costa Rica logo">
      <div>
        <div class="footer-brand">IB Physics &amp; TOK — UWC Costa Rica</div>
        <div>Erick Loría Soto &nbsp;·&nbsp; <a href="mailto:erick.loria@uwccostarica.org">erick.loria@uwccostarica.org</a></div>
      </div>
    </div>
    <div>UWC Costa Rica &nbsp;·&nbsp; IB Diploma Programme</div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', footer);

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path) a.classList.add('active');
  });

  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    navLinks.id = 'site-nav-links';

    const closeNav = () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) closeNav();
      });
    });

    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeNav();
    });
  }
});
