# Prowalk Tours Website — Project Brief for Codex

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

## Approved Brand Tagline

- Brand line: **Prowalk Tours — Your first step before you travel.**
- Supporting line: **Explore through my walks. Plan a journey of your own.**
- Approved by Isaac on 14 October 2026. Use this wording for future brand introductions and homepage work. The name and tagline may appear on separate lines in a visual layout.
- Destination guides should help visitors preview the real experience through my filmed walks, plan a visit, and follow a useful route when they arrive. Only describe features and firsthand experiences that are actually available or supported.

## Writing Voice — Isaac Speaking to the Visitor

- Write public-facing copy as Isaac, the person behind Prowalk Tours. Never describe him in the third person (for example, "Isaac's visits," "drawn by Isaac," or "his photographs"). This includes page copy, map notes, captions, alt text, previews, and search/social descriptions.
- Use "I" and "my" naturally for personal trips, filming, photos, and recommendations. Do not force every sentence into first person: clear place descriptions and direct advice to the visitor are welcome.
- Keep the tone warm, practical, and conversational. Explain what someone can see or do and how the information helps their visit. Avoid promotional filler, vague travel slogans, and internal editorial wording such as "filming dates describe the archive."
- Only describe experiences, preferences, stays, and recommendations that Isaac has actually supplied or that his materials support. Never invent a personal memory to make the writing sound authentic.
- Keep quoted material accurate and preserve its source attribution. Proper names in URLs, identifiers, source notes, and structured author data are not narrative copy and should remain intact.
- Keep verified dates, facts, and practical limitations clear while improving the wording. Copy edits must not change routes, links, media, or behavior.

## The Three Jobs of This Website
1. **Find a video fast** — search by place, landmark, theme
2. **Research a destination** — browse country → region → city → video
3. **Contact/license footage** — professional licensing hub

## YouTube Channel
- Channel: Prowalk Tours — first-person 4K walking tours worldwide
- Walking tours across **24 countries** (data entered for Italy, France, Germany, and Canada so far)
- Weekly uploads every **Saturday at 6am PST**
- The site should give older videos new life through search and
  destination browsing, and serve as a serious business asset
- **Content standards & channel strategy:** See "Prowalk Tours Content
  Standards v2" in Google Drive (not part of this repo) — references
  for video title/description format, content tier strategy, and
  YouTube Studio analytics insights.

## Camera Gear
- **GoPro Hero 6 / Hero 8** — used for many older walks
- **Sony A7S3** — used for newer, higher quality walks
- Binaural audio microphones throughout — spatial audio is a key
  differentiator of the Prowalk Tours brand

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
- **France** — 48 tours (updated 2026-04-02) — data complete ✓
- **Germany** — 20 tours (added 2026-04-02) — Christmas market tours complete ✓
- **21 other countries** — tours exist on YouTube, data NOT yet entered
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

## CSV Import Scripts

### France Full Import — scripts/import-france-csv.js ✓ BUILT
**Use this one when rebuilding the France Mapbox map.** Reads
france.csv and generates BOTH `data/videos/france.ts` (video catalog)
AND `data/maps/france.ts` (Mapbox features). Always regenerates the
map file so lat/long changes and new tours appear as markers.
```
node scripts/import-france-csv.js
```

### France Catalog Only — scripts/refresh-france-catalog.js ✓ BUILT
Only regenerates `data/videos/france.ts` — does NOT update the map
features file. Faster, but if a new tour has been added, the Mapbox
map on /destinations/france will be missing the marker. Prefer
`import-france-csv.js` unless you specifically only want the catalog.
```
node scripts/refresh-france-catalog.js
```
Always run `git status` after to review changes before committing.

### Highlight Refresh — scripts/refresh-highlights.js ✓ BUILT (destructive)
Reads `data/import/all-highlights.csv` and writes the `highlights`
array in matching `data/video-details/[slug].ts` files.
```
node scripts/refresh-highlights.js                    # all slugs
node scripts/refresh-highlights.js <slug>             # one slug
node scripts/refresh-highlights.js --dry-run          # preview
```
**CRITICAL — destructive behavior:** the CSV has no image paths,
descriptions, or alt text. Running this script on a page that
already has rich highlight data (imageSrc, images[], description,
alt) will **wipe all of that and replace with empty strings**.
Only safe to run on pages with empty highlights arrays (i.e. newly
created pages that have never been enriched).
Never run on: menton, antibes, avignon, arles, nice, all Paris,
all Alsace, all Germany, Stanley Park, Granville Island — these
pages have been hand-enriched with image paths and descriptions.

### Encoding Fix — scripts/fix-encoding.js ✓ BUILT
Repairs UTF-8 mojibake introduced by Google Sheets exports.
Fixes patterns like `â€"` → `—`, `â€™` → `'`, `â€œ` → `"`, etc.
```
node scripts/fix-encoding.js --dry-run    # preview
node scripts/fix-encoding.js              # apply
```
Run after every highlights CSV import because Google Sheets
consistently re-introduces mojibake on export. Safe to run
repeatedly — only replaces corrupted sequences.

### Highlight Image Extraction — scripts/fetch-highlight-images.js ✓ BUILT
See Highlight Images section below for full details.

### Video Page Generation — scripts/generate-video-page.js ✓ BUILT
Generates a complete video page (data file + page.tsx + Client.tsx)
from CSV data for a given slug. Used for bulk generation of new
country pages. Not typically run for single one-off pages.

### Highlights Data File — data/import/all-highlights.csv
**CRITICAL — read this before touching any highlights file:**

The highlights CSV is the **central search index for the entire site**.
It powers timestamp search across ALL videos in ALL countries.

- **Google Sheets source:** `highlights` tab in Prowalk_Tours_Master_Maps
- **Project file:** `data/import/all-highlights.csv`
- **Previous name:** was `france-highlights.csv` — renamed to `all-highlights.csv`
  when Germany was added. Update any old references found in code.
- **Covers:** ALL countries — France, Germany, Italy, and every future addition
- **NEVER create separate per-country highlight files**
- **NEVER name it france-highlights.csv again**

**Why one file matters:**
The entire site-wide search works by querying this single file. When a visitor
searches "Notre Dame", "Trevi Fountain", or "Christmas Market", the site
searches across ALL timestamps in ALL videos simultaneously. Multiple videos
containing the same landmark can surface together with their matching timestamps.
This only works if all highlights are in one combined file.

**Workflow for adding new country highlights:**
1. Add highlight rows to the Google Sheets `highlights` tab
2. Export the FULL tab (all countries) as `all-highlights.csv`
3. Replace `data/import/all-highlights.csv` in the project
4. Run the highlights import script or verify how the file is consumed
5. Verify search still works on localhost before committing

**Current countries in all-highlights.csv:**
- France ✓ (fr-0001 through fr-0003 highlights complete)
- Germany ✓ (de-0001 through de-0020 — 322 highlight rows added 2026-04-02)
- Italy — highlights not yet added (373 tours, master data exists)

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

## SEO Patterns — ALWAYS Follow These

### JSON-LD tags (VideoObject, BreadcrumbList)
- Use plain server-rendered `<script type="application/ld+json"
  dangerouslySetInnerHTML=...>` — NEVER `<Script>` from `next/script`.
  `next/script` injects the tag client-side via the RSC payload, which
  Facebook, Pinterest, Bing, and other non-JS scrapers can't see.
- Wrap `JSON.stringify(x)` in `stringifyJsonLd(x)` from
  `lib/seo/jsonLd.ts`. It escapes `<` → `\\u003c` (backslash-u003c) so a stray `</script>`
  in a description can't break out of the tag.

### VideoObject Clips (Google Key Moments)
- `lib/seo/videoClips.ts` `buildVideoClips()` reads `HighlightRecord[]`
  from a page's `data/video-details/[slug].ts` and returns `Clip[]`
  ready for `VideoObject.hasPart`. Returns `undefined` when highlights
  are empty or `videoDurationSeconds` is missing, so `JSON.stringify`
  drops the field cleanly.
- Standard shape in every video `page.tsx`:
  ```ts
  const videoRecord = <catalogVar>.find(v => v.slug === "<slug>");
  ...
  hasPart: buildVideoClips({
    highlights: <slugCamel>Detail.highlights,
    canonicalUrl: pageUrl,
    videoDurationSeconds: videoRecord?.durationSeconds,
  }),
  ```

### ?t= deep links
- Every video Client component calls `useInitialVideoStartTime()` from
  `lib/hooks/useInitialVideoStartTime.ts` and passes the result as
  `start=` on the YouTube iframe URL, so Google Key Moment clicks land
  at the right timestamp.
- Autoplay stays OFF (see "Things To NEVER Do").

### Sitemap and robots
- `app/sitemap.ts` enumerates pages at build time from the real routes
  on disk (`app/videos/*` + recursive walk of `app/destinations/**` +
  the static top-level pages `/`, `/countries`, `/search`, `/licensing`).
  Do NOT hardcode URLs.
- No `lastModified` — Vercel rebuilds every deploy so mtime is build
  time (a false signal).
- `app/robots.ts` allows all crawlers and points to `/sitemap.xml`.
- `metadataBase = https://www.prowalktours.com` in `app/layout.tsx` so
  OG URLs resolve absolute.

---

## Map Strategy

### Current State
- **Italy:** Mapbox interactive map — DONE ✓
- **France:** Mapbox interactive map — DONE ✓
- **Germany:** Mapbox interactive map — DONE ✓
- **21 other countries:** Google My Maps — Mapbox maps to be built
  as country data is added one by one

### Italy Map Features (replicate for all future maps)
- Clustered markers with number badges
- Zoom in to expand clusters into individual tour markers
- Click individual marker → opens tour card with description_short
- Click cluster → scroll through available videos in that area
- Filters: video type, filmed year, themes

### To Be Built
- **Per-country Mapbox maps:** One per country showing all tour markers
  - Follow Italy Mapbox implementation exactly as the pattern
- **World browse map:** Single global Mapbox showing ALL 24 countries
  - Build after several per-country maps are complete

### Mobile Map Fix (Already Decided)
Replace shallow `aspect-[16/9]` map containers with:
```
className="w-full h-[420px] sm:h-[480px] lg:h-auto lg:aspect-[16/9]"
```
Apply to Italy first, then France, then all future country pages.
Reduce `px-6` to `px-4 sm:px-6` on mobile for map sections.

### Mapbox Token Scopes
Required scopes: `styles:read`, `fonts:read`
(verify `tiles:read` included if needed)

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
- **Data entered in master sheet:** Italy (373 tours), France (48 tours),
  Germany (20 tours), Canada (6 tours)
- **Remaining 21 countries:** Data entry not yet started
- Do not build pages for a country until its data is in the master sheet
  and exported — confirm with user before starting a new country

### Known Countries with Pages or Partial Work
(Read app/destinations/ directory for current list)
- Italy ✓ — destination page + many video pages
- France ✓ — destination page + all 29 ready video pages built (includes
  Arles fr-0013)
- Canada ✓ — destination page + 6 Vancouver video pages built, Mapbox map
  pending (world map marker works)
- Croatia — page exists (check app/destinations/croatia)
- Slovenia — page exists (check app/destinations/slovenia)
- Germany ✓ — destination page + all 20 Christmas market video pages built
- USA — page exists (check app/destinations/usa)

---

## France — Key Performance Insights (Use for Page Strategy)
From YouTube Studio analysis — use these insights when writing
descriptions, choosing featured content, and structuring France pages:

- **Paris (Night/Evening):** Highest total views, drives new subscribers
- **Alsace Christmas Markets** (Colmar, Strasbourg, Riquewihr):
  Highest avg. view duration (~26 min), highest returning viewer rates
  (~84-92%). Evergreen appeal year-round, not just December.
- **French Riviera** (Menton, Antibes, Nice): Fastest growing,
  strong returning viewer rates (~79%)
- **Old Town / Medieval themes:** High engagement, ~79% returning viewers
- **Paris Catacombs:** 90%+ likes-to-views ratio — niche = high satisfaction

### Recommended Browse Categories for France
- Christmas Markets / Winter (dedicated category — strong data)
- French Riviera & Coastal Towns
- Historic Centers & Old Towns
- Paris (day + night subcategories)

### Naming Strategy
Combine destination + theme outperforms destination alone.
Themes drive retention more than city names (except Paris).

---

## Pages Built So Far (France Video Pages)
Check app/videos/ directory for full current list. Confirmed completed:
- menton-france-walking-tour-2025 ✓ (fr-0001)
- antibes-daytime-walk-2025 ✓ (fr-0002)
- nice-old-town-monday-evening-walk-2025 ✓ (fr-0003)
- avignon-walking-tour-2025 ✓ (fr-0010)
- **arles-roman-old-town-day-walk-2025 ✓ (fr-0013)** — 43 highlights,
  131 images, multi-image carousels, local hero.jpg. Use as the
  reference template for any new page that needs the carousel pattern.
- paris-catacombs-tour-2020 ✓
- paris-evening-walk-2022 ✓
- paris-latin-quarter-marais-evening-walk-2020 ✓
- paris-landmarks-day-walk-2020 ✓ (fr-0014)
- montmartre-evening-walk-2022 ✓ (fr-0015)
- montmartre-day-walk-2020 ✓ (fr-0016)
- paris-promenade-plantee-day-walk-2020 ✓ (fr-0017)
- paris-landmarks-day-walk-2017 ✓ (fr-0018)
- paris-luxemburg-gardens-day-walk-2020 ✓ (fr-0023)
- paris-eiffel-tower-day-walk-2020 ✓ (fr-0024)
- Hero images still needed for: fr-0014 through fr-0024

### France Status
- All tours marked status=ready now have pages built ✓
- Remaining draft/coming-soon tours (fr-0047, fr-0048 Nice Evening
  Walks 2 & 3) will be built when published to YouTube

### Germany Status
- All 20 Christmas market tour pages built ✓ (de-0001 to de-0020)
- Germany Mapbox map built ✓
- All 322 Germany highlights added to all-highlights.csv ✓

### Canada Status
- All 6 Vancouver tour pages built ✓ (ca-0001 to ca-0006):
  vancouver-canada-walking-tour, stanley-park-seawall-walk-vancouver,
  vancouver-bike-tour-2025, vancouver-sunset-beach-evening-walk-2025,
  granville-island-walking-tour-vancouver, vancouver-evening-walk-gastown-2025
- Canada destination page ✓ (/destinations/canada) with 6 tour cards
- 136 Canada highlights added to all-highlights.csv ✓
- Highlight images not yet extracted for any Canada tour
- Canada Mapbox map page not yet built (world map markers work via all_tours.csv)

---

## Known Issues — Fix These First
- **Mobile map containers:** All country pages need the h-[420px] fix.
  Start with Italy, then remaining countries.

- **Hero images missing:** fr-0014 through fr-0024 need proper hero
  images. Currently showing placeholder gradient.

- **Nav dead links:** Store, About, Map nav items link to homepage.
  Hide or build before site goes to prowalktours.com.

- **Licensing form not connected:** /licensing form is layout only.
  Connect to Resend or Formspree before launch.

- **all-highlights.csv code references:** Any remaining code references
  to france-highlights.csv need to be updated to all-highlights.csv.
  Codex to audit and fix.

---

## Development Workflow
Before starting each session:
```
git status
npm run dev
```
If port 3000 is busy, Next.js will switch to 3001 automatically.

After changes, review the diff and run appropriate checks. Keep work and
commits local by default. Do NOT run `git push` or deploy unless the user
explicitly requests or approves publishing the changes. Vercel deploys
automatically on push, so a local edit or commit is not permission to push.

When creating a local commit:
```
git add [specific files]
git commit -m "descriptive message"
```

Do NOT run `git add .` — always add specific files to keep commits clean.

---

## VS Code Workspace Config
Workspace settings live in `.vscode/` (committed to the repo).

### Tasks — prefer these over typing commands manually
Run with **Ctrl+Shift+P → "Tasks: Run Task"**. Codex should mention these
task names rather than the raw commands when guiding the user through workflows.

- `npm: build` — runs `npm run build` (also bound to Ctrl+Shift+B)
- `npm: dev` — runs `npm run dev` as a background task
- `script: refresh highlights (all)` — runs `node scripts/refresh-highlights.js`
  to re-import every slug from `all-highlights.csv`
- `script: refresh highlights (one slug)` — same script, prompts for a single
  slug. Use this after updating highlights for one specific tour.
- `script: fix encoding` — runs `node scripts/fix-encoding.js` to repair UTF-8
  mojibake (`â€"` → `—`, `â€™` → `'`, etc.) in CSVs and video-detail files
- `script: fix encoding (dry run)` — preview encoding fixes without writing
- `script: refresh France catalog` — syncs france.csv → data/videos/france.ts
  and data/maps/france.ts (existing script, now bound as a task)
- `script: fetch highlight images (one slug)` — runs yt-dlp + ffmpeg extraction
  for a single tour, prompts for the slug
- `git: status` — quick status check

### Snippets for new walk pages
Type the prefix and press Tab to expand. Defined in
`.vscode/walk-page.code-snippets`.

- `walkpage-server` — full server `page.tsx` template with metadata, breadcrumb
  JSON-LD, and video JSON-LD. Tab through 11 placeholders (PascalSlug, slug,
  youtubeId, title, description, alt, country, country-slug, short title,
  upload date, ISO duration).
- `walkpage-detail` — `VideoDetailRecord` template for
  `data/video-details/[slug].ts` with empty highlights array ready for
  `refresh-highlights` to populate.
- `walkpage-highlight-img` — the standard highlight card image block with
  empty-`imageSrc` guard and `onError` gradient fallback.
- `walkpage-breadcrumbs` — the shared breadcrumb nav markup.

When building a new video page, prefer these snippets over copying an existing
page and find-replacing — the snippet's placeholders catch mistakes that silent
find-replace misses.

### Recommended extensions
Listed in `.vscode/extensions.json` — VS Code prompts to install them on first
open. The important ones for this project: Tailwind CSS IntelliSense,
Rainbow CSV, Error Lens, GitLens, Path IntelliSense.

---

## Codex / Codex Prompt Tips
When giving prompts for new video pages, always specify:
- Exact file paths to edit
- Reference pages to use as template
- "Do not edit any other file"
- "Show exact diff and list every file changed after editing"

---

## Highlight Images

### Location & naming
- Location: `public/[slug]/highlights/`
- Single image: `[city]-[landmark-description].jpg`
  - Lowercase, hyphen-separated, no timestamp, no trailing number
- Multi-image (Photoshop batch workflow — see below):
  `[city]-[landmark-description]-1.jpg`, `-2.jpg`, `-3.jpg`, etc.
  - Sequentially numbered starting at 1
  - Gaps in numbering are OK (e.g. arles-amphitheatre-1/2/3/4/5/7/8/9/10
    with no -6 because a bad frame was discarded)
- Legacy files may have a trailing `0` — do not rename, do not replicate
- **Never use spaces** in filenames. The audit script will catch these
  but it's easier to not create them in the first place.

### Multi-image highlight pattern (Arles reference)
When a highlight has multiple photos (different angles of the same
landmark, or a sequence like market stalls), use the `images: string[]`
field on the `HighlightRecord` in `data/video-details/[slug].ts`:
```ts
{
  title: "Arles Amphitheatre",
  timeLabel: "50:03",
  seconds: 3003,
  imageSrc: img("arles-amphitheatre-1.jpg"),  // fallback for single-image contexts
  images: [
    img("arles-amphitheatre-1.jpg"),
    img("arles-amphitheatre-2.jpg"),
    // ... up to N images
  ],
  alt: "Descriptive alt text for accessibility and SEO",
  caption: "Arles Amphitheatre",
  description: "Historical context — 1-2 sentences."
}
```
The client component renders a carousel when `images.length >= 2`, or a
plain `<img>` when only `imageSrc` is set.
**Reference implementation:** `arles-roman-old-town-day-walk-2025` —
43 highlights with 131 total images, mix of single and multi-image.
See `data/video-details/arles-roman-old-town-day-walk-2025.ts` and
`app/videos/arles-roman-old-town-day-walk-2025/ArlesRomanOldTownDayWalk2025Client.tsx`.

### HighlightCarousel component
Location: `components/HighlightCarousel.tsx` (client component).
- Props: `images: string[]`, `alt: string`
- 1 image → plain `<img>` tag (no carousel UI)
- 2+ images → crossfade carousel:
  - Auto-advances every 4 seconds
  - Opacity fade transition (not slide)
  - Semi-transparent left/right arrows, visible on hover
  - Dot indicators at the bottom
  - Clicking an arrow pauses auto-advance for 8 seconds
  - Failed images are skipped silently
  - Arrow clicks call `e.stopPropagation()` so they don't trigger the
    parent card's onClick (video seek)
- Mobile sizing: the carousel container uses `aspect-[16/10]` on itself
  (not `h-full w-full` relying on parent) to avoid height collapse on
  mobile browsers. First image uses `relative` positioning to establish
  intrinsic container height; later images layer on top with `absolute`.

### Highlight card wrapper — use div not button
Because the carousel contains button children (arrows, dot indicators),
the outer card wrapper CANNOT be a `<button>`. HTML forbids nested
buttons and React raises a hydration error.
Use this pattern instead:
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={() => handleHighlightClick(highlight.seconds)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleHighlightClick(highlight.seconds);
    }
  }}
  className="w-full cursor-pointer overflow-hidden rounded-[1.5rem] ..."
>
  {/* card content, including HighlightCarousel */}
</div>
```
Every video page client component has already been migrated to this
pattern. When creating new pages, follow this — do not use `<button>`
as the outer wrapper.

### Photoshop batch action workflow
Highlight images are produced by a Photoshop batch action that processes
raw frames extracted from the video. The action outputs sequentially
numbered JPGs matching the slug's naming convention, saved directly to
`public/[slug]/highlights/`.
Workflow:
1. Extract raw frames (manually or via `fetch-highlight-images.js`)
2. Open in Photoshop, run the batch action (crop/color/export)
3. Save into `public/[slug]/highlights/` with the `-1.jpg`, `-2.jpg` suffix
4. Add image paths to `data/video-details/[slug].ts`
5. Run the image audit below to catch any filename mismatches

### Image audit — always run before committing a new page
Before committing a new video-detail file, verify every referenced
image actually exists on disk:
```bash
cd d:/Projects/prowalktours-site && node -e "
const fs=require('fs');
const detail=fs.readFileSync('data/video-details/[slug].ts','utf8');
const refs=[...detail.matchAll(/img\(\"([^\"]+)\"\)/g)].map(m=>m[1]);
const unique=[...new Set(refs)];
const dir='public/[slug]/highlights';
const files=new Set(fs.readdirSync(dir));
let missing=0;
for(const f of unique){
  if(!files.has(f)){console.log('MISSING:',f);missing++;}
}
console.log('Referenced:',unique.length,'On disk:',files.size,'Missing:',missing);
"
```
This caught `arles amphitheatre-1.jpg` (space instead of hyphen) on
the first Arles build.

### fetch-highlight-images.js (legacy frame-extraction approach)
For cases where Photoshop isn't used — typically for older pages where
a single frame per highlight is enough.
- Script: `scripts/fetch-highlight-images.js`
- Downloads the video once at lower quality, extracts all frames
  locally, deletes the temp file after. Much faster than remote stream
  seeking.
- Skips existing files (never overwrites).
- Run one tour at a time:
  `node scripts/fetch-highlight-images.js [slug]`
- Dry run: `node scripts/fetch-highlight-images.js [slug] --dry-run`
- After running, update imageSrc paths in `data/video-details/[slug].ts`
- Requires: yt-dlp and ffmpeg on PATH (installed via winget 2026-03-31)

---

## Security Rules

### Environment Variables
- .env.local must NEVER be committed to GitHub
- All API keys stored in Vercel environment variables dashboard
- YouTube API key (when added) must be server-side only, never client

### Security Headers — DONE ✓
Added to next.config.ts on 2026-04-01:
CSP, X-Frame-Options, HSTS, and related headers all configured.

### Mapbox Token Security
- Use custom restricted token — NOT the default Mapbox public token
- Separate tokens per environment:
  - Production: restricted to https://www.prowalktours.com
  - Dev: restricted to https://prowalktours-site.vercel.app
- Never hardcode tokens in source code
- Mapbox popups: always use setText not setHTML (prevents XSS)

### Mapbox Security Checklist
- [x] Restricted Mapbox token created and added to Vercel dashboard
- [x] Mapbox token URL restrictions configured (2026-04-01)
- [x] Security headers added to next.config.ts (2026-04-01)
- [ ] Separate dev token created for prowalktours-site.vercel.app
- [ ] .env.local confirmed in .gitignore
- [ ] Mapbox popup code audited — setText not setHTML
- [ ] Two-factor authentication enabled on Mapbox account

### Forms (When Connected)
- Rate limiting required
- CAPTCHA required (Cloudflare Turnstile recommended — free)
- Never expose plain text email addresses on any page

---

## Press & Partnerships Page (/press)
**Status: Content ready — page not yet built**

### Purpose
Professional credentials and business development page for four
audiences: press/media, sponsors, institutional licensing, distribution.
Add to main nav and footer alongside Licensing when built.

### Section 1 — Press & Media Coverage
Wall Street Journal feature:
- Title: "These Travel Videos Have No Host, No Voiceover—and They're Addictive"
- Author: Matthew Kronsberg
- URL: https://www.wsj.com/lifestyle/travel/these-travel-videos-have-no-host-no-voiceoverand-theyre-addictive-73f2878d
- Display this pull quote prominently:
  "When there's no narration, people stop listening and start noticing.
  They notice how the street sounds, and how the people move, and how
  the light changes. They're not being talked to. They're immersed in it."
  — Isaac Harjo, as quoted in the Wall Street Journal

TV appearances:
- Unexplained with William Shatner — Paris Catacombs footage featured
  https://m.youtube.com/watch?v=4CfazQ2P8D8
- [User to add any additional TV show appearances]

### Section 2 — Distribution Partnership
Janson Media — worldwide TV and streaming distribution partner
- Adapting content for broadcast TV, FAST channels, AVOD/SVOD/TVOD
- Production Q2 2026, first titles to partners Q3 2026
- Press release: https://janson.com/news/janson-media-and-prowalk-tours-announce-joint-venture
- Stephen Janson quote: "Prowalk Tours has created a remarkable body of
  work that transports viewers directly into destinations around the world."
- Isaac Harjo quote: "This collaboration allows our content to reach
  viewers in entirely new environments while preserving our core YouTube
  channel and community."

### Section 3 — Business & Institutional Licensing
Ambient video licensing for: restaurants/hospitality, healthcare/memory
care, fitness/wellness, travel/tourism, education, correctional
facilities, streaming/broadcast.
Inquiry form fields: organization, contact, email, org type, locations,
display environment, desired content, license term, notes.

### Section 4 — Brand Partnerships & Sponsorship
Priority targets: Brooks shoes, camera/audio gear, travel accessories.
Channel stats for copy: 750K+ subscribers, 24 countries, 1,400+ hours,
4K + binaural audio, weekly uploads, Janson worldwide distribution Q3 2026.
Inquiry form fields: name, company, email, website, partnership type,
brand description and ideas.

### Design Rules for /press
- Match /licensing page design language
- NEVER display plain text email addresses
- Both forms layout-only until connected to email service
- Janson press release link opens in new tab

---

## Future: Prowalk Tours Mobile App
Post-website project. Foundation already in place:
- Mapbox maps work natively in React Native / Expo
- Tour data structure is already app-ready
- Highlight timestamps and search translate directly
- Recommended approach: Expo (React Native framework)
- Unique feature opportunity: "Walk With Me" GPS mode — user's location
  tracks against the tour route in real time while walking the same streets
- Website completion is prerequisite before starting app development

---

## Data Validation Rules (Learned from Session Failures)
These rules exist because slug mismatches broke ~12 image references
and bad CSV data broke all Germany video embeds in a single session.
Prevention takes seconds. Debugging takes hours.

### Before ANY Bulk Page Generation — Validate First
Before generating multiple pages from CSV data, always run a
validation pass first. Do NOT start building until this is clean:
```
Before generating any pages, validate the CSV data file:
1. Check URL columns contain actual URLs (start with http) — not titles
2. Check all slugs are consistently normalized (lowercase, hyphened)
3. Check every slug has a corresponding image file in /public/
4. List ALL mismatches before touching anything
```

### Slug Normalization — Must Be Consistent Everywhere
Slugs must match exactly across ALL THREE of these places:
- The CSV data file
- The actual filename/folder in the project
- The component references in code
If any one of these differs, pages silently break.
Always verify all three match before committing any batch of pages.

### Data File Changes — Always Commit Immediately
After modifying OR renaming ANY data file (CSV, JSON, TypeScript
data file), immediately run `git add` on that file and commit it
before doing anything else. An uncommitted CSV rename caused a
Vercel deployment failure. Never leave data file changes uncommitted.

### CSV Schema — Validate Before Processing
When importing a new country CSV or any updated CSV:
- Confirm URL columns contain actual URLs, not video titles
- Confirm date fields are dates, not other data
- Confirm lat/long are numbers, not strings
- Flag and fix ALL schema issues before running any import script

### Hooks — Auto-Warning for Uncommitted CSV Changes
The file .Codex/settings.json contains a hook that automatically
warns when a CSV file is modified but not committed. If this file
does not exist, ask Codex to create it:
```json
{
  "hooks": {
    "postToolUse": [{
      "matcher": "Write|Edit",
      "command": "bash -c 'git diff --name-only | grep -E \.csv$ && echo "WARNING: Uncommitted CSV changes detected" || true'"
    }]
  }
}
```

### Media Processing — Always Download First
When extracting frames or processing video files:
- NEVER seek in remote YouTube streams directly — too slow, unreliable
- Always download the video locally first (lower quality is fine)
- Extract all frames locally from the downloaded file
- Delete the temp file after extraction
This is what scripts/fetch-highlight-images.js already does —
follow this pattern for any future media processing scripts.

---

## Things To NEVER Do
- Never add "use client" to page.tsx — kills SEO metadata
- Never put metadata exports in a client component
- Never use inline styles — Tailwind only
- Never run `git add .` — always add specific files
- Never commit a broken build (run `npm run build` to check)
- Never hardcode tour data — always read from data files
- Never use Google My Maps for newly built pages — use Mapbox
- Never redesign a page when the task is an architectural/SEO fix
- Never display plain text email addresses on any page
- Never start bulk page generation without validating CSV data first
- Never leave a renamed or modified data file uncommitted
- Never seek in remote video streams — always download locally first
- Never use `<button>` as the outer wrapper for a highlight card —
  nested buttons cause hydration errors. Use `<div role="button"
  tabIndex={0}>` with an `onKeyDown` handler for Enter/Space.
- Never run `refresh-highlights.js` on a page that has already been
  enriched with image paths, descriptions, or alt text — the CSV has
  none of that and the script will wipe it all. Safe only for newly
  generated pages with empty highlights arrays.
- Never use spaces in highlight image filenames. Always hyphens.
- Never use `<Script>` from `next/script` for JSON-LD — it injects the
  tag client-side via the RSC payload, invisible to Facebook, Pinterest,
  Bing, and other non-JS scrapers. Always use plain `<script
  type="application/ld+json" dangerouslySetInnerHTML=...>` with
  `stringifyJsonLd()` from `lib/seo/jsonLd.ts` (which escapes `<` to
  `\\u003c` — backslash-u003c — so a stray `</script>` in a description
  can't break out).
- Never turn on YouTube autoplay in the video Client components.
  Binaural audio is a key differentiator of the channel and browser
  autoplay policies are inconsistent. The `?t=` deep link seeks the
  player to the requested timestamp, but the user still hits play.

---

## Major Features Still To Build (Priority Order)

### Completed ✓ (remove from active list)
- naples-daytime-walk-2023 server/client SEO fix ✓
- All France ready tour pages built ✓
- France Mapbox map built ✓
- Germany pages built (de-0001 to de-0020) ✓
- Germany Mapbox map built ✓
- Security headers added ✓
- refresh-france-catalog.js import script ✓
- fetch-highlight-images.js script ✓
- World map built on homepage ✓ (clustering, rich video cards, country
  colour coding — Italy green, France red, Germany gold)
- Mobile homepage redesigned ✓ (hamburger nav, hero image, simplified
  search, map with instructions)
- Highlight images extracted for Germany (18/20), Alsace (12 pages),
  Disneyland Paris ✓ — 2 unavailable: freiburg-christmas-market-
  evening-walk-2025 and rothenburg-christmas-market-morning-walk-2024
- Related tour card thumbnails fixed across all 41 pages ✓ (60
  placeholder YouTube URLs replaced with correct video IDs)
- onError fallback added to all 41 client components ✓
- all-highlights.csv slug corrections — all 20 Germany slugs fixed ✓
- Cologne de-0002 year corrected (2024→2023) across all data files ✓
- france-highlights.csv → all-highlights.csv code references fixed ✓
  (data/search-hits/france.ts exports `allSearchHits` — `franceSearchHits`
  kept as back-compat alias)
- SEO foundation shipped ✓ (app/sitemap.ts auto-enumerates 92 real
  content routes from disk, app/robots.ts, metadataBase in the root
  layout, VideoObject JSON-LD with hasPart Clips on all 57 video pages
  server-rendered with </script> breakout escaped, ?t= deep-link seek
  via useInitialVideoStartTime — Menton verified in Google Rich Results
  Test)

### Active Priority List
1. Build /press page (content ready — see Press & Partnerships section)
2. Connect /licensing form to email service (Resend or Formspree)
3. Fix nav dead links (Store, About, Map)
4. Add hero images for fr-0014 through fr-0024
5. Mobile map height fix (Italy first, then all country pages)
6. Build remaining Italy video pages
7. Add remaining country data to master sheet (one country at a time)
8. Build Mapbox maps for each new country as data is added
9. Enhance search (landmark timestamps, filter by video_type, region)
10. Full mobile responsiveness audit across all pages
11. Connect to YouTube API for live data
12. Build downloadable PDF media kit from /press page content
13. Future: Prowalk Tours mobile app (Expo/React Native)

### World Map — Known Unavailable Videos (skip these forever)
- freiburg-christmas-market-evening-walk-2025 — members only, cannot extract
- rothenburg-christmas-market-morning-walk-2024 — members only, cannot extract

---

## Session Log
 - 2026-10-14: Linked the Around Colmar map labels directly to Ribeauvillé, Kaysersberg and Riquewihr market pages. Added shared starter pages using the existing public tour catalog, local hero images, server metadata and structured data, with links back to Colmar. Production build, targeted lint, tour-data checks and desktop/mobile navigation checks passed. Local only; no push or deployment.
[Codex: append one line here at the end of every session]
- 2026-03-31: AGENTS.md created. Search normalization fix committed.
  Italy Mapbox map done. naples SEO fix in progress (incomplete).
  France pages: menton, antibes, avignon, paris-evening-2022,
  catacombs complete. Highlight image script built and tested.
  yt-dlp and ffmpeg installed via winget. New restricted Mapbox token
  created and added to Vercel dashboard.
- 2026-04-01: Major session. Security headers added to next.config.ts.
  Paris Catacombs split into server+client. France catalog refreshed
  from CSV (6 → 28 ready tours). refresh-france-catalog.js script
  created. Paris destination hub built. French Riviera and Provence
  hub cards updated. Nice evening walk page built (fr-0003). New pages:
  fr-0014 through fr-0018, fr-0023, fr-0024. Highlight images extracted
  for all new pages. 9 broken image refs fixed. Mapbox token URL
  restrictions configured. Camera gear noted (GoPro 6/8, Sony A7S3).
- 2026-04-02: france.csv updated — fr-0047 and fr-0048 (Nice Evening
  Walks 2 & 3) added as coming soon. fr-0003 lat/long corrected.
  Weather temps filled in for ready tours. refresh-france-catalog.js
  run to sync all changes. /press page content drafted and added to
  AGENTS.md — ready to build next session.
- 2026-04-02 (continued): Germany sheet added to master Google Sheet
  (de-0001 through de-0020, all Christmas market tours). Germany
  highlights added to highlights tab (322 rows). all_tours sheet
  updated to include Germany. Highlights file renamed from
  france-highlights.csv to all-highlights.csv — update all code
  references on next session. 2025 Video Log update guide created
  (56 rows flagged for status/URL updates).
- 2026-04-02 (end of day): All France + Germany video pages now live
  on site. France + Germany Mapbox maps both complete. naples SEO fix
  confirmed done. Codex Insights report reviewed — Data Validation
  Rules added to AGENTS.md. AGENTS.md cleaned up — stale items removed,
  completed items archived, priority list updated to reflect current state.
  Hooks file (.Codex/settings.json) to be created next session.
- 2026-04-03: Major homepage rebuild. World map added to homepage with
  clustering, rich video cards, YouTube thumbnails, country colour coding
  (Italy green #009246, France red #ED2939, Germany gold #FFCE00).
  Homepage restructured — desktop: split layout with search left / map
  right. Mobile: hamburger nav (logo centered, ☰ far right), hero image
  (Menton photo at /images/homepage/hero-mobile.jpg), simplified search
  (single bar, no filter dropdowns on mobile), map with instructions.
  Cluster click behavior changed — shows walk list instead of zooming.
  Related tour card thumbnails fixed across 41 pages (60 placeholder
  YouTube URLs replaced). onError fallback added to all 41 client
  components. Highlight images extracted for Germany (18/20), all 12
  Alsace pages, and Disneyland Paris. all-highlights.csv slug corrections
  applied. Cologne de-0002 year fixed. Zero broken links, zero missing
  related tour images confirmed by full audit.
- 2026-04-04 to 2026-04-10: Homepage polish — pill buttons below search
  bar (Browse Countries dark brown, Explore the Map green, aligned to
  search input width only), destination cards switched from YouTube
  thumbnails to local images (`public/images/homepage/*.jpg`), stat
  label typography matched to map subheading, world map legend country
  labels made clickable with flyTo animation to each country center.
- 2026-04-10 to 2026-04-15: Canada pages built. 6 Vancouver walks
  (ca-0001 to ca-0006) each with server/client split, YouTube thumbnail
  hero image with gradient fallback, breadcrumb + video JSON-LD,
  Canada flag in sticky nav. Canada destination page rebuilt with 6
  tour cards (replaced the "British Columbia coming soon" placeholder).
  136 Canada highlights added to all-highlights.csv. scripts/
  refresh-highlights.js built to import highlights CSV into video-detail
  files. scripts/fix-encoding.js built to repair UTF-8 mojibake from
  Google Sheets exports (fixed 49 sequences in the Canada batch alone).
  Empty-imageSrc guard + gradient fallback added to all Canada
  highlight cards.
- 2026-04-16: Arles page built (fr-0013). 43 highlights with 131 total
  images, Photoshop batch-action workflow. HighlightCarousel component
  built — crossfade, auto-advance, arrows, dots, error skipping.
  HighlightRecord type extended with optional `images: string[]`.
  Full SEO pass on Arles: title, keywords, OG tags, VideoObject +
  BreadcrumbList JSON-LD. Arles added to Provence destination page
  and France Mapbox map (via import-france-csv.js regenerating both
  data/videos/france.ts and data/maps/france.ts). Hero image switched
  from YouTube thumbnail to local public/[slug]/hero.jpg.
- 2026-04-17: Nested button hydration error fixed site-wide. Highlight
  card wrappers migrated from `<button>` to `<div role="button"
  tabIndex={0}>` with onKeyDown handler across all 57 video page client
  components. Mobile highlight carousel height collapse fixed — first
  image uses `relative` positioning (not absolute), container has
  explicit `aspect-[16/10]`. Audit of Arles image references caught
  `arles amphitheatre-1.jpg` (space) — renamed to hyphenated.
  All 132 Arles highlight images committed to git. Learned that
  refresh-highlights.js is destructive on enriched pages — reverted
  49 video-detail files that had custom image paths/descriptions/alt
  text after an unintended re-import. Documented the destructive
  behavior and safe-slug list in this AGENTS.md.
- 2026-08-10: SEO foundation shipped. New: `app/sitemap.ts` (92 real
  content URLs enumerated at build time from `app/videos/*` +
  recursive walk of `app/destinations/**` + static top-level pages;
  no lastModified since Vercel rebuilds every deploy so mtime is
  build time — a false signal), `app/robots.ts` (allow-all + sitemap
  pointer), `metadataBase = https://www.prowalktours.com` in
  `app/layout.tsx` so OG URLs resolve absolute. `lib/seo/jsonLd.ts`
  provides `stringifyJsonLd()` which escapes `<` to `\\u003c`
  (backslash-u003c) so a stray `</script>` in a JSON-LD payload can't
  break out.
  `lib/seo/videoClips.ts` turns `HighlightRecord[]` from
  `data/video-details` into `Clip[]` for `VideoObject.hasPart`
  (endOffset = next clip's start, or `videoDurationSeconds` for the
  last). All 57 video pages migrated off `<Script>` from `next/script`
  (which injected JSON-LD via the RSC payload — invisible to Facebook,
  Pinterest, Bing) to plain server-rendered `<script>` tags with
  `hasPart` Clips populated. All 57 client components now call
  `useInitialVideoStartTime()` (`lib/hooks/useInitialVideoStartTime.ts`)
  which reads `?t=` from the URL after mount; the YouTube iframe's
  native `start=` param handles the seek. Autoplay stayed OFF —
  browser autoplay policies are inconsistent and binaural audio is a
  channel differentiator. Verified Menton end-to-end via Google Rich
  Results Test: 1 valid item, Clips detected with correct offsets.
  New "SEO Patterns" section added to this AGENTS.md alongside two
  new NEVER-do entries (no `next/script` for JSON-LD, no autoplay).

- 2026-09-22: Built /christmas-markets from the shared public tour dataset (35 walks, 16 destinations). Added geographic/year/search filters, clustered map, historical journey outlines, homepage/nav/footer links, metadata and sitemap entry. Verified mobile and desktop, data tests and production build; no source CSVs or enriched video pages changed.
- 2026-09-22: Added 2023 and 2024 Christmas journey outlines, preserved the 2023 Colmar return stop, and documented future accommodation verification. Build, lint, data checks and browser review passed.

- 2026-10-09: Launch comparison and content pass. Audited 587 Squarespace URLs and mapped exact YouTube IDs; saved prioritized checklist and inactive redirect candidates under docs/. Added 17 information, equipment and legal-draft pages, restored 38 public-tour heroes, added missing metadata and improved mobile maps/navigation. Licensing prepares an email to info@prowalktours.com; Roku inquiries use roku@prowalktours.com. Policies remain noindex drafts pending actual Roku providers and legal review. Build, data checks and 112-route smoke check passed; lint has 60 pre-existing errors, no new errors. No DNS, domain, email or Squarespace configuration changed; enriched tour data and existing untracked design work preserved.
- 2026-10-09: Prioritized map discovery from the legacy video library. Added 112 verified public videos in a supplemental CSV, bringing shared map/search to 539 tours across 24 countries and Christmas to 44. Preserved master exports and permanent IDs; labeled 20 unconfirmed-start pins, added country navigation and coincident-marker lists. Build, data checks and desktop/mobile browser checks passed. Local preview only; no push, domain, DNS, email, Google Sheet or Squarespace configuration changes.
- 2026-10-09: Restored the 3D globe projection at the owner's request, retaining all 539 tours, country navigation and accuracy labels. Production build and browser globe/country-navigation checks passed. Local preview only; no push or deployment.
- 2026-10-09: Adjusted globe mouse dragging after reproducing overshoot toward the polar limit: independent responsive globe overview, reduced pan inertia and non-retained country-fit padding. Kept all tour data and globe design. Production build, targeted lint and mouse rotation/date-line checks passed; local preview only.
- 2026-10-09: Audited all 539 world-map thumbnail endpoints; every image decoded successfully, including Mt. St. Helens. Added shared thumbnail rendering to single popups and grouped cards, fallback previews, reserved image space and popup positioning. Build, data tests, targeted lint and desktop popup check passed. Local preview only.
- 2026-10-09: Enabled direct wheel zoom on the homepage globe without Ctrl. Production build passed and browser wheel zoom verified. Local preview only.
- 2026-10-09: Reworked homepage browsing flow with existing Naples photography, live search, larger destination gallery, globe, featured tour/Christmas collection, and closing About/licensing section. Preserved navigation, map functionality and datasets. Desktop/mobile image, search and layout checks, targeted lint, data tests and production build passed. Local review only; no deployment.
- 2026-10-09: Refocused homepage on newest walk, Christmas collection, licensing, sponsorship and support. Verified Squarespace newest-tour embed snBqLG2Piyo; feature reads its existing tour record and remains manually curated. Homepage/header/footer destination links now use working search instead of unfinished landing pages. Build, lint, data and browser checks passed. Local only; Christmas page is next priority.
- 2026-10-09: Created AI-generated Christmas collection cover artwork with built-in image_gen; retained original tour frame and saved full prompt/provenance. Replaced homepage collection thumbnail only. Production build passed; local preview only.
- 2026-10-09: Reviewed search history (5452f45, 4c1b7a4, bcb4ac0) before fixing Paris browsing. Geographic intent now applies across all result cards, including Montmartre; city searches suppress timestamp lists while landmark search retains deep links. Cards no longer stretch to neighbors. Build passed; browser confirmed Paris 12 cards/zero timestamps and Notre Dame 8 cards/9 timestamp links. Local only.
- 2026-10-09: Moved homepage globe above destination gallery and increased map height by approximately one third (665px desktop, 560px mobile). Build and browser section-order/dimension checks passed. Local only.
- 2026-10-09: Added supplied Amazon storefront link to homepage gear section and /filming-gear, with adjacent affiliate disclosure and sponsored external-link attributes. No click tracking added. Build, lint and rendered-link check passed; local only.
- 2026-10-09: Used owner-supplied Squarespace gear artwork for three linked category cards on /filming-gear. Copied camera, microphone and accessory images into public/images/gear; originals unchanged. Next Image optimizes delivery; images displayed uncropped. Build and browser image checks passed. Local only.
- 2026-10-09: Replaced generated homepage Christmas collection cover with owner-selected licensed AdobeStock_259302916.jpeg, identified by owner as Rothenburg ob der Tauber. Copied original unchanged to public/images/homepage/rothenburg-christmas-collection.jpeg; descriptive alt updated. Build passed; local only.
- 2026-10-09: Replaced Christmas market introduction with owner-approved natural wording about planning a trip or enjoying the sights and sounds from home. Production build passed; local preview only.
- 2026-10-09: Updated homepage headline to owner-approved A closer look at places far from home. Preserved walking-pace eyebrow and existing design; natural responsive text wrapping. Production build passed; local only.
- 2026-10-09: Added automatic homepage newest-walk selection from public YouTube channel feed, 15-minute request-driven revalidation and curated fallback. Title-based walk filtering excludes labeled Shorts/trailers; map data remains separately maintained. Live feed, production build, targeted lint and regression tests passed. Owner authorized publishing to existing Vercel hostname without domain migration.
- 2026-10-13: Removed automatic push-after-change instructions. Work and commits stay local by default; pushing or deploying requires an explicit user request or approval. Colmar photo archive is being prepared by the owner.
- 2026-10-13: Inventoried D:\Prowalk Tours Media Library\Christmas Markets (5,331 images, 21 destinations, 9 countries). Reviewed all 274 Colmar photos; created 12 contact sheets and a proposed 14-image shortlist with source manifest under D:\Saved AI Chats\Prowalk Tours Christmas Market Review\2026-10-13. Verified originals unchanged; no website image exports, push or deployment. Colmar notes and final image choices remain for owner review.
- 2026-10-13: Built the first Colmar Christmas guide at /christmas-markets/colmar from approved archive photos and 2023 day/evening captions. Exported 14 WebP copies with original hashes unchanged; sourced 2026 dates, hours and transport separately. Added reusable guide types/template, compact destination browsing, preserved all 44 public Christmas walks and four filming journeys, and added homepage Watch/Plan links plus recursive guide sitemap discovery. Production build, targeted lint, data/image/link tests and desktop/mobile browser checks passed. Source provenance is in docs/christmas-markets/colmar-guide-provenance.json. Local draft only; no push or deployment.
- 2026-10-13: Added the custom Colmar guide map using the owner's two public 2023 KML routes, preserving every coordinate. Added Mapbox styling, day/evening toggle, six market pins, two landmark stops, photo details and timestamp links; current Koifhus/Gourmet pins checked against official sources. Production build, targeted lint, route/data validation and desktop/mobile browser checks passed. Original Google maps and enriched video pages unchanged. Local preview only; no push or deployment.
- 2026-10-13: Enabled direct mouse-wheel zoom on the Colmar guide map at the owner's request and updated the map hint. Targeted lint and production build passed. Local change only; no push or deployment.
- 2026-10-13: Added a Street / Satellite toggle to the Colmar guide map. Switching backgrounds preserves route/stop selection and camera; brighter outlined route colors keep paths visible on imagery. Retained mouse-wheel zoom. Targeted lint, production build and desktop/mobile browser checks passed. Local only; no push or deployment.
- 2026-10-13: At the owner's explicit request, committed the map controls as 70e37f7 and pushed all three Colmar commits to main. Production build, data validation and targeted lint passed; Vercel reported a successful deployment and the live Colmar guide loaded with its route map and satellite toggle. Older untracked design drafts and private trip reviews remain local.
- 2026-10-14: Reused the Alsace orientation map across Colmar, Ribeauville, Kaysersberg, Riquewihr, Strasbourg and Basel market pages. Added direct Strasbourg/Basel map links and starter pages from the public film catalog. Each final camera view centers on its own town; shared geometry, links and focus styling replace Colmar-specific behavior. Basel retains Switzerland labeling. Build, lint, six-city camera/link regression checks and browser checks passed. Local only; no push or deployment.
- 2026-10-14: Replaced the Colmar guide map with the suggested visitor walk (233 points) and station approach (24 points). Added six numbered markets, three photo viewpoints with tips, train/parking/food/grocery/landmark pins, category filters, walking-direction links, satellite and direct wheel zoom. Preserved original film routes. Route fidelity tests, targeted lint, production build and desktop/mobile browser checks passed. Local preview only; no push or deployment.
- 2026-10-14: Refreshed the Colmar visitor map from the updated public KML, preserving all 246 smoothed main-route points and the unchanged 24-point station approach. Verified the attached Koifhus and Maison des Tetes photos in Google My Maps. Route data tests and production build passed. Local only; no push or deployment.
- 2026-10-14: Added Maison des Tetes as a Colmar visitor-map photo stop using the owner's mapped location and named 2025 original, exported as WebP. Portrait preview shows the full facade. Data checks, targeted lint, production build and browser selection/image checks passed. Local only; no push or deployment.
- 2026-10-14: Reviewed public site copy and removed third-person references to Isaac across map notes, About, metadata and homepage preview. Reworked Christmas guide/trip text and main site pages into a natural first-person voice while retaining direct practical descriptions. Added a permanent writing-voice rule. Production build, existing data checks, targeted lint and Colmar/About browser checks passed. Trip-data copy committed locally as 1171d8b per data-file policy; remaining copy edits are local. No push or deployment.
- 2026-10-14: Removed the rendered field-note section and three-photo gallery while retaining archive assets/source records. Reordered the shared guide to dates, regional planning/transport, optional Christmas Shuttles, visitor map, photo stops and videos, followed by other trips/nearby walks. Added shared verified 2026 Alsace shuttle data and official timetable/ticket link; corrected the weekend-only claim for Eguisheim. Desktop/mobile layout, navigation targets, removed-content checks, production build, lint and existing data validation passed. Shuttle data/type/source records committed locally as d29b9dd; UI remains local. No push or deployment.
- 2026-10-14: Clarified the Colmar visitor-map section as a suggested route through all six Christmas markets, with first-person copy about the 2023 and 2025 filming visits and route planning. Promoted the Google Maps link to a prominent responsive button and retained station-arrival guidance below the stops. Production build, targeted lint and desktop/mobile preview checks passed. Local only; no push or deployment.
- 2026-10-14: Added the named Colmar Sign0.jpg archive photo to the Champ de Mars visitor-map photo stop as a 1200x675 WebP, with alt text and source provenance. Reviewed the eight sign candidates and inventoried the new 2023/2025 location folders; originals remain untouched. Production build, targeted lint, image-reference checks and rendered browser photo verification passed. Required map data/photo local commit: 0c1ff57. No push or deployment.
- 2026-10-14: Added visitor-map photo galleries with manual arrows, touch-swipe support, photo counts, keyboard navigation, and an enlarged dialog. Selected 11 web exports from the named archive folders for four multi-photo markets and one single-photo Gourmet stop; preserved originals and recorded source hashes. Stops reset to their first photo; single/missing-photo states and desktop/mobile layouts verified. Production build, targeted lint and image audits passed. Local commits cef0909 and 2d29362; no push or deployment.
- 2026-10-14: Refreshed the owner Google My Maps export and added Petite Venise canal boat rides and canal-side outdoor dining under Useful stops, with distinct boat/dining icons and walking-direction links. Verified that all 20 existing source pins and both route lines (246/24 vertices) are unchanged; only two source pins were added. Production build, targeted lint, coordinate comparison and desktop/mobile selection checks passed. Local commit ee1b35b; no push or deployment.
- 2026-10-14: Simplified the Colmar guide by removing the repeated linger gallery and placing two day/evening video cards directly below the visitor route map. Added visible visit essentials; moved holiday hours, transport/parking, shuttle fares/routes and historical filming-trip details into accessible disclosures. Kept map galleries and route geometry intact. Targeted lint, production build and desktop/mobile player, disclosure and layout checks passed. Guide essentials committed locally as 2b45438; UI changes remain local. No push or deployment.
- 2026-10-14: At the explicit request of the owner, committed the current website checkpoint as e025a31 and pushed all eight pending commits to main. Includes Colmar visitor routes/photo galleries, regional orientation maps and five starter market pages, compact planning/video layout and first-person copy. Production build, targeted lint and tour-data validation passed. Vercel reported success for e025a31; live Colmar content and both maps loaded. Older local homepage experiments, source briefs and review screenshots remain untracked. Existing Vercel hostname only; no domain migration.
- 2026-10-14: Pinned the Colmar guide navigation below the site header, with a single horizontally scrollable row on phones. Added shared scroll offsets so anchor jumps and selected map stops stay clear of both headers. Updated At a Glance with at least three hours, growing crowds, sunset/evening atmosphere and the start at the Colmar sign in Parc du Champ de Mars toward Place des Dominicains. Production build, targeted lint and desktop/mobile anchor/menu/map-stop checks passed. Data saved locally as b6d203d; no push or deployment.
- 2026-10-14: Added shared section heading icons for visit planning, the regional overview, Christmas Shuttles, the suggested walking route, Prowalk videos and nearby walks. Used consistent dark-green line icons and a compact WebP copy of the existing Prowalk logo. Targeted lint, production build and desktop/mobile layout checks passed. Local preview only; no push or deployment.
- 2026-10-14: Clarified the Christmas Shuttles opening paragraph: most routes run Friday-Sunday, while Eguisheim line 3 runs daily during the shuttle season. Rechecked the official operator table; targeted lint, production build and rendered HTML verification passed. Saved the data change locally as 90088fd; no push or deployment.
- 2026-10-14: Added the first self-guided Colmar itinerary with 14 ordered stops, next/previous navigation, arrival links and the existing stop photo galleries. Included owner notes for the Colmar sign, Place Rapp pyramid, Dominicains courtyard at 23 Rue des Serruriers, confirmed Monoprix passage, Saint-Martin circuit and Koifhus viewpoint; later stops follow the existing visitor route. Added six collapsed FAQs with official tourism/museum sources. Preserved route geometry and free map exploration. Data/reference checks, targeted lint, production build and desktop/mobile navigation, carousel, FAQ and layout checks passed. Data committed locally as 457905f; UI changes remain local. No push or deployment.
- 2026-10-14: At the explicit request of the owner, committed the itinerary UI, collapsed FAQ, sticky guide navigation, section icons and logo as e14657f, then pushed all four pending Colmar commits to main. Production build, targeted lint and tour-data validation passed. Vercel reported success for e14657f; the live Colmar page loaded the new 14-stop itinerary, FAQ and map, and stop selection worked. Unrelated untracked drafts and source material remain local. Existing Vercel hostname only; no domain migration.
