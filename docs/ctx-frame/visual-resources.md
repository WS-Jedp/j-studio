# CTX Frame — Design Foundations
## A Technical Architecture for a Site That Earns Its Awards

> This document supersedes generic design decisions. Every token, every curve, every shadow has a reason. Agents and engineers building CTX Frame UI must read this before writing a single rule. The goal: a site that feels like it was built by one obsessive hand, not assembled from a library.

---

## 0. Design Philosophy

### The Aesthetic Position

CTX Frame sits at the intersection of **Swiss International Typographic Style** and **Scientific Instrument Design**. Not brutalist — brutalism is aggression. Not neomorphic — neomorphism is softness without structure. CTX Frame is **precision minimalism**: every element placed with the confidence of someone who knows exactly why it belongs there.

The closest physical reference: a high-end oscilloscope interface. Or the interior of a Leica camera. Or the layout of a Nature journal paper. Clean, authoritative, and quietly extraordinary.

### The Governing Rules of Composition

**Rule 1 — Aggressive vertical rhythm.**
Every element snaps to a baseline grid of `8px`. No exceptions. Spacing between elements is always a multiple of 8. This creates the subliminal sense that the page was built by someone who cares about things you can't quite name.

**Rule 2 — Asymmetric balance, not centered layouts.**
Headers left-align. Grids are offset. A 7-column layout is more interesting than a 12-column one with equal gutters. The page breathes on one side and holds weight on the other.

**Rule 3 — White space as the loudest element.**
The emptiest section of the page is the most important one. White space is not emptiness — it is the pause between statements that makes the next statement land.

**Rule 4 — One moment of surprise per section.**
Every section has a single unexpected detail: a number printed at 200px in `--ink-faint`, a line that breaks the grid by 1 column, an animation that happens 200ms after you expect it. Nothing more. Nothing less.

**Rule 5 — Dark sections are earned.**
Dark backgrounds (`--void` surface) are used sparingly — maximum 2 per page. They mark moments of weight: the hero, or a singular concept that needs visual isolation. They are not decoration.

---

## 1. Composition System

### Layout Grid

```
Desktop (1440px)
  Columns:      12
  Gutter:       24px
  Margin:       80px
  Max content:  1280px

Reading column: 720px (centered or left-offset)
Wide content:   1120px
Full bleed:     100vw (waves, dark sections only)

Tablet (768–1024px)
  Columns:      8
  Gutter:       16px
  Margin:       40px

Mobile (< 768px)
  Columns:      4
  Gutter:       16px
  Margin:       24px
```

### Section Anatomy

Every section follows this vertical structure:

```
[section-top-breathing]     80–120px
  [eyebrow label]           10px mono uppercase, --graphite
  [vertical gap]            24px
  [heading]                 H1 or H2
  [vertical gap]            16–24px
  [body or content]
  [vertical gap]            48–64px
  [cta or closing element]
[section-bottom-breathing]  80–120px
```

Never compress this structure. The breathing room is load-bearing.

### The 7-Column Offset Rule

For hero and statement sections, use a 7/5 split instead of centered content:

```
[  content: 7 cols  ] [ empty: 5 cols ]
```

The empty 5 columns are not wasted. They create rightward tension — the page feels like it's about to continue, like a sentence not yet finished.

---

## 2. Color System — Semantic Scale

### Brand Colors — "The Signal Spectrum"

A 9-step scale from void to electric. Named for what they feel, not what they are.

```
Signal-900  "Void"          #060A14    Near-black with a blue undertone.
                                        Used for: darkest dark mode surfaces.

Signal-800  "Abyss"         #0A1628    Deep navy-black.
                                        Used for: hero backgrounds, dark sections.

Signal-700  "Depth"         #0D2147    Dark navy. Strong, institutional.
                                        Used for: dark section secondary surfaces.

Signal-600  "Sovereign"     #0A3D8F    Deep royal blue. Authority.
                                        Used for: dark context signal elements.

Signal-500  "Cortana"       #0B5FDE    ← THE SIGNAL. Primary accent.
                                        Used for: CTAs, active states, code keys,
                                        callout borders, links.

Signal-400  "Electric"      #3D82F5    Mid-tone. Energetic.
                                        Used for: hover states on signal elements,
                                        secondary active indicators.

Signal-300  "Ionized"       #7AACF8    Light blue. Atmospheric.
                                        Used for: wave spectrum mid-tones,
                                        disabled state for signal elements.

Signal-200  "Mist"          #B8D4FC    Very light. Almost white-blue.
                                        Used for: signal-light backgrounds,
                                        hover tints on paper surfaces.

Signal-100  "Atmosphere"    #E8F2FF    Barely-there tint.
                                        Used for: --signal-light, callout backgrounds,
                                        focus rings at rest.
```

### Neutral Colors — "The Paper Spectrum"

```
Neutral-950  "Obsidian"     #0D0D0D    Primary text. --ink.
Neutral-900  "Charcoal"     #1A1A1A    Dark UI elements.
Neutral-800  "Iron"         #2E2E2E    Secondary dark elements.
Neutral-600  "Graphite"     #4A4A4A    Body text. --lead.
Neutral-400  "Slate"        #8A8A8A    Labels, metadata. --graphite.
Neutral-200  "Rule"         #D0CBC0    Borders, dividers. --rule.
Neutral-100  "Parchment"    #EEEBE3    Card surfaces. --paper-dark.
Neutral-50   "Paper"        #F7F5F0    Page background. --paper.
Neutral-0    "White"        #FFFFFF    Pure white. Used sparingly.
```

### Semantic Token Map

```css
:root {
  /* ── Brand Spectrum ── */
  --signal-900:     #060A14;
  --signal-800:     #0A1628;
  --signal-700:     #0D2147;
  --signal-600:     #0A3D8F;
  --signal-500:     #0B5FDE;   /* --signal */
  --signal-400:     #3D82F5;
  --signal-300:     #7AACF8;
  --signal-200:     #B8D4FC;
  --signal-100:     #E8F2FF;   /* --signal-light */

  /* ── Neutral Spectrum ── */
  --neutral-950:    #0D0D0D;   /* --ink */
  --neutral-900:    #1A1A1A;
  --neutral-800:    #2E2E2E;
  --neutral-600:    #4A4A4A;   /* --lead */
  --neutral-400:    #8A8A8A;   /* --graphite */
  --neutral-200:    #D0CBC0;   /* --rule */
  --neutral-100:    #EEEBE3;   /* --paper-dark */
  --neutral-50:     #F7F5F0;   /* --paper */
  --neutral-0:      #FFFFFF;   /* --white */

  /* ── Semantic Aliases ── */
  --color-ink:              var(--neutral-950);
  --color-paper:            var(--neutral-50);
  --color-paper-raised:     var(--neutral-100);
  --color-lead:             var(--neutral-600);
  --color-graphite:         var(--neutral-400);
  --color-rule:             var(--neutral-200);
  --color-signal:           var(--signal-500);
  --color-signal-hover:     var(--signal-400);
  --color-signal-subtle:    var(--signal-100);
  --color-void:             var(--signal-800);

  /* ── Interactive States ── */
  --color-focus-ring:       var(--signal-300);
  --color-selection-bg:     var(--signal-100);
  --color-selection-text:   var(--signal-600);

  /* ── Code Tokens ── */
  --code-key:               var(--signal-500);
  --code-string:            #5B8FE8;
  --code-value:             var(--neutral-950);
  --code-comment:           var(--neutral-400);
  --code-bg:                var(--neutral-100);
}
```

### Surface & Elevation System

4 elevation levels. No drop shadows in the traditional sense — CTX Frame uses **border + subtle background shift** instead of box-shadow blur. Shadows are reserved for interactive moments only.

```css
/* ── Elevation 0 — Flush ── */
/* The page surface itself. No border, no shadow. */
.elevation-0 {
  background: var(--color-paper);
  border: none;
}

/* ── Elevation 1 — Raised ── */
/* Cards, code blocks, callouts. Lifted from the page by color only. */
.elevation-1 {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  /* No box-shadow. The border does the work. */
}

/* ── Elevation 2 — Floating ── */
/* Dropdowns, tooltips, popovers. First use of shadow. */
.elevation-2 {
  background: var(--color-paper);
  border: 1px solid var(--color-rule);
  box-shadow:
    0 2px 4px rgba(13, 13, 13, 0.04),
    0 8px 24px rgba(13, 13, 13, 0.06);
}

/* ── Elevation 3 — Modal ── */
/* Modal dialogs. Commanding presence. */
.elevation-3 {
  background: var(--neutral-0);
  border: 1px solid var(--color-rule);
  box-shadow:
    0 4px 8px  rgba(13, 13, 13, 0.06),
    0 16px 48px rgba(13, 13, 13, 0.10),
    0 32px 80px rgba(11, 95, 222, 0.04);  /* Signal tint in deepest layer */
}

/* ── Dark Surface (Void) ── */
/* Hero sections, dark conceptual blocks. */
.surface-void {
  background: var(--color-void);  /* #0A1628 */
  /* Signal elements on void surfaces shift to Signal-300 (#7AACF8) */
}
```

### Border System

```css
/* Standard structural border */
--border-rule:    1px solid var(--color-rule);

/* Signal accent border (callouts, active states) */
--border-signal:  3px solid var(--color-signal);

/* Subtle signal (tags, focus) */
--border-signal-subtle: 1px solid rgba(11, 95, 222, 0.25);

/* Dark surface border */
--border-void:    1px solid rgba(255, 255, 255, 0.08);
```

---

## 3. Border Radius System

CTX Frame uses **sharp geometry with surgical exceptions**.

```css
:root {
  --radius-none:   0px;     /* Default for all primary containers and buttons */
  --radius-xs:     2px;     /* Tags, badges, inline code chips */
  --radius-sm:     4px;     /* Input fields only */
  --radius-md:     8px;     /* Never used on primary UI — reserved for tooltips */
  --radius-full:   9999px;  /* Only for pill-shaped status indicators */
}
```

### Radius Rules

- **All primary buttons:** `border-radius: 0` — no exceptions. Sharp edges signal precision.
- **Cards and containers:** `border-radius: 0` — the page is a grid, not a cloud.
- **Tags and badges:** `border-radius: var(--radius-xs)` (2px) — barely perceptible. Just enough to distinguish from a border.
- **Input fields:** `border-radius: var(--radius-sm)` (4px) — the only concession to usability ergonomics.
- **Avatars / icons in circles:** never. Use squares.
- **Wave canvas elements:** no radius — waves are infinite.

---

## 4. Shadow System

Shadows in CTX Frame are **not decorative**. They communicate state change only.

```css
:root {
  /* ── Static shadows (used on elevation levels only) ── */
  --shadow-none:    none;
  --shadow-sm:      0 1px 3px rgba(13,13,13,0.05), 0 4px 12px rgba(13,13,13,0.04);
  --shadow-md:      0 2px 4px rgba(13,13,13,0.04), 0 8px 24px rgba(13,13,13,0.06);
  --shadow-lg:      0 4px 8px rgba(13,13,13,0.06), 0 16px 48px rgba(13,13,13,0.10);

  /* ── Interactive shadow (hover / active states only) ── */
  --shadow-signal:  0 0 0 3px rgba(11, 95, 222, 0.15);   /* focus ring */
  --shadow-signal-glow: 0 0 24px rgba(11, 95, 222, 0.20),
                        0 0 48px rgba(11, 95, 222, 0.10); /* CTA glow on hover */
}
```

### Shadow Usage Rules

- Cards at rest: `--shadow-none` (border does the work)
- Cards on hover: `--shadow-sm` (subtle lift)
- Dropdowns: `--shadow-md`
- Modals: `--shadow-lg`
- CTA button at rest: `--shadow-none`
- CTA button on hover: `--shadow-signal-glow` — the only moment of glow in the entire system
- Focus states: `--shadow-signal` (3px ring, 15% opacity)
- **Never**: blur-heavy shadows, colored shadows on neutral elements, shadows on text

---

## 5. Typographic Architecture

### Font Stack

```css
:root {
  --font-display: 'DM Sans', 'Helvetica Neue', system-ui, sans-serif;
  --font-body:    'DM Sans', 'Helvetica Neue', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}
```

### Complete Type Scale with Optical Corrections

```css
:root {
  /* ── Display — For heroes and statement moments ── */
  --text-display-2xl: {
    font-size: 96px;
    font-weight: 700;
    line-height: 0.95;       /* Tighter than you think. Intentional. */
    letter-spacing: -0.05em;
    font-feature-settings: 'ss01', 'kern';
  }

  --text-display-xl: {
    font-size: 72px;
    font-weight: 700;
    line-height: 1.0;
    letter-spacing: -0.04em;
  }

  --text-display-lg: {
    font-size: 56px;
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  /* ── Headings ── */
  --text-h1: {
    font-size: 44px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  --text-h2: {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  --text-h3: {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }

  --text-h4: {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.005em;
  }

  /* ── Body ── */
  --text-body-lg: {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.75;
    letter-spacing: 0;
  }

  --text-body-md: {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0;
  }

  --text-body-sm: {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.65;
    letter-spacing: 0.005em;
  }

  /* ── UI Text ── */
  --text-label: {
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  --text-caption: {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.02em;
    color: var(--color-graphite);
  }

  /* ── Mono ── */
  --text-mono-lg: {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 500;
    line-height: 1.9;
    letter-spacing: 0;
  }

  --text-mono-md: {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.85;
    letter-spacing: 0;
  }

  --text-mono-sm: {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: 0.02em;
  }
}
```

### Typographic Rules (Non-negotiable)

- **Negative letter-spacing starts at H3 and above.** Body copy is always `0` or slightly positive.
- **Line-height below 1.0 only for display sizes above 64px.** At that scale, optical correction requires tighter leading.
- **Font weight 300 for introductory body copy** (the paragraph immediately after a headline). Switch to 400 for dense content.
- **Never use `font-weight: 500` for body.** It reads as neither regular nor bold — a design no-man's-land.
- **Monospace elements never use negative letter-spacing.** Monospace metrics are designed for zero tracking.
- **Max line length: 68–72 characters for body text.** Enforce with `max-width: 68ch` on reading columns.
- **Optical size:** DM Sans supports `font-optical-sizing: auto` — always enable it.

---

## 6. Spacing & Sizing Tokens

```css
:root {
  /* ── Base unit: 8px ── */
  --space-px:    1px;
  --space-0:     0px;
  --space-1:     4px;    /* Micro: icon gaps, tight padding */
  --space-2:     8px;    /* Small: inline spacing */
  --space-3:     12px;   /* Component internal padding */
  --space-4:     16px;   /* Standard component padding */
  --space-5:     20px;   /* Loose component padding */
  --space-6:     24px;   /* Section sub-element gaps */
  --space-8:     32px;   /* Card padding, list spacing */
  --space-10:    40px;   /* Large component gaps */
  --space-12:    48px;   /* Section inner bottom margin */
  --space-16:    64px;   /* Section gap (compressed) */
  --space-20:    80px;   /* Standard section breathing room */
  --space-24:    96px;   /* Large section gap */
  --space-32:   128px;   /* Hero internal spacing */
  --space-40:   160px;   /* Between major page sections */
  --space-48:   192px;   /* Maximum breathing room */
}
```

---

## 7. Motion & Micro-interactions

### The CTX Frame Easing Vocabulary

CTX Frame has **four named curves**. Each maps to a specific interaction type. Never use `ease`, `ease-in-out`, or `linear` directly — always use a named token.

```css
:root {
  /*
   * --ease-standard
   * The workhorse. Most UI transitions.
   * Starts fast, decelerates. Feels considered.
   */
  --ease-standard:    cubic-bezier(0.4, 0.0, 0.2, 1);
  --duration-standard: 200ms;

  /*
   * --ease-enter
   * Elements arriving on screen.
   * Starts from rest, accelerates into position.
   * Used for: modals appearing, sections revealing on scroll.
   */
  --ease-enter:       cubic-bezier(0.0, 0.0, 0.2, 1);
  --duration-enter:   300ms;

  /*
   * --ease-exit
   * Elements leaving screen.
   * Starts fast, ends abruptly. Confident departure.
   * Used for: toasts dismissing, elements removing.
   */
  --ease-exit:        cubic-bezier(0.4, 0.0, 1.0, 1);
  --duration-exit:    150ms;

  /*
   * --ease-expressive
   * High-impact moments. Slight overshoot, spring-like.
   * Used for: CTA hover glow activation, wave ripple origin pulse.
   * SPARINGLY — maximum once per interaction set.
   */
  --ease-expressive:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-expressive: 400ms;
}
```

### Element Entrance Choreography

All elements enter with a **combined translate + opacity** animation. No scale. Scale feels toy-like.

```css
/* ── Standard entrance (most elements) ── */
@keyframes ctx-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Staggered children entrance ── */
/* Apply to parent. Children stagger by 60ms. */
.ctx-stagger > * {
  animation: ctx-enter var(--duration-enter) var(--ease-enter) both;
}
.ctx-stagger > *:nth-child(1) { animation-delay: 0ms; }
.ctx-stagger > *:nth-child(2) { animation-delay: 60ms; }
.ctx-stagger > *:nth-child(3) { animation-delay: 120ms; }
.ctx-stagger > *:nth-child(4) { animation-delay: 180ms; }
.ctx-stagger > *:nth-child(5) { animation-delay: 240ms; }

/* ── Section reveal on scroll ── */
/* Use IntersectionObserver. Threshold: 0.15 */
.ctx-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-enter) var(--ease-enter),
    transform var(--duration-enter) var(--ease-enter);
}
.ctx-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Hero headline entrance ── */
/* Each word enters independently with 40ms stagger */
@keyframes ctx-word-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

### Micro-interaction Specifications

```
CTA Button — Primary
  Rest:    background: --signal-500, shadow: none
  Hover:   background: --signal-400, shadow: --shadow-signal-glow
           transition: 200ms --ease-standard
           transform: translateY(-1px)  ← 1px lift only
  Active:  background: --signal-600, transform: translateY(0)
           transition: 80ms --ease-exit
  Focus:   outline: 3px solid --signal-300, outline-offset: 3px

Nav Link
  Rest:    color: --graphite
  Hover:   color: --ink
           transition: 150ms --ease-standard
  Active:  color: --signal, with 2px bottom border in --signal

Code Block
  Hover on key token:  background: --signal-100 beneath token
                       transition: 100ms --ease-standard
  Copy button appear:  fade-in top-right corner on block hover
                       opacity: 0 → 1, 150ms --ease-enter

Callout Block
  Entry on scroll:     left border animates height 0 → 100%
                       duration: 400ms, ease: --ease-enter
                       background tint fades in 200ms after border

Wave Background
  Always animating, never stops.
  Speed: t += 0.005 per frame (60fps = ~0.3 units/sec)
  Amplitude variation: ±15% sinusoidal over 8 seconds
  Opacity: never exceeds 0.06 on light surfaces

Section Number (decorative large numeral)
  Entry: starts at opacity 0.03 (barely visible)
         scales from 0.95 → 1.0 as section enters viewport
         transition: 600ms --ease-enter
```

### Scroll Behavior

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Accounts for fixed nav */
}

/* Parallax — light only, max 20px displacement */
/* Never parallax text. Only background elements (waves, large numerals). */
.ctx-parallax {
  will-change: transform;
  /* Applied via JS: transform: translateY(scrollY * 0.08) */
}
```

---

## 8. Wave Graphics — Technical Specification

The wave interference pattern is the **signature graphic motif** of CTX Frame. It is the visual form of `ripple`.

### Color Usage in Waves

```javascript
// Light surface waves (opacity: 0.04–0.06 on --paper)
const WAVE_COLORS_LIGHT = [
  'rgba(11, 95, 222, 1)',    // Signal-500 — dominant
  'rgba(61, 130, 245, 1)',   // Signal-400
  'rgba(122, 172, 248, 1)',  // Signal-300
  'rgba(184, 212, 252, 1)',  // Signal-200 — fading out
];

// Dark surface waves (opacity: 0.12–0.18 on --void)
const WAVE_COLORS_DARK = [
  'rgba(122, 172, 248, 1)',  // Signal-300 — base on dark
  'rgba(184, 212, 252, 1)',  // Signal-200
  'rgba(232, 242, 255, 0.6)',// Signal-100 near-white
  'rgba(255, 255, 255, 0.3)',// Pure white shimmer
];
```

### Ripple Illustration Specification

Used in the "How It Works" and hierarchy sections to visualize context propagation:

```
Origin point:  Feature node, 6px circle, --signal fill
Wave arcs:     Expand from origin as semicircles to the right
               Each arc: 1.5px stroke, hsl spectrum shift per arc
               Arc speed: radius grows at 60px/sec (on 60fps)
               Arc fade: opacity = max(0, 1 - radius / maxRadius)
               Arc color: hsl(220deg + arcIndex * 15, 80%, 65%)

Boundary lines: Vertical dashed lines marking module/capability/app
               1px dashed, rgba(255,255,255,0.12) on dark
               1px dashed, rgba(13,13,13,0.10) on light
               Labels: --text-mono-sm, --signal color

Impact halo:   When wave reaches a boundary, pulse animation
               circle expands from boundary point at 0.3 opacity → 0
               duration: 600ms, ease: --ease-expressive
```

---

## 9. Icon System

CTX Frame uses a **custom thin-line icon set** derived from the wave and boundary vocabulary of the brand. No icon library is used directly.

### Design Principles for Icons

```
Stroke width:   1.5px at 24×24px — never 2px (too heavy), never 1px (too fragile)
Corner style:   Sharp corners (stroke-linejoin: miter) for structural icons.
                Rounded corners (stroke-linejoin: round) for concept icons only.
Fill:           Never. All icons are stroke-only.
Size grid:      16px (inline), 20px (UI), 24px (standard), 32px (feature)
Color:          Inherits currentColor. Never hardcoded.
Optical sizing: Icons at 16px receive slightly heavier stroke (1.75px) for legibility.
```

### Core Icon Vocabulary

```
ctx-icon-ripple     Expanding arcs from a point — the brand icon
ctx-icon-anchor     A pin with a single horizontal crossbar
ctx-icon-boundary   Two parallel vertical lines with space between
ctx-icon-trace      A dotted line following a curved path
ctx-icon-context    A document with a corner fold and a dot
ctx-icon-learn      A circle with a checkmark that has a trailing line
ctx-icon-guardrail  A horizontal line with two vertical end-stops
ctx-icon-feature    A nested square (outer thin, inner filled 2×2)
ctx-icon-module     Three horizontal rules of decreasing width
ctx-icon-app        A grid of 2×2 squares with connecting lines
```

---

## 10. Generative Asset Prompts

### Prompt 1 — Custom Thin-Line Icon Set

**For: Midjourney, Flux, Adobe Firefly**

```
Ultra-minimal thin-line icon set for a developer tool brand.
24×24px grid. 1.5px stroke weight throughout. Sharp miter joins.
Subject matter: software architecture concepts — context propagation,
module boundaries, feature trees, wave interference, anchors.
Style reference: Streamline icons meets oscilloscope display aesthetics.
Color: single color, pure black on white.
Background: pure white. No shadows. No fills. Stroke only.
Render: flat vector SVG aesthetic, no gradients, no perspective.
Mood: scientific precision, Swiss design rationalism.
Format: icon sheet, 5×2 grid, generous spacing.
--style raw --stylize 20 --ar 5:2 --v 6
```

### Prompt 2 — Abstract Noise Texture Background

**For: Midjourney, Stable Diffusion, Flux**

```
Abstract scientific visualization for tech website background.
Fine-grain noise texture overlaid with subtle interference wave patterns.
Color palette: warm off-white base #F7F5F0, with barely-perceptible
electric blue wave lines #0B5FDE at 4% opacity.
Style: high-resolution grain texture as seen in premium paper stock,
combined with oscilloscope CRT scan-line patterns.
Aesthetic: restrained, scientific, Bauhaus-adjacent.
No people, no objects, no text. Pure texture and pattern.
Output: seamlessly tileable, 2048×2048px.
Mood: like looking at paper under a microscope — structured randomness.
--style raw --stylize 50 --tile --ar 1:1 --v 6
```

### Prompt 3 — Product Interface with Cinematic Lighting

**For: Midjourney, Flux, Runway**

```
Cinematic product photography of a developer tool interface.
Dark ambient background, near-black #0A1628.
A code editor window floating in space, angled at 15 degrees,
displaying YAML frontmatter with electric blue (#0B5FDE) syntax highlights.
Lighting: single rim light from top-left, cool white, hard edge.
Secondary: subtle blue-tinted fill light from the screen itself,
spilling onto a dark paper-textured surface beneath.
Depth of field: sharp focus on the code, bokeh in background.
Mood: Leica product photography meets MIT lab aesthetic.
No people. No hands. Pure object photography.
Style reference: Linear.app website aesthetic × Vercel dark mode × Dieter Rams.
--style raw --stylize 200 --ar 16:9 --v 6
```

---

## 11. Anti-Pattern Library

These are the specific decisions that make sites feel generic. Every one of these is prohibited.

```
❌  Purple or teal gradients on any surface — ever
❌  box-shadow: 0 4px 6px rgba(0,0,0,0.1) — the default Tailwind shadow
❌  border-radius: 8px or 12px on cards — rounds off the structural feel
❌  Animated gradient text (the "Aurora" effect) — overused to the point of noise
❌  Bento grid layouts with equal-weight cards — all weight, no hierarchy
❌  Glass cards with backdrop-filter: blur() — unless on void surfaces only
❌  Icon + label pattern from Heroicons/Lucide unmodified
❌  font-size: 14px for body in dark sections — too small for dark contrast
❌  Letter-spacing: 0.1em on body copy — reserved for labels only
❌  Hover effects that move an element more than 4px — feels cheap
❌  More than 3 font weights on a single page section
❌  Centered hero with centered body copy and centered CTA — never all three
❌  Loading skeleton with rounded rect shimmer (default behavior) — use opacity pulse
❌  Notification dots in primary nav — clutter
❌  "Trusted by" logo strips with grayscale logos — overused pattern
❌  Scroll-jacking (controlling native scroll behavior)
❌  SVG blobs as background shapes — formless, unrelated to brand
❌  Before/after comparison sliders — too interactive for this brand's restraint
❌  Auto-playing video heroes — respects prefers-reduced-motion mandatory
```

---

## 12. Implementation Checklist

Before shipping any page component, verify:

```
[ ] All colors reference semantic tokens, not hardcoded hex
[ ] Spacing values are multiples of 8px (4px allowed for micro-gaps only)
[ ] No element uses border-radius > 4px (except tooltips at 8px)
[ ] Section has minimum 80px vertical breathing room top and bottom
[ ] Maximum 1 element uses --shadow-signal-glow per viewport
[ ] --signal (#0B5FDE) appears in one dominant role per screen
[ ] All animations reference a named --ease-* token
[ ] No animation duration exceeds 500ms (except waves, which are infinite)
[ ] Wave opacity does not exceed 0.06 on --paper surfaces
[ ] All body text columns max-width: 68ch
[ ] All interactive elements have visible focus states using --shadow-signal
[ ] font-optical-sizing: auto is set on html element
[ ] prefers-reduced-motion: reduce disables all scroll animations
[ ] Dark sections (--void) are used maximum twice per page
[ ] The word "powerful", "seamless", or "intuitive" does not appear in copy
```

---

*CTX Frame Design Foundations · v1.0 · February 2026*
*Built to be different. Constrained to be coherent.*
*Context before code.*