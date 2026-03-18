# CTX Frame — Brand Guidelines
> This document is the source of truth for any agent, model, or engineer building UI for CTX Frame. Read it before writing a single line of CSS.

---

## 1. Brand Essence

**Tagline:** Context before code.

**Archetype:** The Scientist-Engineer. Rigorous but not rigid. Precise but not cold. Someone who names things the way poets name things — with technical accuracy and metaphorical resonance.

**What CTX Frame gives engineers:** Control over what they're building. Clarity to imagine without limits. Precision to execute without losing intent.

**Visual philosophy:** Modern architecture applied to information design. Structure is beauty. White space is argument. Elegance is not built through ornament — it is built through deliberate use of space, consistent structure, and restrained color. Think Bauhaus, not decoration.

---

## 2. Color System

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#0D0D0D` | Primary text, headings, all weight-bearing elements |
| `--paper` | `#F7F5F0` | Default page background — **never pure white** |
| `--paper-dark` | `#EEEBE3` | Card surfaces, code block backgrounds, section fills |
| `--lead` | `#4A4A4A` | Body text, secondary content |
| `--graphite` | `#8A8A8A` | Labels, metadata, timestamps, captions |
| `--rule` | `#D0CBC0` | Dividers, borders, structural lines |
| `--signal` | `#0B5FDE` | **The single accent — Cortana Blue.** CTAs, active states, code highlights, left-border callouts. Electric, luminous, digital. |
| `--signal-light` | `#E8F2FF` | Tinted backgrounds for callout blocks, hover states. Derived from Cortana Blue. |
| `--white` | `#FFFFFF` | Used only inside components that need pure contrast |

### Rules — Non-negotiable

- `--paper` is the default background. Never `#FFFFFF` for primary surfaces.
- `--signal` appears **once per screen** in a dominant role. Never scattered.
- `--signal` is never used as a large background fill.
- Never introduce a second accent color. Signal is the only one.
- Dark mode inverts `--ink` and `--paper`. Signal stays `#0B5FDE`.

### CSS Variables (copy this into every project)

```css
:root {
  --ink:          #0D0D0D;
  --paper:        #F7F5F0;
  --paper-dark:   #EEEBE3;
  --lead:         #4A4A4A;
  --graphite:     #8A8A8A;
  --rule:         #D0CBC0;
  --signal:       #0B5FDE;
  --signal-light: #E8F2FF;
  --white:        #FFFFFF;
}
```

---

## 3. Typography

### Font Families

| Role | Font | Fallback |
|---|---|---|
| Display + Body + UI | `DM Sans` | `system-ui, sans-serif` |
| Code + Commands + Paths | `JetBrains Mono` | `'Courier New', monospace` |

**One family for everything non-code.** Hierarchy is built through weight, size, spacing, and color — not font changes.

### Google Fonts import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Type Scale

| Role | Size | Weight | Letter-spacing | Line-height | Color |
|---|---|---|---|---|---|
| Hero | 64–80px | 700 | −0.04em | 1.0 | `--ink` |
| H1 | 44–52px | 700 | −0.03em | 1.1 | `--ink` |
| H2 | 28–32px | 600 | −0.02em | 1.2 | `--ink` |
| H3 | 20–24px | 600 | −0.01em | 1.3 | `--ink` |
| Body L | 18px | 300–400 | 0 | 1.7 | `--lead` |
| Body M | 16px | 400 | 0 | 1.7 | `--lead` |
| Body S | 13–14px | 400 | 0 | 1.6 | `--graphite` |
| Label | 10–11px | 600 | +0.12–0.18em | — | `--graphite` |
| Mono | 13–14px | 400–500 | 0 | 1.8 | `--signal` |

### Rules

- Labels are always `text-transform: uppercase` with generous `letter-spacing`.
- Hero and H1 always use negative `letter-spacing`. Tight, structural, architectural.
- Body text uses `font-weight: 300` or `400`. Never bold body copy.
- Mono text (code, commands) defaults to `--signal` color unless inside a dark context.
- Never center-align body text. Center only in isolated hero/display moments.
- Never use `font-style: italic` for structural text. Italic is reserved for quotes and emphasis.

---

## 4. Spacing System

**Base unit: 8px.**

All spacing values are multiples of 8.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 8px | Tight gaps, inline spacing |
| `--space-2` | 16px | Component padding, list gaps |
| `--space-3` | 24px | Card padding, form fields |
| `--space-4` | 32px | Section sub-divisions |
| `--space-6` | 48px | Section padding |
| `--space-8` | 64px | Major section breaks |
| `--space-12` | 96px | Page-level section spacing |
| `--space-16` | 128px | Hero-level vertical space |

### Layout rules

- Content max-width: `800px` for reading columns, `1200px` for full layouts.
- Horizontal page padding: `48px` desktop, `24px` mobile.
- Sections breathe — `80–120px` vertical space between major sections. Don't compress it.
- White space is structural. An empty area is not wasted — it is weight.

---

## 5. Components

### Callout / Quote Block

Used for principles, guardrails, and load-bearing statements.

```css
.callout {
  border-left: 3px solid var(--signal);
  padding: 20px 28px;
  background: var(--signal-light);
}
.callout p {
  font-size: 17px;
  font-weight: 300;
  font-style: italic;
  color: var(--ink);
  line-height: 1.6;
}
```

### Code Block

```css
.code-block {
  background: var(--paper-dark);
  border: 1px solid var(--rule);
  padding: 24px 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 2;
}
/* Syntax tokens */
.token-key     { color: var(--signal); font-weight: 500; }
.token-value   { color: var(--ink); }
.token-comment { color: var(--graphite); }
.token-string  { color: #4D8FE8; }
```

### Section Label / Eyebrow

```css
.section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--graphite);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 40px;
}
```

### CTA Button — Primary

```css
.cta-primary {
  background: var(--signal);
  color: white;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 12px 28px;
  border: none;
  cursor: pointer;
  /* No border-radius. Sharp edges. Architectural. */
}
.cta-primary:hover {
  background: #0A50C0; /* Signal darkened ~10% */
}
```

### CTA — Secondary / Ghost

```css
.cta-secondary {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--graphite);
  letter-spacing: 0.06em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
```

### Divider / Rule

```css
.rule {
  border: none;
  border-top: 1px solid var(--rule);
  margin: 64px 0;
}
```

### Tag / Badge

```css
.tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--signal);
  border: 1px solid rgba(46, 32, 128, 0.2);
  padding: 4px 10px;
  background: var(--signal-light);
}
```

---

## 6. Wave Graphics

Wave interference patterns are the primary graphic motif of CTX Frame. They are the visual language of `ripple` — the propagation of a change through a system.

### Rules

- Waves are **never decorative**. They carry conceptual meaning.
- As background textures: `opacity: 0.03–0.06`. Almost imperceptible. Felt before seen.
- As section protagonists: full opacity, animated, with semantic context (showing `ripple` propagating through module boundaries).
- Colors in waves use the signal spectrum: `#0B5FDE` → `#4D8FE8` → `#4DA3FF` → `#99CCFF`.
- On dark backgrounds, add white to the spectrum: `rgba(255,255,255,0.4)`.
- Waves are always rendered on `<canvas>`. Never SVG static images for animated waves.
- Wave animation speed: slow and deliberate. `0.003–0.01` increment per frame. Never frenetic.

### Interference pattern implementation

```javascript
function drawInterferenceWave(canvas, opts = {}) {
  const ctx = canvas.getContext('2d');
  const { W, H } = { W: canvas.width, H: canvas.height };
  const {
    colors = ['#0B5FDE', '#4D8FE8', '#4DA3FF'],
    numWaves = 4,
    t = 0,
    opacity = 0.05,
  } = opts;

  ctx.clearRect(0, 0, W, H);

  for (let w = 0; w < numWaves; w++) {
    const freq  = 0.008 + w * 0.004;
    const amp   = 30 + w * 15;
    const phase = (w * Math.PI * 0.7) + t * (0.3 + w * 0.1);
    const y0    = H * (0.2 + w * 0.18);

    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) {
      const y = y0
        + Math.sin(x * freq + phase) * amp
        + Math.sin(x * freq * 1.7 + phase * 0.5) * (amp * 0.4);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.strokeStyle = colors[w % colors.length];
    ctx.lineWidth   = 1.5;
    ctx.globalAlpha = opacity - w * 0.008;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
```

### Ripple illustration (for concept sections)

Use expanding circular arcs from an origin point to represent a feature change propagating outward through module, capability, and app boundaries. Animate with `requestAnimationFrame`. Draw vertical dashed boundary lines labeled `module`, `capability`, `app`.

---

## 7. Tone & Voice

### How CTX Frame speaks

- **Declarative, not promotional.** States truths. Doesn't describe features.
- **Equal to the engineer.** Never condescending. Assumes intelligence.
- **Principles cited as laws.** Short sentences with full weight.
- **Questions that open, not close.** Makes the reader pause.
- **Metaphors that are technically accurate.** `ripple`, `anchor`, `boundary`, `learned`.

### Copy patterns

```
✓  "Context is not documentation. Context is the structure that allows speed without collapse."
✗  "CTX Frame helps you add context to your codebase for better AI understanding."

✓  "What does your codebase remember about why it exists?"
✗  "Want to write better code? Try CTX Frame today."

✓  "Speed without coherence is failure."
✗  "Streamline your development workflow with powerful context tools."
```

### Words to use
`context · intent · ripple · boundary · guardrail · learned · coherence · trace · signal · anchor · deliberate · discipline · compounding · evolve · scaffold`

### Words to never use
`seamless · powerful · intuitive · game-changer · leverage · synergy · streamline · unlock · easy · smart · AI-powered (as a feature name) · revolutionary (as adjective)`

---

## 8. Logo & Wordmark

### Primary wordmark

```
CTX Frame
```

- `CTX` — DM Sans Bold, `--ink`
- `Frame` — DM Sans Regular, `--graphite`
- The weight contrast is intentional. CTX carries the weight. Frame gives it structure.

### Monogram (favicon, app icon, tight contexts)

```
ctx
```

- JetBrains Mono Bold, lowercase, `--signal` color
- Used when the wordmark doesn't fit

### Tagline (optional, below wordmark)

```
Context before code.
```

- DM Sans Light Italic, `--signal`

### Clear space
Minimum clear space around wordmark = height of the letter "C".

### Never
- Stretch, rotate, or apply effects to the wordmark
- Place wordmark on a `--signal` background
- Change the font of either word
- Use the tagline without the wordmark

---

## 9. What Not to Do

### Visual

- ❌ Pure white `#FFFFFF` as page background
- ❌ More than one accent color
- ❌ `--signal` as a decorative fill or gradient
- ❌ `border-radius` on primary buttons and containers — CTX Frame uses sharp edges
- ❌ Drop shadows on primary elements
- ❌ Glassmorphism, blur backgrounds, or frosted panels
- ❌ Gradient meshes as backgrounds (waves replace this role)
- ❌ Centered body text
- ❌ More than two font sizes in a single UI card
- ❌ Animations faster than `0.2s` transition or waves faster than `0.01` t-increment

### Copy

- ❌ Marketing language that could apply to any developer tool
- ❌ Explaining CTX Frame by listing features
- ❌ Talking down to the engineer
- ❌ Using "powerful", "seamless", or "intuitive"
- ❌ Exclamation marks in UI copy

### Structure

- ❌ Compressing vertical spacing to fit more content — let sections breathe
- ❌ Using borders as decoration — borders are structural only
- ❌ Adding elements that don't serve a clear information purpose

---

## 10. Quick Reference Card

```
Background:   #F7F5F0  (--paper)
Text:         #0D0D0D  (--ink)
Body text:    #4A4A4A  (--lead)
Labels:       #8A8A8A  (--graphite)
Borders:      #D0CBC0  (--rule)
Accent:       #0B5FDE  (--signal)  ← one per screen, never decorative
Accent bg:    #E8F2FF  (--signal-light)

Display font: DM Sans 700, -0.03em tracking
Body font:    DM Sans 400, 1.7 line-height
Code font:    JetBrains Mono 400-500

Base unit:    8px
Max width:    800px (reading) / 1200px (layout)
Section gap:  80–120px

Wave opacity: 0.03–0.06 (background) / full (protagonist)
Wave speed:   0.003–0.01 t-increment / frame
```

---

*CTX Frame Brand Guidelines · v1.0 · February 2026*
*Context before code.*