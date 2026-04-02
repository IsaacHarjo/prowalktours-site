import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/destinations/germany/christmas-markets`;

export const metadata: Metadata = {
  title: "Germany Christmas Market Walking Tours | ProWalk Tours",
  description:
    "Germany Christmas market walks in 4K: Nuremberg, Dresden, Rothenburg, Cologne, Stuttgart, Munich, Aachen, Esslingen, and Freiburg.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Germany Christmas Market Walking Tours | ProWalk Tours",
    description:
      "Germany Christmas market walks in 4K: Nuremberg, Dresden, Rothenburg, Cologne, Stuttgart, Munich, Aachen, Esslingen, and Freiburg.",
    url: pageUrl,
  },
};

type Walk = {
  name: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type CitySection = {
  city: string;
  subtitle: string;
  walks: Walk[];
};

const cities: CitySection[] = [
  {
    city: "Nuremberg",
    subtitle: "The Christkindlesmarkt — Germany's most famous Christmas market",
    walks: [
      { name: "Nuremberg Christmas Market Evening Walk (2024)", href: "/videos/nuremberg-nuremberg-christmas-market-evening-walk-2024", description: "The Christkindlesmarkt and Nuremberg old town lit up after dark.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Nuremberg Christmas market evening" },
      { name: "Nuremberg Christmas Market Day Walk (2024)", href: "/videos/nuremberg-nuremberg-christmas-market-day-walk-2024", description: "The Hauptmarkt, castle area, and surrounding market squares in daylight.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Nuremberg Christmas market day" },
      { name: "Nuremberg Christmas Market Evening Walk (2022)", href: "/videos/nuremberg-nuremberg-christmas-market-evening-walk-2022", description: "An earlier evening walk through the Christkindlesmarkt and old town.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Nuremberg Christmas market evening 2022" },
      { name: "Nuremberg Christmas Market Day Walk (2022)", href: "/videos/nuremberg-nuremberg-christmas-market-day-walk-2022", description: "A daytime route through the market area and historic center.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Nuremberg Christmas market day 2022" },
    ],
  },
  {
    city: "Dresden",
    subtitle: "The Striezelmarkt — Germany's oldest Christmas market since 1434",
    walks: [
      { name: "Dresden Christmas Market Evening Walk (2024)", href: "/videos/dresden-dresden-christmas-market-evening-walk-2024", description: "The Striezelmarkt, Frauenkirche, and Zwinger area after dark.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Dresden Christmas market evening" },
      { name: "Dresden Christmas Market Day Walk (2024)", href: "/videos/dresden-dresden-christmas-market-day-walk-2024", description: "The baroque old town and Christmas market stalls in daylight.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Dresden Christmas market day" },
      { name: "Dresden Christmas Market Evening Walk (2022)", href: "/videos/dresden-dresden-christmas-market-evening-walk-2022", description: "An earlier evening route through the Striezelmarkt.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Dresden Christmas market evening 2022" },
      { name: "Dresden Christmas Market Day Walk (2022)", href: "/videos/dresden-dresden-christmas-market-day-walk-2022", description: "A daytime walk through the market area and historic center.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Dresden Christmas market day 2022" },
    ],
  },
  {
    city: "Rothenburg ob der Tauber",
    subtitle: "A medieval walled town with one of Germany's most atmospheric markets",
    walks: [
      { name: "Rothenburg Christmas Market Evening Walk (2024)", href: "/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2024", description: "The Reiterlesmarkt and medieval streets lit up for Christmas.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Rothenburg Christmas market evening" },
      { name: "Rothenburg Christmas Market Morning Walk (2024)", href: "/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-day-walk-2024", description: "The walled town and market square in morning light.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Rothenburg Christmas market morning" },
      { name: "Rothenburg Christmas Market Evening Walk (2023)", href: "/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2023", description: "An earlier evening walk through the Reiterlesmarkt.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Rothenburg Christmas market evening 2023" },
      { name: "Rothenburg Christmas Market Day Walk (2023)", href: "/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-day-walk-2023", description: "A daytime route through the medieval town and market.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Rothenburg Christmas market day 2023" },
    ],
  },
  {
    city: "Cologne",
    subtitle: "Cathedral Christmas market and old town squares along the Rhine",
    walks: [
      { name: "Cologne Christmas Market Evening Walk (2024)", href: "/videos/cologne-cologne-christmas-market-evening-walk-2024", description: "The cathedral market, old town, and Rhine-side markets after dark.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Cologne Christmas market evening" },
      { name: "Cologne Christmas Market Day Walk (2023)", href: "/videos/cologne-cologne-christmas-market-day-walk-2023", description: "The cathedral area and surrounding market squares in daylight.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Cologne Christmas market day" },
    ],
  },
  {
    city: "Stuttgart",
    subtitle: "One of Europe's largest Christmas markets in the heart of Swabia",
    walks: [
      { name: "Stuttgart Christmas Market Evening Walk (2024)", href: "/videos/stuttgart-stuttgart-christmas-market-evening-walk-2024", description: "Schlossplatz, the market hall area, and decorated rooftop stalls.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Stuttgart Christmas market evening" },
      { name: "Stuttgart Christmas Market Evening Walk (2022)", href: "/videos/stuttgart-stuttgart-christmas-market-evening-walk-2022", description: "An earlier walk through the Stuttgart Christmas market.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Stuttgart Christmas market evening 2022" },
    ],
  },
  {
    city: "Munich",
    subtitle: "Marienplatz and the surrounding Christmas markets of Bavaria's capital",
    walks: [
      { name: "Munich Christmas Market Evening Walk (2024)", href: "/videos/munich-munich-christmas-market-evening-walk-2024", description: "Marienplatz, the Viktualienmarkt area, and surrounding market squares.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Munich Christmas market evening" },
    ],
  },
  {
    city: "Aachen",
    subtitle: "The cathedral Christmas market near the Belgian and Dutch borders",
    walks: [
      { name: "Aachen Christmas Market Evening Walk (2024)", href: "/videos/aachen-aachen-christmas-market-evening-walk-2024", description: "The market around Aachen Cathedral and the old town.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Aachen Christmas market evening" },
    ],
  },
  {
    city: "Esslingen",
    subtitle: "A medieval Christmas market with historic craft demonstrations",
    walks: [
      { name: "Esslingen Christmas Market Day Walk (2024)", href: "/videos/esslingen-esslingen-christmas-market-day-walk-2024", description: "The medieval market, half-timbered old town, and craft stalls.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Esslingen Christmas market day" },
    ],
  },
  {
    city: "Freiburg",
    subtitle: "The Black Forest capital's atmospheric Christmas market",
    walks: [
      { name: "Freiburg Christmas Market Evening Walk (2025)", href: "/videos/freiburg-freiburg-christmas-market-evening-walk-2025", description: "The M\u00fcnsterplatz market and Freiburg's old town streets at dusk.", imageSrc: "https://i.ytimg.com/vi/placeholder/maxresdefault.jpg", imageAlt: "Freiburg Christmas market evening" },
    ],
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Germany", href: "/destinations/germany" },
  { label: "Christmas Markets" },
];

export default function GermanyChristmasMarketsPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8a7a68]">
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="inline-flex items-center gap-2">
                {item.href ? (<Link href={item.href} className="transition hover:text-[#167fd5]">{item.label}</Link>) : (<span className="font-medium text-[#5c4c33]">{item.label}</span>)}
                {index < breadcrumbs.length - 1 ? <span aria-hidden="true" className="text-[#bba893]">/</span> : null}
              </div>
            ))}
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">Germany</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">Christmas Market Tours</h1>
          <p className="mt-5 max-w-4xl text-[18px] leading-8 text-[#6c5b49]">
            Long-form 4K walks through Germany&apos;s Christmas markets — Nuremberg, Dresden, Rothenburg ob der Tauber, Cologne, Stuttgart, Munich, Aachen, Esslingen, and Freiburg. Day and evening tours through decorated old towns, cathedral squares, and festive market stalls.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#nuremberg" className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]">Browse Markets</Link>
            <Link href="/destinations/germany" className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]">Back to Germany</Link>
          </div>
        </div>
      </section>

      {cities.map((section) => (
        <section key={section.city} id={section.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">{section.city}</p>
            <h2 className="mt-2 text-3xl font-bold text-[#2f261d]">{section.subtitle}</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {section.walks.map((walk) => (
              <Link key={walk.name} href={walk.href} className="group overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md">
                <div className="aspect-16/10 w-full overflow-hidden">
                  <img src={walk.imageSrc} alt={walk.imageAlt} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">{walk.name}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">{walk.description}</p>
                  <div className="mt-5 text-[15px] font-semibold text-[#167fd5]">Begin Walking →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
