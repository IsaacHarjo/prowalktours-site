"use client";

export default function StayConnected() {
  return <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-6 shadow-sm">
    <h3 className="text-xl font-bold text-[#3d3327]">Follow the next walk</h3>
    <p className="mt-3 text-sm leading-7 text-[#56493a]">Subscribe on YouTube and choose notifications there to hear about new tours.</p>
    <a href="https://www.youtube.com/@ProwalkTours?sub_confirmation=1" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white hover:bg-[#09679e]">Follow on YouTube</a>
  </div>;
}
