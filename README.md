# Folio 2 — Markdown, beautifully presented

A tiny Markdown publishing studio hosted free on GitHub Pages. No Node.js, build step, server, database, or paid domain required.

## What's new in version 2

Your **live preview and downloaded HTML files** now have an interactive reading toolbar:

- **A− / A+** buttons to make reading text smaller or larger (80%–160%); click the percentage to reset to 100%.
- **Section chooser** that shows your current heading while you scroll. Pick a different heading to jump there.
- **Table of contents** in a sticky sidebar on wider screens. It highlights the current heading; click one to navigate.
- **Reading-progress bar** at the top of the page, plus estimated reading time.
- **Dark mode** button (the crescent / sun icon). Your text-size and dark-mode preferences are remembered when the browser permits local storage.
- **Back to the beginning** button at the end of each document.
- **Reading mode** in the editor to hide the Markdown source and read the formatted article at full width.

Downloaded `.html` files contain their own CSS and JavaScript: the reader controls also work **offline**, without the Markdown libraries or a network connection.

## Other features

- Upload or drag in a `.md` / `.markdown` file; files remain local in the browser.
- Edit Markdown and see a live preview.
- Switch between **Literary** and **Editorial** design themes.
- Download a single standalone HTML file.
- Publish Markdown files from your repo using `?doc=docs/FILE.md` links.
- Jump directly to a heading in a published document with a `#heading-id` fragment.
- Responsive reading layout and print-friendly formatting.

## Deploy to GitHub Pages (first time)

1. Create a **public** GitHub repository, for example `markdown-reader`.
2. Extract this ZIP and put the included **files and `docs/` folder at the repository root**. Do not upload only the ZIP.
3. In the repository, select **Settings → Pages → Build and deployment**.
4. Set **Source: Deploy from a branch**, **Branch: main**, and **Folder: /(root)**; save.
5. In a few minutes, the app should be online at `https://YOUR-USERNAME.github.io/markdown-reader/`.

### Already have Folio v1 deployed?

Upload and commit the replacements for `index.html`, `app.js`, `style.css`, and `README.md` from this ZIP, leaving your existing `docs/` files in place. The `.nojekyll` file still belongs at the root. If you have customized any of those files, merge your changes instead of overwriting them.

## Share reports and novellas

1. Add a Markdown file to `docs/`, e.g., `docs/my-novella.md`, and commit the change.
2. Share `https://YOUR-USERNAME.github.io/markdown-reader/?doc=docs/my-novella.md&theme=literary`.
3. The reader automatically generates a section list from Markdown headings. Pick a heading using the selector at the top (or the sidebar on a wide standalone HTML page).
4. For specific chapters, append `#chapter-one` (for example: `?doc=docs/my-novella.md&theme=literary#chapter-one`).

### Publish a clean, standalone HTML page instead

Use **Download HTML** in the Folio editor, add the resulting `my-novella.html` to your repository's `pages/` folder, and commit it. Then share:

`https://YOUR-USERNAME.github.io/markdown-reader/pages/my-novella.html`

That link opens **only the finished reader**: no Markdown editor and no CDN dependencies. The zoom, section navigation, progress, and dark mode all work in the downloaded file.

**Note:** Dragging a `.md` file into the editor does **not** publish it. To share a permanent URL, add it to your public repository first. Do not commit private manuscripts or sensitive reports.

## Run and customize locally

Opening `index.html` directly is often enough for the editor when online, because the Markdown parser libraries load from a CDN. To test the `?doc=` feature locally, run a simple static server in this directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

- `app.js` — Markdown parsing, sanitization, upload, themes, shareable document URLs, standalone HTML export.
- `index.html` — editor layout, reader toolbar, **`reading-styles`** CSS, and the **`reader-runtime`** JavaScript that gets embedded into exported HTML.
- `style.css` — editor shell and split-screen layout (not needed by exported pages).
- `docs/` — Markdown files that GitHub Pages makes shareable.
- `.nojekyll` — keeps GitHub Pages from running Jekyll over the site.

The editor uses [Marked](https://marked.js.org/) and [DOMPurify](https://github.com/cure53/DOMPurify), pinned to versions in `index.html` and loaded from jsDelivr. Only the editor requires those dependencies; exported reading pages do not.

## Limitations

- No accounts or one-click publishing. GitHub publishing happens when you commit files to your repo.
- Standalone HTML embeds CSS and navigation JavaScript, **not remote images**; links or images from relative Markdown paths may require absolute URLs.
- A published `?doc=` link opens the editor-and-reader page. Commit an exported `.html` file under `pages/` for the cleaner reader-only experience.
- Reading preferences use browser storage where available; some file viewers restrict storage, but controls still work for that session.
- The parser supports standard Markdown well; complex custom extensions (such as academic footnotes) may require plugins.

## License

This starter code is yours to customize and use. Marked and DOMPurify keep their own licenses.
