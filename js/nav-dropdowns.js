(function () {
  const STYLE_ID = 'site-nav-dropdown-styles';
  const DROPDOWN_GAP_REM = 0.6;
  const CLOSE_DELAY_MS = 130;

  const ensureStyles = () => {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .site-nav-dropdown-item {
        position: relative;
      }

      .site-nav-dropdown-container {
        gap: 2.75rem !important;
      }

      .site-nav-dropdown-item > a {
        position: relative;
        z-index: 2;
        white-space: nowrap;
      }

      .site-nav-dropdown-list-item {
        display: flex;
        align-items: center;
        list-style: none;
      }

      .site-nav-dropdown-menu {
        position: absolute;
        top: calc(100% + ${DROPDOWN_GAP_REM}rem);
        left: 50%;
        z-index: 70;
        display: flex;
        min-width: 250px;
        flex-direction: column;
        gap: 0.2rem;
        border: 1px solid rgba(195, 198, 212, 0.7);
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        box-shadow: 0 24px 48px -16px rgba(0, 43, 108, 0.18);
        opacity: 0;
        padding: 0.65rem;
        pointer-events: none;
        transform: translate(-50%, 0.4rem);
        transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
        visibility: hidden;
      }

      .site-nav-dropdown-menu::before {
        content: "";
        position: absolute;
        top: -0.45rem;
        left: 50%;
        width: 0.9rem;
        height: 0.9rem;
        border-left: 1px solid rgba(195, 198, 212, 0.7);
        border-top: 1px solid rgba(195, 198, 212, 0.7);
        background: rgba(255, 255, 255, 0.96);
        transform: translateX(-50%) rotate(45deg);
      }

      .site-nav-dropdown-item:hover .site-nav-dropdown-menu,
      .site-nav-dropdown-item:focus-within .site-nav-dropdown-menu,
      .site-nav-dropdown-item[data-open="true"] .site-nav-dropdown-menu {
        opacity: 1;
        pointer-events: auto;
        transform: translate(-50%, 0);
        visibility: visible;
      }

      .site-nav-dropdown-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        border-radius: 0.8rem;
        color: #1f2937;
        font-size: 0.92rem;
        font-weight: 600;
        line-height: 1.3;
        padding: 0.8rem 0.9rem;
        text-decoration: none;
        transition: background-color 0.16s ease, color 0.16s ease, transform 0.16s ease;
      }

      .site-nav-dropdown-link:hover,
      .site-nav-dropdown-link:focus-visible {
        background: rgba(0, 64, 153, 0.08);
        color: #004099;
        outline: none;
        transform: translateX(2px);
      }

      .site-nav-dropdown-link-active {
        background: linear-gradient(135deg, rgba(0, 64, 153, 0.1), rgba(29, 163, 129, 0.12));
        color: #004099;
      }

      @media (max-width: 767px) {
        .site-nav-dropdown-menu {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  };

  const basename = href => {
    try {
      return (new URL(href, window.location.href).pathname.split('/').pop() || 'index.html').toLowerCase();
    } catch (error) {
      return href.split('/').pop().toLowerCase();
    }
  };

  const buildMenus = () => {
    const inPagesDir = window.location.pathname.includes('/pages/');
    const pagePrefix = inPagesDir ? '' : 'pages/';

    return [
      {
        key: 'physics',
        trigger: `${pagePrefix}resources.html`,
        items: [
          { label: 'Book & Homework', href: `${pagePrefix}book-hw.html` },
          { label: 'Labs', href: `${pagePrefix}labs.html` },
          { label: 'Presentations', href: `${pagePrefix}presentations.html` },
          { label: 'Internal Assessment', href: `${pagePrefix}internal-assessment.html` },
          { label: 'Extended Essay', href: `${pagePrefix}extended-essay.html` },
          { label: 'Course Tools', href: `${pagePrefix}tools.html` }
        ]
      },
      {
        key: 'tok',
        trigger: `${pagePrefix}tok.html`,
        items: [
          { label: 'TOK Exhibition Guide', href: `${pagePrefix}tok-exhibition-guide.html` }
        ]
      },
      {
        key: 'misc',
        trigger: `${pagePrefix}misc.html`,
        items: [
          { label: 'SAT Preparation', href: `${pagePrefix}sat.html` },
          { label: 'Listening Corner', href: `${pagePrefix}listening-corner.html` },
          { label: 'Summer Programs', href: `${pagePrefix}summer-programs.html` }
        ]
      },
      {
        key: 'ai',
        trigger: `${pagePrefix}ai-tools.html`,
        items: [
          { label: 'AI Citation Guide', href: `${pagePrefix}ai-citation-guide.html` }
        ]
      },
      {
        key: 'meetings',
        trigger: `${pagePrefix}meetings.html`,
        items: [
          { label: 'Book a Tutorial', href: `${pagePrefix}meetings.html` }
        ]
      }
    ];
  };

  const findDesktopNavContainers = menus => {
    const topLevelTargets = new Set(menus.map(menu => basename(menu.trigger)));
    const selectors = [
      '.nav-links',
      'nav .hidden.md\\:flex',
      'header .hidden.md\\:flex'
    ];

    return Array.from(document.querySelectorAll(selectors.join(','))).filter(container => {
      if (container.closest('#mobile-menu, .nav-mobile')) {
        return false;
      }

      const matches = Array.from(container.querySelectorAll('a[href]')).filter(link => {
        return topLevelTargets.has(basename(link.getAttribute('href')));
      });

      return matches.length >= 4;
    });
  };

  const enhanceContainer = (container, menus, currentPage) => {
    if (container.dataset.dropdownEnhanced === 'true') {
      return;
    }

    container.classList.add('site-nav-dropdown-container');

    const isList = container.tagName === 'UL';

    menus.forEach(menu => {
      const trigger = Array.from(container.querySelectorAll('a[href]')).find(link => {
        return basename(link.getAttribute('href')) === basename(menu.trigger);
      });

      if (!trigger || trigger.closest('.site-nav-dropdown-item')) {
        return;
      }

      let wrapper;

      if (isList) {
        wrapper = trigger.closest('li');
        if (!wrapper) {
          return;
        }
        wrapper.classList.add('site-nav-dropdown-item', 'site-nav-dropdown-list-item');
      } else {
        wrapper = document.createElement('div');
        wrapper.className = 'site-nav-dropdown-item';
        trigger.parentNode.insertBefore(wrapper, trigger);
        wrapper.appendChild(trigger);
      }

      trigger.classList.add('site-nav-trigger');
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      const dropdown = document.createElement('div');
      dropdown.className = 'site-nav-dropdown-menu';
      let closeTimer = null;

      menu.items.forEach(item => {
        const link = document.createElement('a');
        link.className = 'site-nav-dropdown-link';
        link.href = item.href;
        link.textContent = item.label;

        if (basename(item.href) === currentPage) {
          link.classList.add('site-nav-dropdown-link-active');
        }

        dropdown.appendChild(link);
      });

      wrapper.appendChild(dropdown);

      const closeOtherMenus = () => {
        document.querySelectorAll('.site-nav-dropdown-item[data-open="true"]').forEach(openWrapper => {
          if (openWrapper === wrapper) {
            return;
          }

          delete openWrapper.dataset.open;
          const openTrigger = openWrapper.querySelector(':scope > a.site-nav-trigger');
          if (openTrigger) {
            openTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      };

      const clearCloseTimer = () => {
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }
      };

      const openMenu = () => {
        clearCloseTimer();
        closeOtherMenus();
        wrapper.dataset.open = 'true';
        trigger.setAttribute('aria-expanded', 'true');
      };

      const closeMenu = () => {
        clearCloseTimer();
        delete wrapper.dataset.open;
        trigger.setAttribute('aria-expanded', 'false');
      };

      const scheduleClose = () => {
        clearCloseTimer();
        closeTimer = window.setTimeout(() => {
          delete wrapper.dataset.open;
          trigger.setAttribute('aria-expanded', 'false');
          closeTimer = null;
        }, CLOSE_DELAY_MS);
      };

      wrapper.addEventListener('mouseenter', openMenu);
      wrapper.addEventListener('mouseleave', scheduleClose);
      dropdown.addEventListener('mouseenter', openMenu);
      dropdown.addEventListener('mouseleave', scheduleClose);
      wrapper.addEventListener('focusin', openMenu);
      wrapper.addEventListener('focusout', event => {
        if (!wrapper.contains(event.relatedTarget)) {
          scheduleClose();
        }
      });
      wrapper.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          closeMenu();
          trigger.blur();
        }
      });
    });

    container.dataset.dropdownEnhanced = 'true';
  };

  const initSiteNavDropdowns = () => {
    ensureStyles();

    const menus = buildMenus();
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const containers = findDesktopNavContainers(menus);

    containers.forEach(container => {
      enhanceContainer(container, menus, currentPage);
    });
  };

  window.initSiteNavDropdowns = initSiteNavDropdowns;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteNavDropdowns);
  } else {
    initSiteNavDropdowns();
  }
})();
