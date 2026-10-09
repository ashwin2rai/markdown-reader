"use strict";

// Customize your Markdown-to-HTML logic here. No build tools required.
const DEFAULT_MARKDOWN = `# The Art of Paying Attention

A short demonstration of what your words can look like with thoughtful typography.

## The quiet power of a good page

A beautifully designed document doesn't need to shout. Good margins, a measured line length, and plenty of breathing room make even simple words feel inviting.

> A good reading experience is the kind you stop noticing — because you're completely absorbed in the words.

### What makes this work?

- **Clear hierarchy** between titles, chapters, and subheadings
- **Comfortable typography** that works across screen sizes
- **Delightful details** for quotes, lists, links, and section breaks

A report might prefer a structured, crisp style. A novella might deserve something softer and more literary. Switch the theme above to see the difference.

## A few practical notes

1. Upload any simple \`.md\` file, or edit this example directly.
2. Choose **Literary** or **Editorial**.
3. Click **Download HTML** to get one portable webpage.

---

The best thing about simple tools is that they leave room for the thing that matters: **your writing**.
`;

const editor = document.getElementById("markdown-input");
const article = document.getElementById("rendered-article");
const readingPage = document.getElementById("reading-page");
const sourceName = document.getElementById("source-name");
const statusMessage = document.getElementById("status-message");
const characterCount = document.getElementById("character-count");
const fileInput = document.getElementById("file-input");
const dropZone = document.getElementById("drop-zone");

let documentName = "example.md";

function setStatus(message) {
  statusMessage.textContent = message;
}

function renderMarkdown() {
  characterCount.textContent = `${editor.value.length.toLocaleString()} characters`;

  if (!window.marked || !window.DOMPurify) {
    article.textContent = "Could not load the Markdown libraries. Check your internet connection and refresh.";
    setStatus("Markdown libraries unavailable.");
    return;
  }

  // Marked converts the syntax; DOMPurify removes unsafe HTML before display.
  const unsanitizedHtml = window.marked.parse(editor.value, { gfm: true, breaks: false });
  const safeHtml = window.DOMPurify.sanitize(unsanitizedHtml, {
    USE_PROFILES: { html: true }
  });
  article.innerHTML = safeHtml;
  addHeadingIds(article);
  readingPage.folioReader?.refresh();
}

function addHeadingIds(root) {
  const usedIds = new Map();
  for (const heading of root.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
    const base = heading.textContent
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section";
    const count = (usedIds.get(base) || 0) + 1;
    usedIds.set(base, count);
    heading.id = count === 1 ? base : `${base}-${count}`;
  }
}

function setDocument(markdown, name) {
  documentName = name;
  sourceName.textContent = name;
  editor.value = markdown;
  renderMarkdown();
}

function setTheme(theme) {
  if (theme !== "literary" && theme !== "editorial") return;
  readingPage.dataset.theme = theme;
  for (const button of document.querySelectorAll("[data-theme].theme-choice")) {
    const active = button.dataset.theme === theme;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
  // Keep the chosen theme in a published document's shareable URL.
  const url = new URL(window.location.href);
  if (url.searchParams.has("doc")) {
    url.searchParams.set("theme", theme);
    history.replaceState(null, "", url.href);
  }
}

function removePublishedDocFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("doc");
  url.hash = "";
  history.replaceState(null, "", url.href);
}

async function openLocalFile(file) {
  if (!file) return;
  if (!/\.(md|markdown)$/i.test(file.name)) {
    setStatus("Please choose a .md or .markdown file.");
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    setStatus("For this starter, please use Markdown files under 3 MB.");
    return;
  }
  try {
    const markdown = await file.text();
    setDocument(markdown, file.name);
    removePublishedDocFromUrl();
    setStatus(`Loaded ${file.name} locally. It is not publicly published.`);
  } catch (error) {
    setStatus(`Could not read this file: ${error.message}`);
  }
}

// For GitHub Pages, ?doc=docs/my-story.md fetches a .md file from your repo.
// Only same-origin files inside this site's /docs/ folder are allowed.
async function openPublishedDocument(path) {
  try {
    const docsRoot = new URL("./docs/", window.location.href);
    const requested = new URL(path, window.location.href);
    if (
      requested.origin !== window.location.origin ||
      !requested.pathname.startsWith(docsRoot.pathname) ||
      !/\.(md|markdown)$/i.test(requested.pathname) ||
      requested.search || requested.hash
    ) {
      throw new Error("Use a Markdown path inside docs/, such as docs/sample-report.md.");
    }

    setStatus("Loading published document...");
    const response = await fetch(requested.href, { cache: "no-cache" });
    if (!response.ok) throw new Error(`The server returned HTTP ${response.status}.`);
    const markdown = await response.text();
    const name = decodeURIComponent(requested.pathname.split("/").pop());
    setDocument(markdown, name);
    readingPage.folioReader?.refresh({ jumpToHash: true });
    setStatus(`Loaded published document: ${name}`);
  } catch (error) {
    setStatus(`Unable to open the shared document. ${error.message}`);
  }
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function exportStandaloneHtml() {
  if (!window.marked || !window.DOMPurify) {
    setStatus("Cannot export until the Markdown libraries have loaded.");
    return;
  }

  const title = article.querySelector("h1")?.textContent?.trim() || documentName;
  const readingStyles = document.getElementById("reading-styles").textContent;
  // Export the complete interactive reader, not just the article body.
  // Styling and reader behavior are bundled so the HTML works offline.
  const exportedReader = readingPage.cloneNode(true);
  exportedReader.dataset.mode = "standalone";
  exportedReader.removeAttribute("id");
  const runtime = document.getElementById("reader-runtime").textContent
    .replace(/<\/script/gi, "<\\/script");
  const exportHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="description" content="A beautifully formatted reading page.">
  <title>${escapeHtml(title)}</title>
  <style>
    html, body { margin: 0; padding: 0; }
    ${readingStyles}
  </style>
</head>
<body>
${exportedReader.outerHTML}
<script>${runtime}</script>
</body>
</html>`;

  const safeBase = documentName.replace(/\.(md|markdown)$/i, "")
    .replace(/[^a-z0-9._-]+/gi, "-").slice(0, 75) || "document";
  const blob = new Blob([exportHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeBase}.html`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  setStatus(`Prepared ${safeBase}.html for download.`);
}

fileInput.addEventListener("change", () => {
  openLocalFile(fileInput.files?.[0]);
  fileInput.value = "";
});

editor.addEventListener("input", () => {
  renderMarkdown();
  setStatus("Preview updated. Changes are only in your browser.");
});

document.querySelectorAll("button.theme-choice").forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.theme));
});

document.getElementById("sample-button").addEventListener("click", () => {
  removePublishedDocFromUrl();
  setDocument(DEFAULT_MARKDOWN, "example.md");
  setStatus("Example restored.");
});

document.getElementById("download-button").addEventListener("click", exportStandaloneHtml);

const focusButton = document.getElementById("focus-button");
focusButton.addEventListener("click", () => {
  const focused = document.querySelector(".workspace").classList.toggle("is-focus-mode");
  readingPage.dataset.mode = focused ? "standalone" : "preview";
  focusButton.setAttribute("aria-pressed", String(focused));
  focusButton.textContent = focused ? "◫ Show editor" : "◫ Reading mode";
});

// Drag and drop a Markdown file over either panel.
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  dropZone.classList.add("drag-over");
});
dropZone.addEventListener("dragleave", (event) => {
  if (!dropZone.contains(event.relatedTarget)) dropZone.classList.remove("drag-over");
});
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("drag-over");
  openLocalFile(event.dataTransfer?.files?.[0]);
});

setDocument(DEFAULT_MARKDOWN, "example.md");
const query = new URLSearchParams(window.location.search);
setTheme(query.get("theme") === "editorial" ? "editorial" : "literary");
const sharedDocument = query.get("doc");
if (sharedDocument) openPublishedDocument(sharedDocument);
else setStatus("Ready. Upload a .md file or edit the example.");
