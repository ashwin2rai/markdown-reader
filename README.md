# Folio — Markdown, beautifully presented

A tiny Markdown publishing studio hosted free on GitHub Pages.

The app should be online here: [Visit Folio](https://ashwin2rai.github.io/markdown-reader/) 

If Folio is useful to you, you can [buy me a coffee ☕](https://buymeacoffee.com/ashwin2rai).

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


## License

This starter code is yours to customize and use. Marked and DOMPurify keep their own licenses.
