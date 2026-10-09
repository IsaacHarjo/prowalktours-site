"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";

export default function CamerasClient() {
  return <InfoPage title="Cameras" intro="Explore the camera setups and accessories in the Prowalk Tours filming gear archive. Equipment varies between walks and has changed over the years.">
    <section><h2>Browse the equipment</h2><ul>
      <li><Link href="/sony-a7siii">Sony A7S III</Link></li>
      <li><Link href="/gopro">GoPro &amp; action cameras</Link></li>
      <li><Link href="/insta360">Insta360</Link></li>
      <li><Link href="/osmo-pocket">Osmo Pocket</Link></li>
      <li><Link href="/phone">Phone filming</Link></li>
    </ul></section>
    <p>Read about our <Link href="/filming-gear">filming approach</Link>, <Link href="/microphones">audio equipment</Link>, and <Link href="/travel-accessories">travel accessories</Link>.</p>
  </InfoPage>;
}
