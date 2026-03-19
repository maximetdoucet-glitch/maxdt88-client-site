# Custom Elements Blueprint

Custom Elements provide a way for authors to build their own fully-featured DOM elements, extending the vocabulary of the HTML Standard.

## Standard Implementation

Custom elements are part of the Web Components suite. They allow you to define new HTML tags with custom behavior.

### The Lifecycle Registry

The `customElements` registry is used to define and control these components:

```javascript
class MyProtocol extends HTMLElement {
  constructor() {
    super();
    // Initialize component
  }

  connectedCallback() {
    // Invoked when custom element is first connected to the DOM
  }

  disconnectedCallback() {
    // Invoked when custom element is disconnected from the DOM
  }
}

customElements.define('my-protocol', MyProtocol);
```

## Types of Custom Elements

1.  **Autonomous custom elements**: Defined by a class that extends `HTMLElement`. They don't inherit from any existing standard element.
2.  **Customized built-in elements**: Defined by a class that extends a specific standard element (e.g., `HTMLButtonElement`).

## Extension Mechanisms

The standard allows several ways to extend HTML without breaking the parser:
- **`data-*` attributes**: Custom data for scripts.
- **Microdata**: Embedding nested name-value pairs.
- **Custom Elements**: Fully interactive, self-contained components.
