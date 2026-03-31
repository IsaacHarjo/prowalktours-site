# Prowalk Tours Website — Project Brief for Claude Code

## What This Project Is
A website for the **Prowalk Tours YouTube channel**, featuring 
first-person walking tour videos of cities around the world. 
Visitors can browse tours by country/city, watch embedded YouTube 
videos, and explore interactive Mapbox maps of each walk.

- **Dev URL:** https://prowalktours-site.vercel.app
- **Final URL:** https://www.prowalktours.com (switch when complete)
- **Deployed on:** Vercel (auto-deploys on every git push)
- **Local path:** D:\Projects\prowalktours-site

## YouTube Channel
Channel: Prowalk Tours — first-person walking tours of cities 
worldwide. The website complements the channel and drives traffic 
between the two.

## Tech Stack
- Next.js (App Router)
- Tailwind CSS for all styling
- CSV files for tour data (exported from Google Sheets master)
- Mapbox GL JS for interactive maps
- Vercel for deployment
- Git for version control

## Master Data Source — Google Sheets
The source of truth for all tour data is a Google Sheets file 
called **Prowalk_Tours_Master_Maps** with these sheets:

- **Italy** — 373 tours
- **France** — 46 tours (more country sheets to be added)
- **highlights** — timestamped landmark highlights per tour
- **all_tours** — auto-combined view of all country sheets
- **Schema** — rules and column definitions

### Data Schema (columns per tour)
Every tour has these fields — use them when building pages:
- `tour_id` — permanent unique ID (e.g. it-0001, fr-0002)
- `country`, `region`, `city`, `location` — geography
- `title` — public-facing video title
- `slug` — URL slug (e.g. antibes-daytime-walk-2025)
- `slug_override` — manual slug when formula needs overriding
- `video_type` — day-walk, evening-walk, bike-tour, scooter-tour,
  drone-tour, boat-tour, 360-tour, drive-tour, hike
- `themes` — comma-separated tags (e.g. coastal, historic-center)
- `filmed_date_iso`, `filmed_year` — when it was filmed
- `youtube_url` — YouTube embed link
- `map_url` — Google My Maps link (temporary until Mapbox built)
- `latitude`, `longitude` — tour start point (used for Mapbox)
- `distance_label`, `distance_miles`, `distance_km`
- `duration_label`, `duration_seconds`
- `description_short` — one sentence for cards/popups
- `description_long` — full description for tour page
- `landmarks` — comma-separated landmark list
- `keywords` — SEO keywords
- `status` — draft | ready | published
- `thumbnail_path` — image path for tour card

### Highlights Schema (timestamped landmarks)
Each tour can have multiple highlight rows:
- `highlight_id`, `tour_id` — links back to tour
- `time_label`, `seconds` — timestamp in video
- `highlight_title`, `landmark` — display name
- `search_terms` — for search functionality

## CSV Files in Project
The Google Sheets data is exported to CSV files used by the site.
Always read the actual CSV files to get current tour data — 
do not hardcode tour information.

## Map Strategy
- **Italy:** Mapbox interactive map — DONE ✓ (use as template)
- **France:** Google My Maps currently — Mapbox to be built
- **22 remaining countries:** Google My Maps currently — 
  Mapbox maps to be built as data is added country by country
- **World browse map:** Single global Mapbox showing ALL tours
  across all 24 countries — TO BUILD (will grow as data added)

## Architecture Rules — ALWAYS Follow These
- **Split every page into server + client components**
  - Server component = metadata/SEO (never skip this)
  - Client component = maps, video embeds, interactivity
- **Metadata is critical on EVERY page** — title, description,
  Open Graph tags — SEO is a top priority for this site
- **NEVER export metadata from a client component** — this 
  completely breaks SEO
- **Tailwind only** — no inline styles, no separate CSS files
- **Mobile responsive** — check mobile on every new component
- **After every change:** git add → git commit → git push

## Tour Page Structure (Template for All New Pages)
1. Server component: metadata with title, description, OG tags
2. Client component: YouTube embed + Mapbox map + tour details
3. Pull all data from CSV file using tour slug
4. Show: title, filmed date, distance, duration, description_long
5. Show landmarks list with highlight timestamps if available
6. Link to country page and world map

## Current Status
[Update this section after every session]

## Completed So Far
- Project structure and Vercel deployment pipeline
- Search page with normalization for punctuation and accents
- Italy Mapbox interactive map
- Some tour pages live (check /app directory for current list)

## Known Issues — Fix First
- **naples-daytime-walk-2023:** Needs server/client split to 
  restore broken SEO metadata — HIGH PRIORITY

## Major Features Still To Build (Priority Order)
1. Fix SEO metadata on all existing tour pages
2. Build out remaining tour pages (373 Italy + 46 France + more)
3. Build Mapbox map for France (then each remaining country)
4. Build world browse map
5. Improve homepage
6. Improve search (highlight timestamps, filter by video_type)
7. Full mobile responsiveness audit
8. Connect to YouTube API for live data

## Things To NEVER Do
- Never put metadata in a client component
- Never use inline styles — Tailwind only
- Never commit a broken build
- Never skip SEO metadata on any page
- Never hardcode tour data — always read from CSV
- Never use Google My Maps for newly built pages — use Mapbox

## Session Log
[Append one line here at the end of every session]
- 2026-03-31: Initial setup, search normalization, Italy Mapbox,
  began naples SEO fix. CLAUDE.md created.
  
  ## Countries & Data Status
The channel has walking tours across 24 countries total.
Google Sheets master data has been built out for:
- **Italy** — 373 tours — data complete ✓
- **France** — 46 tours — data complete ✓
- **22 other countries** — tours exist on YouTube but data 
  has NOT been entered into the master sheet yet

When building new country sheets and pages, always follow the 
same schema established in the Italy and France sheets.
Do not build pages for countries until their data has been 
entered into the master sheet and exported to CSV.