# Prowalk Tours website

Destination-first, searchable archive of Isaac (Ike) Harjo's Prowalk Tours
walking-tour videos, plus country/region/city travel guides and a footage
licensing hub. Live at https://www.prowalktours.com (Next.js on Vercel).
Pushing to `main` deploys to production.

## Commands
- Dev server: `npm run dev`
- Build (must pass before any commit): `npm run build`
- Lint only the files you changed: `npx eslint <files>`. The full
  `npm run lint` has pre-existing errors; don't add new ones.
- Tour/Christmas data checks: `node scripts/test-tour-data.cjs`
- Route smoke check: `npm run build && npx next start -p 3001`, then
  `node scripts/smoke-launch.cjs`

## Git and deploy
- Keep work and commits local. Push or deploy only when Ike asks in the
  current session.
- Stage specific files, never `git add .`. The working tree holds untracked
  drafts, briefs and private review material.
- Commit data-file changes (CSV, JSON, data `.ts`) promptly. An uncommitted
  rename once broke a Vercel deploy.
- Don't change DNS, domain, email, or Squarespace settings.

## Tour data
- The Google Sheet `Prowalk_Tours_Master_Maps` is the source. Repo CSVs
  (`data/maps/*.csv`, `data/import/all-highlights.csv`) are exports of it.
  When you fix an export, tell Ike the same fix is needed in the Sheet, or
  the next export reverts it.
- Never round-trip CSVs through Excel. After importing a Sheets export, run
  `node scripts/fix-encoding.js` to repair mojibake.
- `tour_id` is permanent. Slugs must match exactly across the CSV,
  `app/videos/<slug>/` and `public/<slug>/`.
- `all-highlights.csv` is the single site-wide timestamp search index for all
  countries. Never split it per country.
- Search, autocomplete and maps read `lib/tours/server.ts`
  (docs/shared-tour-data.md). Its full collection includes drafts: only pass
  `discoveryVideos` / `worldTours` to client components.
- `data/video-details/<slug>.ts` files are hand-enriched. Never run
  `scripts/refresh-highlights.js` on a page whose highlights already have
  images or descriptions. It wipes them.
- Fixes to generated video pages must also go into
  `scripts/generate-video-page.js`, or the next regeneration silently
  reverts them.
- Before bulk generation, validate the CSV (URL columns hold URLs, dates
  are dates, lat/long numeric, slugs normalized) and list every problem
  before changing anything.

## Page conventions
- `page.tsx` stays a server component (metadata + JSON-LD). Interactivity
  lives in a separate `"use client"` component.
- JSON-LD: plain `<script type="application/ld+json">` with
  `stringifyJsonLd()` from `lib/seo/jsonLd.ts`, not `next/script`
  (non-JS scrapers can't see it).
- Never enable YouTube autoplay. Binaural audio is the brand; `?t=` links
  only seek.
- Highlight cards that contain `HighlightCarousel` use
  `<div role="button" tabIndex={0}>` with Enter/Space handling, never
  `<button>` (nested buttons cause hydration errors).
- Tailwind only, no inline styles. Read tour data from data files; don't
  hardcode it.
- New maps use Mapbox, not Google My Maps embeds. Mapbox popups use
  `setText`, never `setHTML`.
- Never show a plain-text email address on a page.
- Image filenames: lowercase and hyphenated, no spaces. Run the image audit
  in docs/adding-a-tour.md before committing a page.
- When the task is a fix, don't redesign the page.

## Writing voice (all public copy, alt text, metadata and map notes)
- Write as Isaac, in the first person. Never refer to him in the third person.
- Warm, practical and conversational, with no promotional filler.
- Only describe experiences and recommendations Isaac has supplied or his
  material supports. Never invent a memory; ask when it's missing.
- Brand name is "Prowalk Tours" (registered trademark), never "ProWalk".
- Tagline: "Prowalk Tours — Your first step before you travel." Supporting
  line: "Explore through my walks. Plan a journey of your own."
- Destination guides open with a short personal take
  (`components/guides/DestinationPersonalTake.tsx`) drawn from Isaac's notes.

## Media
- Download a video locally before extracting frames. Never seek remote
  streams (`scripts/fetch-highlight-images.js` does this correctly).
- The final exported masters are graded Rec.709 SDR. Don't tone-map stills
  pulled from them.
- Licensing camera specs (lens, color profile) vary by tour. Confirm them per
  tour; the generator's defaults are only a fallback.

## Where to look
- Adding or publishing a tour, end to end: docs/adding-a-tour.md (read it
  first)
- Shared tour data loader: docs/shared-tour-data.md
- Christmas markets hub: docs/christmas-markets-hub.md
- Launch status, Squarespace URL inventory, redirect candidates:
  docs/launch-checklist.md
- Past work: `git log`. Record session notes in commit messages, not here.

## Done means
Build passes, data checks pass, lint is clean on the changed files, changed
pages are checked at desktop and mobile widths, and you list every file you
changed.
