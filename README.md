# Aden Kallery — Portfolio Website

A modern, responsive, lightweight static website built with HTML, CSS and vanilla JavaScript. No build tools, subscriptions, database, or APIs are required.

## Contents
- `index.html` — Home page with About, Projects, Skills, Résumé, and Contact sections.
- `resume.html` — Web-readable résumé summary.
- `assets/Aden_Kallery_Resume.pdf` — The original PDF résumé you supplied (download link on the site).
- `style.css` — Responsive design, light/dark themes, motion, résumé print styling.
- `script.js` — Profile links, mobile navigation, filters, project details, theme and copy-email button.
- `assets/favicon.svg` — Browser icon.
- `.nojekyll` — Serve static files directly with GitHub Pages.

## Preview locally
Double-click `index.html` in a browser. Everything works without a server. For a local HTTP server (optional): `python3 -m http.server 8000`, then visit http://localhost:8000.

## Deploy to GitHub Pages (free)
1. Create a public GitHub repository named `YOUR_GITHUB_USERNAME.github.io`.
2. Upload the **contents of this folder** (not the folder itself and not the ZIP file) to the repository root, including `index.html` and the `assets/` folder.
3. Open Settings → Pages → Build and deployment, set Source to **Deploy from a branch**, Branch to `main` and folder to `/(root)`, and Save.
4. After GitHub publishes, visit `https://YOUR_GITHUB_USERNAME.github.io/`.
5. To update the site, commit the changed files to `main`.

## Personalization
- Personal and school emails, LinkedIn, and name are configured in `script.js` in `PROFILE`, plus visibly in HTML for fallback.
- GitHub account URL was **not provided**; no profile address was invented. If you want a GitHub link later, supply your profile URL and add it to the contact navigation or project cards.
- Verified résumé content from the supplied PDF was used for projects, skills, education and credentials. The site has no invented repositories or demo links.
- Add screenshots and repository links to project cards when you are ready, and keep project details aligned with your actual work.

## Privacy and accuracy
The publicly hosted site will expose **both supplied email addresses**. The bundled *original résumé PDF also contains a phone number and location*, since those were present in your upload. Review the PDF before making a public repository: if you do not want that information online, replace `assets/Aden_Kallery_Resume.pdf` with a redacted copy and update `resume.html` accordingly. The on-page contact section does not show the phone number.

## Features
Responsive layout; light/dark theme; mobile nav; filters for security and software projects; project details dialogs; primary email copy; skip navigation; reduced-motion support; print-friendly HTML résumé.
