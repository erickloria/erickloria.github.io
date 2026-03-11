# IB Physics & TOK — UWC Costa Rica

A static website for the IB Physics & TOK course at UWC Costa Rica.

## 🚀 How to Host on GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** (the green button or the `+` icon)
3. Name it: `ib-physics-tok` (or anything you like)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload the site files

**Option A — Drag and drop (easiest):**
1. In your new empty repository, click **uploading an existing file**
2. Drag the entire contents of this folder into the upload area
3. Scroll down, write a commit message like `Initial site upload`
4. Click **Commit changes**

**Option B — GitHub Desktop app:**
1. Download [GitHub Desktop](https://desktop.github.com)
2. Clone your new repository to your computer
3. Copy all these files into the cloned folder
4. In GitHub Desktop: write a summary, click **Commit to main**, then **Push origin**

**Option C — Git command line:**
```bash
git init
git add .
git commit -m "Initial site upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ib-physics-tok.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, click **Settings** (top tab)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select `main` and folder `/` (root)
5. Click **Save**
6. Wait 1–2 minutes, then your site will be live at:

```
https://YOUR-USERNAME.github.io/ib-physics-tok/
```

### Step 4 — (Optional) Custom domain

If you have your own domain (e.g. `physics.uwccostarica.org`):
1. In Settings → Pages → Custom domain, enter your domain
2. Add a `CNAME` DNS record pointing to `YOUR-USERNAME.github.io`
3. Check **Enforce HTTPS**

---

## 📁 File Structure

```
ib-physics-tok/
├── index.html              ← Home page
├── css/
│   └── style.css           ← All shared styles (UWC CR brand)
├── js/
│   └── layout.js           ← Shared nav + footer (injected on every page)
└── pages/
    ├── resources.html      ← Resources landing page
    ├── tok.html            ← Theory of Knowledge
    ├── book-hw.html        ← Book & Homework
    ├── labs.html           ← Labs
    ├── presentations.html  ← Presentations
    ├── extended-essay.html ← Extended Essay
    ├── internal-assessment.html
    ├── sat.html            ← SAT Preparation
    ├── listening-corner.html
    └── ai-tools.html       ← AI Tools directory
```

## ✏️ How to Edit Content

Each page is a plain HTML file. To add content:

1. Open the relevant `.html` file in any text editor (VS Code recommended)
2. Find the section you want to edit
3. Add links using this pattern:
```html
<a class="link-card card-blue" href="YOUR-LINK-HERE" target="_blank">
  <div class="card-icon icon-blue">📄</div>
  <div>
    <div class="link-card-label">Resource Title</div>
    <div class="link-card-desc">Short description</div>
  </div>
  <span class="link-arrow">↗</span>
</a>
```
4. Save the file, commit, and push to GitHub — the site updates automatically.

## 🎨 Brand Colors

| Color    | Hex       | Use                          |
|----------|-----------|------------------------------|
| Blue     | `#004099` | Primary, headers, links      |
| Green    | `#1DA381` | Approved/safe, accents       |
| Purple   | `#8F2B7D` | Secondary accent             |
| Orange   | `#DF6935` | Warnings, highlights         |
| Red      | `#AD1F53` | Alerts, restrictions         |

## 📧 Contact

Erick Loría Soto — [erick.loria@uwccostarica.org](mailto:erick.loria@uwccostarica.org)  
UWC Costa Rica · IB Diploma Programme
