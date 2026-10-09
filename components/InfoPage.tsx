"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export default function InfoPage({ title, intro, children, draft = false }: {
  title: string; intro: string; children: ReactNode; draft?: boolean;
}) {
  return <div className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
    <section className="border-b border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-sm text-[#6e5a45]"><Link href="/" className="underline underline-offset-4">Home</Link><span aria-hidden="true"> / </span><span>{title}</span></nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Prowalk Tours</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">{intro}</p>
        {draft && <aside aria-label="Draft status" className="mt-6 rounded-2xl border border-[#cdb7a0] bg-white p-5 text-sm leading-7">
          <strong>Draft for review — October 9, 2026. Not yet effective.</strong> The Roku app is in development. Its service providers and data practices must be confirmed, and these documents reviewed, before release or use in a Roku submission.
        </aside>}
      </div>
    </section>
    <article className="mx-auto max-w-5xl space-y-10 px-4 py-12 text-base leading-8 text-[#56493a] sm:px-6 lg:px-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-[#3d3327] [&_h3]:font-semibold [&_p+p]:mt-4 [&_a]:text-[#09679e] [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">{children}</article>
  </div>;
}
