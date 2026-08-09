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
  Claude Code to audit and fix.

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

## VS Code Workspace Config
Workspace settings live in `.vscode/` (committed to the repo).

### Tasks — prefer these over typing commands manually
Run with **Ctrl+Shift+P → "Tasks: Run Task"**. Claude Code should mention these
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

## Codex / Claude Code Prompt Tips
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
The file .claude/settings.json contains a hook that automatically
warns when a CSV file is modified but not committed. If this file
does not exist, ask Claude Code to create it:
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

### Active Priority List
1. Update all code references from france-highlights.csv → all-highlights.csv
2. Build /press page (content ready — see Press & Partnerships section)
3. Connect /licensing form to email service (Resend or Formspree)
4. Fix nav dead links (Store, About, Map)
5. Add hero images for fr-0014 through fr-0024
6. Mobile map height fix (Italy first, then all country pages)
7. Build remaining Italy video pages
8. Add remaining country data to master sheet (one country at a time)
9. Build Mapbox maps for each new country as data is added
10. Enhance search (landmark timestamps, filter by video_type, region)
11. Full mobile responsiveness audit across all pages
12. Connect to YouTube API for live data
13. Generate and maintain sitemap.xml automatically
14. Build downloadable PDF media kit from /press page content
15. Future: Prowalk Tours mobile app (Expo/React Native)

### World Map — Known Unavailable Videos (skip these forever)
- freiburg-christmas-market-evening-walk-2025 — members only, cannot extract
- rothenburg-christmas-market-morning-walk-2024 — members only, cannot extract

---

## Session Log
[Claude Code: append one line here at the end of every session]
- 2026-03-31: CLAUDE.md created. Search normalization fix committed.
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
  CLAUDE.md — ready to build next session.
- 2026-04-02 (continued): Germany sheet added to master Google Sheet
  (de-0001 through de-0020, all Christmas market tours). Germany
  highlights added to highlights tab (322 rows). all_tours sheet
  updated to include Germany. Highlights file renamed from
  france-highlights.csv to all-highlights.csv — update all code
  references on next session. 2025 Video Log update guide created
  (56 rows flagged for status/URL updates).
- 2026-04-02 (end of day): All France + Germany video pages now live
  on site. France + Germany Mapbox maps both complete. naples SEO fix
  confirmed done. Claude Code Insights report reviewed — Data Validation
  Rules added to CLAUDE.md. CLAUDE.md cleaned up — stale items removed,
  completed items archived, priority list updated to reflect current state.
  Hooks file (.claude/settings.json) to be created next session.
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
  behavior and safe-slug list in this CLAUDE.md.
