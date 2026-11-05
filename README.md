# Hansheng Zhang (Doyle) Portfolio

Personal resume and software engineering portfolio, published with GitHub Pages.
The site presents education, technical skills, and contributions to MedMemo and JobCopilot
in English and Simplified Chinese.

## Pages

- `index.html` - landing page with portfolio routes
- `resume.html` - resume page
- `medmemo.html` - MedMemo project page
- `jobcopilot.html` - JobCopilot project page
- `notes.html` - knowledge base index (sidebar categories, search, table of contents)
- `writing.html` - article list

## Adding Notes And Articles

The knowledge base and writing pages ship with empty states and are ready for content.

1. Copy `notes/_template.html` to `notes/<slug>.html` (or `writing/_template.html` to
   `writing/<slug>.html`), fill in the `[bracketed]` placeholders, and remove the
   `<meta name="robots" content="noindex">` line.
2. In the copied note, add `aria-current="page"` to its own sidebar link.
3. Link the note from every sidebar category list (`<ul class="kb-nav" data-category="...">`)
   in `notes.html` and the existing note pages, replacing the `kb-empty` item.
4. Replace the `empty-state` block inside `[data-notes-list]` (in `notes.html` and
   `index.html`) or `[data-posts-list]` (in `writing.html`) with cards such as:

   ```html
   <article class="route-card post-card">
     <p class="eyebrow">AI Engineering</p>
     <h3>Note title</h3>
     <p>Short summary.</p>
     <a class="text-link" href="./notes/slug.html">Read note →</a>
   </article>
   ```

Article body text is written directly in HTML and does not go through the locale files.
Pages inside `notes/` and `writing/` use `../` paths for shared assets.

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
5. Visit <https://hzhan516.github.io/>.

The site uses only static HTML, CSS, JavaScript, and local assets. No build step is required.

## Content

The resume covers education, certifications, technical skills, teaching experience,
and software projects. Project pages describe personal contributions, implementation
choices, and resulting application workflows, with links to the public repositories.

Keep the English and Chinese content aligned with the default text in each HTML page.
Private collaboration materials are excluded from the published site.
