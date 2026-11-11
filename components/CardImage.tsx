"use client";

import { useState } from "react";

type CardImageProps = {
  slug: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

// Slugs that have public/images/cards/[slug]-card.jpg, inlined at build time
// by next.config.ts.
const localCardSlugs = new Set(
  (process.env.CARD_IMAGE_SLUGS ?? "").split(",").filter(Boolean)
);

/**
 * Video card image for destination pages.
 *
 * Renders /images/cards/[slug]-card.jpg when that file exists, otherwise the
 * fallback (YouTube thumbnail). If the image fails to load, falls back once
 * more, then hides the image and shows a dark gradient on the parent.
 *
 * To add a local card for a tour, drop [slug]-card.jpg (about 1280px wide)
 * into public/images/cards/. The next build or dev start picks it up.
 */
export default function CardImage({ slug, fallbackSrc, alt, className }: CardImageProps) {
  const hasLocalCard = localCardSlugs.has(slug);
  const [src, setSrc] = useState(hasLocalCard ? `/images/cards/${slug}-card.jpg` : fallbackSrc);
  const [triedFallback, setTriedFallback] = useState(!hasLocalCard);

  if (!src) {
    return <div className={`${className ?? ""} bg-gradient-to-br from-[#2f261d] to-[#4a3c2f]`} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        if (!triedFallback && fallbackSrc && fallbackSrc !== src) {
          setSrc(fallbackSrc);
          setTriedFallback(true);
          return;
        }
        const img = e.currentTarget;
        img.style.display = "none";
        img.parentElement?.classList.add("bg-gradient-to-br", "from-[#2f261d]", "to-[#4a3c2f]");
      }}
    />
  );
}
