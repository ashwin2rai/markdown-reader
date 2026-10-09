# Folio — Markdown, beautifully presented

A tiny Markdown publishing studio hosted free on GitHub Pages.

The app should be online here: [Visit Folio](https://ashwin2rai.github.io/markdown-reader/) 

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

- No accounts or one-click publishing.
- Standalone HTML embeds CSS and navigation JavaScript, **not remote images**; links or images from relative Markdown paths may require absolute URLs.
- A published `?doc=` link opens the editor-and-reader page. Commit an exported `.html` file under `pages/` for the cleaner reader-only experience.
- Reading preferences use browser storage where available; some file viewers restrict storage, but controls still work for that session.
- The parser supports standard Markdown well; complex custom extensions (such as academic footnotes) may require plugins.

## License

This starter code is yours to customize and use. Marked and DOMPurify keep their own licenses.
