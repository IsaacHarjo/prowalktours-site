import releases from './scheduled-releases.json';
import type { TourRecord } from './types';

// Explicitly approved publication times, independent of older draft Sheet exports.
// Evaluate per request, never once at module initialization or build time.
export function applyScheduledRelease(tour: TourRecord, now: number): TourRecord {
  const release = releases.find(item => item.tourId === tour.tourId && item.slug === tour.slug && item.youtubeId === tour.youtubeId);
  if (!release) return tour;
  if (now < Date.parse(release.releaseAt)) return { ...tour, sourceStatus: 'draft', websiteStatus: 'draft' };
  return { ...tour, sourceStatus: 'ready', websiteStatus: 'published', youtubeAvailability: 'public', visibility: 'public', availabilityEvidence: 'explicit', watchHref: `/videos/${tour.slug}`, watchDestinationType: 'internal-page' };
}
