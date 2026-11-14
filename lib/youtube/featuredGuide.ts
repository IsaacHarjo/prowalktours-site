import { readyChristmasGuides } from '../christmas/ready-guides';

export type FeaturedGuide = { href: string; label: string };
type RelatedTour = { youtubeUrl: string; city: string; themes: string[] };
function videoId(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1) : parsed.searchParams.get('v');
  } catch { return null; }
}

// Match a known video, never infer a ready guide from the title or URL slug.
export function guideForFeaturedVideo(youtubeUrl: string | undefined, tours: RelatedTour[]): FeaturedGuide | undefined {
  const id = youtubeUrl && videoId(youtubeUrl);
  if (!id) return;
  const tour = tours.find(tour => videoId(tour.youtubeUrl) === id);
  if (!tour?.themes.includes('christmas-market')) return;
  const guide = readyChristmasGuides[tour.city];
  if (guide) return { href: guide.href, label: `Read the 2026 ${tour.city} guide →` };
}
