# Presentation Architecture (reveal.js)

The architecture of a modern HTML presentation framework is built on three core pillars: The Controller, The View Engine, and The Plugin System.

## The Core Controller

The controller manages the global state of the deck:
- **Index Management**: tracking `(h, v, f)` coordinates (horizontal, vertical, fragment).
- **Navigation Routing**: Handling keyboard, touch, and URL hash synchronization.
- **API Surface**: Providing programmatic control for external integrations.

## The View Engine

Responsible for the visual representation and scaling:
- **Automatic Scaling**: Ensuring the presentation maintains its aspect ratio across all viewports (The "Letterbox" effect).
- **Theme Injection**: Dynamic swapping of SCSS-based themes (Black, White, League, Solarized).
- **Print Logic**: Specialized CSS for high-fidelity PDF exporting.

## Extensibility Layer

A robust plugin system allows for specialized functionality without bloating the core:
- **Markdown Parser**: Real-time rendering of `.md` content into slides.
- **Highlight.js**: Syntax highlighting for code-heavy presentations.
- **Notes System**: A separate window for speaker-only metadata.

## Global State Persistence

The framework uses `data-state` attributes to trigger site-wide aesthetic changes when specific slides are active, enabling "Contextual Environments" within a single page.
