import "server-only";

import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Returns the card image URL for a given tour slug, falling back to
 * the provided fallback URL if no local card image exists.
 *
 * Local card images live in `public/images/cards/[slug]-card.jpg` and
 * are used on destination pages (Canada, Provence, Paris, Christmas
 * Markets, etc.) in preference to YouTube thumbnails.
 *
 * This is resolved at build time via a filesystem read, so there are
 * no 404 flashes on the client.
 */

const cardsDir = path.join(process.cwd(), "public", "images", "cards");

let existingCards: Set<string>;
try {
  existingCards = new Set(readdirSync(cardsDir));
} catch {
  existingCards = new Set();
}

export function getCardImageSrc(slug: string, fallbackSrc: string): string {
  const filename = `${slug}-card.jpg`;
  if (existingCards.has(filename)) {
    return `/images/cards/${filename}`;
  }
  return fallbackSrc;
}
