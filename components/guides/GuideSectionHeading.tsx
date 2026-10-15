import Image from "next/image";

type SectionIcon = "planning" | "region" | "walking" | "shuttle" | "prowalk" | "explore" | "questions";

function SectionSymbol({ icon }: { icon: Exclude<SectionIcon, "prowalk"> }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    {icon === "planning" && <>
      <path d="M13 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8M7 16h4M7 12h2" />
      <path d="m12 9 7-7 3 3-7 7-4 1 1-4Zm5-5 3 3" />
    </>}
    {icon === "region" && <>
      <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16" />
    </>}
    {icon === "walking" && <>
      <circle cx="13" cy="3.5" r="1.75" />
      <path d="m7 13 1-4 4-2 3 4 4 1M12 7l-2 8-4 6m4-6 5 2 1 4" />
    </>}
    {icon === "shuttle" && <>
      <rect x="4" y="3" width="16" height="16" rx="3" />
      <path d="M4 11h16M8 19v2m8-2v2M8 15h1m6 0h1M8 6h8" />
    </>}
    {icon === "explore" && <>
      <circle cx="6" cy="16" r="4" />
      <circle cx="18" cy="16" r="4" />
      <path d="m2.3 14.5 2.8-8A2 2 0 0 1 7 5h1a2 2 0 0 1 2 2v9m11.7-1.5-2.8-8A2 2 0 0 0 17 5h-1a2 2 0 0 0-2 2v9m-4-5h4m-4 6h4" />
    </>}
    {icon === "questions" && <>
      <path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z" />
      <path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3h.01" />
    </>}
  </svg>;
}

export default function GuideSectionHeading({ id, eyebrow, title, icon }: {
  id: string;
  eyebrow: string;
  title: string;
  icon: SectionIcon;
}) {
  return <div className="flex max-w-3xl items-start gap-4">
    <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center ${icon === "prowalk" ? "overflow-hidden rounded-full bg-white ring-1 ring-[#dce1d6]" : "rounded-xl bg-[#25382f] text-white"}`}>
      {icon === "prowalk"
        ? <Image src="/logo/prowalk-logo-badge.webp" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
        : <SectionSymbol icon={icon} />}
    </span>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607767]">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-semibold tracking-tight text-[#25382f]">{title}</h2>
    </div>
  </div>;
}
