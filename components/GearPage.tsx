import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
export default function GearPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <div className="min-h-screen bg-[#fcfaf6] text-[#243b32]"><div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#627168]"><Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/filming-gear">Filming gear</Link></nav>
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
    <p className="mt-3 max-w-3xl leading-7 text-[#56665d]">{intro}</p>
    <div className="mt-8 space-y-8">{children}</div>
    <footer className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#dce2d9] pt-5 text-sm text-[#56665d]"><p>As an Amazon Associate I earn from qualifying purchases.</p><Link href="/contact-us" className="underline underline-offset-4">Ask me about my gear →</Link></footer>
  </div></div>;
}
export function GearTile({ href, image, title, alt }: { href: string; image: string; title: string; alt: string }) {
  const external = href.startsWith("https://");
  return <Link href={href} target={external ? "_blank" : undefined} rel={external ? "sponsored noopener noreferrer" : undefined} className="group overflow-hidden rounded-2xl border border-[#dce2d9] bg-white transition hover:border-[#315d49] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d49]">
    <div className="relative aspect-[4/3]"><Image src={image} alt={alt} fill sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 90vw" className="object-contain p-4" /></div>
    <span className="flex items-center justify-between border-t border-[#edf0e9] px-5 py-4 font-semibold">{title}<span aria-hidden="true">→</span></span>
  </Link>;
}
export type GearProduct = { title: string; note: string; href: string; retailer?: string };
export function GearProducts({ products }: { products: GearProduct[] }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map(product => <a key={product.href} href={product.href} target="_blank" rel={product.retailer ? "noopener noreferrer" : "sponsored noopener noreferrer"} className="flex flex-col rounded-2xl border border-[#dce2d9] bg-white p-5 transition hover:border-[#315d49] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d49]">
    <h2 className="text-lg font-semibold">{product.title}</h2><p className="mb-5 mt-2 text-sm leading-6 text-[#56665d]">{product.note}</p><span className="mt-auto text-sm font-semibold text-[#26634e]">View at {product.retailer || "Amazon"} ↗</span>
  </a>)}</div>;
}
