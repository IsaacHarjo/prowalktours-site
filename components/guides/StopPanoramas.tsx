"use client";

import { useId, useState } from 'react';
import PanoramaPhoto from './PanoramaPhoto';

export default function StopPanoramas({ name, photos }: { name: string; photos: { src: string; label: string }[] }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  return <div className="mt-3">
    {photos.length > 1 && <div className="flex flex-wrap items-center gap-2 text-sm">
      <label htmlFor={id} className="font-semibold">360° views</label>
      <select id={id} value={index} onChange={event => setIndex(Number(event.target.value))} className="min-h-11 min-w-0 flex-1 rounded-lg border border-[#c6d2c8] bg-white px-3 text-[#25382f]">
        {photos.map((photo, i) => <option key={photo.src} value={i}>{photo.label} ({i + 1} of {photos.length})</option>)}
      </select>
    </div>}
    <PanoramaPhoto key={photos[index].src} src={photos[index].src} name={name} compact />
  </div>;
}
