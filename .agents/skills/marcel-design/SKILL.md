---
name: marcel-design
description: When the user wants to build a website using the "Marcel Design" style—a premium, cinematic, dark-themed aesthetic with sophisticated animations, glassmorphism, and dynamic backgrounds (NeuralBackground, BentoGrid, GSAP reveals). Use this for high-end landing pages, portfolio sites, or branding projects that require a "wow" factor.
---

# Marcel Design Skill

You are an expert UI/UX designer and frontend developer specializing in the "Marcel Design" aesthetic. This style is defined by a cinematic, deep-dark atmosphere, premium typography, and sophisticated micro-interactions.

## Core Aesthetic Principles

### 1. The Color Palette (Midnight & Gold/Blue)
- **Background**: Deep obsidian (`#0a0a0a`) or dark navy (`#020617`).
- **Foreground**: Off-white/Cream (`#f4ebd0`) or subtle silver (`#e2e8f0`).
- **Accents**: High-contrast, vibrant colors used sparingly for CTAs and highlights.
  - **Electric Blue**: `#0369a1`
  - **Sunset Orange**: `#e8622c`
- **Surface**: Translucent layers (Glassmorphism) using `backdrop-blur`.

### 2. Typography
- **Primary Font**: `Inter` or `Space Grotesk`.
- **Headings**: Extremely bold (`font-black`), large sizes, and tight tracking (`tracking-tighter`).
- **Body**: Clean, high-readability sans-serif with ample line height.

### 3. Visual Depth
- **Texture**: Subtle grain/noise overlays (2% opacity).
- **Glow**: Soft radial gradients and "ellipses" behind content to create depth.
- **Borders**: Thin, animated borders or gradients that react to hover/scroll.

---

## Component Library (The "Marcel" Stack)

### Backgrounds
- **NeuralBackground**: Dynamic flow-field or particle backgrounds that react to the cursor.
- **ShaderAnimation / ShaderLines**: WebGL-based abstract movements.
- **MagneticGrid**: Interactive grid patterns.

### Layout & Containers
- **BentoGrid**: Modern, asymmetric layout system for features or portfolios.
- **EvervaultCard**: Interactive card hover effects that reveal underlying patterns.
- **SectionWithMockup**: High-fidelity product/image showcases with parallax.

### Text Animations
- **RevealText**: Staggered letter-by-letter reveal (GSAP).
- **BlurText**: Cinematic fading/blurring transitions.
- **RevealOnScroll**: Elements that slide, scale, or fade in as the user scrolls.

### CTAs & Buttons
- **ShimmerButton**: Buttons with a moving light reflection.
- **LiquidGlassButton**: Soft, organic hover effects.
- **MetalButton**: High-gloss, tactile-feeling buttons.

---

## Technical Implementation Rules

### GSAP for Motion
- Use GSAP for all complex scroll-triggered animations.
- Always use `ScrollTrigger` for entry reveals.
- Maintain consistent eases (e.g., `power3.out`).

### React Structure
- Use `framer-motion` for UI state transitions (modals, dropdowns).
- Keep background components absolutely positioned and z-indexed (`z-0`).
- Wrap the main content in a `relative` container with `overflow-hidden`.

### Tailwind Configuration
- Extend the theme with custom animations (`shimmer-slide`, `spin-around`, `marquee`).
- Define design tokens in `globals.css` using CSS variables.

---

## Writing Copy for Marcel Design
- **Tone**: Cinematic, bold, and authoritative.
- **Approach**: "Show, Don't Tell." State facts and let the design imply the quality.
- **Formatting**: Use gradient text for emphasis and short, punchy paragraphs.

---

## Related Skills
- **copywriting**: To match the cinematic tone with persuasive text.
- **page-cro**: To ensure the high-end design still converts effectively.
- **react-components**: To build out modular versions of the Marcel components.
