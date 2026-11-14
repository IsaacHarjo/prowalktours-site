import type { Metadata } from 'next';
import Riquewihr2025Client from './Riquewihr2025Client';
import { riquewihr2025Tour as tour, riquewihrChristmasMarketDayWalk2025Detail as detail } from '../../../data/video-details/riquewihr-christmas-market-day-walk-2025';
import { stringifyJsonLd } from '../../../lib/seo/jsonLd';
import { buildVideoClips } from '../../../lib/seo/videoClips';
import { publicTours } from '../../../lib/tours/server';

const site = 'https://www.prowalktours.com';
const url = `${site}/videos/${tour.slug}`;
const description = 'Join my 2025 Riquewihr Christmas walk through shops, wine cellars, courtyards and the Dolder museum, with timed chapters and the route I filmed.';
const isPublic = publicTours.some(record => record.tourId === tour.tourId);
export const metadata: Metadata = {
  title: tour.title, description, alternates: { canonical: url },
  robots: { index: isPublic, follow: true },
  openGraph: { title: tour.title, description, url, images: [{ url: `${site}${tour.hero}`, alt: tour.heroAlt }] },
};
export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'France', item: `${site}/destinations/france` },
        { '@type': 'ListItem', position: 3, name: tour.title, item: url },
      ] },
      { '@type': 'VideoObject', name: tour.youtubeTitle, description: tour.description,
        thumbnailUrl: [`${site}${tour.hero}`], uploadDate: tour.youtubeUploadDate,
        duration: 'PT2H44S', url, contentUrl: `https://www.youtube.com/watch?v=${tour.youtubeId}`,
        embedUrl: `https://www.youtube.com/embed/${tour.youtubeId}`,
        hasPart: buildVideoClips({ highlights: detail.highlights, canonicalUrl: url, videoDurationSeconds: tour.durationSeconds }),
      },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} /><Riquewihr2025Client /></>;
}
