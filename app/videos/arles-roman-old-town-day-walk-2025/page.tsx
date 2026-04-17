import type { Metadata } from "next";
import Script from "next/script";
import ArlesRomanOldTownDayWalk2025Client from "./ArlesRomanOldTownDayWalk2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/arles-roman-old-town-day-walk-2025`;
const ogImageUrl = "https://img.youtube.com/vi/vRdoJsGj0Z4/maxresdefault.jpg";
const metadataTitle =
  "Arles, France Walking Tour (2025) | Roman Amphitheatre, Old Town & Wednesday Market | Prowalk Tours";
const metadataDescription =
  "Walk through Arles, France \u2014 a UNESCO World Heritage city with 2,000 years of Roman and medieval history. See the Roman Amphitheatre, Theatre Antique, Cloitre Saint-Trophime, Cryptoportiques, Place du Forum, Baths of Constantine, and the famous Wednesday outdoor market on Boulevard des Lices. 4K walking tour, 3 hours 11 minutes, filmed September 2025.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  keywords: "Arles France walking tour, Arles amphitheatre, Roman Arles, Arles old town, Place du Forum Arles, Theatre Antique Arles, Cloitre Saint-Trophime, Cryptoportiques Arles, Baths of Constantine Arles, Boulevard des Lices market, Wednesday market Arles, Provence walking tour, UNESCO Arles, Van Gogh Arles, 4K walking tour France",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Arles Walking Tour \u2014 Roman Amphitheatre, Old Town & Wednesday Market",
    description:
      "An immersive 4K walk through Arles, France \u2014 UNESCO World Heritage city with 2,000 years of history. Roman ruins, medieval cloisters, and the famous Provence market.",
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        alt: "Arles Roman old town and amphitheatre in Provence",
      },
    ],
  },
};

export default function ArlesRomanOldTownDayWalk2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 3, name: "Provence", item: `${siteUrl}/destinations/france/provence` },
      { "@type": "ListItem", position: 4, name: "Arles Walking Tour", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Arles, France Walking Tour (2025) | Roman Amphitheatre, Old Town & Wednesday Market",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/vRdoJsGj0Z4",
    contentUrl: "https://www.youtube.com/watch?v=vRdoJsGj0Z4",
    uploadDate: "2025-10-04",
    duration: "PT3H11M12S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="arles-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="arles-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <ArlesRomanOldTownDayWalk2025Client />
    </>
  );
}
