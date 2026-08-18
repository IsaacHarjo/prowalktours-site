# Prowalk Tours - highlight/hero frame extraction
# Sirmione + Otranto day walks. Source files are the already-graded Rec.709 SDR masters
# uploaded to YouTube (confirmed by Ike 17 Aug 2026) -- no HDR tonemap needed, plain frame grabs.
# Run this from PowerShell. Requires ffmpeg on PATH.

$ffmpeg = "ffmpeg"

# ===== SIRMIONE highlights: 26 highlight frames =====
New-Item -ItemType Directory -Force -Path "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights" | Out-Null
$src = "D:\Prowalk Captions\Sirmione\Source\Sirmione.mp4"

# Intro & Map @ 00:00:00
& $ffmpeg -y -ss 00:00:00 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-intro-map.jpg"
# Ponte Levatoio — The Castle Drawbridge @ 00:01:20
& $ffmpeg -y -ss 00:01:20 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-ponte-levatoio-the-castle-drawbridge.jpg"
# Piazza Castello — Entering the Old Town @ 00:05:26
& $ffmpeg -y -ss 00:05:26 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-castello-entering-the-old-town.jpg"
# Via Vittorio Emanuele — The Main Street @ 00:16:23
& $ffmpeg -y -ss 00:16:23 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-via-vittorio-emanuele-the-main-street.jpg"
# Piazza Giosuè Carducci — The Lakefront Piazza @ 00:17:54
& $ffmpeg -y -ss 00:17:54 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-giosue-carducci-the-lakefront-piazza.jpg"
# Piazza Flaminia — Floating Restaurants on the Lake @ 00:32:37
& $ffmpeg -y -ss 00:32:37 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-flaminia-floating-restaurants-on-the-lake.jpg"
# Piazza Porto Valentino — The Boat Dock @ 00:36:09
& $ffmpeg -y -ss 00:36:09 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-porto-valentino-the-boat-dock.jpg"
# Piazza dei Catari @ 00:46:40
& $ffmpeg -y -ss 00:46:40 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-dei-catari.jpg"
# Piazza Don Angelo Piatti @ 00:49:51
& $ffmpeg -y -ss 00:49:51 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-don-angelo-piatti.jpg"
# Via Giuseppe Piana — The Quiet Side Street @ 00:52:13
& $ffmpeg -y -ss 00:52:13 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-via-giuseppe-piana-the-quiet-side-street.jpg"
# Church of Santa Maria Maggiore @ 00:57:11
& $ffmpeg -y -ss 00:57:11 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-church-of-santa-maria-maggiore.jpg"
# Abbazia di San Salvatore — Ancient Abbey Ruins @ 01:08:23
& $ffmpeg -y -ss 01:08:23 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-abbazia-di-san-salvatore-ancient-abbey-ruins.jpg"
# Spiaggia del Prete — Lakeside Beach @ 01:12:47
& $ffmpeg -y -ss 01:12:47 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-spiaggia-del-prete-lakeside-beach.jpg"
# Passeggiata delle Muse — The Promenade of the Muses @ 01:15:46
& $ffmpeg -y -ss 01:15:46 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-passeggiata-delle-muse-the-promenade-of-the-muses.jpg"
# Spiaggia Lido delle Bionde — Blue Flag Beach @ 01:22:27
& $ffmpeg -y -ss 01:22:27 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-spiaggia-lido-delle-bionde-blue-flag-beach.jpg"
# Parco Pubblico Tomelleri @ 01:28:34
& $ffmpeg -y -ss 01:28:34 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-parco-pubblico-tomelleri.jpg"
# Piazzale Orti Manara @ 01:31:40
& $ffmpeg -y -ss 01:31:40 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazzale-orti-manara.jpg"
# Path to Jamaica Beach — Through the Olive Groves @ 01:33:01
& $ffmpeg -y -ss 01:33:01 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-path-to-jamaica-beach-through-the-olive-groves.jpg"
# Jamaica Beach — Hidden Turquoise Cove @ 01:37:08
& $ffmpeg -y -ss 01:37:08 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-jamaica-beach-hidden-turquoise-cove.jpg"
# Grotte di Catullo — Roman Villa Ruins @ 01:49:21
& $ffmpeg -y -ss 01:49:21 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-grotte-di-catullo-roman-villa-ruins.jpg"
# Via Cesara Arici @ 02:21:46
& $ffmpeg -y -ss 02:21:46 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-via-cesara-arici.jpg"
# Chiesa di San Pietro in Mavino — Sirmione's Oldest Church @ 02:25:09
& $ffmpeg -y -ss 02:25:09 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-chiesa-di-san-pietro-in-mavino-sirmione-s-oldest-church.jpg"
# Via Vittorio Emanuele — Return Walk @ 02:34:22
& $ffmpeg -y -ss 02:34:22 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-via-vittorio-emanuele-return-walk.jpg"
# Piazza Giosuè Carducci — Under Blue Skies @ 02:40:27
& $ffmpeg -y -ss 02:40:27 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-piazza-giosue-carducci-under-blue-skies.jpg"
# Castello Scaligero — Inside the Medieval Castle @ 02:45:52
& $ffmpeg -y -ss 02:45:52 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-castello-scaligero-inside-the-medieval-castle.jpg"
# Chiesa di Sant'Anna della Rocca @ 03:05:08
& $ffmpeg -y -ss 03:05:08 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\sirmione-day-walk-2026\highlights\sirmione-chiesa-di-sant-anna-della-rocca.jpg"

# ===== OTRANTO highlights: 22 highlight frames =====
New-Item -ItemType Directory -Force -Path "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights" | Out-Null
$src = "D:\Prowalk Captions\Otranto\source\Otranto.mp4"

# Intro & Map @ 00:00:00
& $ffmpeg -y -ss 00:00:00 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-intro-map.jpg"
# Spiaggetta del Molo @ 00:01:01
& $ffmpeg -y -ss 00:01:01 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-spiaggetta-del-molo.jpg"
# Lungomare degli Eroi @ 00:06:50
& $ffmpeg -y -ss 00:06:50 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-lungomare-degli-eroi.jpg"
# Outer Wall Swimming Area @ 00:11:10
& $ffmpeg -y -ss 00:11:10 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-outer-wall-swimming-area.jpg"
# La Villa - Giardini Pubblici @ 00:24:29
& $ffmpeg -y -ss 00:24:29 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-la-villa-giardini-pubblici.jpg"
# Via Basilica @ 00:32:35
& $ffmpeg -y -ss 00:32:35 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-via-basilica.jpg"
# Otranto Cathedral @ 00:35:21
& $ffmpeg -y -ss 00:35:21 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-otranto-cathedral.jpg"
# Corso Garibaldi @ 00:48:18
& $ffmpeg -y -ss 00:48:18 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-corso-garibaldi.jpg"
# Piazzetta De Ferraris @ 00:52:24
& $ffmpeg -y -ss 00:52:24 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-piazzetta-de-ferraris.jpg"
# Via Immacolata @ 00:53:12
& $ffmpeg -y -ss 00:53:12 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-via-immacolata.jpg"
# Ex chiesa dell'Immacolata @ 00:54:49
& $ffmpeg -y -ss 00:54:49 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-ex-chiesa-dell-immacolata.jpg"
# Spiaggia Bastioni @ 00:56:15
& $ffmpeg -y -ss 00:56:15 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-spiaggia-bastioni.jpg"
# Piazza Castello @ 01:01:25
& $ffmpeg -y -ss 01:01:25 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-piazza-castello.jpg"
# Castello Aragonese @ 01:02:10
& $ffmpeg -y -ss 01:02:10 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-castello-aragonese.jpg"
# Ponte dell'Immacolata @ 01:06:19
& $ffmpeg -y -ss 01:06:19 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-ponte-dell-immacolata.jpg"
# Torre Matta @ 01:07:15
& $ffmpeg -y -ss 01:07:15 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-torre-matta.jpg"
# Lungomare dei Bastioni @ 01:09:11
& $ffmpeg -y -ss 01:09:11 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-lungomare-dei-bastioni.jpg"
# Bastione dei Pelasgi @ 01:11:22
& $ffmpeg -y -ss 01:11:22 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-bastione-dei-pelasgi.jpg"
# Chiesa di San Pietro @ 01:15:02
& $ffmpeg -y -ss 01:15:02 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-chiesa-di-san-pietro.jpg"
# Lungomare Terra D'Otranto @ 01:30:33
& $ffmpeg -y -ss 01:30:33 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-lungomare-terra-d-otranto.jpg"
# Abil Beach @ 01:38:02
& $ffmpeg -y -ss 01:38:02 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-abil-beach.jpg"
# Spiaggia degli Haethei @ 01:44:09
& $ffmpeg -y -ss 01:44:09 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\highlights\otranto-spiaggia-degli-haethei.jpg"

# ===== OTRANTO hero candidates (pick your favorite, rename it to hero.jpg) =====
New-Item -ItemType Directory -Force -Path "D:\Projects\prowalktours-site\public\otranto-day-walk-2026" | Out-Null
$src = "D:\Prowalk Captions\Otranto\source\Otranto.mp4"

# candidate: Otranto Cathedral @ 00:35:21
& $ffmpeg -y -ss 00:35:21 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\hero-candidate-otranto-cathedral.jpg"
# candidate: Castello Aragonese @ 01:02:10
& $ffmpeg -y -ss 01:02:10 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\hero-candidate-otranto-castello-aragonese.jpg"
# candidate: Spiaggetta del Molo @ 00:01:01
& $ffmpeg -y -ss 00:01:01 -i $src -vframes 1 -q:v 2 "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\hero-candidate-otranto-spiaggetta-del-molo.jpg"

# Once you pick the best one:
# Copy-Item "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\hero-candidate-otranto-cathedral.jpg" "D:\Projects\prowalktours-site\public\otranto-day-walk-2026\hero.jpg"
