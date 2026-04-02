"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import MapboxMap, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  type MapRef,
} from "react-map-gl/mapbox";
import type { LayerProps } from "react-map-gl/mapbox";
import type { Feature, FeatureCollection, Point } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

// ─── Types ───────────────────────────────────────────────────────────────────

type WorldTour = {
  slug: string;
  title: string;
  city: string;
  country: string;
  region: string;
  videoType: string;
  filmedYear: number | null;
  durationLabel: string;
  youtubeUrl: string;
  latitude: number;
  longitude: number;
  countryIndex: number; // 0=Italy, 1=France, 2=Germany
};

type TourProperties = {
  featureIndex: number;
  countryIndex: number;
};

// ─── Country colours ─────────────────────────────────────────────────────────

const COUNTRIES = [
  { name: "Italy", color: "#009246", index: 0 },
  { name: "France", color: "#ED2939", index: 1 },
  { name: "Germany", color: "#FFCE00", index: 2 },
] as const;

function getDisplayTitle(title: string) {
  return title
    .replace(/\b4K\b/gi, "")
    .replace(/\s+\(\d{4}\)\s*$/u, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function formatVideoType(vt: string) {
  return vt.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getYoutubeId(url: string) {
  const m = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(url);
  return m ? m[1] : "";
}

function makeClusterLayer(country: string, color: string): LayerProps {
  return {
    id: `cluster-${country}`,
    type: "circle",
    source: `world-tours-${country}`,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": color,
      "circle-radius": ["step", ["get", "point_count"], 18, 10, 22, 50, 28],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  };
}

function makeClusterCountLayer(country: string): LayerProps {
  return {
    id: `cluster-count-${country}`,
    type: "symbol",
    source: `world-tours-${country}`,
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
    paint: {
      "text-color": country === "Germany" ? "#1a1a1a" : "#ffffff",
    },
  };
}

function makePointLayer(country: string, color: string): LayerProps {
  return {
    id: `point-${country}`,
    type: "circle",
    source: `world-tours-${country}`,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": color,
      "circle-radius": 7,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

type WorldMapClientProps = {
  tours: WorldTour[];
  fullWidth?: boolean;
  heightClassName?: string;
};

export default function WorldMapClient({ tours, fullWidth, heightClassName }: WorldMapClientProps) {
  const mapRef = useRef<MapRef | null>(null);
  const mapboxToken =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const [popupInfo, setPopupInfo] = useState<WorldTour | null>(null);
  const [clusterInfo, setClusterInfo] = useState<{
    tours: WorldTour[];
    longitude: number;
    latitude: number;
    clusterId: number;
    countryName: string;
  } | null>(null);

  // Build per-country tour arrays and GeoJSON
  const { countryGeoJson, countryTourArrays } = useMemo(() => {
    const byCountry: Record<string, WorldTour[]> = {};
    for (const tour of tours) {
      const key = tour.country;
      if (!byCountry[key]) byCountry[key] = [];
      byCountry[key].push(tour);
    }

    const geoJson: Record<string, FeatureCollection<Point, TourProperties>> = {};
    const tourArrays: Record<string, WorldTour[]> = {};

    for (const c of COUNTRIES) {
      const countryTours = byCountry[c.name] || [];
      tourArrays[c.name] = countryTours;
      geoJson[c.name] = {
        type: "FeatureCollection",
        features: countryTours.map((tour, featureIndex) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [tour.longitude, tour.latitude],
          },
          properties: {
            featureIndex,
            countryIndex: c.index,
          },
        })),
      };
    }

    return { countryGeoJson: geoJson, countryTourArrays: tourArrays };
  }, [tours]);

  const interactiveLayerIds = useMemo(
    () => COUNTRIES.flatMap((c) => [`cluster-${c.name}`, `point-${c.name}`]),
    []
  );

  const handleMapClick = useCallback(
    (event: { features?: Feature[] }) => {
      const clickedFeature = event.features?.[0];
      if (!clickedFeature) {
        setPopupInfo(null);
        return;
      }

      // Determine which country source this came from
      const layerId = (clickedFeature as unknown as { layer?: { id: string } }).layer?.id;
      const countryName = COUNTRIES.find(
        (c) =>
          layerId === `cluster-${c.name}` || layerId === `point-${c.name}`
      )?.name;

      // Cluster click — open list or zoom if too large
      if (clickedFeature.properties?.cluster && countryName) {
        const clusterId = clickedFeature.properties.cluster_id as number;
        const pointCount = clickedFeature.properties.point_count as number;
        const center = (clickedFeature.geometry as Point).coordinates as [
          number,
          number,
        ];
        const sourceName = `world-tours-${countryName}`;
        const map = mapRef.current?.getMap();
        if (!map) return;

        const source = map.getSource(sourceName) as unknown as {
          getClusterLeaves: (
            id: number,
            limit: number,
            offset: number,
            cb: (err: Error | null, features: Feature[]) => void
          ) => void;
          getClusterExpansionZoom: (
            id: number,
            cb: (err: Error | null, zoom: number) => void
          ) => void;
        };
        if (!source) return;

        // Large clusters (50+) — zoom in instead of listing
        if (pointCount >= 50) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            mapRef.current?.easeTo({
              center,
              zoom: Math.min(zoom ?? map.getZoom(), 14),
              duration: 500,
            });
          });
          return;
        }

        // Smaller clusters — get all tours and show list
        source.getClusterLeaves(clusterId, pointCount, 0, (err, leaves) => {
          if (err) return;
          const countryTourList = countryTourArrays[countryName] || [];
          const clusterTourList = (leaves ?? [])
            .map((leaf) => {
              const idx = leaf.properties?.featureIndex;
              return typeof idx === "number" ? countryTourList[idx] ?? null : null;
            })
            .filter((t): t is WorldTour => t !== null);

          setPopupInfo(null);
          setClusterInfo({
            tours: clusterTourList,
            longitude: center[0],
            latitude: center[1],
            clusterId,
            countryName,
          });
          mapRef.current?.easeTo({ center, duration: 500 });
        });
        return;
      }

      // Individual point click — show popup
      if (countryName) {
        const featureIndex = clickedFeature.properties?.featureIndex;
        const countryTourList = countryTourArrays[countryName];
        if (
          typeof featureIndex === "number" &&
          countryTourList?.[featureIndex]
        ) {
          setClusterInfo(null);
          setPopupInfo(countryTourList[featureIndex]);
        }
      }
    },
    [countryTourArrays]
  );

  if (!mapboxToken) {
    return (
      <div className="rounded-[1.5rem] border border-[#d8c7b5] bg-[#fff7ed] p-6 text-[#7c2d12] shadow-sm">
        <p className="text-lg font-semibold">Mapbox token missing</p>
        <p className="mt-2 text-sm leading-7">
          Set <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable the world map.
        </p>
      </div>
    );
  }

  return (
    <div className={fullWidth
      ? "relative overflow-hidden bg-white"
      : "relative overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white shadow-sm sm:rounded-[2rem]"
    }>
      <div className={heightClassName
        ? `${heightClassName} w-full bg-[#f8f3ec]`
        : fullWidth
          ? "h-[50vh] w-full bg-[#f8f3ec] sm:h-[60vh]"
          : "h-[380px] w-full bg-[#f8f3ec] lg:h-[550px]"
      }>
        <MapboxMap
          ref={mapRef}
          initialViewState={{
            longitude: 10,
            latitude: 46,
            zoom: 4.5,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          mapboxAccessToken={mapboxToken}
          interactiveLayerIds={interactiveLayerIds}
          onClick={handleMapClick}
          onLoad={() => mapRef.current?.resize()}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" showCompass={false} />

          {COUNTRIES.map((c) => (
            <Source
              key={c.name}
              id={`world-tours-${c.name}`}
              type="geojson"
              data={countryGeoJson[c.name]}
              cluster={true}
              clusterMaxZoom={12}
              clusterRadius={48}
            >
              <Layer {...makeClusterLayer(c.name, c.color)} />
              <Layer {...makeClusterCountLayer(c.name)} />
              <Layer {...makePointLayer(c.name, c.color)} />
            </Source>
          ))}

          {popupInfo ? (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor="bottom"
              onClose={() => setPopupInfo(null)}
              closeOnClick={false}
              className="world-map-popup"
            >
              <div className="max-w-[220px] p-1">
                <p className="text-sm font-semibold text-[#2f261d]">
                  {popupInfo.title}
                </p>
                <p className="mt-1 text-xs text-[#6c5b49]">
                  {popupInfo.city}, {popupInfo.country}
                </p>
                <a
                  href={`/videos/${popupInfo.slug}`}
                  className="mt-2 inline-block text-xs font-semibold text-[#167fd5] hover:underline"
                >
                  Watch Tour →
                </a>
              </div>
            </Popup>
          ) : null}

          {/* cluster popup removed — now using overlay panel below */}
        </MapboxMap>
      </div>

      {/* Cluster overlay panel — matches Italy map design */}
      {clusterInfo ? (
        <div className="pointer-events-none absolute inset-y-4 right-4 z-20 hidden w-[360px] max-w-[calc(100%-2rem)] lg:block">
          <div className="pointer-events-auto flex max-h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#eadfce] bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#eadfce] px-4 py-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
                  Cluster Results
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#2f261d]">
                  {clusterInfo.tours.length} videos in this area
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#6c5b49]">
                  Browse the videos in this cluster or zoom in for a closer view.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setClusterInfo(null)}
                className="shrink-0 rounded-full border border-[#d8c7b5] bg-white px-3 py-1.5 text-sm font-semibold text-[#5c4c33] transition hover:bg-[#f8f3ec]"
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <button
                type="button"
                onClick={() => {
                  const map = mapRef.current?.getMap();
                  if (!map) return;
                  const source = map.getSource(`world-tours-${clusterInfo.countryName}`) as unknown as {
                    getClusterExpansionZoom: (id: number, cb: (err: Error | null, zoom: number) => void) => void;
                  };
                  source?.getClusterExpansionZoom(clusterInfo.clusterId, (err, zoom) => {
                    if (err) return;
                    mapRef.current?.easeTo({
                      center: [clusterInfo.longitude, clusterInfo.latitude],
                      zoom: Math.min(zoom ?? map.getZoom(), 14),
                      duration: 500,
                    });
                    setClusterInfo(null);
                  });
                }}
                className="mb-4 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2 text-sm font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
              >
                Zoom in
              </button>
              <div className="space-y-4">
                {clusterInfo.tours.map((item) => {
                  const ytId = getYoutubeId(item.youtubeUrl);
                  const thumbSrc = ytId
                    ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
                    : "";
                  return (
                    <div
                      key={item.slug}
                      className="rounded-[1rem] border border-[#eadfce] bg-[#fcfaf7] p-3"
                    >
                      {thumbSrc ? (
                        <div className="overflow-hidden rounded-[0.9rem] border border-[#eadfce] bg-white">
                          <img
                            src={thumbSrc}
                            alt={item.title}
                            className="aspect-[16/9] w-full object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="mt-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                          {item.region}
                        </p>
                        <h4 className="mt-2 text-base font-bold text-[#2f261d]">
                          {getDisplayTitle(item.title)}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                          <span className="rounded-full border border-[#eadfce] bg-white px-3 py-1">
                            {formatVideoType(item.videoType)}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8a7a68]">
                          {item.filmedYear ? (
                            <span>Filmed {item.filmedYear}</span>
                          ) : null}
                          {item.durationLabel ? (
                            <span>{item.durationLabel}</span>
                          ) : null}
                        </div>
                        <div className="mt-3">
                          <a
                            href={`/videos/${item.slug}`}
                            className="inline-flex w-full items-center justify-center rounded-full bg-[#167fd5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
                          >
                            Watch 4K Walk
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile cluster panel */}
      {clusterInfo ? (
        <div className="border-t border-[#eadfce] bg-white p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#2f261d]">
              {clusterInfo.tours.length} videos in this area
            </p>
            <button
              type="button"
              onClick={() => setClusterInfo(null)}
              className="rounded-full border border-[#d8c7b5] bg-white px-3 py-1 text-xs font-semibold text-[#5c4c33]"
            >
              Close
            </button>
          </div>
          <div className="mt-3 max-h-[300px] space-y-3 overflow-y-auto">
            {clusterInfo.tours.map((item) => {
              const ytId = getYoutubeId(item.youtubeUrl);
              const thumbSrc = ytId
                ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
                : "";
              return (
                <div
                  key={item.slug}
                  className="flex gap-3 rounded-xl border border-[#eadfce] bg-[#fcfaf7] p-2"
                >
                  {thumbSrc ? (
                    <img
                      src={thumbSrc}
                      alt={item.title}
                      className="h-16 w-24 shrink-0 rounded-lg object-cover"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#2f261d] leading-tight">
                      {getDisplayTitle(item.title)}
                    </p>
                    <p className="mt-1 text-xs text-[#8a7a68]">
                      {item.city}, {item.country}
                    </p>
                    <a
                      href={`/videos/${item.slug}`}
                      className="mt-1 inline-block text-xs font-semibold text-[#167fd5]"
                    >
                      Watch Tour →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Country legend */}
      <div className="absolute bottom-4 left-4 rounded-xl border border-[#d8c7b5] bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-xs font-medium text-[#3d3327]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
