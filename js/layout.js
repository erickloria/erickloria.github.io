// Inject shared nav and footer into every page
(function() {
  const nav = `
  <nav class="nav">
    <a href="../index.html" class="nav-brand">
      <div>
        <div class="nav-brand-text">IB Physics &amp; TOK</div>
        <div class="nav-brand-sub">UWC Costa Rica</div>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li class="nav-dropdown">
        <a href="../pages/resources.html">Resources</a>
        <ul class="dropdown-menu">
          <li><a href="../pages/tok.html">TOK</a></li>
          <li><a href="../pages/book-hw.html">Book &amp; HW</a></li>
          <li><a href="../pages/labs.html">Labs</a></li>
          <li><a href="../pages/presentations.html">Presentations</a></li>
          <li><a href="../pages/extended-essay.html">Extended Essay</a></li>
          <li><a href="../pages/internal-assessment.html">Internal Assessment</a></li>
          <li><a href="../pages/sat.html">SAT</a></li>
          <li><a href="../pages/listening-corner.html">Listening Corner</a></li>
        </ul>
      </li>
      <li><a href="../pages/ai-tools.html">AI Tools</a></li>
    </ul>
    <button class="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  const footer = `
  <footer class="footer">
    <div>
      <div class="footer-brand">IB Physics &amp; TOK — UWC Costa Rica</div>
      <div>Erick Loría Soto &nbsp;·&nbsp; <a href="mailto:erick.loria@uwccostarica.org">erick.loria@uwccostarica.org</a></div>
    </div>
    <div>UWC Costa Rica &nbsp;·&nbsp; IB Diploma Programme</div>
  </footer>`;

  // Insert nav after <body> opens
  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', footer);

  // Mark active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === path) a.classList.add('active');
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target))
        navLinks.classList.remove('open');
    });
  }
})();
