"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "Hohem iSteady M6 Kit Smartphone Gimbal Stabilizer 3-Axis with Magnetic Fill Light/AI Tracking Sensor for iPhone Android with 0.91-inch OLED Display Max Payload 400g 2023 Upgraded",
    "href": "https://www.amazon.com/dp/B0BXGM2YYC?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "DH10 Upgrade Gimbal Extension Pole Carbon Fiber Bar Lightweight but Strong 1/4\" Universal Rod Compatible with DJI Ronin S, Ronin SC, OSMO Mobile 3, OM 4, ZHIYUN Crane 2 V2 Stabilizer DSLR Camera",
    "href": "https://www.amazon.com/dp/B07MH57ZM9?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function PhoneClient() {
  return <InfoPage title="Phone Filming" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
