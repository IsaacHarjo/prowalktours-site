import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";

import LiveSearchBar from "../components/LiveSearchBar";
import ThumbnailImg from "../components/ThumbnailImg";
import WorldMapClient from "../components/WorldMapClient";
import { videos } from "../data/videos/index";

// ─── Load world tour data from all_tours.csv at build time ───────────────────

const COUNTRY_INDICES: Record<string, number> = {
  Italy: 0,
  France: 1,
  Germany: 2,
};

function loadWorldTours() {
  const csvPath = path.join(process.cwd(), "data", "maps", "all_tours.csv");
  const content = readFileSync(csvPath, "utf8");

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    const next = content[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        currentValue += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (c === "," && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }
    if ((c === "\n" || c === "\r") && !inQuotes) {
      if (c === "\r" && next === "\n") i++;
      currentRow.push(currentValue);
      if (currentRow.some((v) => v !== "")) rows.push(currentRow);
      currentRow = [];
      currentValue = "";
      continue;
    }
    currentValue += c;
  }
  currentRow.push(currentValue);
  if (currentRow.some((v) => v !== "")) rows.push(currentRow);

  const [header, ...dataRows] = rows;
  const col: Record<string, number> = {};
  header.forEach((h, i) => {
    col[h] = i;
  });

  return dataRows
    .map((row) => {
      const slug =
        (row[col["slug_override"]] || "").trim() ||
        (row[col["slug"]] || "").trim();
      const lat = parseFloat(row[col["latitude"]] || "");
      const lng = parseFloat(row[col["longitude"]] || "");
      const ytUrl = (row[col["youtube_url"]] || "").trim();
      const country = (row[col["country"]] || "").trim();
      const title = (row[col["title"]] || "").trim();
      const city = (row[col["city"]] || "").trim();
      const region = (row[col["region"]] || "").trim();
      const videoType = (row[col["video_type"]] || "").trim();
      const filmedYearStr = (row[col["filmed_year"]] || "").trim();
      const filmedYear = filmedYearStr ? parseInt(filmedYearStr, 10) : null;
      const durationLabel = (row[col["duration_label"]] || "").trim();

      if (!slug || !ytUrl || isNaN(lat) || isNaN(lng) || lat === 0) {
        return null;
      }

      return {
        slug,
        title,
        city,
        country,
        region,
        videoType,
        filmedYear: filmedYear && !isNaN(filmedYear) ? filmedYear : null,
        durationLabel,
        youtubeUrl: ytUrl,
        latitude: lat,
        longitude: lng,
        countryIndex: COUNTRY_INDICES[country] ?? 0,
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);
}

const worldTours = loadWorldTours();

// ─── Top destinations data ───────────────────────────────────────────────────

const topDestinations = [
  {
    name: "Naples & Campania",
    videoCount: "95 videos",
    href: "/destinations/italy/campania",
    img: "/images/homepage/naples-campania.jpg",
  },
  {
    name: "Venice",
    videoCount: "39 videos",
    href: "/destinations/italy/veneto",
    img: "/images/homepage/venice.jpg",
  },
  {
    name: "Amalfi Coast",
    videoCount: "20 videos",
    href: "/destinations/italy/campania",
    img: "/images/homepage/amalfi-coast.jpg",
  },
  {
    name: "French Riviera",
    videoCount: "12 videos",
    href: "/destinations/france/french-riviera",
    img: "/images/homepage/french-riviera.jpg",
  },
  {
    name: "Rome",
    videoCount: "168 videos",
    href: "/destinations/italy/lazio",
    img: "/images/homepage/rome.jpg",
  },
  {
    name: "Paris",
    videoCount: "12 videos",
    href: "/destinations/france/paris",
    img: "/images/homepage/paris.jpg",
  },
];

// ─── Homepage ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      {/* ═══ SECTION 1 — Hero ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            421 walking tours across 24 countries
          </p>
          <div className="mx-auto mt-6 max-w-2xl">
            <LiveSearchBar videos={videos}>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                <Link
                  href="/countries"
                  className="inline-flex items-center justify-center rounded-full bg-[#3d3327] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#2f261d]"
                >
                  Browse Countries
                </Link>
                <Link
                  href="#world-map"
                  className="inline-flex items-center justify-center rounded-full bg-[#009246] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#007a3a]"
                >
                  Explore the Map
                </Link>
              </div>
            </LiveSearchBar>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — Top Destinations ═══ */}
      <section className="border-y border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Top Destinations
          </p>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
            {topDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={dest.href}
                className="group w-[200px] shrink-0 overflow-hidden rounded-2xl border border-[#eadfce] bg-[#fcfaf7] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md lg:w-auto"
              >
                <div className="aspect-video w-full overflow-hidden bg-[#2f261d]">
                  <ThumbnailImg
                    src={dest.img}
                    alt={dest.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-3">
                  <p className="text-sm font-bold text-[#2f261d]">
                    {dest.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8a7a68]">
                    {dest.videoCount}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — Trust Bar ═══ */}
      <section className="bg-[#f5f0e8]">
        <div className="mx-auto max-w-5xl px-6 py-4 text-center">
          <p className="text-xs font-medium tracking-wide text-[#6c5b49] sm:text-sm">
            Wall Street Journal &middot; 24 countries &middot; TV distribution
            via Janson Media &middot; 758K YouTube subscribers
          </p>
        </div>
      </section>

      {/* ═══ SECTION 4 — Interactive Map ═══ */}
      <section id="world-map" className="scroll-mt-16 mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
          Interactive Tour Map
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#2f261d] sm:text-3xl">
          Browse walks by geography
        </h2>
        <div className="mt-6">
          <WorldMapClient
            tours={worldTours}
            fullWidth
            heightClassName="h-[360px] sm:h-[500px]"
          />
        </div>
        <p className="mt-4 text-center text-sm text-[#8a7a68]">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#009246]" />{" "}
          Italy{" "}
          <span className="ml-3 inline-block h-2.5 w-2.5 rounded-full bg-[#ED2939]" />{" "}
          France{" "}
          <span className="ml-3 inline-block h-2.5 w-2.5 rounded-full bg-[#FFCE00]" />{" "}
          Germany{" "}
          <span className="ml-3 text-[#bba893]">&middot;</span>{" "}
          <span className="ml-1">+ 21 more countries coming soon</span>
        </p>
      </section>

      {/* ═══ SECTION 5 — Visitor Intent Cards ═══ */}
      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
          What Brings You Here?
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/destinations"
            className="rounded-2xl border border-[#eadfce] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-[#2f261d]">
              Find more walks
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#6c5b49]">
              Browse all 421 tours by country or region
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              Browse Countries &rarr;
            </p>
          </Link>

          {/* TODO — update href to /plan when itinerary pages are built */}
          <Link
            href="/destinations"
            className="rounded-2xl border border-[#eadfce] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-[#2f261d]">
              Plan your trip
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#6c5b49]">
              Destination guides, tips, ferries, and best things to do
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              Explore Destinations &rarr;
            </p>
          </Link>

          <Link
            href="/licensing"
            className="rounded-2xl border border-[#eadfce] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-[#2f261d]">
              License footage
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#6c5b49]">
              TV, streaming, commercial, ambient, and institutional
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              Licensing Info &rarr;
            </p>
          </Link>
        </div>
      </section>

      {/* ═══ SECTION 6 — Latest Video ═══ */}
      {/* TODO — replace with dynamic YouTube API data when connected */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c89b3c]">
          New This Saturday
        </p>
        <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-[#eadfce] bg-white p-5 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 overflow-hidden rounded-xl bg-[#2f261d] sm:w-[200px]">
            <ThumbnailImg
              src="https://img.youtube.com/vi/br0MPT2SdTE/mqdefault.jpg"
              alt="Nice, France Evening Walking Tour"
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold leading-snug text-[#2f261d]">
              Nice, France 🇫🇷 Evening Walking Tour | Vieux Nice &amp;
              Promenade des Anglais | 4K 60fps
            </h3>
            <p className="mt-1.5 text-sm text-[#8a7a68]">
              Nice, France &middot; Released April 5, 2026
            </p>
            <a
              href="https://youtu.be/br0MPT2SdTE"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Watch on YouTube &rarr;
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
