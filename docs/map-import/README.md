# Video library map import — October 9, 2026

Local preview work only. No deployment, domain, DNS, email, Google Sheet or Squarespace settings changed. The existing homepage design and enriched video pages remain in place. The user approved labeled approximate destination pins and prioritized map discovery over building individual video pages.

## Result

- **112 additional public videos**, verified against the Prowalk Tours YouTube channel (`UCNzul4dnciIlDg8BAcn5-cQ`). The shared map/search catalog grows from 427 to **539 public tours across 24 countries**. There are 561 total records including existing drafts/unavailable items.
- New records: **92 explicit route start pins**, **4 original tour-map pins with unconfirmed starts**, **16 approximate destination pins**. The last two groups display an accuracy note in individual popups and desktop/mobile result cards. Existing master-sheet coordinates remain unchanged.
- **44 Christmas tours**, up from 35; existing collection filters use the same shared catalog.
- No new individual video or country pages. Watch links use YouTube until a corresponding real internal page exists. Multiple videos sharing a pin remain accessible even beyond the clustering zoom level.
- Filming dates remain blank for 13 additions without an explicit date in the checked description. Distance and landmark details are not invented. The import does not create timestamp highlights or change the single combined highlights index.
- Newly encountered members-only Milan video `w--o2nK4xQs` is excluded. Existing master draft/member exclusions remain authoritative. Availability is a snapshot from October 9, not ongoing monitoring.
- Videos referenced by **441 of the 444 old video-page URLs** now appear in map/search. The three excluded page references are the members-only Milan and Freiburg videos, plus Matera 2019 (`it-0373`), whose existing master draft/unknown status is preserved. Some old URLs duplicate the same video.

## Sources and review files

The [old video library](https://prowalktours.com/videos) and its [saved page inventory](../launch-audit/squarespace-inventory.json) identify the videos by exact YouTube ID. Duplicated old pages are deduplicated by that ID, never by similar titles. `youtube-metadata.json` preserves checked public titles, descriptions, durations, channel identity and availability; video media was not downloaded.

`source-world-map.kml` and `source-points.json` preserve the public Google My Maps export embedded in the old library. `routes/` contains 102 public route exports linked from the creator's descriptions; `route-points.json` is their parsed point inventory. Only a single unambiguous Start / Start-End marker is treated as a verified tour start. Multiple-start routes retain an approximate label.

`destination-review.json` records reviewed country/region/city assignments. `destination-coordinates.json` caches Wikipedia GeoData references used only when no creator-map point was available. These are destination coordinates, not geolocation of the viewer. No new runtime geocoding service or API key was introduced.

`import-review.json` is the per-video audit: ID, permanent tour ID, source pages, coordinates, precision, source, date and availability check time. `proposed-library-additions.csv` is the reviewed import; the installed copy is `data/maps/library-additions.csv`.

## Keeping the spreadsheet authoritative

The master Google Sheet and its four existing country CSV exports have **not** been edited. A supplemental CSV adds the reviewed records without replacing those exports. The shared server loader reads both.

When these rows are added to the master sheet, retain their `tour_id`, `slug`, YouTube ID and the `location_accuracy` / `location_source` fields. The accuracy columns must survive export; dropping them would default a record to the existing schema's tour-start meaning. A master row with the same ID/video takes precedence, including a later draft/unavailable status. Conflicting identities fail validation instead of renaming a tour or silently duplicating it.

For a newly exported country CSV, set its `source` filename in `lib/tours/countries.ts` before importing. Existing Italy/France/Germany/Canada exports are already configured. Do not run page generators or destructive highlight refreshes as part of this map workflow.

## Reproduce and validate

The checked sources are cached. Network collection is optional and should not be repeated for ordinary builds.

1. `node scripts/prepare-library-map.cjs` regenerates the review files without installing data.
2. `node scripts/test-library-map.cjs` validates identity, public availability evidence, coordinate provenance, unknown dates, master precedence and shared pins.
3. `node scripts/prepare-library-map.cjs --write` installs the reviewed CSV locally; review any diff before committing.
4. `node scripts/test-tour-data.cjs` and `node scripts/test-library-map.cjs`, then `npm run build`.

Metadata and route collectors are under `scripts/collect-library-*.cjs`; destination references use `scripts/collect-destination-coordinates.cjs`. `scripts/read-library-route-maps.ps1` parses cached KML with external XML resolution disabled. These scripts fetch public source material only and do not modify remote services.

Full legacy-page content migration and SEO redirects remain separate launch work. A functional map does not preserve an old URL's rankings by itself. See [launch checklist](../launch-checklist.md).

## Verification performed

- Production build passed: 118 generated entries, with no new content routes. Both catalog test scripts passed.
- Changed application files passed targeted lint with zero errors and two existing image-element warnings. The full-repository lint backlog recorded in the launch audit remains separate.
- Local production HTTP checks passed for homepage, Tokyo search and the Christmas collection, including expected new video links.
- Desktop browser: country navigation, cluster cards, exact shared-pin results at zoom 13, direct YouTube URLs, and accuracy labels verified. The 3D globe projection was restored at the owner's request; drag the globe or choose a country to explore destinations on its other side.
- 390px mobile browser: 420px map height, country selector, Copenhagen popup, Cairo five-tour list, accuracy labels and watch URLs verified; no horizontal page overflow. Country navigation waits until the map finishes loading.
- Browser console showed no errors during these checks. Viewport override was reset. No physical-device or Lighthouse score is claimed.

Screenshots: [restored 3D globe](map-globe-desktop.jpg), [earlier flat world view](map-world-desktop.jpg), [shared Cairo pin](map-cairo-shared-pin.jpg), [mobile destination popup](map-mobile-destination.jpg), [mobile cluster](map-mobile-cluster.jpg).
