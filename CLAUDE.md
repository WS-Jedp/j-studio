# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint checks
```

> Note: The Next.js config ignores TypeScript and ESLint errors during builds (`ignoreBuildErrors: true`).

## Architecture

**J-Studio** is a personal portfolio website for Juan Esteban Deossa, built with Next.js 15 App Router, React 19, and TypeScript.

### Routing

All routes live under `src/app/[locale]/` for internationalization (English `en` / Spanish `es`). The `middleware.ts` uses `next-intl` to intercept requests and inject locale. Routes include:
- `/` — Main portfolio page
- `/jobs/*` — Per-company job detail pages (beereaders, certiblock, ematchile, ematchile-v2)
- `/coffi-project/*` — Coffi project showcase pages (one-pager, for-business, deck, coworking-2.0)
- `/ctx-frame/*` — CTX Frame project pages
- `/learning/*` — Certification pages (worldskills, platzi-master)

Some pages are password-protected via a `confidentialMiddleware` container. The password is read from `NEXT_PUBLIC_EMAT_CHILE_PASSWORD` (see `.env.example`).

### Component Layers

- **`src/components/`** — Atomic/reusable UI (cards, cursor, loader, scroll progression, animation primitives)
- **`src/containers/`** — Page section containers that compose components (introduction, job-experience, about-j, coffi-project, skillsAndTools, contact)
- **`src/data/`** — Static typed data arrays for jobs (`JobCardProps[]`) and skills
- **`src/hooks/`** — `useParallax.ts` (scroll-driven transforms), `useMediaQuery.ts`

### Main Page Layout

`[locale]/page.tsx` is a `"use client"` component with a two-column layout:
- **Left column** — `<AboutJ />` sidebar (sticky header info)
- **Right column** — `<Introduction />`, `<JobExperience />` (horizontal scroll), `<JPersonalInformation />`
- **Full-width below** — `<CoffiProject />`, `<CTXFrame />`, `<SkillsAndTools />`, `<Contact />`

Scroll position (hardcoded pixel breakpoints: 800 / 1600 / 2400 / 3200) drives `activeSection` state, which selects the `CosmicBackground` color scheme (`blue-purple` → `cyan-blue` → `purple-pink` → `emerald-cyan` → `blue-purple`).

### Internationalization

Translations are JSON files under `src/i18n/messages/{en,es}/`, one file per feature. All messages are registered in `src/i18n/utils/index.ts` inside `loadMessages()` — **new message files must be imported and added to the returned object there**, then provided via `NextIntlClientProvider` in the layout. All user-facing strings must have entries in both `en/` and `es/`.

### Styling

- Tailwind CSS 4 with PostCSS — utility classes everywhere
- Custom theme tokens defined in `src/app/globals.css` using CSS custom properties (`--color-j-*`, `--color-coffi-*`)
- Custom SF Pro font loaded via `@font-face` (9 weights in `public/assets/fonts/`)

### Animations

- Framer Motion (`motion` package) drives scroll-driven parallax and staggered reveals
- `src/components/cosmic-background/` renders a Canvas-based animated starfield; accepts `colorScheme` (`blue-purple` | `cyan-blue` | `purple-pink` | `emerald-cyan`) and `intensity` (`low` | `medium` | `high`) props

### Path Aliases

`@/` maps to `src/` (configured in `tsconfig.json`).
