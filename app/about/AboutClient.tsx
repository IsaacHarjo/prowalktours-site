"use client";
import Image from "next/image";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function AboutClient() {
  return <InfoPage title="About Prowalk Tours" intro="A walk can be a way to discover somewhere new, revisit a favorite place, or simply enjoy the sights and sounds of everyday life.">
    <section className="grid items-start gap-8 md:grid-cols-[1fr_280px]">
      <div><h2>How it all started</h2>
        <p>I’m Isaac Harjo, also known as Ike. My family and I moved to Italy in 2014, where I worked as a high school math teacher. The idea for Prowalk Tours came from my uncle Knut: he wanted a video of Naples to watch while walking on his treadmill.</p>
        <p>I filmed that first Naples walk on February 11, 2017, and shared it on YouTube three days later. The channel grew from that simple idea into an archive of walks around the world.</p>
        <p>Thank you for watching, sharing your memories, suggesting new places, and supporting the next walk.</p>
      </div>
      <Image src="/images/about/isaac-harjo.jpg" alt="A photo of me in front of the Colosseum in Rome" width={1000} height={1000} className="h-auto w-full rounded-3xl" sizes="(max-width: 767px) 100vw, 280px" />
    </section>
    <section><h2>See the place. Hear the atmosphere.</h2><p>I film in 4K with binaural sound so you can see and hear what it’s like to walk through each place. Headphones help you hear footsteps, street conversations, bells, and waves around you. Most walks let the destination speak for itself, without a presenter or spoken narration.</p><p>The archive includes daytime and evening walks, Christmas markets, cycling, drone footage, and 360° experiences. Browse by <Link href="/countries">country</Link>, search for a <Link href="/search">landmark</Link>, or explore the <Link href="/#world-map">tour map</Link>.</p></section>
    <section><h2>Behind the scenes</h2><p>Read about my <Link href="/filming-gear">cameras and binaural recording setup</Link>, or listen to my conversation on <a href="https://open.spotify.com/episode/0ej0AH4GXys0gKdUHkhAzW" target="_blank" rel="noreferrer">The Video Creatr Podcast</a>.</p><p>For professional projects, visit <Link href="/licensing">footage licensing</Link> and <Link href="/press">Press &amp; Partnerships</Link>. You can also <Link href="/support">support the walks</Link> or <Link href="/contact-us">get in touch</Link>.</p></section>
  </InfoPage>;
}
