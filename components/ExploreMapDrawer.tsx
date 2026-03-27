"use client";

import type { ExploreMapFeature } from "../data/maps/types";
import {
  formatVideoTypeLabel,
  getMapDisplayTitle,
  getMapWatchDestinationType,
  getMapWatchHref,
} from "../data/maps/filters";

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
  const headerEyebrow = isCluster ? "Cluster Results" : feature?.region ?? "";
  const headerTitle = isCluster
    ? `${clusterFeatures.length} videos in this area`
    : getMapDisplayTitle(feature?.title ?? "");
  const headerDescription = isCluster
    ? "Browse the videos in this cluster or zoom in for a closer view."
    : feature?.descriptionShort ?? "";

  return (
    <div className="fixed inset-0 z-30 md:hidden">
      <button
        type="button"
        aria-label="Close selected map result"
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-36 flex items-end px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div
          className="pointer-events-auto flex w-full max-h-[calc(100dvh-9rem)] flex-col overflow-hidden rounded-[1.75rem] border border-[#d8c7b5] bg-white shadow-2xl"
          style={{ maxHeight: "calc(100dvh - 9rem)" }}
        >
          <div className="sticky top-0 z-10 border-b border-[#eadfce] bg-white/95 backdrop-blur">
            <div className="flex justify-center px-4 pt-3">
              <span
                aria-hidden="true"
                className="h-1.5 w-14 rounded-full bg-[#d8c7b5]"
              />
            </div>
            <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
                  {headerEyebrow}
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#2f261d]">
                  {headerTitle}
                </h3>
                {!isCluster ? (
                  <p className="mt-2 text-sm leading-6 text-[#6c5b49]">
                    {headerDescription}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-[#cdb9a2] bg-[#fcfaf7] px-4 text-sm font-semibold text-[#3d3327] shadow-sm transition hover:bg-[#f8f3ec]"
                aria-label="Close selected map result"
              >
                Close
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4">
            {isCluster ? (
              <>
                <div className="space-y-4 pr-1">
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
                          {item.region}
                        </p>
                        <h4 className="mt-2 text-base font-bold text-[#2f261d]">
                          {getMapDisplayTitle(item.title)}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                          <span className="rounded-full border border-[#eadfce] bg-white px-3 py-1">
                            {formatVideoTypeLabel(item.videoType)}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8a7a68]">
                          {item.filmedYear ? (
                            <span>Filmed {item.filmedYear}</span>
                          ) : null}
                          <span>{item.durationLabel}</span>
                        </div>
                        <div className="mt-3 flex flex-col gap-2">
                          <a
                            href={getMapWatchHref(item)}
                            target={
                              getMapWatchDestinationType(item) === "youtube"
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              getMapWatchDestinationType(item) === "youtube"
                                ? "noreferrer"
                                : undefined
                            }
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
                </div>

                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8a7a68]">
                  {feature.filmedYear ? (
                    <span>Filmed {feature.filmedYear}</span>
                  ) : null}
                  <span>{feature.durationLabel}</span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href={getMapWatchHref(feature)}
                    target={
                      getMapWatchDestinationType(feature) === "youtube"
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      getMapWatchDestinationType(feature) === "youtube"
                        ? "noreferrer"
                        : undefined
                    }
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
    </div>
  );
}

