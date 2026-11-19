import Link from 'next/link';
import { publicTours } from '../lib/tours/server';

export default function RelatedPublicWalks({ city, excludeSlug }: { city: string; excludeSlug: string }) {
  const walks = publicTours.filter(walk => walk.city === city && walk.filmedYear === 2025 && walk.slug !== excludeSlug);
  if (!walks.length) return null;
  return <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8" aria-label={`More of ${city}`}>
    <h2 className="font-serif text-2xl">More of {city} with me</h2>
    <ul className="mt-4 flex flex-wrap gap-4">{walks.map(walk => <li key={walk.tourId}>
      <Link href={walk.watchHref} className="inline-flex min-h-11 items-center rounded-full border border-[#176347] px-5 py-2 font-semibold text-[#176347] hover:bg-[#eaf1eb]">{walk.siteTitle} →</Link>
    </li>)}</ul>
  </section>;
}
