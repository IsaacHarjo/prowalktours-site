"use client";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
const products = [
  {
    "title": "MiiKARE Airplane Travel Essentials Phone Holder, Universal Handsfree Phone Mount for Flying 360 Degree Rotation, Baby Travel Gear Flight Accessory Travel Must Haves Phone Stand for Desk, Table-Blue",
    "href": "https://www.amazon.com/dp/B0BFV8YL9Y?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Suncloud Rambler Polarized Sunglasses",
    "href": "https://www.amazon.com/dp/B01N0X8M75?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "WATERFLY Fanny Pack Waist Bag: Waist Pack for Women Men with Water Bottle Holder Hiking Fanny Pack for Running Walking DogWalking Travel Cycling",
    "href": "https://www.amazon.com/dp/B07QLBMMGD?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "5.11 Tactical Men's Stryke Operator Uniform Pants w/Flex-Tac Mechanical Stretch, Tundra, 34Wx32L, Style 74369",
    "href": "https://www.amazon.com/dp/B00D4CWF1I?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Samsonite Ripstop Wheeled Rolling Duffel Bag, Blue, 30 Inch",
    "href": "https://www.amazon.com/dp/B007PKI5XM?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "5.11 Tactical Men's Men’s Taclite Pro 11-Inch Shorts, Lightweight, Adjustable Waistband, Coyote, Size 32, Style 73308",
    "href": "https://www.amazon.com/dp/B0069WG480?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Brooks Men’s Ghost 16 Neutral Running Shoe - Blue Opal/Black/Nasturtium - 11 Medium",
    "href": "https://www.amazon.com/dp/B0CGYY6GCK?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  },
  {
    "title": "Type C Charger, 2-Pack 25W Type C Super Fast Charging Block with 6ft USB C Charger Cable Compatible with Galaxy S23 Ultra/S23+/S22/S21/S20/Phone 16/16 Plus/16 Pro Max/15/15 Pro Max/15 Plus-Blue",
    "href": "https://www.amazon.com/dp/B0DM5S3WL9?tag=isaacharjo-20&linkCode=osi&th=1&psc=1"
  }
];
export default function TravelAccessoriesClient() {
  return <InfoPage title="Travel Accessories" intro="Equipment and accessories from the Prowalk Tours filming gear archive. Setups vary by tour; check current specifications, compatibility, availability, and pricing with the retailer.">
    <p><Link href="/filming-gear">Our filming approach</Link> · <Link href="/cameras">Browse camera setups</Link></p>
    <aside className="rounded-2xl border border-[#d8c7b5] bg-white p-5 text-sm leading-7"><strong>Affiliate links:</strong> As an Amazon Associate, Prowalk Tours earns from qualifying purchases. Following a product link opens Amazon; no purchase is made on this website.</aside>
    <section><h2>Equipment links</h2><ul>{products.map(product => <li key={product.href}><a href={product.href} target="_blank" rel="sponsored noreferrer">{product.title}</a></li>)}</ul></section>
    <p>For questions about a particular video’s setup, <Link href="/contact-us">contact Prowalk Tours</Link> with the tour title or link.</p>
  </InfoPage>;
}
