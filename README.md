# Hansheng Zhang (Doyle) Portfolio

Static GitHub Pages portfolio.

## Pages

- `index.html` - landing page with portfolio routes
- `resume.html` - resume page
- `medmemo.html` - MedMemo project page
- `jobcopilot.html` - JobCopilot project page

## Internationalization

The site uses a small static i18n layer:

- `locales/en.json` - English interface text
- `locales/zh-CN.json` - Simplified Chinese interface text
- `script.js` - loads the selected language, applies `data-i18n` text, applies `data-i18n-attr` attributes, and stores the user's language in `localStorage`

Supported language codes are `en` and `zh-CN`. You can force a language with `?lang=en` or `?lang=zh-CN`.

Because browser `file://` pages usually cannot fetch JSON files, preview this site through a local HTTP server before publishing.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open repository Settings.
3. Go to Pages.
4. Set source to the target branch and root folder `/`.
5. Visit `https://<github-user>.github.io/<repo-name>/`.

The site uses only static HTML, CSS, JavaScript, and local assets. No build step is required.

## Design Direction

- Aesthetic: editorial product-system portfolio.
- DFII: 13 / 15.
- Purpose: present resume, MedMemo, and JobCopilot clearly.
- Differentiation anchor: the home page uses a systems-map visual and three focused routes instead of a generic hero plus resume dump.

## Public Data Boundary

The transcript PDF from `/home/doyle/Documents/Job` was not copied into this site because it contains private student-identifying information. The resume page only uses sanitized facts from the local job materials.
