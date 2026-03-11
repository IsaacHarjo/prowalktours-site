import Link from "next/link";

const regions = [
  {
  name: "Campania",
  href: "/destinations/italy/campania",
  status: "Available now",
  description: "Explore destinations, videos, and travel planning across Campania.",
},
  {
    name: "Basilicata",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Basilicata. Region page coming soon.",
  },
  {
    name: "Emilia-Romagna",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Emilia-Romagna. Region page coming soon.",
  },
  {
    name: "Friuli-Venezia Giulia",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Friuli-Venezia Giulia. Region page coming soon.",
  },
  {
    name: "Lazio",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Lazio. Region page coming soon.",
  },
  {
    name: "Liguria",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Liguria. Region page coming soon.",
  },
  {
    name: "Lombardy",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Lombardy. Region page coming soon.",
  },
  {
    name: "Molise",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Molise. Region page coming soon.",
  },
  {
    name: "Puglia",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Puglia. Region page coming soon.",
  },
  {
    name: "Sardinia",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Sardinia. Region page coming soon.",
  },
  {
    name: "Sicily",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Sicily. Region page coming soon.",
  },
  {
    name: "Tuscany",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Tuscany. Region page coming soon.",
  },
  {
    name: "Umbria",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Umbria. Region page coming soon.",
  },
  {
    name: "Veneto",
    href: "#",
    status: "Videos available",
    description: "Walking tours filmed in Veneto. Region page coming soon.",
  },
];

export default function ItalyPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Country
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            Italy
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
  Browse Italy by region, then explore cities, destinations, and
  individual walks. Some regions already have filmed videos, while
  dedicated region pages are still being built.
</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/destinations/italy/campania"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Explore Campania
            </Link>

            <Link
              href="/countries"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
            >
              Back to Countries
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8 rounded-3xl border border-dashed border-[#d8c7b5] bg-[#fffaf3] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Future Feature
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Interactive Italy Map
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            This section can later become a visual map of Italy with clickable
            regions. For now, use the region cards below as the main entry
            points.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {regions.map((region) =>
            region.href !== "#" ? (
              <Link
                key={region.name}
                href={region.href}
                className="group rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
              >
                <h2 className="text-2xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                  {region.name}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {region.status}
                </p>
                <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                  {region.description}
                </p>
                <div className="mt-6 text-[16px] font-semibold text-[#167fd5]">
                  View region page →
                </div>
              </Link>
            ) : (
              <div
                key={region.name}
                className="rounded-3xl border border-[#eadfce] bg-[#f8f3ec] p-7 opacity-90"
              >
                <h2 className="text-2xl font-bold text-[#2f261d]">
                  {region.name}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {region.status}
                </p>
                <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                  {region.description}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}