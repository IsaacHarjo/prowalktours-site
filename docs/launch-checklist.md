# Prowalk Tours — launch review and remaining work

Reviewed October 9, 2026. **The domain is not ready to switch.** The changes are committed locally in the new website repository. Deployment has not been performed because approval for the Git push was declined; the existing Vercel site is unchanged. No DNS, domain, email, or Squarespace configuration has been changed. Redirects below are review candidates, not active rules.

## What the comparison found

The public Squarespace sitemap plus its root contains **587 URLs**, including **444 individual `/v/` video pages**. All 587 were retrieved successfully. The Vercel sitemap had 95 URLs at the start of the review. The completed local site has 112 content routes and 108 sitemap entries; the two legal drafts and two excluded members-only videos are intentionally outside the sitemap. These counts measure URLs, not unique videos or equivalent content.

After the map-first import, the shared catalog contains 561 records, of which **539 are public across 24 countries**. **57 public tours have an internal video page**; **482 open YouTube**. The 112 additions include 92 verified route starts and 20 pins labeled with unconfirmed starting-point accuracy. Existing spreadsheet exports are unchanged; reviewed additions live in a supplemental CSV. See the [import report and provenance](map-import/README.md). Their presence in search or on a map does not mean their full Squarespace page, photographs, or route details have been migrated.

| Area | Squarespace content | New site after this work | Still needed |
| --- | --- | --- | --- |
| Homepage and navigation | Featured/latest videos, year archives, support and equipment links | Existing destination-first layout retained; clearer 4K/binaural introduction, source-driven featured Nice tour, working About/Press links, expanded resource footer | Choose final featured videos; reconcile new uploads with the master sheet |
| Video archive | 444 `/v/` pages, plus year/theme/place listings | Search and maps expose 539 public tours; videos referenced by 441 of the 444 old pages are discoverable | Review the three excluded videos and preserve useful old URLs/content during launch planning; individual page enrichment comes later |
| Destinations | Geographic and themed categories inside year archives | Existing country/region/city structure retained; metadata added to pages that lacked it | Many country pages remain introductory placeholders; Canada country Mapbox map and additional geographic detail remain pending |
| About | Isaac's story, photographs and podcast | `/about` restores the story, portrait and podcast link | Owner review of copy |
| Contact and licensing | Contact details and licensing guidance | `/contact-us`; licensing tool prepares an email to the confirmed general inbox | Decide whether to add a real submission service; email delivery was not tested |
| Equipment | Camera families, audio and travel products with retailer links | `/filming-gear` and eight equipment routes; 36 existing retailer links retained | Confirm current recommendations and affiliate participation; product photographs have not been migrated |
| Support and collaboration | Membership, Patreon, PayPal, sponsorship and joining | `/support`, `/sponsor`, `/join-us`; existing destination links retained | Confirm offers and collaboration arrangements before adding specific promises |
| Press | User-supplied media/partnership material | `/press`, linked from header/footer | Confirm distribution milestones and current channel metrics before adding them |
| Christmas markets | Year/theme archives | Collection expanded to 44 public tours, 22 destinations, nine countries; geographic/year filters retained | Review remaining legacy category mappings and unknown filming dates |
| Images | Squarespace images and video thumbnails | Two About/filming photographs migrated; 38 broken tour hero references supplied from that tour's existing highlight photographs | Review crops/caption overlays; Canada highlight enrichment and gear product photography remain optional work |
| Policies | No website/Roku policy implementation established by this review | `/privacy-policy` and `/terms-of-use`, explicitly draft and noindex | Final provider inventory, business details and legal review |

Sources: [current Squarespace site](https://prowalktours.com/), [new Vercel site](https://prowalktours-site.vercel.app/), [old About page](https://prowalktours.com/about), [old filming information](https://prowalktours.com/filming-gear), and the complete saved public inventory linked below. This was a public-site/code review, not an inspection of private Squarespace or Vercel dashboards, Search Console, or the master Google Sheet.

## P0 — resolve before approving the domain switch

- [ ] **Preserve useful legacy URLs before cutover.** Map discovery is now the user's priority; full individual tour-page enrichment can follow later. The initial redirect inventory found 54 exact-ID matches with internal pages. After the map import, videos behind another 387 old page URLs are discoverable through YouTube links but lack internal pages. Decide which old URLs need a lightweight landing page or a suitable reviewed destination before cutover. Start with URLs receiving search traffic or backlinks; a Search Console/export review is still needed. Map inclusion alone does not preserve those URLs or their SEO.
- [ ] **Review the remaining three excluded video URLs and 122 archive/category pages.** The excluded videos are Matera 2019 (`it-0373`, existing master draft/unknown availability), Milan Grand Canal (`w--o2nK4xQs`, members-only), and Freiburg evening 2025 (`de-0009`, members-only). Existing status restrictions were preserved. Do not redirect unrelated pages to the homepage or match videos by similar titles. Decide explicitly how unavailable or retired content should be handled.
- [ ] **Finish the privacy implementation and policies.** Confirm the actual Roku providers and data flows, website service settings, consent requirements, business identity and retention practices described below. The drafts must not be treated as effective policies or submitted to Roku as final documents yet.
- [ ] **Approve the contact experience.** General/licensing links use the user-confirmed `info@prowalktours.com`; Roku links use `roku@prowalktours.com`. The licensing tool prepares an email and shows copyable inquiry text. It does not deliver a form submission. Confirm those existing inboxes receive messages yourself. If direct website submissions are required, select and connect a provider, then add server validation, rate limiting and CAPTCHA, update the policy, and test successful delivery and errors. No email service or configuration was changed.
- [ ] **Prepare and test the final redirect set on a preview.** Review exact-video matches and the five proposed general redirects, preserve unchanged paths, then check final destinations, query strings, chains, loops and 404 behavior. Enable permanent redirects only as part of an explicitly approved launch. No redirect rules were installed by this work.
- [ ] **Approve final branding/content and a cutover date.** Keep Squarespace serving the existing domain until the site and migration plan are accepted. The final `https://www.prowalktours.com` canonical base is already in the repository; do not submit the new sitemap as the live domain's inventory yet. Apex/www consolidation and canonical correctness need a final launch check without prematurely changing the domain.

## P1 — finish the essential visitor experience

- [x] Restore About, contact, filming, support, collaboration, sponsorship and equipment content in the established colors and layout language.
- [x] Add Press & Partnerships using the supplied coverage and the verified [Janson announcement](https://janson.com/news/janson-media-and-prowalk-tours-announce-joint-venture). Describe the announced partnership without claiming a planned Q3 rollout has actually happened.
- [x] Replace ten inactive newsletter forms with functioning YouTube subscription links. No email list is claimed or collected.
- [x] Keep the homepage featured video tied to the real catalog. Improve the introduction and navigation; preserve existing destination cards, maps and search.
- [x] Complete map discovery from the old video library: 112 additional public videos, country navigation, labeled destination pins and access to coincident markers. Keep new tours watchable on YouTube while individual pages are deferred.
- [x] Add metadata to 30 existing pages that lacked it, retaining a server page/client UI split for changed pages. Preserve existing VideoObject, BreadcrumbList, key moments and timestamp behavior.
- [x] Repair 38 missing public-tour hero images without overwriting existing heroes or changing rich highlight data. See the source-image manifest below.
- [x] Keep mobile map height at 420px, improve country-map horizontal padding, and correct the map footer's hard-coded Italy label on other countries.
- [ ] Review the current featured selection against recent uploads. For example, the old homepage exposes an Otranto evening video with YouTube ID `snBqLG2Piyo`; the new homepage's Nice tour is a curated feature, not an assertion that it is the latest upload. New uploads should flow through the master data rather than guessed titles or IDs.
- [ ] Complete destination research content later. Map/search data now covers 24 countries; the master Sheet's four existing exports remain separate from the reviewed supplemental import. Merge those rows into the master with their permanent IDs and accuracy fields when desired. Individual destination/video pages remain deferred; do not generate them merely because map pins now exist.
- [ ] Complete Canada highlight imagery and its country Mapbox map if required for launch; existing Google My Maps links and world-map markers remain available. Do not run the destructive highlights refresh on enriched pages.
- [ ] Decide how to handle the two existing members-only routes: Freiburg evening 2025 and Rothenburg morning 2024. They are excluded from the public catalog and sitemap, but direct routes remain accessible and account for all 27 remaining missing local image references. Their pages still need a clear intended access/indexing policy. No member-only media was extracted or republished.
- [ ] Review the 36 archived equipment links, affiliate relationship and descriptions. Historical gear is labeled as such. Current availability, retailer redirects, prices and every external playback endpoint were not exhaustively tested. Support/membership links were preserved, but no transaction was attempted.
- [ ] Decide which old year/category pages deserve dedicated new collections. Existing search supports place/theme discovery, but it does not reproduce every old archive's editorial context. Preserve useful text and links where they add value.

## P1 — policy and integration review

The requested operator name is **Prowalk Tours**, based in the **United States**. The state, full legal entity identity and appropriate mailing contact remain unconfirmed. The Roku app is planned to be free with no ProWalk Tours viewer account; video hosting, analytics, crash reporting and advertising providers have not been selected. No Roku application code exists in this website repository for inspection.

| Service or feature | Observed behavior | Confirmation/action needed |
| --- | --- | --- |
| Vercel | Hosts the website; request URLs can include search terms. No Vercel Web Analytics SDK found in source | Inspect dashboard-enabled analytics, logs, retention, subprocessors and access controls before making definitive claims; [Vercel notice](https://vercel.com/legal/privacy-notice) |
| YouTube/Google | Standard embedded players and remote thumbnails; iframe loading can contact Google before playback | Review cookie/consent controls for intended markets and whether delayed loading or privacy-enhanced embeds are appropriate; preserve timestamp seeking and autoplay off. [YouTube embedding guidance](https://support.google.com/youtube/answer/171780?hl=en), [Google privacy](https://policies.google.com/privacy) |
| Mapbox | Tiles/styles/fonts and related service requests; optional locate-me control requests browser permission | Verify token environment restrictions and provider settings; current code has no application endpoint storing precise location. [Mapbox privacy](https://www.mapbox.com/legal/privacy) |
| Google My Maps | Embedded route maps and external links | Include Google processing and any necessary pre-load controls |
| QR Server / goQR | Remote QR images send the public route URL to `api.qrserver.com`, alongside technical request data | Decide whether to retain this service or generate codes locally; [provider notice](https://goqr.me/privacy-safety-security/) |
| Email | Mailto links and client-side licensing message preparation; no website submission backend | Confirm email host, retention/deletion practice and request-handling process without changing configuration |
| External links | YouTube, Patreon, PayPal, Spotify, social networks and retailers | Affiliate disclosures included on gear pages; confirm participation and actual current offers |
| Analytics and advertising | No separate Google Analytics, GTM, ad pixel or newsletter backend found in reviewed new-site source | This is not a claim that hosting or embeds collect no data. The old Squarespace markup included GTM `GTM-WCQ4DCB`; it was not copied. Spotify is now an external link, not an embed |
| Roku | Planned independent free app; no final service inventory | Identify streaming/CDN provider, identifiers, viewing data, local storage, diagnostics, recipients, retention and deletion/opt-out controls. Roku platform accounts are separate from app accounts. [Roku privacy](https://docs.roku.com/published/userprivacypolicy), [publishing guide](https://developer.roku.com/dev/docs/channel-publishing-guide) |

- [ ] Review third-party request/storage behavior in a clean browser across the final deployed site. This review combined source inspection and browser feature checks; it was not a complete cookie/network/storage inventory across every consent state, location and signed-in account.
- [ ] Select consent controls appropriate to the target markets. The site currently has no consent manager that prevents optional embeds from loading. Legal review must assess consent, targeted advertising/sale/sharing classifications, preference signals, privacy rights and international transfers; do not make blanket compliance or “no tracking” claims.
- [ ] Confirm the intended audience/children designation, privacy request verification, retention periods, full business contact details and operational deletion process.
- [ ] Have a qualified lawyer review the final Privacy Policy and Terms of Use against actual operations and applicable laws. Governing law, liability limits and dispute terms are intentionally not invented in the draft.
- [ ] Before adding Roku advertising or subscriptions, identify providers/data, disclose prices, renewal/cancellation/refunds as applicable, and update the documents and in-app notices. Future monetization is not described as a current feature or permission to charge.
- [ ] Once reviewed and operationally accurate, set an effective date, remove draft language/noindex, include the two legal pages in the sitemap, and supply their stable URLs in the Roku submission process.

## P2 — polish and performance

- [ ] Review the restored hero crops. Some source frames contain the video's own captions; final art direction may prefer another frame. No generated travel imagery was introduced.
- [ ] Check remaining lazy-loading and image sizing opportunities on long highlight pages. Existing raw image elements remain in several components. Measure on the deployed production site before broad image refactoring.
- [ ] Run a real-device pass on iOS Safari and Android Chrome, plus Lighthouse/PageSpeed on the homepage, search, a map destination and a rich walk page. No Core Web Vitals or Lighthouse score is claimed here.
- [ ] Review keyboard focus, reduced-motion behavior, carousel controls, zoom/text scaling, map usability and third-party iframe behavior on physical devices. Desktop and simulated-mobile checks are useful but do not replace those checks.
- [ ] Maintain new uploads, collections and internal links through the source catalog. Avoid hard-coded counts that drift from the data.
- [ ] Resolve the existing React-effect lint debt in video clients and the timestamp hook as a separate, regression-tested maintenance change. The full lint run reports 60 errors and 247 warnings; comparison with the previous commit found no newly introduced errors in this work.

## Redirect review inventory

| Classification | URLs | Treatment |
| --- | ---: | --- |
| Path retained on new site | 16 | Keep the path; verify content equivalence and eventual host canonicalization |
| Exact video ID, internal page exists | 54 | Candidate permanent redirect after review |
| Exact video ID, currently YouTube-only | 387 | Review SEO needs and lightweight landing options before cutover |
| Proposed general redirect | 5 | `/home` → `/`; `/videos` → `/search`; `/find-a-walk` → `/#world-map`; `/join` → `/join-us`; `/drone` → `/search?type=drone-tour` — verify intent |
| No public equivalent identified | 125 | Three excluded videos and 122 archive/category pages; manual review, no blanket homepage redirects |
| Total | 587 | No active redirect changes |

The saved redirect-candidates file is the original audit snapshot (272 YouTube-only matches and 240 unresolved URLs); the table above incorporates the 115 newly matched page URLs from the map import. No redirect rules are active. Preserve useful page titles and descriptions, exact YouTube IDs, permanent tour IDs/slugs, filming dates (not invented upload dates), image descriptions, internal links, canonical URLs and server-rendered structured data. Keep timestamp parameters and Google key moments working. The raw inventory captures original titles/descriptions, headings, text, image URLs, embeds and links; it is an evidence snapshot, not a migration-complete claim.

## Verification and review files

- Production build and TypeScript validation; shared catalog checks now cover 561 records, 539 public tours, 44 Christmas tours. The library test verifies public-channel identity evidence, coordinate provenance, master-export precedence, permanent IDs and coincident map markers.
- Full lint does **not** pass: 60 existing errors and 247 warnings. Diagnostics were compared with the previous commit using the rule, diagnostic and affected source line, so shifted line numbers do not count as new errors. See [lint comparison](launch-audit/lint-results.json).
- Local HTTP smoke check: 112 content routes, 108 sitemap URLs; titles/descriptions, JSON-LD parsing, internal links/anchors and intentional sitemap exclusions verified. Search results remain server-generated.
- Browser checks: 390px mobile views of policies, search, licensing and country maps without horizontal overflow; Italy map filter worked with a 420px canvas; Christmas France filter returned 12 walks; mobile menu opened/closed with Escape; 1280px desktop header/content fit.
- Search for “notre dame” returned eight results. A Paris timestamp link produced a YouTube player with `start=6740` and `autoplay=0`. No inquiry was sent and no payment or subscription was initiated.
- Image reference audit: no missing references on public tour pages; 27 known missing references are confined to the two excluded member-only pages. This audit does not treat deliberately empty highlight-image fields as broken files.
- Existing CSVs, tour IDs, slugs, enriched highlights and security configuration were preserved. User-owned untracked design-preview files were left out of the commit.
- Map import follow-up: desktop country navigation and coincident markers, 390px mobile country/popup/cluster views and direct YouTube links passed browser review; new Tokyo search and Christmas records passed local HTTP checks. Targeted application lint has zero errors and two existing image warnings. See the [map import verification](map-import/README.md).

Evidence: [public Squarespace inventory](launch-audit/squarespace-inventory.json), [old sitemap](launch-audit/squarespace-sitemap.xml), [original Vercel sitemap](launch-audit/vercel-sitemap-before.xml), [redirect candidates](launch-audit/redirect-candidates.json), [catalog/assets audit](launch-audit/local-readiness.json), [hero image provenance](launch-audit/restored-hero-images.json), [HTTP smoke results](launch-audit/smoke-results.json), and [desktop visual review](launch-audit/about-desktop.jpg).

Use the existing **npm: build** VS Code task for release verification. The audit scripts perform read-only public retrieval or local inspection; rerun the public crawl only when needed and respect its throttling. None of these scripts changes DNS, domains, Squarespace, mailboxes or redirect configuration.
