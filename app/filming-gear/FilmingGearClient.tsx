"use client";
import Image from "next/image";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function FilmingGearClient() {
  return <InfoPage title="Filming Gear" intro="The equipment behind the walks: steady pictures, natural movement, and the sounds of being there. Our setup has evolved over the years, so equipment varies by tour.">
    <nav aria-label="Equipment categories" className="flex flex-wrap gap-x-6 gap-y-3"><Link href="/cameras">Camera setups</Link><Link href="/microphones">Microphones &amp; audio</Link><Link href="/travel-accessories">Travel accessories</Link></nav>
    <section id="cameras"><h2>Cameras: from GoPro to Sony</h2><p>Many earlier walks were filmed with the GoPro Hero 6 and Hero 8. A camera stabilizer and an extended grip helped smooth footsteps while keeping the camera free to look around.</p><p>Newer walks use the Sony A7S III. Long walks need a practical combination of camera, lens, stabilizer, spare batteries, and memory cards. The final picture also depends on the light, weather, route, and pace of the walk.</p><Image src="/images/about/filming-setup.jpg" alt="Isaac holding a camera and stabilizer while wearing headphones" width={1000} height={974} className="mt-6 h-auto max-h-[520px] w-full rounded-3xl object-cover" sizes="(max-width: 1024px) 100vw, 900px" /></section>
    <section id="audio"><h2>Binaural audio</h2><p>Binaural microphones capture sound from two listening positions, giving headphone listeners a sense of direction and space. Street sounds are part of the experience, from nearby footsteps to distant church bells.</p><p>The earlier setup included Roland in-ear binaural microphones and a Zoom H1n recorder. Recording equipment changes between projects; a product listed in the gear archive does not mean it was used for every walk.</p><p>For the most immersive experience, use headphones at a comfortable volume.</p></section>
    <section id="travel"><h2>What a long filming day takes</h2><p>Comfortable walking shoes, spare power, reliable storage, weather protection, and a manageable carrying setup matter just as much as the camera. Route planning and a steady walking pace help keep the experience natural.</p><p>For questions about a particular tour’s filming setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the video title or link. For professional footage requirements, <Link href="/licensing">request a licensing quote</Link>.</p></section>
  </InfoPage>;
}
