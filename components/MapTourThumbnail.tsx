"use client";

import { useState } from "react";
import { mapThumbnailSources } from "../lib/tours/thumbnails";

export default function MapTourThumbnail({ youtubeUrl, title, className }: {
  youtubeUrl: string; title: string; className: string;
}) {
  const sources = mapThumbnailSources(youtubeUrl);
  const [attempt, setAttempt] = useState(0);
  const advance = () => setAttempt(current => current + 1);
  return <div className={`overflow-hidden bg-[#2f261d] ${className}`}>
    {sources[attempt] ? (
      // Small, remote previews retain their reserved space if a service fails.
      // eslint-disable-next-line @next/next/no-img-element
      <img key={sources[attempt]} src={sources[attempt]} alt={title}
        className="h-full w-full object-cover" onError={advance}
        onLoad={event => {
          // YouTube can return its 120px missing-video placeholder with HTTP 200.
          if (event.currentTarget.naturalWidth <= 120) advance();
        }} />
    ) : <div className="flex h-full items-center justify-center p-2 text-center text-xs text-white">Preview unavailable</div>}
  </div>;
}
