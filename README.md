# Folio — free Markdown reading pages

A tiny Markdown editor and reader that runs entirely in the browser, hosted free on GitHub Pages. No Node.js, build step, database, or domain required.

## Features

- Upload or drag in a `.md` or `.markdown` file (local, private to your browser)
- Edit Markdown and preview changes live
- Switch between Literary and Editorial themes
- Download one standalone HTML file (all design CSS is embedded)
- Share published documents at `?doc=docs/YOUR-FILE.md`
- Mobile-friendly reading layout, headings, quotes, lists, tables and print styles

## Publish it with GitHub Pages

1. Create a **public** GitHub repository named `markdown-reader` (or another name).
2. Copy all files and the `docs/` folder from this starter project into the **root** of that repository. Do not upload only the ZIP file: extract it first.
   - In GitHub: click **Add file → Upload files**, then drag the extracted contents into the upload area and **Commit changes**.
   - Alternatively: clone the repository, copy these files into it, and `git add . && git commit -m "Add Markdown reader" && git push`.
3. Go to **Settings → Pages** in your GitHub repository.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose **main**, **/(root)**, and click **Save**.
6. Your site will appear at `https://YOUR-USERNAME.github.io/markdown-reader/`. First deployment may take several minutes.

If you choose a different repository name, replace `markdown-reader` in the URLs above with your name.

## Share a published Markdown file

1. Add `docs/my-story.md` to the repository and commit it (through GitHub's web interface or `git push`).
2. Open this URL, replacing the username and repo name:

   `https://YOUR-USERNAME.github.io/markdown-reader/?doc=docs/my-story.md`

3. Send that URL to anyone. They can read it without a GitHub account. Add `&theme=editorial` to open it in the Editorial style; otherwise it defaults to Literary.

Example URLs after publishing:

- `?doc=docs/sample-report.md&theme=editorial`
- `?doc=docs/sample-novella.md&theme=literary`

**Important:** Uploading a Markdown file into the browser *does not* publish it to GitHub. It stays local until you upload/commit it to the public repository. Do not commit private reports or manuscripts that you do not want publicly readable.

## Run locally

You can try opening `index.html` in a browser. The editor should work when you are online (the Markdown parsing libraries are loaded from jsDelivr), but the `?doc=` feature uses `fetch` and should be tested through a local web server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Customize it

- `app.js` — Markdown parsing, sanitization, upload, themes, shareable URLs, HTML download.
- `index.html` — app layout and the `<style id="reading-styles">` block, which is also included in exported HTML.
- `style.css` — appearance of the editor and toolbar (not included in exported HTML).
- `docs/` — publicly shareable Markdown documents.
- `.nojekyll` — keeps GitHub Pages from running Jekyll on the files.

The editor uses [Marked](https://marked.js.org/) for Markdown and [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize generated HTML. Both dependencies are pinned to versions in `index.html` and loaded from jsDelivr. Exported HTML does not need JavaScript or the parsing libraries to render.

## Limitations

- No authentication or one-click publishing. Files are published by committing them to your repo.
- Images referenced with relative Markdown paths may not work in a downloaded HTML file; use absolute URLs, or embed the images later.
- It is a simple renderer, not a CMS. Advanced Markdown plugins are not included.
- JavaScript and network access to the parser CDN are required to use the editor, but exported HTML can be opened offline (excluding any remote images or links).

## License

This starter code is provided for you to modify and use. Marked and DOMPurify remain under their own licenses, linked above.
