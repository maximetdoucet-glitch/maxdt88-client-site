# Web Platform Standards (WHATWG)

The HTML Standard is a living document that defines the core requirements that form the basis of the web runtime. It supersedes all previous versions of HTML and XHTML.

## The Living Standard Philosophy

Unlike traditional point-in-time specifications (HTML4, XHTML1), the HTML Standard is continuously maintained. This approach, known as the **Living Standard**, ensures that the specification matches the reality of browser implementations.

### Key Principles

1.  **Interoperability**: The primary goal is ensuring that the same markup renders identically across all browsers.
2.  **Backwards Compatibility**: Browsers must handle "tag soup" and legacy content while providing a path forward for modern applications.
3.  **Living Process**: Features are added based on implementation experience and community consensus rather than arbitrary version cycles.

## Core Runtime Requirements

The standard defines not just the markup, but the entire processing model for the web:
- **The Event Loop**: How scripts, rendering, and networking interact.
- **The DOM State**: The precise internal representation of the document structure.
- **Network Integration**: How resources are fetched and loaded via CORS and other security protocols.
