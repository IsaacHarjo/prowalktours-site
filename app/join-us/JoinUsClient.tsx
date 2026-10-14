"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function JoinUsClient() {
  return <InfoPage title="Join Us" intro="Do you enjoy exploring on foot and creating thoughtful, high-quality travel footage? Tell me about the places you know and the walks you would like to film.">
    <section><h2>Introduce your work</h2><p>Send your name, where you film, a link to a sample walk, your camera and audio setup, and the destinations you have in mind. Natural sound, steady footage, and a strong sense of place are central to Prowalk Tours.</p><p><a href="mailto:info@prowalktours.com?subject=Prowalk%20Tours%20filming%20collaboration">Email a filming collaboration inquiry</a></p></section>
    <section><h2>Before sharing footage</h2><p>Share a viewing link first. Please send only work you have permission to share. Any paid assignment, delivery requirements, or transfer of rights must be agreed separately in writing.</p><p>Read about my <Link href="/filming-gear">filming approach</Link> or <Link href="/about">the story behind the channel</Link>.</p></section>
  </InfoPage>;
}
