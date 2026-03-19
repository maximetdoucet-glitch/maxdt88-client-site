# Auto-Animate Logic Blueprint

Auto-Animate is a state-transition engine that automatically tracks matching elements across different views and interpolates their properties.

## The Matching Algorithm

The engine identifies elements to animate based on their structure or an explicit `data-id`.

### Key Logic Steps:
1.  **State Capture**: Before the transition, the engine captures the position, size, and styling of all elements in the current view.
2.  **Identity Matching**: In the target view, it searches for elements with the same tag name and content, or a matching `data-id` attribute.
3.  **Interpolation**: For all matched pairs, it calculates the delta and applies a CSS transition or Web Animation API sequence.

## Motion Categories

- **Layout Morphing**: Changing an element from a sidebar to a hero element seamlessly.
- **Opacity Sequencing**: Fading out non-matching elements while matched ones move.
- **Attribute Interpolation**: Smoothly transitioning custom CSS variables or SVG paths.

## Performance Optimization

To maintain 60FPS during complex morphs:
- **Composite-Only Properties**: Prioritize `transform` and `opacity`.
- **Hardware Acceleration**: Ensuring elements are moved to their own compositor layers via `will-change`.
