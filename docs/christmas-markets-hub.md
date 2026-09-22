# Christmas Markets hub

`/christmas-markets` uses the public discovery projection from the shared tour
loader. There is no separate Christmas tour inventory. Eligibility and canonical
links stay centralized; the `christmas-market` category selects the collection.

The server page provides metadata, breadcrumbs and CollectionPage/ItemList JSON-LD.
The client renders geographic browsing, dependent country/region/city filters,
filming-year and accent-insensitive text search. A single filtered selection feeds
both the list and the existing clustered world-map component. The map fits the
selection and resets its selected cluster when the selection changes. Unmapped
walks remain in the list. Empty results include a reset action.

The shared map's optional `fitToTours` behavior is used by the hub; the homepage
keeps its previous initial view and country legend. A map failure leaves the walk
list available. The hero uses an existing Strasbourg frame; tour thumbnails and
links come from the catalog. No video detail pages or enriched highlights change.

## Historical journeys

The editorial journey records in `lib/christmas/catalog.ts` are separate from tour
records. Stops link by country and city to the available collection, across all
filming years; they do not imply footage from the journey year is published.

- 2022 sequence comes from the supplied itinerary records, including Stuttgart
  and Strasbourg. The user's snow recollection is described at journey level only.
- December 2025 sequence comes from dated filming-folder screenshots, with the
  Basel/EuroAirport arrival from the user's recollection. Transport and overnight
  bases are not confirmed.
- No raw diary details, unpublished inventory, new country pages, current market
  dates, journey durations or individual snow classifications are published.

## Next editorial work

Verify per-video snow conditions, official 2026 dates, transport legs and overnight
bases before adding those filters or turning the journey sketches into practical
itineraries. Add new footage through the master source and shared eligibility
workflow. Existing France/Germany Christmas pages retain their URLs and current
content; their legacy hard-coded inventories remain a later migration task.

Checks: `node scripts/test-tour-data.cjs`, TypeScript, targeted ESLint, production
build, browser checks of filters/map/list agreement, empty states, journey links,
mobile navigation, metadata and sitemap inclusion.
