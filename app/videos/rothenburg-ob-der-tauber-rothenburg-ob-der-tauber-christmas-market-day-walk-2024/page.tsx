import type { Metadata } from "next";
import Script from "next/script";
import RothenburgObDerTauberRothenburgObDerTauberChristmasMarketDayWalk2024Client from "./RothenburgObDerTauberRothenburgObDerTauberChristmasMarketDayWalk2024Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-day-walk-2024`;
const heroImagePath = "/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-day-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk (2024)";
const metadataDescription = "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk in 4K. 2024 starting at 8:55 AM just outside my hotel.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk", item: pageUrl }
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
    uploadDate: "2024-12-14",
    duration: "PT0H48M0S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-day-walk-2024-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-day-walk-2024-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <RothenburgObDerTauberRothenburgObDerTauberChristmasMarketDayWalk2024Client />
    </>
  );
}
