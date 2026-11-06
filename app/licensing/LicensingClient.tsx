"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function LicensingClient() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitting = useRef(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    submitting.current = true;
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xljjkrry", {
        method: "POST", body: fields,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const fieldClass = "w-full rounded-lg border border-[#cbd3cc] bg-white px-4 py-3 text-base text-[#243b32] outline-none transition focus:border-[#245c49] focus:ring-2 focus:ring-[#245c49]/20";

  return (
    <div className="bg-[#fcfaf6] text-[#243b32]">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-12 md:py-12 lg:px-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">License my footage</h1>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
            <Image src="/naples/waterfront.jpg" alt="Boats on the Naples waterfront" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority />
          </div>
          <p className="mt-6 text-base leading-7 text-[#526359]">
            Interested in using footage from my walks? Send me a quick message about what you’re looking for, and I’ll get back to you about availability and pricing.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#526359]">You can include a video link or destination if you have one in mind.</p>
        </div>

        <div id="license-form" className="scroll-mt-24 md:pt-1">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="mt-6 space-y-5">
            <input type="hidden" name="_subject" value="Prowalk Tours licensing inquiry" />
            <fieldset disabled={status === "sending"} className="space-y-5">
            <legend className="sr-only">Licensing inquiry</legend>
            <div>
              <label htmlFor="licensing-name" className="mb-2 block text-sm font-semibold">First name <strong className="text-xs font-bold">(required)</strong></label>
              <input id="licensing-name" name="name" autoComplete="given-name" required maxLength={100} type="text" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="licensing-email" className="mb-2 block text-sm font-semibold">Email <strong className="text-xs font-bold">(required)</strong></label>
              <input id="licensing-email" name="email" autoComplete="email" required type="email" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="licensing-message" className="mb-2 block text-sm font-semibold">Message <strong className="text-xs font-bold">(required)</strong></label>
              <textarea id="licensing-message" name="message" required maxLength={10000} rows={5} className={fieldClass + " resize-y"} />
            </div>
            <div>
              <button type="submit" disabled={status === "sending"} className="rounded-lg bg-[#245c49] px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-wait disabled:opacity-60 hover:bg-[#193f33] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245c49]">{status === "sending" ? "Sending…" : "Send message"}</button>
              <p className="mt-1 text-sm leading-6 text-[#526359]">Or email me at <a href="mailto:info@prowalktours.com" className="font-medium underline underline-offset-4">info@prowalktours.com</a>.</p>
            </div>
            </fieldset>
            <div aria-live="polite" aria-atomic="true">
              {status === "success" && <p role="status" className="rounded-lg bg-[#eaf2eb] p-4 text-sm leading-6">Thanks! Your inquiry has been submitted. I’ll get back to you by email.</p>}
              {status === "error" && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">I couldn’t confirm your submission. Your message is still here—please try again, or email info@prowalktours.com.</p>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
