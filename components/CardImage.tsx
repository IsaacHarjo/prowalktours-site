"use client";

import { useState } from "react";

type CardImageProps = {
  slug: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

/**
 * Video card image for destination pages.
 *
 * Renders /images/cards/[slug]-card.jpg first. If that 404s, falls back to
 * the YouTube thumbnail. If the fallback also fails, hides the image and
 * shows a dark gradient on the parent.
 *
 * To add a local card for a tour, drop [slug]-card.jpg into
 * public/images/cards/ and it'll be picked up automatically.
 */
export default function CardImage({ slug, fallbackSrc, alt, className }: CardImageProps) {
  const [src, setSrc] = useState(`/images/cards/${slug}-card.jpg`);
  const [triedFallback, setTriedFallback] = useState(false);

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
