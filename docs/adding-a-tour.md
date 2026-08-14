# Adding a Tour — End to End

The complete process for taking a finished walking-tour video and shipping it
as a live page on prowalktours.com. Written for future sessions and future
you.

Two paths are covered:

- **`[BULK]`** — importing a whole country's worth of tours at once. Built
  for the France/Germany/Italy/Canada onboarding pattern. Assumes a fresh
  export from Google Sheets and a fresh generator run.
- **`[SINGLE]`** — publishing one new tour into a country that's already
  onboarded. Much shorter path — skips the upstream MyMaps step entirely.
- **`[BOTH]`** — steps that apply to either path.

Every step is labelled. If you're only doing one tour, safely skip past
`[BULK]`-only sections.

Cross-reference: [CLAUDE.md](../CLAUDE.md) is the project reference doc
(never-do rules, SEO patterns, hard schemas, per-file conventions). This doc
is the workflow — read them together.

---

## The pipeline at a glance

```
Google My Maps (per country)          ┐
        │  File → Download → CSV      │
        ▼                             │
Ad-hoc parser → paste-ready rows      │  [BULK] only
        │                             │
        ▼                             │
Google Sheets (per-country tab +      │
    highlights tab)                   ┘
        │
        │  File → Download → CSV        [BOTH — for the row(s) that changed]
        ▼
data/maps/[country].csv
data/import/all-highlights.csv
        │
        │  node scripts/import-[country]-csv.js
        ▼
data/videos/[country].ts        (video catalog — feeds search + world map)
data/maps/[country].ts          (Mapbox features for the country map)
        │
        │  node scripts/generate-video-page.js <slug>
        ▼
data/video-details/[slug].ts    (page-level detail record — enrich by hand)
app/videos/[slug]/page.tsx      (server component — metadata, JSON-LD)
app/videos/[slug]/[Slug]Client.tsx  (client component — layout, iframe, highlights)
public/[slug]/highlights/       (empty dir, ready for image assets)
        │
        │  hand-authored:
        │    public/[slug]/hero.jpg
        │    public/[slug]/highlights/*.jpg
        │    data/video-details/[slug].notes.md   (see §8)
        │    highlight enrichment in the detail file
        │    destination-page card
        ▼
Local build + Rich Results Test → commit → push → Vercel deploy
```

---

## 1. Upstream — Google My Maps → Google Sheet

**`[BULK]` only.** Skip this whole section if you're adding one tour to a
country that already has a Sheet tab.

### What lives where

- **One Google My Maps per country.** Each walk on the channel is a marker on
  that country's map. Marker description carries every field we later need
  in the Sheet:
  - description (long)
  - video link (YouTube URL)
  - map link (link to a Google My Maps route for that specific walk)
  - duration (h:mm:ss)
  - day (weekday)
  - date (ISO)
  - time (of day)
  - type (day-walk, evening-walk, bike-tour, 360-tour, drone-tour, …)
  - theme (comma-separated tags)
  - region
  - distance (mi + km)
  - weather (temperature °F / °C)
  - per-timestamp highlight lines
- **One Google Sheet — `Prowalk_Tours_Master_Maps`.** One tab per country,
  plus `highlights`, `all_tours`, `Schema`.

### Export → parse → paste

1. In Google My Maps: **File → Download → CSV** (or KML/CSV, then take the
   CSV output).
2. The CSV that comes out is *weirdly shaped*. Each tour row starts with
   `POINT (lon lat)` in the WKT column, and each tour's timestamped
   highlight lines spill onto the following unquoted rows — they are NOT
   nested inside the tour's CSV row.
3. Parse it into two paste-ready blocks:
   - **Country-tab rows** — one row per tour, columns matching the country
     tab's schema.
   - **Highlights rows** — one row per timestamp, columns matching the
     `highlights` tab (`tour_id`, `slug`, `title`, `youtube_url`,
     `time_label`, `seconds`, `highlight_title`, `landmark`,
     `search_terms`).
4. Paste each block into the corresponding tab.

> **⚠ AUTOMATION GAP — Item 3 in §12.** No parser script exists today; this
> step has been done ad hoc in chat sessions. Write `scripts/parse-mymaps.js`
> before doing this for the next country.

### Two rules that matter

- **Duplicate an existing country tab; don't create a blank one.** The
  Sheet has formula columns (`slug`, `slug_override` fallback, computed
  descriptions) that only survive if the tab is copied from a working
  one. Blank tabs miss the formulas silently and produce broken CSVs.
- **Never export CSV through Excel.** Google Sheets → **File → Download →
  CSV** direct. Opening the file in Excel and re-saving introduces UTF-8
  mojibake (`â€"`, `â€™`, `â€œ`) that has to be repaired later with
  `scripts/fix-encoding.js`. Cheapest fix is to never let Excel touch it.

---

## 2. Sheets → repo

**`[BOTH]`**, but the scope differs:

- **`[BULK]`** — replace the whole country CSV file. Replace the whole
  highlights CSV file.
- **`[SINGLE]`** — download the country tab and the highlights tab, drop
  them in place. Only the intended row(s) should show up in `git diff`.

### Files to update

| File | Source (tab in the Sheet) |
|---|---|
| `data/maps/france.csv` (etc.) | The per-country tab |
| `data/import/all-highlights.csv` | The `highlights` tab (**always the whole tab**, never per-country files) |

### Rules

- **`all-highlights.csv` is the site-wide search index.** Every timestamp
  from every country lives in this one file. Never create per-country
  highlight files. Never rename it back to `france-highlights.csv`. (See
  CLAUDE.md — this rule caused a rename bug and gets its own callout.)
- **Commit CSV changes immediately.** Per the "never leave data file
  changes uncommitted" rule. The `.claude/settings.json` hook warns you
  when a CSV is modified but not committed — heed it.
- **`[SINGLE]`** — before committing, review the diff. Only the newly-added
  tour row(s) and the new highlight rows should be present. If Google
  Sheets re-orders anything or Excel snuck in and re-encoded characters,
  spot it now.

---

## 3. Regenerate the catalog + map features

**`[BOTH]`** — identical step.

Run the country-specific import script:

```bash
node scripts/import-france-csv.js
# or
node scripts/import-germany-csv.js
# or
node scripts/import-italy-csv.js
# or
node scripts/import-canada-csv.js
```

Each script:

- Reads `data/maps/[country].csv`.
- Regenerates `data/videos/[country].ts` — the catalog (feeds search, world
  map, destination pages).
- Regenerates `data/maps/[country].ts` — Mapbox features for the country
  map page.
- **Preserves existing `highlights: [...]` arrays** on catalog records
  that already had them. Only new records start with `highlights: []`.

`--dry-run` shows the diff without writing.

> **⚠ TEMPORARY GAP — as of writing** ⚠
>
> Only `import-france-csv.js` and `import-germany-csv.js` exist. Italy and
> Canada scripts are Automation item 2. Until they land, doing a `[SINGLE]`
> tour for Italy or Canada requires editing `data/videos/[country].ts` and
> `data/maps/[country].ts` by hand — hand-edit the new record, preserve the
> ordering, no free lunch. Fix the scripts before the next Italy tour.

---

## 4. Generate the page files

**`[BOTH]`** — same script, different invocation.

```bash
# [SINGLE]
node scripts/generate-video-page.js <slug>

# [BULK]
node scripts/generate-video-page.js --batch <slug1> <slug2> <slug3> ...
```

For each slug, the generator writes:

- `data/video-details/[slug].ts` — the enrichment surface (highlights,
  hero copy, licensing copy). Skeleton only, with empty `imageSrc`,
  `alt`, `description` on every highlight.
- `app/videos/[slug]/page.tsx` — server component: metadata, breadcrumb
  JSON-LD, VideoObject JSON-LD (including `hasPart` clips).
- `app/videos/[slug]/[Slug]Client.tsx` — client component: layout,
  YouTube iframe, highlights carousel, licensing hub, related tours.
- `public/[slug]/highlights/` — empty directory, ready for image drops.

Behaviour:

- **Skips slugs whose `page.tsx` already exists.** Safe to re-run for
  stragglers in a batch. If you *want* to regenerate a page, delete
  `page.tsx` first (and understand that the client will regenerate too —
  any hand-edits are lost). The detail file is separately skip-if-exists.
- **Emits current SEO patterns** (see CLAUDE.md → SEO Patterns):
  server-rendered `<script type="application/ld+json">` via
  `stringifyJsonLd`, `hasPart` populated from `data/video-details/*.ts`
  highlights, `useInitialVideoStartTime` wired for `?t=` deep links,
  autoplay off. Nothing to patch by hand.

> **⚠ TEMPORARY GAP — as of writing** ⚠
>
> The generator template still emits the **pre-SEO-migration** pattern —
> `<Script>` from `next/script`, no `hasPart`, no
> `useInitialVideoStartTime`, no `stringifyJsonLd`. Until Automation item
> 1 lands, every generated page needs the SEO patch applied by hand. The
> exact shape is in commits `daaa53f`..`56d4056`. **Fix the generator
> template first**, before doing this at scale.

---

## 5. Media authoring

**`[BOTH]`**, per tour.

### Hero image

- Path: `public/[slug]/hero.jpg`
- Produced by hand (extract a still + Photoshop crop, or a real photograph).
- 16:9 or wider. Displayed at up to 1200px wide on the page and in OG
  metadata.

### Highlight images

Two workflows, pick per tour:

- **Photoshop batch action (Arles pattern — the reference).** Extract raw
  frames from the video, run the batch action for crop/color/export,
  save into `public/[slug]/highlights/` as `[city]-[landmark]-1.jpg`,
  `-2.jpg`, etc. Multi-image carousels supported by populating
  `images: string[]` on the highlight record.
- **`scripts/fetch-highlight-images.js` (legacy, one-frame-per-highlight).**
  Downloads the video once at lower quality, extracts all frames
  locally, deletes the temp file after. Faster for tours that don't
  need multi-image carousels. Skips existing files. Requires yt-dlp +
  ffmpeg on PATH.

### Naming rules

- Lowercase, hyphen-separated: `arles-amphitheatre.jpg` or
  `arles-amphitheatre-1.jpg`.
- **Never spaces.** The image audit will catch them, but it's cheaper
  to not create them.
- Legacy files with a trailing `0` (`something-0.jpg`) — do not rename,
  do not replicate.

### Image audit

Before committing, verify every referenced image exists on disk. The
one-liner is in CLAUDE.md → Highlight Images → Image audit. Run it. It
catches typos like `arles amphitheatre-1.jpg` (space) before they ship.

---

## 6. Enrich `data/video-details/[slug].ts`

**`[BOTH]`**, per tour.

The generator leaves this file as a skeleton. Fill in:

- `heroDescription` — the paragraph that anchors the hero (~200–500 chars).
- `routeMapDescription` — one or two sentences above the map (~100–300
  chars).
- `licensingDescription: [string, string]` — two paragraphs in the
  Licensing Hub. First one describes what the footage captures; second
  one is a general licensing pitch (usually reused across a country).
- For **each highlight**:
  - `imageSrc` — path to the primary image.
  - `images?: string[]` — optional array for multi-image carousels.
    Include the primary again as index 0 for consistency.
  - `alt` — descriptive alt text (SEO + accessibility).
  - `description` — 1–2 sentences of historical/practical context. This
    is per-highlight prose that renders on the card.

### Rules

- **Never re-run `refresh-highlights.js` on enriched pages.** It's
  destructive — the CSV has no image paths, descriptions, or alt text,
  so it wipes them all. The safe-slug list is in CLAUDE.md. Add your
  new slug to that list the moment you start enriching it.
- **Currently unused fields** — `highlight.caption` (required by type,
  rendered by only one client) and `highlight.proTip` (typed, never
  rendered). Populate them if you want; they won't show up. See §12
  item 5 for the cleanup plan.

---

## 7. Practical-info notes — `[slug].notes.md`

**`[BOTH]`**, per tour. This is where the first-hand, on-the-ground travel
content lives: parking, costs, best time to visit, getting there, warnings,
accessibility. It's the largest SEO lever on these pages — informational
searches ("parking near the Arles amphitheatre", "best time to walk the
Menton old town") land here, not on the marketing copy.

### Where the file lives

`data/video-details/[slug].notes.md` — colocated with the video-details
TypeScript file.

### Format — freeform Markdown

Author's choice of `##` sections. Pick whichever apply to *this* tour:

```markdown
## Best time to visit

Arles is at its best on Wednesday mornings when the outdoor market runs
along Boulevard des Lices. …

## Parking

The Parking des Lices garage is under €10/day and puts you 5 minutes from
the amphitheatre. Street parking outside the old town is free but scarce.

## Getting there

Direct trains from Avignon (25 min) and Marseille (55 min). …

## Warnings

The Roman amphitheatre floor is uneven — sturdy shoes recommended. Cloitre
Saint-Trophime closes at 4pm in winter.
```

Real semantic `<h2>` / `<h3>` headings are exactly what Google indexes
for these queries. Write for real information intent, not for the site.

### How it renders

A build-time helper (`lib/content/tourNotes.ts`) reads the `.notes.md`
file if it exists and passes the parsed Markdown to a `<TourNotes>`
section rendered between the highlights and the route map. Tours with no
`.notes.md` render nothing extra — no schema change, no build breakage.

### The three-way decision it resolved

Three options were considered for where practical-info content lives:

- **A. Structured typed object on `VideoDetailRecord`.** Add
  `notes?: { parking?; bestTime?; …; }` and render each present key as an
  `<h3>` block.
  - Pro: type-safe, no new dependency.
  - Con: schema straitjacket — a hike, a Christmas market, and a bike
    tour want different sections. Every schema change is a repo-wide
    edit. Multi-paragraph strings in TypeScript are awkward to author.
- **B. Markdown string field on `VideoDetailRecord`.** Add
  `notes?: string` (Markdown), render with `react-markdown`.
  - Pro: flexible format, freeform headings.
  - Con: Markdown embedded in a `.ts` string literal is ergonomically
    painful (escapes, backticks). Diffs on prose changes are noisy.
- **C. Colocated `.notes.md` beside the detail file. ← Chosen.**
  - Pro: best author experience — write Markdown in an actual `.md`
    file with syntax highlighting, preview, and clean diffs. Colocated
    with the TS file so discovery is trivial. Freeform enough for any
    tour type. Emits real `<h2>`/`<h3>` for SEO. Optional per tour.
  - Con: two files per tour (mitigated by colocation). Adds one
    dependency (`react-markdown`).

### Ship path — publishing ONE tour with notes

Three prerequisites, only one of which is per-tour:

1. `react-markdown` installed. **One-time.**
2. `lib/content/tourNotes.ts` build-time helper. **One-time.**
3. `<TourNotes>` section added to *this tour's* client component
   (`app/videos/[slug]/[Slug]Client.tsx`) — about 5 lines. **Per-tour.**

Steps 1 and 2 are shared plumbing. Step 3 is the only per-tour work.

### Site-wide backfill — SEPARATE track

Rolling `<TourNotes>` into the other 56 existing clients is a mechanical
migration on the same shape as the SEO rollout (see commits
`1d93fca..56d4056` for the reference migration pattern). It is scheduled
independently. **It is NOT a prerequisite for publishing a new tour with
notes.** Existing tours simply render nothing extra until their clients
are updated one by one.

---

## 8. Add the tour to its destination page

**`[BOTH]`**, per tour.

Hand-edit the destination page card list:

- `app/destinations/[country]/page.tsx`
- `app/destinations/[country]/[region]/page.tsx` (if the tour belongs
  to a themed sub-hub — e.g. `paris`, `french-riviera`, `provence`,
  `christmas-markets`).

Add a card block referencing the new tour's slug, hero image, and
summary. Follow the existing shape in the page (they're all hand-written
sibling cards).

> **⚠ AUTOMATION GAP — Item 4 in §12.** Destination pages should read
> from the catalog and render cards automatically, filtered by
> region/theme. Until that ships, this step is manual and easy to
> forget. Grep the destination pages for the previous-tour slug after
> pushing to confirm the new tour appears.

---

## 9. QA

**`[BOTH]`**, per tour.

- `npm run build` — must be clean.
- Image audit one-liner (CLAUDE.md → Highlight Images).
- Local spot-check on `npm run dev`:
  - Hero image renders.
  - 2–3 highlight images render (spot-check).
  - Click a highlight → video seeks to that timestamp.
  - Visit `/videos/[slug]?t=180` → iframe loads with the player scrubbed
    to 3:00 (does NOT autoplay — that's correct).
  - New tour appears on its destination page card list.
- After push + Vercel deploy: run the live URL through
  [Google Rich Results Test](https://search.google.com/test/rich-results).
  Should show 1 valid item (VideoObject) with Clips detected.

---

## 10. Commit + push

**`[BOTH]`**, but the chunking differs.

- Never `git add .`. Always add specific files.
- `[SINGLE]` suggested chunking:
  1. Data files (`data/maps/[country].csv`, `data/import/all-highlights.csv`).
  2. Generated pages (`data/videos/[country].ts`, `data/maps/[country].ts`,
     `data/video-details/[slug].ts`, `app/videos/[slug]/**`).
  3. Media (`public/[slug]/**`).
  4. Enrichment diff on `data/video-details/[slug].ts` if separated in time.
  5. `[slug].notes.md` if you're publishing with notes.
  6. Destination page card addition.
- `[BULK]` — same categories, but each is many files. Consider one commit
  per category rather than one per tour to keep history readable.

Vercel auto-deploys on push. There's no separate deploy step.

---

## 11. Cross-references

- **[CLAUDE.md](../CLAUDE.md)** — the project reference. In particular:
  - "Things To NEVER Do" — the destructive rules (no `<Script>` for
    JSON-LD, no autoplay, no `git add .`, never re-run
    `refresh-highlights.js` on enriched pages, no spaces in image
    filenames).
  - "SEO Patterns" — the JSON-LD, `hasPart`, and `?t=` conventions.
  - "Highlight Images" — image audit one-liner, Photoshop workflow,
    multi-image carousel pattern.
  - "Data Validation Rules" — the slug-consistency and CSV-schema rules.

---

## 12. Automation — do these before the next 40 tours

Ranked by pain-per-tour. Items 1 and 2 are **prerequisites** — the flow
above assumes both are done and the two `⚠ TEMPORARY GAP` callouts in
§3 and §4 will be removed the moment they land. Items 3–4 are
"do before the next country." Items 5–7 are "do eventually."

1. **Update the generator + VS Code snippet templates to the current SEO
   pattern.** Every new tour today needs a manual post-generation SEO
   fixup that the tooling should just do. Files:
   `scripts/generate-video-page.js` (the two template strings around the
   `page.tsx` and `Client.tsx` emissions) and
   `.vscode/walk-page.code-snippets`. Reference pattern lives in commits
   `daaa53f..56d4056`. Zero-risk mechanical fix; saves ~15 minutes per
   tour.
2. **Extend the generator to Italy and Canada.** `CSV_PATHS` at the top
   of `generate-video-page.js` lists only France and Germany.
   `getBreadcrumbsForCountry` and `getRelatedTours` have hardcoded
   per-country branches that need Italy + Canada entries. Blocks the
   "add remaining Italy" work item on CLAUDE.md's priority list.
3. **Write the MyMaps CSV parser.** Every bulk country import today
   starts with parsing a `POINT (lon lat)`-with-timestamp-overflow CSV
   by hand in a chat session. A `scripts/parse-mymaps.js input.csv >
   sheet-rows.tsv` eliminates that step. Nontrivial to write (multi-line
   CSV with unquoted overflow rows), but writes itself once. Saves
   hours per country.
4. **Data-drive the destination pages.** The catalog already has
   city/region/theme metadata; destination pages should render tour
   cards automatically, filtered by region/theme. Removes an entire
   manual step and eliminates the "forgot to add the card" failure
   mode.
5. **Decide the fate of `highlight.caption` and `highlight.proTip`.**
   `caption` is required by the type, populated on many tours, rendered
   by exactly one client. `proTip` is typed but never rendered. Either
   wire them into every client or delete them from the type. Currently
   they mislead every new page author.
6. **CI check for the image audit.** Turn the manual bash one-liner
   into a script that runs in CI or a pre-commit hook so filename typos
   can't reach main.
7. **Metadata description length linter.** The generator truncates
   `description` to 155 chars; hand-enriched pages have no enforcement.
   Add a build-time check.
