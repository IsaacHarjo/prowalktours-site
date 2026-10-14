import type { ReactNode } from "react";

export default function GuideDisclosure({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return <details className={`group/disclosure rounded-2xl border border-[#dce1d6] bg-white ${className}`}>
    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-4 text-base font-semibold text-[#25382f] hover:bg-[#f5f6f1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347] sm:px-6 [&::-webkit-details-marker]:hidden">
      {title}
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5 shrink-0 transition-transform group-open/disclosure:rotate-180 motion-reduce:transition-none"><path d="m6 9 6 6 6-6" /></svg>
    </summary>
    <div className="border-t border-[#e1e3d9] px-5 py-6 sm:px-6">{children}</div>
  </details>;
}
