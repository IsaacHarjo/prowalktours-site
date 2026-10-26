import GuideSectionHeading from "./GuideSectionHeading";

const linkStyle = "inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4";

export default function KaysersbergShuttles() {
  return <section id="christmas-shuttles" aria-labelledby="shuttles-heading" className="scroll-mt-40 border-y border-[#dce1d6] bg-white">
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
      <GuideSectionHeading id="shuttles-heading" eyebrow="Getting to the market" title="Christmas Shuttles to Kaysersberg" icon="shuttle" />
      <p className="mt-4 max-w-3xl leading-7 text-[#526258]">Coming from Colmar or driving yourself? Choose the option that fits your day.</p>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#526258]">I arrived by car at about 11am on a Friday in December 2025. Traffic was heavy, and every car park I could see looked full. I eventually found a space on Rue de la Flieh and walked in along Rue des Forgerons. Finding that space took some looking, so I’d plan your arrival before setting off.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-6">
          <h3 className="text-xl font-semibold">From Colmar & the other markets</h3>
          <p className="mt-3 text-sm leading-7">Lines 1 and 2 connect Colmar, Kaysersberg, Riquewihr and Ribeauvillé in opposite directions. They run Friday–Sunday, 27 November–20 December 2026: hourly on Fridays and every 30 minutes at weekends.</p>
          <dl className="mt-4 space-y-3 text-sm leading-6">
            <div><dt className="font-semibold">Kaysersberg stop</dt><dd>Route de Kientzheim, beside the Hiltenfinck garage.</dd></div>
            <div><dt className="font-semibold">Day ticket</dt><dd>€17 for unlimited travel across the network; under-12s ride free but still need a booked free ticket. Tickets are sold online.</dd></div>
          </dl>
          <p className="mt-4 text-sm leading-6 text-[#526258]">Board in Colmar at the train station. Ticket sales open 12 November 2026 at noon (CET). Check your last bus before heading into the market.</p>
          <div className="mt-3 flex flex-wrap gap-x-5"><a href="https://noel-colmar.com/en/christmas-shuttles" target="_blank" rel="noreferrer" className={linkStyle}>Timetables & bus stops ↗</a><a href="https://billetterie.l-k.fr/" target="_blank" rel="noreferrer" className={linkStyle}>Shuttle tickets ↗</a></div>
        </article>
        <article className="rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-6">
          <h3 className="text-xl font-semibold">Driving? Use the park-and-ride</h3>
          <p className="mt-3 text-sm leading-7">This local shuttle brings you into Place Gouraud at the other end of town from the Christmas Shuttles arriving from Colmar.</p>
          <p className="mt-3 text-sm leading-7">On market Saturdays and Sundays, parking costs €4 per vehicle and the shuttle into town is free.</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6"><li>Hinteralspach–Mauffrey</li><li>DS Smith, 77 route de Lapoutroie</li><li>Carrefour Contact, 63 route de Lapoutroie</li></ul>
          <p className="mt-4 text-sm leading-7">Buses run every 15 minutes, 10am–8:30pm, to Place Gouraud at the upper end of the town centre.</p><p className="mt-4 text-sm leading-7"><strong>Driving on Friday?</strong> The local park-and-ride shuttle only runs on Saturdays and Sundays. Look for the regular car parks at Porte Basse, Schweitzer or Place Gouraud, and allow extra time to find a space. From Place Gouraud, you can join my walk near the medieval gate and bridge.</p>
          <a href="https://www.noel-colmar.com/en/kaysersberg/practical#navette" target="_blank" rel="noreferrer" className={linkStyle + " mt-3"}>Parking & local shuttle details ↗</a>
        </article>
      </div>
    </div>
  </section>;
}
