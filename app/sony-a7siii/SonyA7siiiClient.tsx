"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "Sony NEW Alpha 7S III Full-frame Interchangeable Lens Mirrorless Camera",
    "href": "https://www.amazon.com/dp/B08DP4NKGN?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Zhiyun Handle Grip LIte, Transmount Single Grip L Bracket Rig, 1/4 Screw Connector for Zhiyun Crane 2S Plus, Zhiyun 2S, DJI Ronin-S SC",
    "href": "https://www.amazon.com/dp/B08JGVX64K?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Sony FE PZ 16-35mm F4 G - Full-Frame Constant-Aperture Wide-Angle Power Zoom G Lens Black",
    "href": "https://www.amazon.com/dp/B09W6CG368?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "USA GEAR DSLR Camera Strap Chest Harness with Quick Release Buckles, Black Neoprene Pattern and Accessory Pockets - Compatible with Canon, Nikon, Sony and More Point and Shoot and Mirrorless Cameras",
    "href": "https://www.amazon.com/dp/B013JD0NBU?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Sony E-mount FE 24mm F1.4 GM Full Frame Wide-angle Prime Lens (SEL24F14GM), Black",
    "href": "https://www.amazon.com/dp/B07HJXVHSS?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Wasabi Power Battery (2-Pack) and Dual USB Charger for Sony NP-FZ100, BC-QZ1 and Sony FX3, a1, a9, a9 II, a7C, a7R III, a7R IV, a7S III, a7 III, a7 IV, a6600 (KIT-BB-FZ100-02)",
    "href": "https://www.amazon.com/dp/B07CQ3K66C?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Kodak 128GB UHS-II U3 V90 Ultra Pro SDXC Memory Card -Up to 290MB/s Read Speed & 230MB/s Write Speed (2-Pack)",
    "href": "https://www.amazon.com/dp/B0BYL3SXNJ?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Sony NPFZ100 Z-series Rechargeable Battery Pack for Alpha A7 III, A7R III, A9 Digital Cameras black",
    "href": "https://www.amazon.com/dp/B071CLKMRT?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "DJI RS 4, 3-Axis Gimbal Stabilizer for DSLR and Mirrorless Cameras Canon/Sony/Panasonic/Nikon/Fujifilm, 2nd-Gen Native Vertical Shooting, 2-Mode Switch Joystick, Teflon Axis Arms, Camera Gimbal",
    "href": "https://www.amazon.com/dp/B0CS6LC1ZQ?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Kamerar MogoCrane Belt Kit, Weight Support for Single Handed Gimbal Stabilizer, DJI Ronin-S, Zhiyun Crane 2, Crane Plus, Moza Air 2, AirCross, Hold The Gimbal Easier and Longer",
    "href": "https://www.amazon.com/dp/B07MZFJPY6?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function SonyA7siiiClient() {
  return <InfoPage title="Sony A7S III" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
