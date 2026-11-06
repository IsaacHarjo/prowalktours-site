"use client";
import { useRef, useState } from "react";
export default function InquiryForm({kind, initialTopic = ""}: {kind: "licensing" | "contact"; initialTopic?: string}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submitting = useRef(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    if (kind === "contact") fields.set("_subject", "Prowalk Tours contact: " + (fields.get("topic") || "General message"));
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

return (          <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="mt-6 space-y-5">
            <input type="hidden" name="_subject" value={kind === "licensing" ? "Prowalk Tours licensing inquiry" : "Prowalk Tours contact"} />
            <fieldset disabled={status === "sending"} className="space-y-5">
            <legend className="sr-only">{kind === "licensing" ? "Licensing inquiry" : "Contact message"}</legend>
            <div>
              <label htmlFor={kind + "-name"} className="mb-2 block text-sm font-semibold">First name <strong className="text-xs font-bold">(required)</strong></label>
              <input id={kind + "-name"} name="name" autoComplete="given-name" required maxLength={100} type="text" className={fieldClass} />
            </div>
            <div>
              <label htmlFor={kind + "-email"} className="mb-2 block text-sm font-semibold">Email <strong className="text-xs font-bold">(required)</strong></label>
              <input id={kind + "-email"} name="email" autoComplete="email" required type="email" className={fieldClass} />
            </div>
            {kind === "contact" && <div>
              <label htmlFor="contact-topic" className="mb-2 block text-sm font-semibold">What’s your message about? <span className="font-normal">(optional)</span></label>
              <select id="contact-topic" name="topic" defaultValue={initialTopic} className={fieldClass}>
                <option value="">Choose a topic</option>
                <option value="walk">A walk or destination</option>
                <option value="sponsorship">Sponsorship / partnership</option>
                <option value="press">Press / media</option>
                <option value="other">Something else</option>
              </select>
            </div>}
            <div>
              <label htmlFor={kind + "-message"} className="mb-2 block text-sm font-semibold">Message <strong className="text-xs font-bold">(required)</strong></label>
              <textarea id={kind + "-message"} name="message" required maxLength={10000} rows={5} className={fieldClass + " resize-y"} />
            </div>
            <div>
              <button type="submit" disabled={status === "sending"} className="rounded-lg bg-[#245c49] px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-wait disabled:opacity-60 hover:bg-[#193f33] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#245c49]">{status === "sending" ? "Sending…" : "Send message"}</button>
              <p className="mt-1 text-sm leading-6 text-[#526359]">Or email me at <a href="mailto:info@prowalktours.com" className="font-medium underline underline-offset-4">info@prowalktours.com</a>.</p>
            </div>
            </fieldset>
            <div aria-live="polite" aria-atomic="true">
              {status === "success" && <p role="status" className="rounded-lg bg-[#eaf2eb] p-4 text-sm leading-6">{kind === "licensing" ? "Thanks! Your inquiry has been submitted. I’ll get back to you by email." : "Thanks! Your message has been submitted."}</p>}
              {status === "error" && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">I couldn’t confirm your submission. Your message is still here—please try again, or email info@prowalktours.com.</p>}
            </div>
          </form>);
}
