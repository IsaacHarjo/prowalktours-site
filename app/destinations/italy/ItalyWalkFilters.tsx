"use client";

import { Children, useState, type ReactNode } from "react";

type Group = { city: string; region: string; count: number; searchText: string };
const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toLowerCase();
const field = "mt-2 min-h-11 w-full rounded-xl border border-[#d8c7b5] bg-white px-3 py-2 text-base font-normal text-[#2f261d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]";

// Cards remain server-rendered children; only small, public group metadata is needed here.
export default function ItalyWalkFilters({ groups, children }: { groups: Group[]; children: ReactNode }) {
  const [region, setRegion] = useState("");
  const [query, setQuery] = useState("");
  const sections = Children.toArray(children);
  const matching = groups.map(group => (!region || group.region === region) && normalize(group.searchText).includes(normalize(query)));
  const visible = groups.filter((_, index) => matching[index]);
  const count = visible.reduce((sum, group) => sum + group.count, 0);
  const cityCount = new Set(visible.map(group => group.city)).size;
  const clear = () => { setRegion(""); setQuery(""); };

  return <>
    <div className="mt-6 grid gap-4 rounded-2xl border border-[#eadfce] bg-white p-4 sm:grid-cols-2 sm:p-5">
      <label className="text-sm font-semibold">Region<select className={field} value={region} onChange={event => setRegion(event.target.value)}><option value="">All regions</option>{[...new Set(groups.map(group => group.region))].filter(Boolean).sort((a, b) => a.localeCompare(b)).map(value => <option key={value}>{value}</option>)}</select></label>
      <label className="text-sm font-semibold">Find a city<input type="search" className={field} placeholder="Try Naples, Rome or Venice" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <div className="mt-3 flex min-h-11 flex-wrap items-center justify-between gap-3">
      <p role="status" aria-atomic="true" className="text-sm text-[#6c5b49]">{count} {count === 1 ? "walk" : "walks"} · {cityCount} {cityCount === 1 ? "city" : "cities"}{region && ` · ${region}`}{query.trim() && ` matching “${query.trim()}”`}</p>
      {(region || query) && <button type="button" onClick={clear} className="min-h-11 rounded-lg px-3 font-semibold text-[#176347] underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">Clear filters</button>}
    </div>
    {!count && <div className="py-8"><h3 className="text-xl font-semibold">No walks match these filters</h3><p className="mt-2 text-[#6c5b49]">Try another city or choose all regions.</p><button type="button" onClick={clear} className="mt-4 min-h-11 rounded-full bg-[#176347] px-5 py-2 font-semibold text-white">Show all walks</button></div>}
    {sections.map((section, index) => <div key={`${groups[index].city}/${groups[index].region}`} hidden={!matching[index]}>{section}</div>)}
  </>;
}
