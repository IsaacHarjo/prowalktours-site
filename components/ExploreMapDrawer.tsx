"use client";

import type { ExploreMapFeature } from "../data/maps/types";
import { formatVideoTypeLabel } from "../data/maps/filters";

type ExploreMapDrawerProps = {
  feature: ExploreMapFeature | null;
  clusterFeatures?: ExploreMapFeature[];
  onZoomIn?: () => void;
  onClose: () => void;
};

export default function ExploreMapDrawer({
  feature,
  clusterFeatures = [],
  onZoomIn,
  onClose,
}: ExploreMapDrawerProps) {
  if (!feature && clusterFeatures.length === 0) {
    return null;
  }

  const isCluster = clusterFeatures.length > 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-4 shadow-2xl">
          {isCluster ? (
            <>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
                    Cluster Results
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#2f261d]">
                    {clusterFeatures.length} videos in this area
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6c5b49]">
                    Browse the videos in this cluster or zoom in for a closer view.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#d8c7b5] px-3 py-1 text-sm font-semibold text-[#5c4c33] transition hover:bg-[#f8f3ec]"
                  aria-label="Close selected map result"
                >
                  Close
                </button>
              </div>

              {onZoomIn ? (
                <button
                  type="button"
                  onClick={onZoomIn}
                  className="mb-4 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2 text-sm font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
                >
                  Zoom in
                </button>
              ) : null}

              <div className="max-h-[55vh] space-y-4 overflow-y-auto pr-1">
                {clusterFeatures.map((item) => (
                  <div
                    key={item.tourId}
                    className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf7] p-3"
                  >
                    <div className="overflow-hidden rounded-[1rem] border border-[#eadfce] bg-white">
                      <img
                        src={item.thumbnailSrc}
                        alt={item.title}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                        {item.city}, {item.location || item.region}
                      </p>
                      <h4 className="mt-2 text-base font-bold text-[#2f261d]">
                        {item.title}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                        <span className="rounded-full border border-[#eadfce] bg-white px-3 py-1">
                          {formatVideoTypeLabel(item.videoType)}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        <a
                                href={item.youtubeUrl} target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
                        >
                                Watch 4K Walk
                              </a>
                        {item.mapUrl ? (
                          <a
                            href={item.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2.5 text-sm font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
                          >
                            View Walking Route
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : feature ? (
            <>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
                    {feature.city}, {feature.region}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[#2f261d]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6c5b49]">
                    {feature.descriptionShort}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#d8c7b5] px-3 py-1 text-sm font-semibold text-[#5c4c33] transition hover:bg-[#f8f3ec]"
                  aria-label="Close selected map result"
                >
                  Close
                </button>
              </div>

              <div className="overflow-hidden rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf7]">
                <img
                  src={feature.thumbnailSrc}
                  alt={feature.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                <span className="rounded-full border border-[#eadfce] bg-[#fcfaf7] px-3 py-1">
                  {formatVideoTypeLabel(feature.videoType)}
                </span>
                <span className="rounded-full border border-[#eadfce] bg-[#fcfaf7] px-3 py-1">
                  {feature.durationLabel}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={feature.youtubeUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
                >
                  Watch 4K Walk
                </a>
                {feature.mapUrl ? (
                  <a
                    href={feature.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-5 py-3 text-sm font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
                  >
                    View Walking Route
                  </a>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
