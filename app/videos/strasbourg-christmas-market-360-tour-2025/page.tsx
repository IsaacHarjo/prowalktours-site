import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ImmersiveWalkClient from '../../../components/ImmersiveWalkClient';
import RelatedPublicWalks from '../../../components/RelatedPublicWalks';
import tour from '../../../data/video-details/strasbourg-christmas-market-360-tour-2025.json';
import { publicTours } from '../../../lib/tours/server';
import { stringifyJsonLd } from '../../../lib/seo/jsonLd';

const url = 'https://www.prowalktours.com/videos/' + tour.slug;
const isPublic = publicTours.some(record => record.slug === tour.slug && record.youtubeId === tour.youtubeId);
export const metadata: Metadata = {
  title: tour.title, description: tour.description, alternates: { canonical: url },
  robots: { index: isPublic, follow: true },
  openGraph: { title: tour.title, description: tour.description, url, images: [{ url: tour.hero, alt: tour.heroAlt }] },
};
export default function Page() {
  if (!isPublic && process.env.NODE_ENV !== 'development') notFound();
  const schema = { '@context': 'https://schema.org', '@type': 'VideoObject', name: tour.youtubeTitle,
    description: tour.description, thumbnailUrl: ['https://www.prowalktours.com' + tour.hero],
    uploadDate: tour.youtubeUploadDate, duration: 'PT' + tour.durationSeconds + 'S', url,
    contentUrl: 'https://www.youtube.com/watch?v=' + tour.youtubeId,
    embedUrl: 'https://www.youtube.com/embed/' + tour.youtubeId,
  };
  return <>{isPublic && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(schema) }} />}<ImmersiveWalkClient tour={tour} /><RelatedPublicWalks city={tour.city} excludeSlug={tour.slug} /></>;
}
