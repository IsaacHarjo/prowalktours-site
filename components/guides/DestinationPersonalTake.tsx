import Image from "next/image";
import type { ReactNode } from "react";

export default function DestinationPersonalTake({ headingId, title, href, portrait, filmingPhoto, photoAlt = "Me holding my camera beside the canal in Colmar at Christmas", children }: { headingId: string; title: string; href: string; portrait?: string; filmingPhoto?: string; photoAlt?: string; children: ReactNode }) {
  return <section aria-labelledby={headingId} className={`grid items-center gap-6 border-l-2 border-[#b18b45] pl-5 sm:gap-8 sm:pl-7 ${filmingPhoto ? "lg:grid-cols-[minmax(0,1fr)_340px]" : "max-w-4xl"}`}>
    <div>
    <div className="flex items-center gap-4">
    {portrait && <Image src={portrait} alt="Me with my filming camera" width={80} height={80} className="h-16 w-16 shrink-0 rounded-full border border-[#dce1d6] bg-white object-cover sm:h-20 sm:w-20" />}
    <div>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#842d3f]">What makes it special to me</p>
    <h2 id={headingId} className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
    </div></div>
    <div className="mt-4 space-y-3 text-base leading-7 text-[#526258]">{children}</div>
    <a href={href} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]">Let me show you around →</a>
    </div>
    {filmingPhoto && <Image src={filmingPhoto} alt={photoAlt} width={1200} height={675} sizes="(min-width: 1024px) 340px, (min-width: 640px) 480px, 100vw" className="aspect-video w-full max-w-[480px] rounded-2xl object-cover lg:max-w-none" />}
  </section>;
}
