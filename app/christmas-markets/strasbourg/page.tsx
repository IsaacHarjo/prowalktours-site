import type { Metadata } from 'next';
import StrasbourgGuideClient from '../../../components/guides/StrasbourgGuideClient';
import { buildChristmasCatalog } from '../../../lib/christmas/catalog';
import { buildAlsacePlaces } from '../../../lib/christmas/orientation';
import { discoveryVideos, worldTours } from '../../../lib/tours/server';
import { stringifyJsonLd } from '../../../lib/seo/jsonLd';

const url = 'https://www.prowalktours.com/christmas-markets/strasbourg';
const title = 'Strasbourg Christmas Market 2026 Guide & Walking Route | Prowalk Tours';
const description = 'Plan Christmas in Strasbourg with my suggested walking route, 2026 dates, market locations, transport tips and day and evening walks from my visits.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, images: [{ url: '/strasbourg-christmas-guide/hero.webp', alt: 'Strasbourg Cathedral and the decorated houses of Rue Mercière' }] },
};

export default function StrasbourgPage() {
  const allWalks = buildChristmasCatalog(discoveryVideos, worldTours);
  const walks = allWalks.filter(walk => walk.city === 'Strasbourg');
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prowalktours.com' },
      { '@type': 'ListItem', position: 2, name: 'Christmas Markets', item: 'https://www.prowalktours.com/christmas-markets' },
      { '@type': 'ListItem', position: 3, name: 'Strasbourg', item: url },
    ] },
    { '@type': 'CollectionPage', name: title, description, url, about: { '@type': 'Place', name: 'Strasbourg, Alsace, France' },
      mainEntity: { '@type': 'ItemList', itemListElement: walks.map((walk, index) => ({ '@type': 'ListItem', position: index + 1, name: walk.siteTitle, url: walk.watchHref.startsWith('/') ? `https://www.prowalktours.com${walk.watchHref}` : walk.watchHref })) } },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} /><StrasbourgGuideClient walks={walks} orientationPlaces={buildAlsacePlaces(worldTours, allWalks, 'Strasbourg')} /></>;
}
