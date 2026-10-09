"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "DJI Osmo Pocket 3 Creator Combo, Vlogging Camera with 1'' CMOS, 4K/120fps Video, 3-Axis Stabilization, Face/Object Tracking, Fast Focusing, Mic Included for Clear Sound, Digital Camera for Photography",
    "href": "https://www.amazon.com/dp/B0CG19FGQ5?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Kingston 256GB Canvas Go Plus microSDXC Card | Up to 170MB/s | UHS-I, C10, U3, V30, A2/A1 | with Adapter | SDCG3/256GB",
    "href": "https://www.amazon.com/dp/B08589RK3M?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Leenconghui Phone Holder for DJI Osmo Pocket 3, Cell Phone Mount Expansion Accessories with 1/4\" Thread Hole Used with Tripod and Extension Rod",
    "href": "https://www.amazon.com/dp/B0CXSHX65V?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function OsmoPocketClient() {
  return <InfoPage title="Osmo Pocket" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
