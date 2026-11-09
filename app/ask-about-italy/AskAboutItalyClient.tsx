"use client";

import Link from "next/link";
import InquiryForm from "../../components/InquiryForm";

export default function AskAboutItalyClient() {
  return <div className="bg-[#fcfaf6] text-[#243b32]">
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-12 md:py-12 lg:px-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ask me about Italy</h1>
        <h2 className="mt-6 text-xl font-semibold">Thinking about your first trip to Italy?</h2>
        <p className="mt-3 text-base leading-7 text-[#526359]">Not sure where to go or how to fit everything into your trip? Tell me what you’re considering and what you’d like to see. I’ll share suggestions based on my travels when I can.</p>
        <p className="mt-4 text-sm leading-6 text-[#526359]">I read every message, but I may not be able to reply to everyone. You don’t need a detailed plan to ask a question.</p>
        <p className="mt-6 text-sm leading-6"><Link href="/search?country=Italy" className="font-semibold underline underline-offset-4">Explore my Italy walks →</Link></p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">What would you like to know?</h2>
        <InquiryForm kind="italy" />
        <p className="mt-5 text-sm leading-6 text-[#526359]">Your message is sent privately through Formspree. I may use common questions to improve my guides without including your name or contact details. <Link href="/privacy-policy" className="underline underline-offset-4">Privacy policy</Link>.</p>
      </div>
    </section>
  </div>;
}
