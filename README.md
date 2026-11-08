# Personal Computer Science & Cybersecurity Portfolio

A modern, responsive, **100% static** portfolio built with HTML, CSS, and vanilla JavaScript. No frameworks, account keys, packages, subscription, database, or build step required.

## Project structure

```text
minimal-cyber-portfolio/
├── index.html          # Main website, all major sections and sample project cards
├── resume.html         # Print-friendly editable résumé page
├── style.css           # Responsive site styles, light/dark theme, print styles
├── script.js           # Easy profile settings, filters, dialogs, mobile nav, theme
├── assets/
│   └── favicon.svg     # Self-contained favicon
├── .nojekyll           # Helps GitHub Pages serve static files as-is
└── README.md           # This guide
```

## Customize before publishing

The site is intentionally supplied with **example project concepts and placeholders**. It does not claim these projects or skills are yours. Change them before you share it professionally.

1. **Identity and links:** In `script.js`, update the `PROFILE` object with your name, real professional email, GitHub profile URL, and LinkedIn URL. Also replace `Your Name`, `yourname`, and location text in `index.html`, `resume.html`, and `<title>`/metadata.
2. **Home/About:** In `index.html`, replace the hero and About text with your actual interests, education, and goals. Remove "Available for opportunities" if that is not accurate.
3. **Projects:** Replace the four example cards in `index.html` with **your actual projects**, tools, screenshots, and results. Update their detail text in `projectDetails` in `script.js`. Edit project count in the `All work` filter. If you add new categories, update the category filter values too.
4. **Skills:** Keep only the tools and skills you can actually discuss.
5. **Résumé:** Open `resume.html`; replace all placeholders with your real résumé content. Click **Print / Save PDF** to save a PDF using the browser's print-to-PDF functionality. Optionally add the exported PDF under `assets/resume.pdf` and change the two `resume.html` call-to-action links in `index.html` to `assets/resume.pdf`.
6. **Optional branding:** Change the `N.` logo in both HTML files and the `assets/favicon.svg` monogram. Edit colors in `:root` at the top of `style.css`.

Note: the links in `PROFILE` deliberately point to generic GitHub/LinkedIn home pages until you enter your profiles. The default `hello@example.com` is not a personal email address.

## Preview locally

Quickest: double-click `index.html` to open it in your browser. All features except clipboard permissions (which can vary under `file://`) work without a server.

For a local server, open a terminal in the project folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages for free

1. Sign in at https://github.com and create a new **public** repository named exactly `YOUR_USERNAME.github.io` (replace `YOUR_USERNAME` with your GitHub username). GitHub Pages is available for public repositories on GitHub Free.
2. Upload **the contents of this folder**, not a parent folder or the ZIP file: `index.html`, `style.css`, `script.js`, `resume.html`, `assets/`, `.nojekyll`, and optionally `README.md`. The `index.html` file must be at the repository root.
3. Open your repository's **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**. Choose `main`, choose `/(root)` and click **Save**.
5. Visit `https://YOUR_USERNAME.github.io/` after GitHub Pages publishes it. Changes may take up to about 10 minutes to appear.

You can also deploy to an arbitrary public repository named e.g. `portfolio`; the URL will usually be `https://YOUR_USERNAME.github.io/portfolio/`. This project uses relative paths so it supports either deployment location.

### Updating later

Edit and commit your HTML/CSS/JS files to the selected branch. GitHub Pages republishes the site automatically. There are no deployment secrets or payment details to configure.

### Git CLI alternative

From inside this folder (after creating the `YOUR_USERNAME.github.io` repository):

```bash
git init
git add .
git commit -m "Launch portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

Make sure the account and repository name are correct; GitHub may ask you to authenticate using a supported method (not your GitHub account password in Git).

## Features

- Mobile-first responsive layouts from large desktop to narrow phones
- Light / dark theme toggle, persisted locally when supported
- Fully functional mobile navigation and keyboard-accessible project details
- Filter projects by cybersecurity or software
- Copy-email control with accessible status feedback, plus regular `mailto:` contact link
- Editable HTML résumé template with print/PDF styles
- No runtime external dependencies, trackers, APIs, or image hotlinks
- Accessibility touches: skip link, semantic landmarks, focus states, reduced-motion option, ARIA labels, dialog behavior

## A note about contact forms

GitHub Pages only serves static files; it **cannot** process server-side contact forms by itself. This portfolio uses direct email links and a copy button to avoid requiring a paid service, third-party form provider, or backend.

Official docs:
- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
