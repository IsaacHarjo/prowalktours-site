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

          {clusterInfo ? (
            <Popup
              longitude={clusterInfo.longitude}
              latitude={clusterInfo.latitude}
              anchor="bottom"
              onClose={() => setClusterInfo(null)}
              closeOnClick={false}
              className="world-map-popup"
              maxWidth="320px"
            >
              <div className="max-h-[280px] w-[280px] overflow-y-auto p-1">
                <p className="sticky top-0 bg-white pb-2 text-xs font-semibold uppercase tracking-wider text-[#9a7a52]">
                  {clusterInfo.tours.length} walks in this area
                </p>
                <div className="space-y-3">
                  {clusterInfo.tours.map((tour) => (
                    <div
                      key={tour.slug}
                      className="border-b border-[#eadfce] pb-2 last:border-0"
                    >
                      <p className="text-sm font-semibold text-[#2f261d]">
                        {tour.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[#6c5b49]">
                        {tour.city}, {tour.country}
                      </p>
                      <a
                        href={`/videos/${tour.slug}`}
                        className="mt-1 inline-block text-xs font-semibold text-[#167fd5] hover:underline"
                      >
                        Watch Tour →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          ) : null}
        </MapboxMap>
      </div>

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
