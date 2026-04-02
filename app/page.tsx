import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";

import SearchFilterBar from "../components/SearchFilterBar";
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
    .filter(
      (t): t is NonNullable<typeof t> => t !== null
    );
}

const worldTours = loadWorldTours();

const popularDestinations = [
  {
    title: "Naples & Campania",
    href: "/destinations/italy/campania",
    description:
      "Historic streets, waterfront walks, local neighborhoods, and nearby day trips in southern Italy.",
  },
  {
    title: "Amalfi Coast",
    description:
      "Scenic coastal towns, cliffside paths, seaside views, and unforgettable walks along the coast.",
  },
  {
    title: "French Riviera",
    href: "/destinations/france/french-riviera",
    description:
      "Old towns, marinas, beaches, promenades, and Mediterranean atmosphere in southern France.",
  },
  {
    title: "Provence",
    href: "/destinations/france/provence",
    description:
      "Historic cities, markets, Roman landmarks, and beautiful walkable town centers.",
  },
  {
    title: "Venice",
    description:
      "Canals, hidden lanes, bridges, piazzas, and one of the world's most unique walking experiences.",
  },
  {
    title: "Croatia",
    href: "/destinations/croatia",
    description:
      "Coastal towns, Adriatic views, old stone streets, and scenic seaside walks.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      {/* ── Desktop: two-column split (headline+search left, map right) ── */}
      {/* ── Mobile: stacked (headline, map, search) ── */}

      {/* Mobile-only slim header */}
      <section className="bg-[#1f1812] lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3dfc4]">
              Immersive Travel Videos
            </p>
            <h1 className="mt-1 text-2xl font-bold leading-tight text-white sm:text-3xl">
              Explore the world one walk at a time
            </h1>
            <p className="mt-1 text-sm leading-6 text-white/70">
              421 walks across Italy, France &amp; Germany
            </p>
          </div>
          <Link
            href="/countries"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#167fd5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
          >
            Browse Countries
          </Link>
        </div>
      </section>

      {/* Mobile-only map */}
      <section className="w-full lg:hidden">
        <WorldMapClient tours={worldTours} fullWidth />
      </section>

      {/* Mobile-only search */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:hidden">
        <SearchFilterBar
          videos={videos}
          action="/search"
          placeholder="Search by country, city, landmark, or video type"
          submitLabel="Search"
        />
      </section>

      {/* Desktop two-column layout */}
      <section className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:items-stretch">
        {/* Left column: headline + search */}
        <div className="flex flex-col justify-center bg-[#1f1812] px-10 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f3dfc4]">
            Immersive Travel Videos
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white">
            Explore the world one walk at a time
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/70">
            421 walks across Italy, France &amp; Germany
          </p>

          <div className="mt-8">
            <SearchFilterBar
              videos={videos}
              action="/search"
              placeholder="Search by keyword"
              submitLabel="Search"
              variant="hero"
            />
          </div>

          <div className="mt-6">
            <Link
              href="/countries"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse Countries
            </Link>
          </div>
        </div>

        {/* Right column: map with explicit pixel height */}
        <div>
          <WorldMapClient
            tours={worldTours}
            fullWidth
            heightClassName="h-[600px]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-24">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Most Popular Travel Destinations
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Most Popular Travel Destinations
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            Start with some of the most popular places on Prowalk Tours.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {popularDestinations.map((destination) => {
              const cardClassName =
                "rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-5 shadow-sm transition";

              if (destination.href) {
                return (
                  <Link
                    key={destination.title}
                    href={destination.href}
                    className={`${cardClassName} hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md`}
                  >
                    <p className="text-lg font-semibold text-[#2f261d]">
                      {destination.title}
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                      {destination.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-[#167fd5]">
                      Explore Destination -&gt;
                    </p>
                  </Link>
                );
              }

              return (
                <div key={destination.title} className={cardClassName}>
                  <p className="text-lg font-semibold text-[#2f261d]">
                    {destination.title}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                    {destination.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#8a7a68]">
                    Route coming soon
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}