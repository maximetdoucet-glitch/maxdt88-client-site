# HTML Semantics Protocol

Semantic HTML is the practice of using HTML elements according to their intended structural meaning, rather than their visual appearance.

## Structural Integrity

The WHATWG HTML Standard emphasizes that conformance is a quality assurance tool to help authors avoid mistakes and improve accessibility.

### Primary Semantic Units

- **`<section>`**: Represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Should almost always have a heading.
- **`<article>`**: Represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable.
- **`<aside>`**: Represents a portion of a document whose content is only indirectly related to the document's main content.
- **`<nav>`**: Represents a section of a page that links to other pages or to parts within the page.

## Content Categorization

Elements are grouped by their functionality:
1.  **Metadata content**: Elements that set up the presentation or behavior of the rest of the content (e.g., `link`, `meta`, `script`).
2.  **Flow content**: Most elements used in the body of documents and applications.
3.  **Sectioning content**: Elements that define the scope of headings and footers.
4.  **Phrasing content**: The text of the document, as well as elements that mark up that text at the intra-paragraph level.
