import Link from "next/link";
import ThumbnailImg from "../ThumbnailImg";
import type { ChristmasWalk } from "../../lib/christmas/catalog";

export default function CompactWalkList({ walks }: { walks: ChristmasWalk[] }) {
  return <div className="divide-y divide-[#e1e3d9]">{walks.map(walk => <article key={walk.id} className="flex items-center gap-4 py-5 sm:gap-6">
    <Link href={walk.watchHref} tabIndex={-1} aria-hidden="true" target={walk.watchDestinationType === "youtube" ? "_blank" : undefined} rel={walk.watchDestinationType === "youtube" ? "noreferrer" : undefined} className="w-24 shrink-0 overflow-hidden rounded-lg bg-[#e6e7de] sm:w-40">
      <ThumbnailImg src={walk.thumbnail} alt="" className="aspect-video w-full object-cover" />
    </Link>
    <div className="min-w-0 flex-1">
      <p className="text-xs leading-5 text-[#657069]">{walk.city}, {walk.country} · {walk.filmedYear ?? "Filming date unknown"}</p>
      <h3 className="mt-1 text-sm font-semibold leading-6 sm:text-base"><Link className="hover:underline" href={walk.watchHref} target={walk.watchDestinationType === "youtube" ? "_blank" : undefined} rel={walk.watchDestinationType === "youtube" ? "noreferrer" : undefined}>{walk.siteTitle} <span aria-hidden="true">{walk.watchDestinationType === "youtube" ? "↗" : "→"}</span></Link></h3>
      <p className="mt-1 text-xs leading-5 text-[#657069]">{walk.videoType.replace(/-/g, " ")}{walk.durationLabel ? ` · ${walk.durationLabel}` : ""}{walk.watchDestinationType === "youtube" ? " · YouTube" : ""}</p>
    </div>
  </article>)}</div>;
}
