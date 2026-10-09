"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LicensingClient() {
  const [prepared, setPrepared] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);
    const body = [...fields.entries()].map(([name, value]) => name + ": " + String(value)).join("\n\n");
    window.location.href = "mailto:info@prowalktours.com?subject=" + encodeURIComponent("Prowalk Tours licensing inquiry") + "&body=" + encodeURIComponent(body);
    setPrepared(body);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
      <section className="border-b border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-[#cdb7a0] bg-white px-3 py-1 text-sm font-medium text-[#5c4c33] shadow-sm transition hover:bg-[#fff8ef]"
          >
            ← Back to Prowalk Tours
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                Prowalk Tours Licensing
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
                License footage from Prowalk Tours
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#56493a]">
                Request footage for documentaries, television, editorial,
                travel campaigns, websites, institutional use, and commercial
                projects. If you need footage from a specific city, route,
                landmark, or atmosphere, prepare an email below describing what
                you are looking for.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-[#56493a]">
                Licensing fees vary based on usage type, clip length,
                distribution, territory, and term. Please provide as much
                detail as possible so an accurate quote can be prepared.
              </p>
              <p className="mt-4 text-base leading-8 text-[#56493a]">Clean footage without titles or captions and custom edits may be available by agreement. For ambient displays, include your organization, number of locations, display environment, and desired destinations.</p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-sm">
              <Image
                src="/naples/waterfront.jpg"
                alt="Boats on the Naples waterfront"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="license-form"
        className="mx-auto max-w-5xl px-6 py-14 lg:px-10"
      >
        <div className="rounded-[2rem] border border-[#d8c7b5] bg-white p-7 shadow-sm lg:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              Licensing Inquiry
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Request a license quote
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#56493a]">
              Tell us how the footage will be used, how much you need, and where
              it will appear. The more specific you are about usage and
              distribution, the easier it will be to quote the request.
            </p>
          </div>

          <p className="mb-6 rounded-xl bg-[#fcfaf6] p-4 text-sm leading-7 text-[#56493a]">This tool opens an email draft in your email application. Review and send it there. Nothing is submitted to a website form service.</p>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="licensing-1" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Name (required)</label>
                <input id="licensing-1" name="Name" required
                  type="text"
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>

              <div>
                <label htmlFor="licensing-2" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Company</label>
                <input id="licensing-2" name="Company"
                  type="text"
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="licensing-3" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Email (required)</label>
                <input id="licensing-3" name="Email" required
                  type="email"
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>

              <div>
                <label htmlFor="licensing-4" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Project Type</label>
                <input id="licensing-4" name="Project Type"
                  type="text"
                  placeholder="Documentary, TV, web, commercial..."
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>

              <div>
                <label htmlFor="licensing-5" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Usage Type</label>
                <select id="licensing-5" name="Usage Type" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>Commercial</option>
                  <option>Editorial / News</option>
                  <option>Documentary / TV</option>
                  <option>Travel / Website</option>
                  <option>Internal / Institutional</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="licensing-6" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Requested Clip Length</label>
                <select id="licensing-6" name="Requested Clip Length" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>10 seconds or less</option>
                  <option>11–30 seconds</option>
                  <option>31–60 seconds</option>
                  <option>60+ seconds</option>
                  <option>Multiple clips</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="licensing-7" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Number of Clips Needed</label>
                <select id="licensing-7" name="Number of Clips Needed" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>1 clip</option>
                  <option>2–5 clips</option>
                  <option>6+ clips</option>
                  <option>Extended footage / sequence</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="licensing-8" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Distribution</label>
                <select id="licensing-8" name="Distribution" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>Internal only</option>
                  <option>Web / Social</option>
                  <option>Broadcast TV</option>
                  <option>Streaming platform</option>
                  <option>In-house / facility use</option>
                  <option>International / foreign network</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="licensing-9" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Territory</label>
                <select id="licensing-9" name="Territory" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>Local / Regional</option>
                  <option>National</option>
                  <option>Worldwide</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="licensing-10" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">License Term</label>
                <select id="licensing-10" name="License Term" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>One-time use</option>
                  <option>1 year</option>
                  <option>3 years</option>
                  <option>Perpetual</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="licensing-11" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Exclusive or Non-Exclusive</label>
                <select id="licensing-11" name="Exclusive or Non-Exclusive" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]">
                  <option>Non-exclusive</option>
                  <option>Exclusive</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="licensing-12" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Deadline</label>
                <input id="licensing-12" name="Deadline"
                  type="text"
                  placeholder="Date or timeframe"
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="licensing-13" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Footage Needed (required)</label>
                <input id="licensing-13" name="Footage Needed" required
                  type="text"
                  placeholder="City, route, landmark, neighborhood, mood, or specific clip"
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="licensing-14" className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Intended Use / Notes</label>
                <textarea id="licensing-14" name="Intended Use / Notes"
                  rows={5}
                  className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
              >
                Prepare Email Inquiry
              </button>
              <a
                href="mailto:info@prowalktours.com?subject=Prowalk%20Tours%20licensing%20inquiry"
                className="rounded-2xl border border-[#9a735a] bg-white px-5 py-3 text-sm font-semibold text-[#9a735a] shadow-sm transition hover:bg-[#fbf4ef]"
              >
                Email Instead
              </a>
            </div>

            <p className="mt-3 text-xs leading-5 text-[#8a7a68]">
              You will need an email application configured on your device. Opening a draft does not send a message. See our <Link href="/privacy-policy" className="underline">draft Privacy Policy</Link>.
            </p>
            {prepared && <div className="mt-4">
              <p role="status" className="text-sm leading-7 text-[#56493a]">An email draft was requested. Review and send it in your email application; this website has not sent your inquiry. If your email application did not open or omitted any text, copy the complete inquiry below into a message using Email Instead.</p>
              <label htmlFor="prepared-inquiry" className="mt-3 block text-sm font-semibold text-[#5c4c33]">Your prepared inquiry</label>
              <textarea id="prepared-inquiry" value={prepared} readOnly rows={8} className="mt-2 w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] p-4 text-sm" />
            </div>}
          </form>
        </div>
      </section>
    </div>
  );
}
