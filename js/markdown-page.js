function createMarkdownRenderer(markdownSrc) {
  const markdownUrl = new URL(markdownSrc, window.location.href);
  const slugCounts = new Map();

  const escapeHtml = (value) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const resolveUrl = (value) => {
    if (!value) return value;
    if (/^(https?:|mailto:|#|\/)/i.test(value)) return value;
    return new URL(value, markdownUrl).href;
  };

  const renderInline = (value) => {
    let text = escapeHtml(value);

    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
      return `<img src="${resolveUrl(url)}" alt="${escapeHtml(alt)}">`;
    });

    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      return `<a href="${resolveUrl(url)}">${label}</a>`;
    });

    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    return text;
  };

  const createSlug = (value) => {
    const base = value
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section';

    const count = slugCounts.get(base) || 0;
    slugCounts.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };

  return (markdown) => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let listItems = [];
    let listType = null;
    let quoteLines = [];
    let inCodeBlock = false;
    let codeLines = [];

    const flushParagraph = () => {
      if (!paragraph.length) return;
      html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    };

    const flushList = () => {
      if (!listItems.length || !listType) return;
      const tag = listType === 'ol' ? 'ol' : 'ul';
      html.push(`<${tag}>${listItems.map((item) => `<li>${renderInline(item)}</li>`).join('')}</${tag}>`);
      listItems = [];
      listType = null;
    };

    const flushQuote = () => {
      if (!quoteLines.length) return;
      const content = quoteLines.map((line) => `<p>${renderInline(line)}</p>`).join('');
      html.push(`<blockquote>${content}</blockquote>`);
      quoteLines = [];
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushQuote();
    };

    const parseTableCells = (line) =>
      line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim());

    const isTableDivider = (line) =>
      /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(line.trim());

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (inCodeBlock) {
        if (/^```/.test(line)) {
          html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
          inCodeBlock = false;
          codeLines = [];
        } else {
          codeLines.push(line);
        }
        continue;
      }

      if (/^```/.test(line)) {
        flushAll();
        inCodeBlock = true;
        codeLines = [];
        continue;
      }

      const nextLine = lines[i + 1];
      if (nextLine && line.includes('|') && isTableDivider(nextLine)) {
        flushAll();
        const headers = parseTableCells(line);
        const bodyRows = [];

        i += 2;
        while (i < lines.length) {
          const rowLine = lines[i];
          if (!rowLine.trim() || !rowLine.includes('|')) break;
          bodyRows.push(parseTableCells(rowLine));
          i += 1;
        }
        i -= 1;

        const thead = `<thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead>`;
        const tbody = bodyRows.length
          ? `<tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`
          : '';

        html.push(`<table>${thead}${tbody}</table>`);
        continue;
      }

      if (!line.trim()) {
        flushAll();
        continue;
      }

      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        flushAll();
        const level = headingMatch[1].length;
        const headingText = headingMatch[2].trim();
        const slug = createSlug(headingText);
        html.push(`<h${level} id="${slug}">${renderInline(headingText)}</h${level}>`);
        continue;
      }

      if (/^---+$/.test(line.trim())) {
        flushAll();
        html.push('<hr>');
        continue;
      }

      const quoteMatch = line.match(/^>\s?(.*)$/);
      if (quoteMatch) {
        flushParagraph();
        flushList();
        quoteLines.push(quoteMatch[1]);
        continue;
      }

      const ulMatch = line.match(/^[-*]\s+(.*)$/);
      if (ulMatch) {
        flushParagraph();
        flushQuote();
        if (listType && listType !== 'ul') flushList();
        listType = 'ul';
        listItems.push(ulMatch[1]);
        continue;
      }

      const olMatch = line.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        flushParagraph();
        flushQuote();
        if (listType && listType !== 'ol') flushList();
        listType = 'ol';
        listItems.push(olMatch[1]);
        continue;
      }

      flushList();
      flushQuote();
      paragraph.push(line.trim());
    }

    flushAll();

    if (inCodeBlock) {
      html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    }

    return html.join('');
  };
}

function buildMarkdownToc(block) {
  const tocSelector = block.getAttribute('data-markdown-toc');
  if (!tocSelector) return;

  const toc = document.querySelector(tocSelector);
  if (!toc) return;

  const headings = block.querySelectorAll('h2, h3, h4');
  if (!headings.length) {
    toc.innerHTML = '<span>No sections available.</span>';
    return;
  }

  const groups = [];
  let currentGroup = null;

  Array.from(headings).forEach((heading) => {
    const level = Number(heading.tagName.toLowerCase().replace('h', ''));
    const item = {
      id: heading.id,
      label: heading.textContent || heading.id,
      level,
    };

    if (level === 2) {
      currentGroup = {
        heading: item,
        children: [],
      };
      groups.push(currentGroup);
      return;
    }

    if (!currentGroup) {
      currentGroup = {
        heading: null,
        children: [],
      };
      groups.push(currentGroup);
    }

    currentGroup.children.push(item);
  });

  const renderLink = (item, extraClass = '') =>
    `<a class="level-${item.level}${extraClass ? ` ${extraClass}` : ''}" href="#${item.id}">${item.label}</a>`;

  toc.innerHTML = groups.map((group, index) => {
    if (!group.heading) {
      return group.children.map((item) => renderLink(item)).join('');
    }

    if (!group.children.length) {
      return renderLink(group.heading, 'markdown-toc-standalone');
    }

    return `
      <details class="markdown-toc-group"${index === 0 ? ' open' : ''}>
        <summary class="markdown-toc-summary">${group.heading.label}</summary>
        <div class="markdown-toc-group-links">
          ${renderLink(group.heading, 'markdown-toc-overview')}
          ${group.children.map((item) => renderLink(item)).join('')}
        </div>
      </details>
    `;
  }).join('');

  const openGroupForHash = () => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;

    const activeLink = toc.querySelector(`a[href="#${hash}"]`);
    if (!activeLink) return;

    const parentGroup = activeLink.closest('.markdown-toc-group');
    if (parentGroup) parentGroup.open = true;
  };

  openGroupForHash();
  window.addEventListener('hashchange', openGroupForHash);
}

function injectMarkdownBrand(block) {
  if (block.querySelector('.markdown-brand')) return;

  const brand = document.createElement('div');
  brand.className = 'markdown-brand';

  const logoWrap = document.createElement('div');
  logoWrap.className = 'markdown-brand-logos';

  const uwcLogo = document.createElement('img');
  uwcLogo.className = 'markdown-brand-uwc';
  uwcLogo.src = new URL('../Images/Logo-Main-Color.png', window.location.href).href;
  uwcLogo.dataset.screenSrc = uwcLogo.src;
  uwcLogo.dataset.printSrc = new URL('../Images/Logo-Main-Black.png', window.location.href).href;
  uwcLogo.alt = 'UWC Costa Rica logo';

  const personalLogo = document.createElement('img');
  personalLogo.className = 'markdown-brand-personal';
  personalLogo.src = new URL('../ELS_logo_exports/08_right_color_light.svg', window.location.href).href;
  personalLogo.dataset.screenSrc = personalLogo.src;
  personalLogo.dataset.printSrc = new URL('../ELS_logo_exports/10_right_black_white.svg', window.location.href).href;
  personalLogo.alt = 'Erick Loria Soto logo';

  const copy = document.createElement('div');
  copy.className = 'markdown-brand-copy';
  copy.innerHTML = `
    <div class="markdown-brand-kicker">UWC Costa Rica</div>
    <div class="markdown-brand-name">Erick Loría Soto</div>
  `;

  logoWrap.append(uwcLogo, personalLogo);
  brand.append(logoWrap, copy);
  block.prepend(brand);
}

function setupMarkdownPrintLogos() {
  if (window.__markdownPrintLogosSetup) return;
  window.__markdownPrintLogosSetup = true;

  const swapLogosForPrint = (mode) => {
    document.querySelectorAll('.markdown-brand img[data-print-src]').forEach((image) => {
      const nextSrc = mode === 'print' ? image.dataset.printSrc : image.dataset.screenSrc;
      if (nextSrc) image.src = nextSrc;
    });
  };

  window.addEventListener('beforeprint', () => swapLogosForPrint('print'));
  window.addEventListener('afterprint', () => swapLogosForPrint('screen'));
}

function injectMarkdownControls(block) {
  const section = block.closest('.section');
  if (!section || section.querySelector('.markdown-actions')) return;
  section.classList.add('markdown-primary-section');

  const actions = document.createElement('div');
  actions.className = 'markdown-actions';

  const printButton = document.createElement('button');
  printButton.type = 'button';
  printButton.className = 'markdown-print-button';
  printButton.textContent = 'Print Guide';
  printButton.addEventListener('click', () => {
    window.print();
  });

  actions.appendChild(printButton);
  section.prepend(actions);
}

async function renderMarkdownBlocks() {
  const blocks = document.querySelectorAll('[data-markdown-src]');

  await Promise.all(Array.from(blocks).map(async (block) => {
    const markdownSrc = block.getAttribute('data-markdown-src');
    if (!markdownSrc) return;

    injectMarkdownControls(block);

    try {
      const response = await fetch(markdownSrc);
      if (!response.ok) throw new Error('Unable to load markdown');

      const markdown = await response.text();
      const renderMarkdown = createMarkdownRenderer(markdownSrc);
      block.innerHTML = renderMarkdown(markdown);
      injectMarkdownBrand(block);
      block.classList.remove('markdown-loading');
      buildMarkdownToc(block);
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        await window.MathJax.typesetPromise([block]);
      }
    } catch (error) {
      block.innerHTML = '<p>The guide could not be loaded here. Open the Markdown source instead.</p>';
      block.classList.remove('markdown-loading');
    }
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  setupMarkdownPrintLogos();
  renderMarkdownBlocks();
});
