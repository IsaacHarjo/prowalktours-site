import { stringifyJsonLd } from "../lib/seo/jsonLd";

export default function PageJsonLd({ title, pathname }: { title: string; pathname: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prowalktours.com" },
      ...(pathname ? [{ "@type": "ListItem", position: 2, name: title, item: `https://www.prowalktours.com${pathname}` }] : []),
    ],
  }) }} />;
}
