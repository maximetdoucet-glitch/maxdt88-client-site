# Cinematic Sequencing Protocol

Cinematic sequencing is the art of structuring information in a non-linear, high-impact format. Inspired by reveal.js, this protocol defines how to manage complex narrative flows on the web.

## Nested Navigation Architecture

Traditional presentations are strictly horizontal. Cinematic sequencing introduces a 2D grid of information:
- **Horizontal Progress**: High-level thematic shifts.
- **Vertical Depth**: Deep-dives into specific sub-topics without breaking the primary narrative thread.

### Implementation Logic

```html
<section>
  <section>Horizontal Slide (Topic A)</section>
  <section>Vertical Slide (Deep Dive A.1)</section>
  <section>Vertical Slide (Deep Dive A.2)</section>
</section>
<section>Horizontal Slide (Topic B)</section>
```

## Fragmented Information Delivery

Fragments are used to highlight individual elements on a slide sequentially. This prevents information overload and maintains "Attention Anchors."

### Fragment Styles
1.  **Grow/Shrink**: Emphasizing scale.
2.  **Fade-In-Then-Out**: Temporary data points.
3.  **Highlight-Blue/Red**: Directing the eye to specific code or data.

## Kinetic Transitions

Movement between states should be physically modeled. Using `cubic-bezier` curves ensures transitions feel intentional and premium, matching the "Brainwave" aesthetic of the platform.
