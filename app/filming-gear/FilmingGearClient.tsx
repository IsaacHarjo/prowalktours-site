"use client";
import Image from "next/image";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function FilmingGearClient() {
  return <InfoPage title="Filming Gear" intro="Here’s the camera and audio equipment I use for the walks. My setup has changed over the years, so it depends on when a tour was filmed.">
    <section aria-labelledby="amazon-storefront-heading" className="rounded-2xl border border-[#d8c7b5] bg-[#f5f0e8] p-6">
      <h2 id="amazon-storefront-heading">My Amazon storefront</h2>
      <p>You can browse camera setups, audio equipment, and travel gear in my Amazon storefront.</p>
      <p><a href="https://www.amazon.com/shop/prowalktours" target="_blank" rel="sponsored noopener noreferrer">Visit my Amazon storefront ↗</a></p>
      <p className="text-sm">As an Amazon Associate I earn from qualifying purchases.</p>
    </section>
    <nav aria-label="Equipment categories" className="grid gap-5 sm:grid-cols-3">
      {[
        { href: "/cameras", image: "camera-setups.jpg", title: "Camera setups", alt: "Prowalk Tours camera and stabilizer setups" },
        { href: "/microphones", image: "microphones.jpg", title: "Microphones & audio", alt: "Zoom recorder and Roland in-ear microphones" },
        { href: "/travel-accessories", image: "travel-accessories.jpg", title: "Travel accessories", alt: "Walking shoes, bags, phone holder, and travel adapters" },
      ].map(category => <Link key={category.href} href={category.href} className="group overflow-hidden rounded-2xl border border-[#d8c7b5] bg-white transition hover:border-[#9a735a] hover:shadow-md">
        <div className="relative aspect-[4/3] bg-white">
          <Image src={`/images/gear/${category.image}`} alt={category.alt} fill sizes="(min-width: 640px) 300px, 100vw" className="object-contain p-2" />
        </div>
        <span className="block border-t border-[#eadfce] px-4 py-3 text-sm font-semibold">{category.title} →</span>
      </Link>)}
    </nav>
    <section id="cameras"><h2>Cameras: from GoPro to Sony</h2><p>I filmed many of the earlier walks with a GoPro Hero 6 or Hero 8. A camera stabilizer and an extended grip helped smooth footsteps while keeping the camera free to look around.</p><p>For newer walks, I use the Sony A7S III. Long walks need a practical combination of camera, lens, stabilizer, spare batteries, and memory cards. The final picture also depends on the light, weather, route, and pace of the walk.</p><Image src="/images/about/filming-setup.jpg" alt="My filming setup: holding the camera and stabilizer while wearing headphones" width={1000} height={974} className="mt-6 h-auto max-h-[520px] w-full rounded-3xl object-cover" sizes="(max-width: 1024px) 100vw, 900px" /></section>
    <section id="audio"><h2>Binaural audio</h2><p>Binaural microphones capture sound from two listening positions, giving headphone listeners a sense of direction and space. Street sounds are part of the experience, from nearby footsteps to distant church bells.</p><p>My earlier setup included Roland in-ear binaural microphones and a Zoom H1n recorder. The gear changes from walk to walk, so I haven’t used every item listed here in every video.</p><p>Try listening with headphones to hear where the sounds are coming from.</p></section>
    <section id="travel"><h2>What a long filming day takes</h2><p>Comfortable walking shoes, spare power, reliable storage, weather protection, and a manageable carrying setup matter just as much as the camera. Route planning and a steady walking pace help keep the experience natural.</p><p>For questions about a particular tour’s filming setup, <Link href="/contact-us">get in touch</Link> with the video title or link. For professional footage requirements, <Link href="/licensing">request a licensing quote</Link>.</p></section>
  </InfoPage>;
}
