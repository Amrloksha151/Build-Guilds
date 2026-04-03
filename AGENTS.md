# AGENTS.md — Build Guild Tanta Event Site
> Guidelines for GitHub Copilot and all AI agents working on this codebase.
> Read this file in full before touching any code.

---

## 📌 Project Overview

This is the **Build Guild Tanta** event website — a local hardware meetup organized under
[Blueprint by Hack Club](https://blueprint.hackclub.com/guilds), taking place in **Tanta, Gharbia, Egypt**.

The event is a partnership between:
- **Gharbiya STEM Hack Club** (the local Hack Club branch)
- **Gharbiya STEM Robo Club** (the robotics club co-organizing the event)

The site is scoped to a single city guild page, modeled structurally after `blueprint.hackclub.com/guilds`,
but branded for the Tanta event and enriched with local identity. Event details (date, venue, schedule,
activities) are **TBD** and must be loaded from a content config so they can be filled in later without
touching component code.

---

## 🛠 Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Astro](https://astro.build) (latest stable) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [@hackclub/icons](https://icons.hackclub.com) — **only this icon set** |
| UI Components | [Hack Club Theme](https://theme.hackclub.com) / [hackclub/css](https://github.com/hackclub/css) — **only these** |
| Fonts | Phantom Sans (Hack Club brand font) — **only this font** |
| Deployment | TBD (assume static output, `output: 'static'`) |

> ⚠️ **Do NOT introduce any other icon libraries (Heroicons, Lucide, FontAwesome, etc.).**
> ⚠️ **Do NOT introduce any other UI component libraries (shadcn, DaisyUI, Flowbite, etc.).**
> ⚠️ **Do NOT use system fonts or Google Fonts.** All typography must use Phantom Sans.

---

## 🎨 Brand & Styling Guidelines

### Color Palette

These are the **only** colors to use — derived directly from the Blueprint style guide. Reference them via CSS custom properties.

```css
/* ── Blueprint Brand Colors ──────────────────────────────── */
--color-dark:    #0E305B;   /* Deep navy — primary background */
--color-darker:  #081C35;   /* Deeper navy — card/overlay bg  */
--color-light:   #DBE4EE;   /* Off-white — light surfaces     */

/* ── Semantic States ─────────────────────────────────────── */
--color-danger:  #FE8E86;   /* Danger / error — coral red     */
--color-warning: #FFC857;   /* Warning / caution — amber      */
--color-success: #A8F0AE;   /* Success / confirmation — mint  */
```

Text colors per the style guide:
- On `--color-dark` / `--color-darker` → **white text**
- On `--color-light` → **light text** (dark navy, e.g. `--color-darker`)
- On `--color-danger` → text in `--color-danger`
- On `--color-warning` → text in `--color-warning`
- On `--color-success` → text in `--color-success`

In Tailwind config extend these as custom colors so they're available as `bg-dark`, `bg-darker`, `bg-light`, `text-danger`, etc.

> ⚠️ **No Hack Club brand colors** (`#ec3750`, `#ff8c37`, `#33d6a6`, etc.) — do not use them. Blueprint has its own palette and that is the only source of truth for color on this site.

### Typography

Two fonts are used — one for headings, one for body. No other fonts are permitted.

#### Display / Heading Font — R&C Guidelines (by JBFoundry)

**R&C Guidelines** is the heading font. It is a geometric, grid-based display font with a technical
drafting / blueprint aesthetic — characters are constructed with compass-and-ruler construction lines
visible beneath the letterforms.

The font has four variants shown in the style guide:
| Variant | Use case |
|---|---|
| **Full** (`R&C Guidelines`) | Primary hero headings, section titles — fully opaque white |
| **Dark** (`R&C GuidelinesDark`) | Subheadings on dark backgrounds |
| **Light** (`R&C GuidelinesLight`) | Decorative / ghosted headings, layered behind content |
| **Empty** (`R&C GuidelinesEmpty`) | Outline-only / hollow headings for decorative use |

**Licensing:** R&C is free for personal/demo use. The commercial license is at
`myfonts.com/fonts/jbfoundry/r-c/`. For this project, self-host the font files in
`public/fonts/` and declare them via `@font-face` in `src/styles/global.css`:

```css
/* R&C Guidelines — Full (primary headings) */
@font-face {
  font-family: 'RC Guidelines';
  src: local('R&C Guidelines'),
       url('/fonts/RCGuidelines.woff2') format('woff2'),
       url('/fonts/RCGuidelines.woff')  format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
/* Add additional @font-face blocks for Dark, Light, Empty variants
   using font-family names 'RC Guidelines Dark', 'RC Guidelines Light', 'RC Guidelines Empty' */
```

> 🔑 **TODO for project lead**: Download the font files from dafont.com/r-c.font or purchase the
> commercial license from myfonts.com/fonts/jbfoundry/r-c/, place `.woff` and `.woff2` files in
> `public/fonts/`, and remove this TODO once done.

In Tailwind config, extend `fontFamily`:

```js
fontFamily: {
  display: ['"RC Guidelines"', 'sans-serif'],
  'display-dark':  ['"RC Guidelines Dark"',  'sans-serif'],
  'display-light': ['"RC Guidelines Light"', 'sans-serif'],
  'display-empty': ['"RC Guidelines Empty"', 'sans-serif'],
  sans: ['"Phantom Sans"', 'system-ui', 'sans-serif'],
},
```

Apply as `font-display` on `h1`/`h2` in the global base layer, and `font-sans` everywhere else.

#### Body Font — Phantom Sans (Hack Club brand font)

Load all three weights from Hack Club's asset CDN:

```css
@font-face {
  font-family: 'Phantom Sans';
  src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2') format('woff2'),
       url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff')  format('woff');
  font-weight: normal; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Phantom Sans';
  src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff2') format('woff2'),
       url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff')  format('woff');
  font-weight: normal; font-style: italic; font-display: swap;
}
@font-face {
  font-family: 'Phantom Sans';
  src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff2') format('woff2'),
       url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff')  format('woff');
  font-weight: bold; font-style: normal; font-display: swap;
}
```

#### Typography Scale

```
h1            → font-display,      text-5xl–7xl, font-normal, tracking-wide, uppercase
h2            → font-display,      text-3xl–5xl, font-normal
h3            → font-display-dark, text-2xl–3xl, font-normal
h4+, labels   → font-sans bold,    text-base–xl
body          → font-sans,         text-base, leading-relaxed
small/caption → font-sans,         text-sm, text-muted
```

### Visual Style — Blueprint Aesthetic

The look is an engineering/blueprint drafting aesthetic: dark navy backgrounds, white fine-rule lines
(like graph paper), and bright accent colors. Think: "technical drawing brought to life."

Rules to follow:
- **Background**: Always `--color-dark` (`#0E305B`) as the page background.
- **Blueprint grid**: A subtle CSS background-image grid using thin white lines at low opacity
  (`rgba(255,255,255,0.05)`) should be present on hero/section backgrounds to evoke blueprint paper.
- **Card surfaces**: Use `--color-darker` (`#081C35`) with a `1px solid rgba(255,255,255,0.1)` border.
- **Headings**: Bold, uppercase or sentence-case, `color: white`. Large display headings should use
  the Blueprint-style outlined/stroked text effect (CSS `-webkit-text-stroke` or SVG text) where
  appropriate for hero sections.
- **Accent color**: `--color-warning` (`#FFC857`) is the primary CTA/highlight accent on dark backgrounds. Use `--color-success` (`#A8F0AE`) for confirmations and `--color-danger` (`#FE8E86`) for errors/alerts only.
- **Buttons**: Solid white background, dark navy text (`--color-darker`) for primary CTAs. Outlined variant: `1px solid white`, transparent background, white text. No other button color schemes.
  Hover state: slight brightness increase (`hover:brightness-110`).
- **Section dividers**: Use horizontal rules styled as dashed or dotted white lines at low opacity,
  not solid full-opacity lines.

---

## 🖼 Logos & Assets

### Primary Logo (Temporary)

Use the official Hack Club flag logo from the asset CDN until the event logo is finalized:

```html
<!-- Preferred: Flag with Orpheus on top -->
<img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="Hack Club" />

<!-- Fallback: standalone flag -->
<img src="https://assets.hackclub.com/flag-standalone.svg" alt="Hack Club" />

<!-- Icon only (for favicon / small contexts) -->
<img src="https://assets.hackclub.com/icon-rounded.svg" alt="Hack Club" />
```

### Partner Logos

Placeholder components must be created for:
1. `GharbiyaSTEMHackClubLogo` — to be replaced when asset is provided
2. `GharbiyaSTEMRoboClubLogo` — to be replaced when asset is provided

Use a styled placeholder div with the org name until real assets arrive. Mark with `TODO: replace with
actual logo asset`.

### Logo Usage Rules

- Never distort, recolor, or add effects to Hack Club logos.
- Never place a Hack Club logo on a background that makes it hard to read.
- Always link the Hack Club logo to `https://hackclub.com`.

---

## 🗂 Site Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro          # Top nav with HC logo + guild name
│   │   └── Footer.astro          # Partners, HC attribution, links
│   ├── sections/
│   │   ├── Hero.astro            # Full-width hero with event name, date (TBD), CTA
│   │   ├── About.astro           # What is a Build Guild? overview
│   │   ├── Partners.astro        # Co-organizer logos + descriptions
│   │   ├── Schedule.astro        # Timeline / agenda (data-driven, TBD)
│   │   ├── Activities.astro      # What to expect / activity cards (data-driven)
│   │   ├── Venue.astro           # Venue info + map embed placeholder
│   │   ├── FAQ.astro             # Accordion FAQ (data-driven)
│   │   └── SignupForm.astro      # Attendance sign-up form
│   └── ui/
│       ├── Button.astro          # Reusable button component
│       ├── Card.astro            # Blueprint-styled card
│       ├── Badge.astro           # Status/label badge
│       └── SectionHeading.astro  # Consistent section title treatment
├── content/
│   └── event.json                # ALL event details live here (see below)
├── layouts/
│   └── Base.astro                # HTML shell, font loading, meta tags
├── pages/
│   └── index.astro               # Main page assembling all sections
└── styles/
    └── global.css                # Font-face declarations, CSS custom properties
```

---

## 📄 Content Configuration — `src/content/event.json`

**All dynamic/TBD content must be sourced from this file.** Never hardcode event specifics in
component markup. This is the single source of truth.

```jsonc
{
  "event": {
    "name": "Build Guild Tanta",
    "tagline": "TBD",
    "date": null,              // ISO 8601 string, e.g. "2025-04-15" — null = TBD
    "time": null,              // e.g. "10:00 AM – 6:00 PM EET" — null = TBD
    "venue": {
      "name": null,            // e.g. "Gharbiya STEM School" — null = TBD
      "address": null,
      "city": "Tanta",
      "governorate": "Gharbia",
      "country": "Egypt",
      "mapEmbedUrl": null      // Google Maps embed URL — null = TBD
    },
    "registrationOpen": false, // Toggle to true when form goes live
    "registrationUrl": null    // External form URL if not using built-in form
  },
  "organizers": [
    {
      "id": "hackclub-gharbiya",
      "name": "Gharbiya STEM Hack Club",
      "description": "The Hack Club chapter at Gharbiya STEM School.",
      "logoAsset": null,       // path to local asset — null uses placeholder
      "url": null
    },
    {
      "id": "robo-gharbiya",
      "name": "Gharbiya STEM Robo Club",
      "description": "The robotics club at Gharbiya STEM School.",
      "logoAsset": null,
      "url": null
    }
  ],
  "schedule": [],              // Array of { time, title, description } — empty = hidden section
  "activities": [],            // Array of { icon, title, description } — empty = show default set
  "faq": []                    // Array of { question, answer } — empty = hidden section
}
```

### TBD Handling Rules

When a field is `null` or an array is empty:
- **Dates/times**: Render `"Coming Soon"` with a `--color-warning` badge, NOT `"null"` or blank.
- **Venue**: Render `"Venue to be announced"` as a muted placeholder.
- **Empty arrays** (schedule, faq): **Hide the entire section** — do not render an empty shell.
- **Registration closed** (`registrationOpen: false`): Show a "Get Notified" email capture instead
  of the full sign-up form.

---

## 🧩 Component Conventions

### Astro Components

```astro
---
// Props must be typed with TypeScript interfaces
interface Props {
  title: string;
  variant?: 'full' | 'dark' | 'light';
}
const { title, variant = 'full' } = Astro.props;
---
```

- Prefer `.astro` components for static/layout content.
- Use `.tsx` only if the component needs client-side interactivity (`client:load` / `client:visible`).
- Never use `client:load` for above-the-fold decorative elements — defer everything possible.

### Hack Club Icons

Import from the `@hackclub/icons` package:

```astro
---
import Icon from '@hackclub/icons'   // if using React island
// OR inline SVG from https://icons.hackclub.com
---
```

Reference icons at https://icons.hackclub.com — browse by name. Only use icons from this set.
Common useful icons for this project: `hardware`, `bolt`, `clubs`, `flag`, `map`, `calendar`,
`clock`, `person`, `email`, `slack`, `github`, `external`.

### Tailwind Usage

- Use Tailwind utility classes directly in markup — no custom CSS unless strictly necessary.
- Extend `tailwind.config.mjs` with the brand colors (mapped from CSS vars above).
- Use `@apply` sparingly; prefer inline utilities.
- Responsive breakpoints: mobile-first. Key breakpoints: `sm` (640px), `md` (768px), `lg` (1024px).

---

## ✨ UI Patterns to Follow (from blueprint.hackclub.com)

| Pattern | Implementation |
|---|---|
| Large hero with centered headline + subtext + CTA button | `Hero.astro` |
| Alternating two-column sections (text + image) | `About.astro`, `Venue.astro` |
| Icon + title + text activity/feature cards in a 3-col grid | `Activities.astro` |
| Step-by-step numbered list for organizer flow | `About.astro` |
| Photo grid / event gallery | `Gallery.astro` (create when assets arrive) |
| Sticky top navbar with logo left, links right | `Navbar.astro` |
| Footer with partner logos and HC attribution | `Footer.astro` |

---

## 🚫 Hard Rules — Never Do These

1. **No other fonts** — R&C Guidelines for headings (h1/h2/h3), Phantom Sans for body. Nothing else, ever.
2. **No other icon sets** — @hackclub/icons only.
3. **No other component libraries** — Hack Club Theme / CSS only.
4. **No hardcoded event details** — everything goes through `event.json`.
5. **No `null` or `undefined` rendered to DOM** — always have a graceful TBD fallback.
6. **No inline styles for colors** — use Tailwind classes or CSS custom properties.
7. **No white/light backgrounds** — the site is dark-navy only.
8. **No distortion of Hack Club logos** — use them as-is from the CDN URLs above.
9. **No external image CDNs** for decorative assets — SVG/CSS preferred for decorative elements.
10. **No `console.log` left in production code** — use `// TODO:` comments for debug markers.

---

## ✅ Copilot Collaboration Checklist

Before submitting any code suggestion, verify:

- [ ] All text content that could change is sourced from `event.json`
- [ ] Colors used are from the defined palette only
- [ ] Font family is Phantom Sans (no Google Fonts import added)
- [ ] Icons are from @hackclub/icons only
- [ ] TBD/null fields have proper fallback UI
- [ ] Component has TypeScript prop types defined
- [ ] No `client:load` on decorative/non-interactive components
- [ ] Tailwind classes follow mobile-first pattern
- [ ] Hack Club logo links to `https://hackclub.com`
- [ ] No hardcoded event dates, venue names, or schedule data in markup

---

## 🔗 Key Reference Links

| Resource | URL |
|---|---|
| Hack Club Brand Guide | https://hackclub.com/brand |
| Hack Club Icons | https://icons.hackclub.com |
| Hack Club Theme | https://theme.hackclub.com |
| Hack Club CSS (GitHub) | https://github.com/hackclub/css |
| Blueprint reference site | https://blueprint.hackclub.com/guilds |
| Hack Club Assets CDN | https://assets.hackclub.com |
| Phantom Sans (Regular) | https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2 |
| HC Flag Logo (SVG) | https://assets.hackclub.com/flag-orpheus-top.svg |

---

*Last updated by: project lead — update this line when you modify this file.*
*Agents: if you modify this file, preserve all sections and append a changelog entry at the bottom.*

---

## 📝 Changelog

| Date | Author | Change |
|---|---|---|
| 2026-03-30 | Project lead | Initial AGENTS.md created |
