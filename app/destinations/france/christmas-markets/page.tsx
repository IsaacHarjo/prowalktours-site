import type { Metadata } from "next";
import Link from "next/link";
import CardImage from "../../../../components/CardImage";

const slugFromHref = (href: string) => href.replace(/^\/videos\//, "");

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/destinations/france/christmas-markets`;

export const metadata: Metadata = {
  title: "France Christmas Market Walking Tours | ProWalk Tours",
  description:
    "Alsace Christmas market walks in 4K: Strasbourg, Colmar, Riquewihr, Kaysersberg, and Ribeauvillé. Day and evening tours through decorated old towns.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "France Christmas Market Walking Tours | ProWalk Tours",
    description:
      "Alsace Christmas market walks in 4K: Strasbourg, Colmar, Riquewihr, Kaysersberg, and Ribeauvillé. Day and evening tours through decorated old towns.",
    url: pageUrl,
  },
};

type Walk = {
  name: string;
  href: string | null;
  description: string;
  imageSrc: string | null;
  imageAlt: string;
};

type CitySection = {
  city: string;
  subtitle: string;
  walks: Walk[];
};

const cities: CitySection[] = [
  {
    city: "Strasbourg",
    subtitle: "Capital of Christmas — cathedral, Petite France, and the city's famous market squares",
    walks: [
      {
        name: "Strasbourg Christmas Market Evening Walk (2023)",
        href: "/videos/strasbourg-christmas-market-evening-walk-2023",
        description: "Petite France, the cathedral, and Strasbourg's decorated market squares after dark.",
        imageSrc: "https://i.ytimg.com/vi/sLkoeB_d93Q/maxresdefault.jpg",
        imageAlt: "Strasbourg Christmas market at night",
      },
      {
        name: "Strasbourg Christmas Market Day Walk (2023)",
        href: "/videos/strasbourg-christmas-market-day-walk-2023",
        description: "The historic center, Petite France, and Christmas market stalls in daylight.",
        imageSrc: "https://i.ytimg.com/vi/07LDvkp7jgc/maxresdefault.jpg",
        imageAlt: "Strasbourg Christmas market by day",
      },
      {
        name: "Strasbourg Christmas Market Evening Walk (2022)",
        href: "/videos/strasbourg-christmas-market-evening-walk-2022",
        description: "An earlier evening route through the old town and Petite France markets.",
        imageSrc: "https://i.ytimg.com/vi/llOvsepGHZI/maxresdefault.jpg",
        imageAlt: "Strasbourg Christmas market evening 2022",
      },
      {
        name: "Strasbourg Christmas Market Day Walk (2022)",
        href: "/videos/strasbourg-christmas-market-day-walk-2022",
        description: "A long daytime route through the cathedral area and surrounding market districts.",
        imageSrc: "https://i.ytimg.com/vi/B-wi7hIrgf8/maxresdefault.jpg",
        imageAlt: "Strasbourg Christmas market day 2022",
      },
    ],
  },
  {
    city: "Colmar",
    subtitle: "Half-timbered old town, canals, and six distinct Christmas markets",
    walks: [
      {
        name: "Colmar Christmas Market Evening Walk (2023)",
        href: "/videos/colmar-christmas-market-evening-walk-2023",
        description: "The old town lit up for Christmas with market stalls, canals, and half-timbered houses.",
        imageSrc: "https://i.ytimg.com/vi/NMQ4Sy3e-Ec/maxresdefault.jpg",
        imageAlt: "Colmar Christmas market at night",
      },
      {
        name: "Colmar Christmas Market Day Walk (2023)",
        href: "/videos/colmar-christmas-market-day-walk-2023",
        description: "The same famous streets and squares in daylight, with market vendors and seasonal decorations.",
        imageSrc: "https://i.ytimg.com/vi/kjY8okFmuZo/maxresdefault.jpg",
        imageAlt: "Colmar Christmas market by day",
      },
    ],
  },
  {
    city: "Riquewihr",
    subtitle: "A fairytale wine village with one of Alsace's most charming Christmas markets",
    walks: [
      {
        name: "Riquewihr Christmas Market Evening Walk (2023)",
        href: "/videos/riquewihr-christmas-market-evening-walk-2023",
        description: "Decorated gates, courtyards, and narrow streets of this walled village after dark.",
        imageSrc: "https://i.ytimg.com/vi/fXbDgbvA3o0/maxresdefault.jpg",
        imageAlt: "Riquewihr Christmas market at night",
      },
      {
        name: "Riquewihr Christmas Market Day Walk (2023)",
        href: "/videos/riquewihr-christmas-market-day-walk-2023",
        description: "The town hall, Rue du Général de Gaulle, and Dolder Tower with Christmas decorations.",
        imageSrc: "https://i.ytimg.com/vi/MjtMfBRp4y4/maxresdefault.jpg",
        imageAlt: "Riquewihr Christmas market by day",
      },
    ],
  },
  {
    city: "Kaysersberg",
    subtitle: "Medieval bridge, castle ruins, and a compact Christmas market in the Alsace wine country",
    walks: [
      {
        name: "Kaysersberg Christmas Market Day Walk (2025)",
        href: "/videos/kaysersberg-christmas-market-day-walk-2025",
        description: "The town's decorated streets, fortified bridge, castle views, and market stalls.",
        imageSrc: "https://i.ytimg.com/vi/nViNTHYAgXg/maxresdefault.jpg",
        imageAlt: "Kaysersberg Christmas market by day",
      },
      {
        name: "Kaysersberg Christmas Market 360° VR Walk (2025)",
        href: "/videos/kaysersberg-christmas-market-360-tour-2025",
        description: "An immersive 360° walk through Kaysersberg's Christmas market and medieval streets.",
        imageSrc: "https://i.ytimg.com/vi/6KwYy8woxV4/maxresdefault.jpg",
        imageAlt: "Kaysersberg 360 VR Christmas market",
      },
    ],
  },
  {
    city: "Ribeauvillé",
    subtitle: "A medieval-themed Christmas market on the Alsace wine route",
    walks: [
      {
        name: "Ribeauvillé Medieval Christmas Market Walk (2025)",
        href: "/videos/ribeauville-day-walk-2025",
        description: "Medieval costumes, craft stalls, castle views, and half-timbered houses along the Grand Rue.",
        imageSrc: "https://i.ytimg.com/vi/4AYDKWizfmY/maxresdefault.jpg",
        imageAlt: "Ribeauvillé medieval Christmas market",
      },
      {
        name: "Ribeauvillé Christmas Market 360° Walk (2025)",
        href: "/videos/ribeauville-360-walk-2025",
        description: "An immersive 360° walk through Ribeauvillé's medieval Christmas market.",
        imageSrc: "https://i.ytimg.com/vi/ccCz_dKYS5c/maxresdefault.jpg",
        imageAlt: "Ribeauvillé 360 Christmas market",
      },
    ],
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "France", href: "/destinations/france" },
  { label: "Christmas Markets" },
];

export default function ChristmasMarketsPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8a7a68]"
          >
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="inline-flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-[#167fd5]">{item.label}</Link>
                ) : (
                  <span className="font-medium text-[#5c4c33]">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <span aria-hidden="true" className="text-[#bba893]">/</span>
                ) : null}
              </div>
            ))}
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Alsace, France
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            Christmas Market Tours
          </h1>
          <p className="mt-5 max-w-4xl text-[18px] leading-8 text-[#6c5b49]">
            Long-form 4K walks through the Christmas markets of Alsace —
            Strasbourg, Colmar, Riquewihr, Kaysersberg, and Ribeauvillé. Day
            and evening tours through decorated old towns, half-timbered
            streets, cathedral squares, and festive market stalls.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#strasbourg"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse Markets
            </Link>
            <Link
              href="/destinations/france"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
            >
              Back to France
            </Link>
          </div>
        </div>
      </section>

      {cities.map((section) => (
        <section
          key={section.city}
          id={section.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}
          className="mx-auto max-w-7xl px-6 py-10 lg:px-10"
        >
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
              {section.city}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#2f261d]">
              {section.subtitle}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {section.walks.map((walk) =>
              walk.href ? (
                <Link
                  key={walk.name}
                  href={walk.href}
                  className="group overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
                >
                  {walk.imageSrc ? (
                    <div className="aspect-16/10 w-full overflow-hidden">
                      <CardImage
                        slug={slugFromHref(walk.href)}
                        fallbackSrc={walk.imageSrc}
                        alt={walk.imageAlt}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                      {walk.name}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                      {walk.description}
                    </p>
                    <div className="mt-5 text-[15px] font-semibold text-[#167fd5]">
                      Begin Walking →
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  key={walk.name}
                  className="overflow-hidden rounded-3xl border border-[#eadfce] bg-[#f8f3ec] opacity-90"
                >
                  <div className="flex aspect-16/10 w-full items-center justify-center bg-[#efe5d8] text-sm font-semibold text-[#9a7a52]">
                    Coming soon
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2f261d]">{walk.name}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                      {walk.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      ))}
    </main>
  );
}
