"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "Insta360 X4 Creator Bundle - 8K Waterproof 360 Action Camera, 4K Wide-Angle Video, Invisible Selfie Stick, Removable Lens Guards, 135 Min Battery Life, AI Editing, Stabilization, for Sports, Travel",
    "href": "https://www.amazon.com/dp/B0CYSLF9S6?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Kingston 256GB Canvas Go Plus microSDXC Card | Up to 170MB/s | UHS-I, C10, U3, V30, A2/A1 | with Adapter | SDCG3/256GB",
    "href": "https://www.amazon.com/dp/B08589RK3M?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Insta360 2-in-1 Invisible Selfie Stick + Tripod, Compatible with GO 3/X3/ONE RS(1-Inch 360 Excluded)/ONE X2/ONE X/GO 2/ONE R/ONE",
    "href": "https://www.amazon.com/dp/B08R5K1YST?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function Insta360Client() {
  return <InfoPage title="Insta360" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
