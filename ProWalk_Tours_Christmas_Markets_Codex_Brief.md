# ProWalk Tours — Christmas Markets Website Build Brief

**Purpose:** Provide Codex with an actionable first-draft implementation plan for the existing ProWalk Tours website. This is a working brief, not permission to deploy or replace existing work without review.

## Background and vision

ProWalk Tours is evolving from a browsable walking-tour video library into a travel-planning resource built around original walking-tour footage, personal destination knowledge, and practical information. The immediate priority is the **2026 European Christmas Markets** season. The existing website already has tours, search, destination pages, a map, and a Christmas Markets section with historical trip itineraries. Preserve and build on that foundation rather than starting over.

The broader vision includes future **ProWalk Tours Stays** (personally reviewed accommodation recommendations, videos, disclosures and booking links) and **ProWalk Tours & Guides** (trusted local guides, tours, transportation, ferries and booking links). These are future features, **not in the first build**.

## Goals for this iteration

1. Make the home page visibly offer **two complementary paths**: **Watch Walking Tours** and **Plan Your Trip**, with a seasonal feature linking to **Plan Your 2026 European Christmas Market Trip**. Keep the existing video-library identity and functionality.
2. Redesign the Christmas Markets landing page as a **destination-first travel directory**, rather than a long wall of large video thumbnails. Feature the most useful cities and organize by country or region, with small attractive image cards and concise descriptions.
3. Give each destination its **own reusable guide page**. **Colmar, France** is the first fully populated example and template for future destinations.
4. Surface existing filming itineraries as **example routes** rather than hiding them at the bottom. Highlight the creator's purposeful Basel–Alsace–Freiburg–Strasbourg market route as a potential sample itinerary. **Do not** present the separate Oslo/Copenhagen family-linked trip as a tightly optimized multi-market itinerary.
5. Ensure **2026-specific details** are separated from evergreen descriptions, checked against reliable official sources and accompanied by a **source URL** and **last verified** date. Do not recycle 2025 dates or guess 2026 dates/hours.
6. Build a workflow that can eventually scale to 500+ tours without manually designing each page.

## Landing page concept: Christmas Markets 2026

- Intro section: visually strong but compact hero image and clear introductory text explaining what visitors can plan here.
- Quick navigation: **Browse Destinations**, **Suggested Itineraries**, **Watch the Walks**, and optionally **Planning Essentials**.
- Directory: region/country groupings, with **compact destination cards** (e.g., Colmar, Strasbourg, Freiburg, Basel), each with image, location, one-line value proposition and link to the destination guide. Show a useful subset first; progressive expansion or filters for larger libraries.
- Featured itinerary area: a map/route-style presentation for a logical cluster, connecting existing tour content to practical travel planning. Reuse existing site map capabilities if suitable.
- Videos should remain accessible but should **not** dominate the top of the landing page or force excessive scrolling.
- Work well on mobile and desktop; respect accessibility, loading speed, and visual consistency with the existing site.

## Colmar destination guide: first reusable template

Suggested page structure:

1. **Destination identity:** hero image, Colmar, France, overview and why this market area is special.
2. **2026 market information:** officially announced dates, individual market names, opening times, special closures, official organizer links; clear status if information is unconfirmed. Show sources and **last checked** date. Official sites should be treated as the primary source.
3. **Getting there and around:** useful train, walking, transit, and nearby destination connections, grounded in verified sources; do not invent schedules or prices.
4. **What to see:** concise local highlights, landmarks and distinct market areas. Repurpose the creator's existing video captions, chapter timestamps, notes and first-hand experience **where available**, with factual verification as appropriate.
5. **Watch the walking tours:** one featured player and a **compact list** of remaining Colmar videos with small thumbnails and metadata (filming year, day/night, duration when available). Show a limited number initially with an option to expand. Link or embed existing videos without duplicating data unnecessarily.
6. **Suggested routes:** links to related Christmas market destinations and the relevant itinerary.
7. **Where to stay / tours and transportation:** future-ready sections or optional data slots, but **do not publish unvetted recommendations, affiliate claims or placeholder booking offers**.

Use reusable components/data models, not one-off markup that must be copied manually for every city.

## Photo library and automated selection workflow

**Important:** The original photo archive lives **outside the website repository**. Do not bulk-copy it into `public/`, Git, or Vercel. Codex may need local workspace access or explicit paths; do not assume it can read every folder on the computer.

Example directory structure (adapt existing project paths instead of moving the site):

```text
ProWalk Tours/
├── prowalktours-site/                 # Existing website repository
└── Media Library/                    # Source images, kept outside repo
    └── Christmas Markets/
        ├── France/
        │   ├── Colmar/
        │   │   ├── Originals/        # Full-resolution originals, grouped by year if useful
        │   │   ├── Selects/          # Auto-generated shortlist, then approved picks
        │   │   └── Notes.md         # Personal notes and observations
        │   └── Strasbourg/
        ├── Germany/
        │   └── Freiburg/
        └── Switzerland/
            └── Basel/
```

**Codex photo process:**

1. Inspect file counts, formats, dimensions and sizes; work **read-only** on originals.
2. Create contact sheets showing **labeled thumbnails with filenames**, grouped in manageable batches; optionally flag duplicates and obvious technical issues. Do not delete any photos.
3. Assess composition, clarity, subject, orientation, usefulness and variety; shortlist approximately **10–15 Colmar photos**, including possible desktop/mobile hero images and supporting market, landmark, street, atmosphere and food images. Use visual inspection; don't rely solely on automated blur scores.
4. Produce a concise **selection manifest** containing source paths, proposed page placement, and rationale. Let the creator approve before committing final selections when possible.
5. Export only approved/selected images into the website's existing image architecture in appropriately sized formats such as WebP/AVIF, with descriptive filenames and alt text. Preserve original files and metadata; avoid upscaling or distorting images.
6. Keep contact sheets and review outputs outside the deployed website unless specifically requested.

Codex can help automate organization and contact sheets. Its ability to visually evaluate a large photo archive depends on the tools and image-reading capabilities available in that session; if necessary, prepare contact sheets for visual review.

## Data and content architecture

- Inspect the actual repository and identify its framework, current data sources, routes, components, map integration and existing Christmas Markets/Colmar pages **before editing**.
- Reuse existing video metadata, routes, links and captions wherever possible. Avoid duplicate hardcoded tour lists.
- Model destination guides as structured content (e.g., existing CMS, JSON/MDX or data source as appropriate): evergreen overview, markets-by-year, official links, last-verified timestamp, transit, highlights, featured tour and other tours, nearby destinations, itinerary references, photo manifest.
- Time-sensitive seasonal data must be independently editable, with clear distinction between **confirmed**, **pending announcement**, and **historical** information.
- Design for future reuse beyond Christmas markets and for wider travel guides.
- Keep internal/editor-only unfinished content out of public pages.

## Explicit scope and safeguards

- Start with a **first rough draft** of the revised Christmas Markets landing page and **one complete Colmar page**, plus a modest homepage seasonal entry point. No mass generation of 500 pages.
- **Do not remove** current tours, search, navigation, itineraries, maps, destination routes, working SEO metadata or licensing functionality.
- Do not overwrite existing design or files without first inspecting and explaining changes.
- Do not invent market dates, opening hours, prices, affiliations, hotels, guide endorsements, or official sources.
- Do not deploy to production or publish unfinished content without approval. Work locally / in a preview branch, as appropriate.
- Respect performance, accessible markup, responsive layouts, attribution and any site licensing requirements.

## Requested Codex deliverables

1. Short audit of current relevant pages and proposed reuse.
2. Small implementation plan with affected files, reusable components and data schema.
3. First draft of Christmas Markets landing page, Colmar guide page, and homepage seasonal feature.
4. Colmar image contact sheets, shortlist and manifest (if local photo directory is accessible), without modifying source originals.
5. Clear list of **missing information requiring verification or creator input**.
6. Local preview/build instructions, tests, and a change summary.

## Suggested initial message to Codex

> Please review the attached ProWalk Tours Christmas Markets build brief and inspect my current website codebase before changing anything. I want a **first rough draft** focused on a redesigned 2026 Christmas Markets landing page, a reusable destination-guide template populated for **Colmar**, and a small homepage entry point for Christmas-market trip planning. Preserve current features and design where feasible. Begin with an audit and implementation plan, then build the draft locally. Do not deploy or overwrite photo originals. Use current 2026 official market information only when verified; otherwise label it pending. If you can access my local Colmar image library, generate labeled contact sheets and a suggested shortlist before optimizing any images. Report what you changed and what still needs my review.

## Decisions to make after seeing the first draft

- Which content stays above the fold on the Christmas Markets page?
- Should itinerary pages become their own top-level travel-planning format?
- Should visitors filter by region, country, market dates or travel duration?
- Which Colmar photos and hero treatment best represent the destination?
- How and when to add Stays, Guides, verified transport links, and any affiliate disclosures?
- Whether to automate annual market-information verification before each holiday season.
