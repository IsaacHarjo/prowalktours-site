import type { Metadata } from "next";
import Script from "next/script";
import RothenburgObDerTauberRothenburgObDerTauberChristmasMarketEveningWalk2023Client from "./RothenburgObDerTauberRothenburgObDerTauberChristmasMarketEveningWalk2023Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2023`;
const heroImagePath = "/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk (2023)";
const metadataDescription = "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk in 4K. This walking tour around the Christmas markets of Rothenburg ob der Tauber.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk (2023)" }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Germany", item: `${siteUrl}/destinations/germany` },
      { "@type": "ListItem", position: 4, name: "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi//maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/",
    contentUrl: "https://www.youtube.com/watch?v=",
    uploadDate: "2023-12-01",
    duration: "PT1H38M0S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2023-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2023-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <RothenburgObDerTauberRothenburgObDerTauberChristmasMarketEveningWalk2023Client />
    </>
  );
}
