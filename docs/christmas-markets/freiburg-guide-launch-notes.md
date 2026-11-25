# Freiburg guide and video QR

Permanent guide URL: https://www.prowalktours.com/christmas-markets/freiburg

The PNG and SVG alongside this note encode that exact URL directly, with a white
four-module quiet zone and Q error correction. There is no shortener, paid QR
service or expiry. Keep the white border when placing the code in the video.
Publish the guide before releasing the video; the code can be placed in the edit
before the page is live. Keep the guide URL unchanged as its content develops.

## First guide version

- Personal introduction based on Isaac's 25 November 2026 notes: local everyday
  atmosphere, Münsterplatz flowers/meat/cheese market, manageable crowds on his
  visit, Black Forest character, and trip with Bobby from Basel through Alsace
  toward Strasbourg.
- Walk filmed 16 December 2025, 9°C / 49°F. Stops based on Isaac's original
  timeline; no timestamps carried over because the new intro changes timing.
- Reuses the existing Freiburg homepage photograph, with no new image edits.
- 2026 dates/hours from https://weihnachtsmarkt.freiburg.de/en/ (German version
  confirms Werktags): 19 November–23 December; Monday–Saturday 10:00–20:30,
  Sundays 11:30–19:30; opening day 14:00, closed 22 November, final day closes 19:30.
- Official map https://weihnachtsmarkt.freiburg.de/en/map includes the Advent
  Sunday-only Kaiser-Joseph-Straße stalls, toilets and accessible tables.
- Arrival source: https://weihnachtsmarkt.freiburg.de/en/directions
- Guide is linked from the shared Christmas destination link resolver and is
  included by the existing filesystem-based sitemap collection.

## Next additions

- Sunday release planned for 29 November 2026. Obtain the final public video URL
  and revised timeline. The old members upload, now unlisted, is 4bQoSIwQHZM;
  it is intentionally absent from the new guide. No automatic Freiburg upload
  discovery or publication schedule has been added in this change.
- Filmed map supplied by Isaac:
  https://www.google.com/maps/d/viewer?mid=1cow1Bl-XUxiBNkB8w78b4uhOkR5MGWM
- Suggested-route map is still blank and not linked on the public guide:
  https://www.google.com/maps/d/u/0/edit?mid=1TlB-ned5nksTuIDN5Hn0511wA9QNELM
- Use Mapbox if building an embedded route map. Do not embed Google My Maps.
- Photos and notes live in D:/Prowalk Tours Media Library/Christmas Markets/Germany/Freiburg.
- The supplied 2025 brochure is historical; do not reuse its dates for 2026:
  https://weihnachtsmarkt.freiburg.de/fileadmin/Weihnachtsmarkt/PDF/Flyer_Weihnachtsmarkt_Freiburg_2025_Web.pdf

The current change does not publish or modify the older generated Freiburg
video page or change the Google Sheet exports. Broader tour publication should
follow docs/adding-a-tour.md once the new video is ready.

## Verification for the initial version

Production build, scoped ESLint and scripts/test-tour-data.cjs passed. Referenced
hero image exists. Browser checked at desktop (1280px) and phone (390px) widths:
image loaded, no horizontal overflow, navigation anchors worked, no console
errors. Built HTML contains the canonical URL and JSON-LD, and excludes the
unlisted video ID and blank suggested-route map ID. QR PNG is 2160 × 2160 pixels;
independent decoding passed at full resolution, 512px and 256px. SVG encodes the
same URL. These are local changes pending an explicit publish request.
