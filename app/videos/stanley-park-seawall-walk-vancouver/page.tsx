import type { Metadata } from "next";
import Script from "next/script";
import StanleyParkSeawallWalkVancouverClient from "./StanleyParkSeawallWalkVancouverClient";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/stanley-park-seawall-walk-vancouver";
const ogImageUrl = "https://img.youtube.com/vi/uN7UkfKc-_w/maxresdefault.jpg";
const metadataTitle = "Stanley Park Seawall Walking Tour | Full Loop — Vancouver BC";
const metadataDescription = "Walk the full Stanley Park Seawall loop in this 4K walking tour featuring waterfront views, beaches, sculptures, and the Lions Gate Bridge in Vancouver, British Columbia.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Stanley Park Seawall walking tour in Vancouver" }],
  },
};

export default function StanleyParkSeawallWalkVancouverPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${siteUrl}/destinations/canada` },
      { "@type": "ListItem", position: 4, name: "Stanley Park Seawall Walk", item: pageUrl },
    ],
  };
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Stanley Park Seawall Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/uN7UkfKc-_w",
    contentUrl: "https://www.youtube.com/watch?v=uN7UkfKc-_w",
    uploadDate: "2018-07-29",
    duration: "PT2H4M52S",
    url: pageUrl,
  };
  return (
    <>
      <Script id="stanley-park-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="stanley-park-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <StanleyParkSeawallWalkVancouverClient />
    </>
  );
}
