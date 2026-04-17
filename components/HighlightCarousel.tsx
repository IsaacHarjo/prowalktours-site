"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type HighlightCarouselProps = {
  images: string[];
  alt: string;
};

export default function HighlightCarousel({ images, alt }: HighlightCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const pausedUntilRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const validIndices = images.map((_, i) => i).filter((i) => !failed.has(i));
  const validCount = validIndices.length;

  const advance = useCallback(
    (direction: 1 | -1) => {
      if (validCount === 0) return;
      setCurrent((prev) => {
        const currentValidPos = validIndices.indexOf(prev);
        if (currentValidPos === -1) return validIndices[0];
        const next = (currentValidPos + direction + validCount) % validCount;
        return validIndices[next];
      });
    },
    [validCount, validIndices]
  );

  useEffect(() => {
    if (validCount <= 1) return;
    intervalRef.current = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      advance(1);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advance, validCount]);

  const handleArrow = (e: React.MouseEvent, direction: 1 | -1) => {
    e.stopPropagation();
    e.preventDefault();
    pausedUntilRef.current = Date.now() + 8000;
    advance(direction);
  };

  const handleImageError = (index: number) => {
    setFailed((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    if (!failed.has(index) && validCount > 1) {
      advance(1);
    }
  };

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement!.classList.add(
            "bg-gradient-to-br",
            "from-[#2f261d]",
            "to-[#4a3c2f]"
          );
        }}
      />
    );
  }

  if (validCount === 0) {
    return <div className="h-full w-full bg-gradient-to-br from-[#2f261d] to-[#4a3c2f]" />;
  }

  return (
    <div className="group/carousel relative aspect-[16/10] w-full overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} (${i + 1})`}
          className={`${i === 0 ? "relative" : "absolute inset-0"} h-full w-full object-cover transition-opacity duration-700 ${
            i === current && !failed.has(i) ? "opacity-100" : "opacity-0"
          }`}
          onError={() => handleImageError(i)}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {validCount > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => handleArrow(e, -1)}
            className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition hover:bg-black/60 group-hover/carousel:opacity-100"
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => handleArrow(e, 1)}
            className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition hover:bg-black/60 group-hover/carousel:opacity-100"
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {validIndices.map((vi) => (
              <button
                key={vi}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  pausedUntilRef.current = Date.now() + 8000;
                  setCurrent(vi);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  vi === current
                    ? "w-3 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${validIndices.indexOf(vi) + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
