"use client";
import Image from "next/image";
import GearPage, { GearProducts, type GearProduct } from "../../components/GearPage";
const amazon = (id: string) => "https://www.amazon.com/dp/" + id + "?tag=isaacharjo-20";
const products: GearProduct[] = [
  { title: "Sony A7S III", note: "My main walking-tour camera.", href: amazon("B08DP4NKGN") },
  { title: "Sony FE PZ 16–35mm F4 G", note: "My daytime lens.", href: amazon("B09W6CG368") },
  { title: "Sony FE 20mm F1.8 G", note: "My night-walk lens.", href: amazon("B08556WW56") },
  { title: "NiSi 72mm Swift 1–9 VND Kit", note: "The filter kit I use with my daytime lens.", href: "https://link.amazon/B02OqRzx4" },
  { title: "DJI RS 4 Mini Combo", note: "Camera stabilizer.", href: amazon("B0DJ2WQ498") },
  { title: "Sony ECM-M1", note: "My primary microphone.", href: amazon("B0CBLDQLZ4") },
  { title: "Kodak 256GB V90 SDXC", note: "UHS-II memory card.", href: amazon("B09889SL3V") },
  { title: "Zhiyun Handle Grip Lite", note: "Additional stabilizer grip.", href: amazon("B08JGVX64K") },
  { title: "Sony NP-FZ100", note: "Spare camera battery.", href: amazon("B071CLKMRT") },
];
export default function SonyA7siiiClient() {
  return <GearPage title="My Sony camera setup" intro="The camera, lenses, and accessories I use for my Sony walks.">
    <div className="overflow-hidden rounded-2xl bg-white"><Image src="/images/gear/sony-current-rig.png" alt="My Sony camera mounted on a stabilizer" width={900} height={900} className="mx-auto h-64 w-full object-contain sm:h-80" /></div>
    <GearProducts products={products} />
  </GearPage>;
}
