import type { Metadata } from 'next';
import BaselGuideClient from '../../../components/guides/BaselGuideClient';
import { stringifyJsonLd } from '../../../lib/seo/jsonLd';
import { baselWalks } from '../../../lib/christmas/basel';

const url = 'https://www.prowalktours.com/christmas-markets/basel';
const title = 'Basel Christmas Market 2026 Guide & Walking Route | Prowalk Tours';
const description = 'Plan an afternoon and evening at Basel’s Christmas markets with my walking map, 2026 dates, 360° photos, travel tips and evening walks filmed in 2025 and 2022.';
export const metadata: Metadata = { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: [{ url: '/basel-christmas-guide/hero.webp', alt: 'Basel Minster and its illuminated Christmas tree' }] } };
export default function BaselChristmasPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prowalktours.com' },
      { '@type': 'ListItem', position: 2, name: 'Christmas Markets', item: 'https://www.prowalktours.com/christmas-markets' },
      { '@type': 'ListItem', position: 3, name: 'Basel', item: url },
    ] },
    { '@type': 'CollectionPage', name: title, description, url, about: { '@type': 'Place', name: 'Basel, Switzerland' }, mainEntity: { '@type': 'ItemList', itemListElement: baselWalks.map((walk, index) => ({ '@type': 'ListItem', position: index + 1, name: walk.siteTitle, url: walk.watchHref })) } },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(schema) }} /><BaselGuideClient /></>;
}
