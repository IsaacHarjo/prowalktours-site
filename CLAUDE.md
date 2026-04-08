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
- Weekly uploads every **Saturday at 6am PST**
- The site should give older videos new life through search and
  destination browsing, and serve as a serious business asset

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

### France Catalog — scripts/refresh-france-catalog.js ✓ BUILT
Reads france.csv and updates France data files automatically.
Run after every Google Sheets export:
```
node scripts/refresh-france-catalog.js
```
Always run `git status` after to review changes before committing.
Handles: new tours, updated fields, status changes, lat/long
corrections, weather data — all synced from CSV automatically.

### Highlight Image Extraction — scripts/fetch-highlight-images.js ✓ BUILT
See Highlight Images section below for full details.

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
- **Data entered in master sheet:** Italy (373 tours), France (48 tours), Germany (20 tours)
- **Remaining 22 countries:** Data entry not yet started
- Do not build pages for a country until its data is in the master sheet
  and exported — confirm with user before starting a new country

### Known Countries with Pages or Partial Work
(Read app/destinations/ directory for current list)
- Italy ✓ — destination page + many video pages
- France ✓ — destination page + video pages being built
- Croatia — page exists (check app/destinations/croatia)
- Slovenia — page exists (check app/destinations/slovenia)
- Germany ✓ — destination page exists + 20 Christmas market tours in master sheet
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

## Codex / Claude Code Prompt Tips
When giving prompts for new video pages, always specify:
- Exact file paths to edit
- Reference pages to use as template
- "Do not edit any other file"
- "Show exact diff and list every file changed after editing"

---

## Highlight Images
- Location: public/[slug]/highlights/
- Naming: [city]-[landmark-description].jpg
  - Lowercase, hyphen-separated, no timestamp, NO trailing number
- Legacy files may have trailing 0 — do not rename, do not replicate
- Script: scripts/fetch-highlight-images.js
  - Downloads video once at lower quality, extracts all frames locally,
    deletes temp file after — much faster than remote stream seeking
  - Skips existing files (never overwrites)
  - Run one tour at a time:
    node scripts/fetch-highlight-images.js [slug]
  - Dry run: node scripts/fetch-highlight-images.js [slug] --dry-run
  - After running, update imageSrc paths in data/video-details/[slug].ts
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
