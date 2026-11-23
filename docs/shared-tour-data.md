# Shared tour data

The homepage map, autocomplete and search now use `lib/tours/server.ts`.
It reads the country CSV exports listed in `lib/tours/countries.ts`. It does
not read `all_tours.csv`, so updating a country no longer requires a separate
combined export for these three features. Google Sheets remains the authoring
source; the website reads committed exports, not the live Sheet on each visit.

## Source and preservation rules

- Permanent `tour_id` is the join key. Duplicate IDs, slugs or YouTube IDs fail validation.
- Existing `data/videos` catalogs remain editorial enrichment and support the
  individual video pages. They do not define the public discovery inventory.
- Existing page slugs are preserved by matching YouTube IDs even if a fresh
  export omits a slug override. Actual `page.tsx` existence determines internal links.
- Country CSV values own geography, video URLs, durations, categories and distances.
  Editorial titles/descriptions and the union of landmarks/keywords preserve enrichment.
- `data/import/all-highlights.csv` remains the single timestamp search index.
  Hits join by tour ID; stale CSV slugs/URLs do not override canonical tour links.
- Hand-enriched `data/video-details` files and image folders are never regenerated
  by this loader. Do not run the destructive highlights refresh on enriched pages.
- Monaco remains Monaco in records; map grouping can place it with France.

## Publication and unfinished footage

The full server collection includes drafts and must never be passed to a client.
Only `discoveryVideos` and `worldTours` are public projections.

Current exports use legacy `status`: `draft`, `ready`, or `published`. A ready
or published row with a valid YouTube URL is treated as public unless an explicit
availability or documented exception says otherwise. This carries forward the
existing editorial status; it is not a fresh YouTube availability check.

Optional future CSV columns:

| Column | Values | Default |
| --- | --- | --- |
| `production_stage` | unknown, filmed, editing, ready-to-upload | unknown |
| `youtube_availability` | unknown, unpublished, public, members-only, unavailable | legacy status mapping |

Source publication status, production stage, YouTube availability and website
page status remain separate. Draft, unknown, unpublished, members-only and
unavailable records do not enter public discovery. Merely having a folder or
an existing webpage does not make footage public. Folder screenshots are not imported.

AGENTS.md identifies de-0009 (Freiburg 2025) and de-0018 (Rothenburg morning 2024)
as members-only; the loader records this provenance. An explicitly supplied
`youtube_availability` supersedes that historical exception when it changes.

## Refresh workflow

1. Update the master country tabs, then export the applicable country CSVs.
2. Review differences before replacing local exports. The September source review
   found the Sheet lacks local Sirmione/Otranto distances and some Arles enrichment;
   preserve or reconcile those values before replacing the export.
3. Run `node scripts/test-tour-data.cjs` and `npm run build`. Row-count assertions
   deliberately require review when the source inventory changes.
4. Check map/search counts, destination links and representative timestamp links.
5. Commit specific changed files and push after validation.

Blank coordinate pairs are allowed: the tour remains searchable but is not mapped.
Zero coordinates are valid. Malformed coordinates, dates, URLs, statuses or duplicate
identities fail instead of silently dropping a tour. Blank snow information remains unknown.

## Migration scope

Initial baseline: 449 source records, 427 public discovery records and map points,
35 public Christmas-category tours. Twenty drafts and two known members-only tours
are excluded. Christmas uses the canonical `christmas-market` key across countries.

Country maps and hand-curated destination/Christmas pages still use their existing
datasets. Individual video page content and publication URLs remain intact. Migrating
those consumers and creating the Christmas hub are subsequent steps; no bulk page
generation, raw footage import, or full CMS migration is part of this change.

## Automatic Colmar guide uploads

The Colmar guide combines public full-length Colmar Christmas tours from the
shared catalog with uploads discovered in Prowalk Tours' public YouTube feed.
The guide revalidates every 15 minutes on traffic. Discovery requires `Colmar`
as a whole word in the title and a verified duration over 180 seconds. It ignores
description-only mentions, labeled Shorts/trailers, future publication dates,
other channels and unverifiable videos. YouTube players still require a click.

`data/youtube/colmar-uploads.json` preserves discovered public upload metadata
after it leaves YouTube's rolling feed. It is not a master tour export: it does
not invent tour IDs, filming dates, maps, highlights, or internal video routes.
Google Sheets remains the source for those enriched tour records. Cards join by
YouTube ID and prefer the catalog's internal tour link when one becomes available.
New uploads use their real titles and clearly labeled publication dates.

`.github/workflows/sync-colmar-uploads.yml` checks every six hours (at minute 17)
and can also be run manually in GitHub Actions. It uses the repository's built-in
token, verifies new durations, and saves only the archive when it changes, after
tests and a production build pass. These commits follow the normal Vercel Git
deployment path. A failed fetch never empties the archive; a concurrent main
update rejects the push rather than overwriting anyone's work. No extra API key
is needed. Publishing the workflow to `main` activates this background work.

Check the first Actions run and its Vercel deployment when enabling this feature.
Scheduled runs can be delayed by GitHub; public-repository schedules may be
disabled after 60 days without repository activity. Keep the job enabled in
Actions. The live feed still supplies recent videos if an archive run is delayed.

Validation: `node scripts/test-colmar-uploads.cjs`,
`node scripts/test-newest-walk.cjs`, `node scripts/test-tour-data.cjs`, and
`npm run build`. `node scripts/sync-colmar-uploads.cjs --dry-run` checks current
public discovery without changing the archive. To intentionally remove a saved
video, edit this separate archive; if it is still public in the feed, discovery
will add it again. Removing a catalog record alone does not remove an archive entry.
