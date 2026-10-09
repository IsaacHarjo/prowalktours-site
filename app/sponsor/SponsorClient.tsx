"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function SponsorClient() {
  return <InfoPage title="Sponsor Prowalk Tours" intro="We welcome partnership ideas that are useful to our viewers and fit the experience of exploring the world on foot.">
    <section><h2>Start a conversation</h2><p>Camera and audio equipment, walking shoes, travel accessories, and destination partnerships are natural areas for collaboration. Tell us about your brand, proposed idea, intended audience, timing, and budget.</p><p><a href="mailto:info@prowalktours.com?subject=Prowalk%20Tours%20brand%20partnership">Email a partnership inquiry</a></p><p>Availability, deliverables, usage rights, and commercial terms are agreed for each project. Paid placements will be identified as such.</p></section>
    <section><h2>Explore our work</h2><p>See <Link href="/press">Press &amp; Partnerships</Link> for professional background, or <Link href="/licensing">licensing</Link> if you need existing footage for your own production.</p></section>
  </InfoPage>;
}
