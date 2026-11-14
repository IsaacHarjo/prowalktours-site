# Riquewihr 2025 video page source notes

Prepared locally on 13 November 2026. Do not publish without the user's instruction.

## Verified final edit

- YouTube: https://www.youtube.com/watch?v=yWwK6emeRqY
- All 38 chapter labels and timestamps match the expanded YouTube description and Ike's supplied final list, checked 13 November 2026.
- YouTube DOM metadata reports `PT120M44S` (7,244 seconds).
- YouTube upload-date metadata: `2026-11-12T16:50:15-08:00`. The visible description labels the date 13 November 2026; retain the precise metadata timestamp rather than substituting the filming date.
- Local source: `D:/Prowalk Captions/Riquewihr 2025/source/Riquewihr Day for Captions.mp4`.
- ffprobe duration: 7,243.419521 seconds, consistent with the YouTube rounded runtime. Source is 3840 × 2160, 60000/1001 fps, tagged BT.2020 / HLG. This is not evidence of the delivery color profile; no camera/profile claims are added to the public licensing copy.
- Inspected one local frame three seconds after each chapter timestamp to confirm the edited sequence, including the earlier Christmas-shop footage inserted at 1:11:16. Frames were for verification only, without tone mapping. The page uses the existing finished Media Library photos.
- The YouTube watch page and yt-dlp both report members-only access. Direct playback/seek verification against YouTube is pending public availability or a signed-in member session. Do not describe playback as verified.

## Editorial sources

- Ike's final description supplied in chat: 14 December 2025, 12:55 PM, foggy, 11°C / 51°F, 2.0 miles / 3.2 km.
- `D:/Prowalk Tours Media Library/Christmas Markets/France/Riquewihr/Riquewihr 2025 Notes.docx`: courtyard visits, indoor seating, the quiet Dolder museum, early Christmas-shop filming, and saving the main market for last. Its older timestamps were not reused.
- `D:/Prowalk Captions/Riquewihr 2025/output/Riquewihr captions FINAL retimed.srt`: supporting visit context. Historical transport/pricing information was not presented as current advice.
- Finished photos already prepared from the Media Library for the Riquewihr guide are reused by path; originals remain unchanged.
- Filmed route: https://www.google.com/maps/d/viewer?mid=1TFxrWeINaINN3J5zSxFJ3Rbd2XtYovI . Imported its KML coordinates and named points, not the guide's suggested itinerary. Street-line distance is approximate and excludes indoor movement.

## Before publication

Local validation: production build, changed-file ESLint, shared tour-data checks and 119-route smoke check passed. The smoke check reports only the existing privacy/terms noindex exceptions. Inspected desktop at 1440px and mobile at 390px: 38 chapters, 11 loaded photo highlights, no horizontal page overflow, chapter cue links and mobile route-stop navigation/closing work. Verified 1:11:16, direct-link 1:44:40 and final-chapter 2:00:10 iframe offsets with autoplay disabled. Audited all 12 reused image paths and dimensions. Map contains 20 chapter-matched points; the general main-street marker was omitted because it does not identify the fountain precisely.

1. Confirm YouTube is public and verify playback/seek on the embedded player.
2. Update permanent tour `fr-0040` in `Prowalk_Tours_Master_Maps` with the completed values from the local France/combined CSV rows and all 38 rows in the site-wide highlights CSV. Keep the ID and slug unchanged. The Sheet has not been modified; a fresh export would otherwise overwrite these local changes.
3. Change `fr-0040` from draft to ready in the master Sheet and local exports only once public. The shared loader then includes the page in search, homepage map, Christmas catalog and sitemap; the server page removes its temporary noindex automatically. Refresh the legacy France catalog/map for country-map inclusion at that point, reviewing the generated diff.
4. Keep the per-country My Maps tour marker in sync with the final metadata. No external map has been edited during this local task.
5. The guide's temporary extra-walk card now links to this dedicated page locally. When the public CSV record enters the catalog, the existing YouTube-ID deduplication prefers that canonical record.
