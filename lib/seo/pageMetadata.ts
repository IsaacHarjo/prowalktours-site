import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, pathname: string, draft = false): Metadata {
  return {
    title: `${title} | Prowalk Tours`, description,
    alternates: { canonical: `https://www.prowalktours.com${pathname}` },
    openGraph: { title: `${title} | Prowalk Tours`, description, url: `https://www.prowalktours.com${pathname}`, type: "website", images: [{ url: "/images/homepage/hero.jpg", alt: "Prowalk Tours walking tours" }] },
    ...(draft ? { robots: { index: false, follow: true } } : {}),
  };
}
