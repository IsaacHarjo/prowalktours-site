"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "GoPro HERO13 Black - Waterproof Action Camera with 5.3K60 Video, 27MP Photo + Compatability with HB-Series Lenses",
    "href": "https://www.amazon.com/dp/B0DCM34GXX?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "DJI Osmo Action 5 Pro Standard Combo, Waterproof Camera with 1/1.3\" Sensor, 4K/120fps Video, Subject Tracking, Stabilization, Dual OLED Touchscreens, Action Camera 4K Ideal for Sports, Vlog",
    "href": "https://www.amazon.com/dp/B0DBQTC2P7?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "3 Axis Gimbal Stabilizer for Gopro Hero 13/12/11/10/9, Handheld Stabilizer for Gopro for Video Recording, IPX4 Waterproof, Bluetooth Control, Compatible with Osmo Camera, Insta360, hohem iSteady Pro4",
    "href": "https://www.amazon.com/dp/B07JC9KNHS?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Gimbal Extension Pole, ZHIYUN 29\" Extension Rod for Gimbal Stabilizer, Adjustable Selfie Stick with 1/4\" Thread Compatible with DJI OM 6/5/4/ Smooth 5 Q3 4/GoPro Vlog Pocket/Go 2 EVO Action Camera",
    "href": "https://www.amazon.com/dp/B09871DN9G?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "GoPro Extension Pole (Extends from 10\" to 48\") + Waterproof Shutter Remote - Official GoPro Accessory",
    "href": "https://www.amazon.com/dp/B0CPTJPTZC?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Dual Battery Charger + 2 x Rechargeable Batteries for GoPro Hero 13 Black Camera",
    "href": "https://www.amazon.com/dp/B0DJP7BHYY?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function GoproClient() {
  return <InfoPage title="GoPro & Action Cameras" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
