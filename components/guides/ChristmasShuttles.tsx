import type { GuideShuttleService } from "../../lib/guides/types";
import GuideDisclosure from "./GuideDisclosure";
import GuideSectionHeading from "./GuideSectionHeading";

export default function ChristmasShuttles({ service }: { service: GuideShuttleService }) {
  const checkedDate = new Date(`${service.checkedOn}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

  return <section id="christmas-shuttles" aria-labelledby="shuttles-heading" className="scroll-mt-[var(--guide-scroll-offset,5rem)] border-y border-[#dce1d6] bg-[#edf1ed]">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
      <GuideSectionHeading id="shuttles-heading" eyebrow="Nearby markets without a car" title="Christmas Shuttles" icon="shuttle" />
      <p className="mt-5 max-w-3xl leading-7 text-[#526258]">{service.introduction}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div><dt className="text-sm text-[#526258]">Season</dt><dd className="mt-1 font-semibold leading-7">{service.dates}</dd></div>
            <div><dt className="text-sm text-[#526258]">Departures</dt><dd className="mt-1 font-semibold leading-7">{service.departure}</dd></div>
          </dl>
          <a href={service.source.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#176347] px-5 py-3 text-center text-sm font-semibold leading-6 text-white hover:bg-[#25382f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">{service.source.label} ↗</a>
      </div>
      <GuideDisclosure title="Shuttle routes, fares & ticket details" className="mt-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="text-lg font-semibold">Tickets & fares</h3>
          <dl className="mt-3 divide-y divide-[#cbd6c8] border-y border-[#cbd6c8]">
            {service.fares.map(fare => <div key={fare.label} className="flex flex-wrap justify-between gap-x-5 gap-y-1 py-3 text-sm leading-6"><dt className="text-[#526258]">{fare.label}</dt><dd className="font-semibold">{fare.value}</dd></div>)}
          </dl>
          <p className="mt-3 text-sm leading-6 text-[#526258]">{service.children}</p>
          <p className="mt-4 text-sm leading-7 text-[#526258]">{service.booking}</p>
          <p className="mt-3 text-xs leading-6 text-[#657069]">Official information checked <time dateTime={service.checkedOn}>{checkedDate}</time>.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Routes & operating days</h3>
          <ul className="mt-4 divide-y divide-[#dce1d6]">{service.routes.map(route => <li key={route.label} className="flex items-start gap-4 py-4 first:pt-0"><span className="min-w-16 shrink-0 rounded-lg bg-[#edf1ed] px-2 py-2 text-center text-sm font-semibold text-[#176347]">{route.label}</span><div><p className="font-semibold leading-6">{route.destinations}</p><p className="mt-1 text-sm leading-6 text-[#657069]">{route.days}</p></div></li>)}</ul>
          <p className="mt-4 text-sm leading-7 text-[#526258]">{service.note}</p>
        </div>
        </div>
      </GuideDisclosure>
    </div>
  </section>;
}
