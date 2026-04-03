# Build Guild Tanta Website

Static marketing site for the Build Guild Tanta event, built with Astro and Tailwind.

## Stack

- Astro (static output)
- Tailwind CSS v4
- Hack Club CSS theme stylesheet from css.hackclub.com
- Hack Club icons set via icons.hackclub.com API

## Run Locally

1. Install dependencies:
	npm install
2. Start dev server:
	npm run dev
3. Build production site:
	npm run build
4. Preview build:
	npm run preview

## Content Editing

All event content is centralized in:

- src/content/event.json

Update this JSON to change:

- Event title, tagline, date, time, venue
- Organizer info
- Navigation labels
- Section headings/subtitles
- Activities, schedule, FAQ
- Registration/open state and external registration URL

## Important Rules

- Do not hardcode event details inside section components.
- Keep branding colors aligned to Blueprint palette defined in global styles.
- Use Phantom Sans for body text.
- RC Guidelines files should be placed in public/fonts:
  - RCGuidelines.woff2/.woff
  - RCGuidelinesDark.woff2/.woff
  - RCGuidelinesLight.woff2/.woff
  - RCGuidelinesEmpty.woff2/.woff
- Use Hack Club logos exactly as provided from assets.hackclub.com.