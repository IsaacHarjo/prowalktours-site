"use client";

import Image from "next/image";
import InquiryForm from "../../components/InquiryForm";

export default function LicensingClient() {

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
          <InquiryForm kind="licensing" />
        </div>
      </section>
    </div>
  );
}
