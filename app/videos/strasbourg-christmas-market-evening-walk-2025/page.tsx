import type { Metadata } from 'next';
import Strasbourg2025Client from './Strasbourg2025Client';
import tour from '../../../data/video-details/strasbourg-christmas-market-evening-walk-2025.json';
import { stringifyJsonLd } from '../../../lib/seo/jsonLd';
import { getReleasedTours } from '../../../lib/tours/server';
import { notFound } from 'next/navigation';
import RelatedPublicWalks from '../../../components/RelatedPublicWalks';

const site = 'https://www.prowalktours.com';
const url = `${site}/videos/${tour.slug}`;
export const dynamic = 'force-dynamic';
const isReleased = () => getReleasedTours().some(record => record.tourId === tour.tourId && record.youtubeId === tour.youtubeId);
export function generateMetadata(): Metadata {
  const isPublic = isReleased();
  return {
  title: tour.title, description: tour.description,
  alternates: { canonical: url }, robots: { index: isPublic, follow: true },
  openGraph: { title: tour.title, description: tour.description, url,
    images: [{ url: `${site}${tour.hero}`, alt: tour.heroAlt }] },
};
}

export default function Page() {
  const isPublic = isReleased();
  // Draft previews are local development only; production never renders the upload.
  if (!isPublic && process.env.NODE_ENV !== 'development') notFound();
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Strasbourg Christmas guide', item: `${site}${tour.guideHref}` },
      { '@type': 'ListItem', position: 3, name: tour.title, item: url },
    ] },
    ...(isPublic ? [{ '@type': 'VideoObject', name: tour.youtubeTitle, description: tour.description,
      thumbnailUrl: [`${site}${tour.hero}`], uploadDate: tour.youtubeUploadDate,
      duration: 'PT1H47M', url, contentUrl: `https://www.youtube.com/watch?v=${tour.youtubeId}`,
      embedUrl: `https://www.youtube.com/embed/${tour.youtubeId}`,
      hasPart: tour.chapters.map((chapter, index) => ({ '@type': 'Clip', name: chapter.title,
        startOffset: chapter.seconds, endOffset: tour.chapters[index + 1]?.seconds ?? tour.durationSeconds,
        url: `${url}?t=${chapter.seconds}` })),
    }] : []),
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} /><Strasbourg2025Client tour={tour} /><RelatedPublicWalks city="Strasbourg" excludeSlug={tour.slug} /></>;
}
