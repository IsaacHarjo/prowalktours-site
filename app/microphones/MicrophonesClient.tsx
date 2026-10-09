"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "Zoom H1essential Portable Recorder",
    "href": "https://www.amazon.com/dp/B0CSL4PXDV?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Sony Digital Shotgun Microphone ECM-M1,Black",
    "href": "https://www.amazon.com/dp/B0CBLDQLZ4?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Sennheiser Professional MKE 440 Compact Stereo Shotgun Microphone with 3.5mm Connector for Cameras, 506258,Black",
    "href": "https://www.amazon.com/dp/B01EM70BE6?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "JNSA Ear Tip Anti-Slip Sports Earbuds Tips Ear Fins Wingtips Noise Isolation Replacement Eartips Adapters for in Ear Earphones 4mm to 6mm Nozzle Attachment 4 Pairs Left and Right, White HT4W",
    "href": "https://www.amazon.com/dp/B0CBPYTDTT?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function MicrophonesClient() {
  return <InfoPage title="Microphones & Audio" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
