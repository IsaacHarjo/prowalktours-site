"use client";
import Link from "next/link";
import InquiryForm from "../../components/InquiryForm";
export default function ContactClient({initialTopic = ""}: {initialTopic?: string}) {
 return <div className="bg-[#fcfaf6] text-[#243b32]"><section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-12 md:py-12 lg:px-10">
 <div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact me</h1>
 <p className="mt-6 text-base leading-7 text-[#526359]">Have a question about a walk, want to share a message, or have an idea for working together? Send me a note.</p>
 <p className="mt-4 text-sm leading-6 text-[#526359]">If you’re writing about a walk, a video link or destination helps. For a sponsorship or partnership, tell me a little about your brand and idea.</p>
 <p className="mt-6 text-sm leading-6">Looking to use my footage? <Link href="/licensing" className="font-semibold underline underline-offset-4">Visit footage licensing.</Link></p>
 </div><div><h2 className="text-xl font-semibold">Send a message</h2><InquiryForm kind="contact" initialTopic={initialTopic} /></div>
 </section></div>;
}
