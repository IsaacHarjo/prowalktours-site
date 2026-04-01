# Prowalk Tours Website — Project Brief for Claude Code

## What This Project Is
A website for the **Prowalk Tours YouTube channel**, functioning as a
destination-first, searchable archive of walking tour videos from around
the world. It is NOT a generic creator website — it is designed to feel
like a clean travel/documentary platform built around discovery,
research, and licensing.

- **Dev URL:** https://prowalktours-site.vercel.app
- **Final URL:** https://www.prowalktours.com (switch when complete)
- **Deployed on:** Vercel (auto-deploys on every git push)
- **Local path:** D:\Projects\prowalktours-site

## The Three Jobs of This Website
1. **Find a video fast** — search by place, landmark, theme
2. **Research a destination** — browse country → region → city → video
3. **Contact/license footage** — professional licensing hub

## YouTube Channel
- Channel: Prowalk Tours — first-person 4K walking tours worldwide
- Walking tours across **24 countries** (data entered for Italy + France so far)
- The site should give older videos new life through search and
  destination browsing, and serve as a serious business asset

---

## Tech Stack
- **Next.js** (App Router)
- **TypeScript** (.tsx files throughout)
- **Tailwind CSS** — all styling, no inline styles ever
- **CSV / TypeScript data files** for tour data
- **Mapbox GL JS** — interactive maps
- **Vercel** — deployment (auto-deploys on git push)
- **Git** — version control

---

## Master Data Source — Google Sheets
Source of truth: **Prowalk_Tours_Master_Maps** Google Sheet

### Sheets
- **Italy** — 373 tours — data complete ✓
- **France** — 46 tours — data complete ✓
- **22 other countries** — tours exist on YouTube, data NOT yet entered
- **highlights** — timestamped landmark highlights per tour
- **all_tours** — auto-combined view of all country sheets
- **Schema** — rules and column definitions

### Data Schema (every tour has these fields)
- `tour_id` — permanent unique ID (e.g. it-0001, fr-0002) — NEVER change
- `country`, `region`, `city`, `location` — geography hierarchy
- `title` — public-facing video title
- `slug` — URL slug (e.g. antibes-daytime-walk-2025) — must be unique
- `slug_override` — manual slug when formula result needs fixing
- `video_type` — day-walk | evening-walk | bike-tour | scooter-tour |
  drone-tour | boat-tour | 360-tour | drive-tour | hike
- `themes` — comma-separated tags (e.g. coastal, historic-center,
  christmas-market, old-town, world-heritage-site)
- `filmed_date_iso`, `filmed_year`
- `youtube_url` — YouTube embed link
- `map_url` — Google My Maps link (temporary until Mapbox built)
- `latitude`, `longitude` — tour START point (used for Mapbox markers)
- `distance_label`, `distance_miles`, `distance_km`
- `duration_label`, `duration_seconds`
- `description_short` — one sentence for cards/popups
- `description_long` — full description for tour page
- `landmarks` — comma-separated landmark list
- `keywords` — SEO keywords
- `status` — draft | ready | published
- `thumbnail_path` — image path for tour card

### Highlights Schema (timestamped landmarks per tour)
- `highlight_id`, `tour_id` — links back to parent tour
- `time_label`, `seconds` — timestamp in video
- `highlight_title`, `landmark` — display name
- `search_terms` — for search functionality

---

## Site Architecture — Browse Hierarchy
**Country → Region → City/Location → Individual Video Page**

Users browse by PLACE, not by year or upload order. Navigation and
homepage push users toward this geographic structure.

### Key Data Files
- `data/videos/italy.ts` — Italy tour data
- `data/video-details/[slug].ts` — detailed data per video page
- Always read actual data files — never hardcode tour information

---

## Page Architecture Rules — ALWAYS Follow These

### Server + Client Component Split (CRITICAL)
Every page MUST be split into two components:
- **`page.tsx` = Server Component**
  - Exports `metadata` (title, description, Open Graph tags)
  - Includes JSON-LD structured data (BreadcrumbList, VideoObject)
  - Imports and renders the Client Component
  - NEVER add "use client" to page.tsx
- **`[PageName]Client.tsx` = Client Component**
  - Has "use client" at top
  - Handles all interactivity: video embeds, maps, highlight seeking
  - Handles all UI rendering

### Why This Matters
Putting "use client" or interactive code in page.tsx **completely breaks
Next.js metadata and SEO**. This is the #1 architectural rule.

### Correct Example Pattern
```
app/videos/avignon-walking-tour-2025/page.tsx         ← server
app/videos/avignon-walking-tour-2025/AvignonClient.tsx ← client
```

Pages following the correct pattern (use these as templates):
- `app/videos/paris-evening-walk-2022/page.tsx`
- `app/videos/avignon-walking-tour-2025/page.tsx`
- `app/videos/antibes-daytime-walk-2025/page.tsx`
- `app/videos/menton-france-walking-tour-2025/page.tsx`

---

## Individual Walk Page Structure (Standard Template)
Every finished video page must follow this structure in order:
1. **Hero section** — title, location, filmed date
2. **Top stats row** — distance, duration, video type
3. **YouTube video embed**
4. **Highlights** — timestamped landmark list (clickable to seek video)
5. **Route map** — Mapbox (or Google My Maps temporarily)
6. **Licensing hub** — for professional/media use inquiries
7. **Related tours** — nearby or thematic recommendations
8. **Stay-connected section** — YouTube subscribe, newsletter etc.

---

## Map Strategy

### Current State
- **Italy:** Mapbox interactive map — DONE ✓ (use as the template)
- **France:** Google My Maps embeds currently — Mapbox to be built
- **22 other countries:** Google My Maps — Mapbox maps to be built
  as country data is added one by one

### To Be Built
- **Per-country Mapbox maps:** One per country showing all tour markers
  - Use `latitude`/`longitude` from data for markers
  - Clicking a marker shows tour card with `description_short`
  - Follow Italy Mapbox implementation as the pattern
- **World browse map:** Single global Mapbox map showing ALL tours
  across all 24 countries — visitors can explore the globe to find walks
  - Build after several per-country maps are complete

### Mobile Map Fix (Already Decided)
Replace shallow `aspect-[16/9]` map containers with:
```
className="w-full h-[420px] sm:h-[480px] lg:h-auto lg:aspect-[16/9]"
```
Apply this to Italy first, then reuse on France, and all future country
pages. Reduce `px-6` to `px-4 sm:px-6` on mobile for map sections.

---

## Search Functionality
- Search normalizes for punctuation AND accents (already implemented)
- e.g. "notre dame" matches "Notre-Dame", "hotel" matches "Hôtel"
- Goal: search should surface specific landmarks AND timestamps
- Users should be able to search "Catacombs" or "Rue des Rosiers" and
  land on the right video page
- Future: filter by country, region, city, video_type in order

---

## Countries & Data Status
- **Total countries with YouTube tours:** 24
- **Data entered in master sheet:** Italy (373 tours), France (46 tours)
- **Remaining 22 countries:** Data entry not yet started
- Do not build pages for a country until its data is in the master sheet
  and exported — confirm with user before starting a new country

### Known Countries with Pages or Partial Work
(Read app/destinations/ directory for current list)
- Italy ✓ — destination page + many video pages
- France ✓ — destination page + video pages being built
- Croatia — mentioned in mobile map fix notes (page exists?)
- Slovenia — mentioned in mobile map fix notes (page exists?)
- Germany — mentioned in mobile map fix notes (page exists?)
- USA — mentioned in mobile map fix notes (page exists?)

---

## France — Key Performance Insights (Use for Page Strategy)
From YouTube Studio analysis — use these insights when writing
descriptions, choosing featured content, and structuring France pages:

- **Paris (Night/Evening):** Highest total views, drives new subscribers
- **Alsace Christmas Markets** (Colmar, Strasbourg, Riquewihr):
  Highest avg. view duration (~26 min), highest returning viewer rates
  (~84-92%). Evergreen appeal year-round, not just December.
- **French Riviera** (Menton, Antibes): Fastest growing satisfaction,
  strong returning viewer rates (~79%)
- **Old Town / Medieval themes:** High engagement, ~79% returning viewers
- **Paris Catacombs:** 90%+ likes-to-views ratio — niche = high satisfaction

### Recommended Browse Categories for France
- Christmas Markets / Winter (dedicated category — strong data)
- French Riviera & Coastal Towns
- Historic Centers & Old Towns
- Paris (day + night subcategories)

### Naming Strategy
Combine destination + theme: "Most Beautiful Medieval Town on the French
Riviera" outperforms plain "Walking in Menton" — themes drive retention.

---

## Pages Built So Far (France Video Pages)
Check app/videos/ directory for full current list. Known completed pages:
- menton-france-walking-tour-2025 ✓
- antibes-daytime-walk-2025 ✓
- avignon-walking-tour-2025 ✓
- paris-evening-walk-2022 ✓ (correct server/client pattern)
- paris-catacombs (completed — check slug)
- Next in queue: fr-0021 Paris Latin Quarter & Marais Evening Walk (2020)
- Then: fr-0018 Paris Landmarks Day (2017)
- Then: fr-0023 Luxembourg Gardens
- Then: fr-0024 Eiffel Tower Tour

---

## Known Issues — Fix These First
- **naples-daytime-walk-2023:** Still a full client page — SEO completely
  broken. Needs server/client split. Use this exact refactor:
  - `app/videos/naples-daytime-walk-2023/page.tsx` → server component
  - Create `app/videos/naples-daytime-walk-2023/NaplesDaytimeWalk2023Client.tsx`
  - Add: export metadata, BreadcrumbList JSON-LD, VideoObject JSON-LD
  - Keep all existing UI, video behavior, highlight seeking, route map,
    licensing hub, related tours, stay-connected section unchanged
  - Reference: `data/video-details/naples-daytime-walk-2023.ts`

- **Mobile map containers:** All country pages need the h-[420px] mobile
  fix described above. Start with Italy, then France, then others.

---

## Development Workflow
Before starting each session:
```
git status
npm run dev
```
If port 3000 is busy, Next.js will switch to 3001 automatically.

After every change:
```
git add [specific files]
git commit -m "descriptive message"
git push
```

Do NOT run `git add .` — always add specific files to keep commits clean.

---

## Codex / Claude Code Prompt Tips
When giving prompts for new video pages, always specify:
- Exact file paths to edit
- Reference pages to use as template
- "Do not edit any other file"
- "Show exact diff and list every file changed after editing"

---

## Highlight Images
- Location: public/[slug]/highlights/
- Naming convention: [city]-[landmark-description].jpg
  - Lowercase, hyphen-separated, no timestamp in filename
  - Example: avignon-pont-saint-benezet-bridge.jpg
  - NO trailing number suffix on new files
- Legacy note: Existing highlight images may or may not have
  a trailing 0 (e.g. bridge0.jpg) — this is a Premiere export
  artifact. Do not rename existing files. Do not replicate
  the 0 on any new images going forward.
- Script: scripts/fetch-highlight-images.js
  - Reads highlights data per tour slug
  - Downloads video once at lower quality, extracts all frames
    locally, then deletes temp file — much faster than seeking
    frame-by-frame in a remote stream
  - Names files using city + landmark fields, no trailing number
  - Saves to public/[slug]/highlights/
  - Skips any file that already exists (never overwrites)
  - Run one tour at a time:
    node scripts/fetch-highlight-images.js [slug]
  - Dry run first to preview filenames:
    node scripts/fetch-highlight-images.js [slug] --dry-run
  - After running, update imageSrc paths in
    data/video-details/[slug].ts to point to new filenames
- Requires: yt-dlp and ffmpeg installed and on PATH
  (both installed via winget on 2026-03-31)

## Security Rules

### Environment Variables
- .env.local must NEVER be committed to GitHub
- Verify .env.local is in .gitignore before every new key is added
- All API keys stored in Vercel environment variables dashboard
- YouTube API key (when added) must be server-side only, never client

### Mapbox Token Security
- Do NOT use the default Mapbox public token — it lacks security features
- Required scopes for our map (clustering, markers, popups, navigation):
  styles:read, fonts:read — also verify tiles:read is included if needed
- Our map features (clusters, zoom, marker clicks, popups) are all handled
  by Mapbox GL JS + our own data — no secret scopes needed
- Create SEPARATE tokens for each environment:
  - Production token: restricted to https://www.prowalktours.com
  - Dev token: restricted to https://prowalktours-site.vercel.app
- Store tokens in .env.local and Vercel environment variables dashboard
- Never hardcode Mapbox tokens in source code
- Check Mapbox usage at console.mapbox.com/account/statistics
- Mapbox GL JS popups: always use setText not setHTML to prevent XSS
- Rotate tokens immediately if any suspected misuse

### Mapbox Security Checklist
- [x] Create new restricted Mapbox token (styles:read, fonts:read only)
- [x] Add token to Vercel environment variables dashboard
- [ ] Confirm production token is restricted to https://www.prowalktours.com
- [ ] Create separate dev token restricted to prowalktours-site.vercel.app
- [ ] Update .env.local with new dev token
- [ ] Confirm .env.local is in .gitignore (Claude Code to verify in audit)
- [ ] Audit Mapbox popup code — use setText not setHTML
- [ ] Enable two-factor authentication on Mapbox account
- [ ] Add security headers to next.config.js (CSP, X-Frame-Options etc.)

### Contact/Licensing Forms (When Built)
- Must include rate limiting
- Must include CAPTCHA (Cloudflare Turnstile recommended — free)
- Never expose plain text email addresses on any page

## Things To NEVER Do
- Never add "use client" to page.tsx — this kills SEO metadata
- Never put metadata exports in a client component
- Never use inline styles — Tailwind only
- Never run `git add .` — always add specific files
- Never commit a broken build (run `npm run build` to check)
- Never hardcode tour data — always read from data files
- Never use Google My Maps for newly built pages — use Mapbox
- Never redesign a page when the task is an architectural/SEO fix

---

## Major Features Still To Build (Priority Order)
1. Fix naples-daytime-walk-2023 server/client SEO split
2. Mobile map height fix (Italy first, then all country pages)
3. Continue France video pages (fr-0021 Paris Latin Quarter next)
4. Build Mapbox map for France country page
5. Build remaining Italy video pages
6. Add remaining country data to master sheet (one country at a time)
7. Build Mapbox maps for each country as data is added
8. Build world browse map (after multiple countries have Mapbox)
9. Improve homepage
10. Enhance search (landmark timestamps, filter by video_type, region)
11. Full mobile responsiveness audit across all pages
12. Connect to YouTube API for live data
13. Licensing hub pages

---

## Session Log
[Claude Code: append one line here at the end of every session]
- 2026-03-31: CLAUDE.md created. Search normalization fix committed.
  Italy Mapbox map done. naples SEO fix in progress (incomplete).
  France pages: menton, antibes, avignon, paris-evening-2022,
  catacombs complete. fr-0021 Paris Latin Quarter is next to build.
  Highlight image script built (scripts/fetch-highlight-images.js).
  Tested successfully on paris-latin-quarter-marais-evening-walk-2020.
  yt-dlp and ffmpeg installed via winget. New restricted Mapbox token
  created and added to Vercel dashboard. Security audit prompt queued
  for next session.
