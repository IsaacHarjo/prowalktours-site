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

const COUNTRY_COLORS: Record<string, { color: string; index: number }> = {
  Italy: { color: "#E8673A", index: 0 },
  France: { color: "#2563EB", index: 1 },
  Germany: { color: "#D97706", index: 2 },
};

const COUNTRY_LEGEND = [
  { name: "Italy", color: "#E8673A" },
  { name: "France", color: "#2563EB" },
  { name: "Germany", color: "#D97706" },
];

// ─── Layers ──────────────────────────────────────────────────────────────────

const clusterLayer: LayerProps = {
  id: "world-clusters",
  type: "circle",
  source: "world-tours",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#167fd5",
      10,
      "#0f6db9",
      50,
      "#0a4f8b",
    ],
    "circle-radius": ["step", ["get", "point_count"], 18, 10, 22, 50, 28],
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};

const clusterCountLayer: LayerProps = {
  id: "world-cluster-count",
  type: "symbol",
  source: "world-tours",
  filter: ["has", "point_count"],
  layout: {
    "text-field": ["get", "point_count_abbreviated"],
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
  paint: {
    "text-color": "#ffffff",
  },
};

const unclusteredPointLayer: LayerProps = {
  id: "world-unclustered-point",
  type: "circle",
  source: "world-tours",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": [
      "match",
      ["get", "countryIndex"],
      0,
      "#E8673A", // Italy
      1,
      "#2563EB", // France
      2,
      "#D97706", // Germany
      "#888888",
    ],
    "circle-radius": 7,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

type WorldMapClientProps = {
  tours: WorldTour[];
};

export default function WorldMapClient({ tours }: WorldMapClientProps) {
  const mapRef = useRef<MapRef | null>(null);
  const mapboxToken =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const [popupInfo, setPopupInfo] = useState<WorldTour | null>(null);

  const geoJsonData = useMemo<FeatureCollection<Point, TourProperties>>(
    () => ({
      type: "FeatureCollection",
      features: tours.map((tour, featureIndex) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [tour.longitude, tour.latitude],
        },
        properties: {
          featureIndex,
          countryIndex: tour.countryIndex,
        },
      })),
    }),
    [tours]
  );

  const handleMapClick = useCallback(
    (event: { features?: Feature[] }) => {
      const clickedFeature = event.features?.[0];
      if (!clickedFeature) {
        setPopupInfo(null);
        return;
      }

      // Cluster click — zoom in
      if (clickedFeature.properties?.cluster) {
        const clusterId = clickedFeature.properties.cluster_id as number;
        const center = (clickedFeature.geometry as Point).coordinates as [
          number,
          number,
        ];
        const source = mapRef.current?.getSource(
          "world-tours"
        ) as unknown as {
          getClusterExpansionZoom: (
            id: number,
            cb: (err: Error | null, zoom: number) => void
          ) => void;
        };
        source?.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          mapRef.current?.easeTo({
            center,
            zoom: Math.min(zoom, 14),
            duration: 500,
          });
        });
        return;
      }

      // Individual point click — show popup
      const featureIndex = clickedFeature.properties?.featureIndex;
      if (typeof featureIndex === "number" && tours[featureIndex]) {
        setPopupInfo(tours[featureIndex]);
      }
    },
    [tours]
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
    <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white shadow-sm sm:rounded-[2rem]">
      <div className="h-[380px] w-full bg-[#f8f3ec] lg:h-[550px]">
        <MapboxMap
          ref={mapRef}
          initialViewState={{
            longitude: 10,
            latitude: 46,
            zoom: 4.5,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          mapboxAccessToken={mapboxToken}
          interactiveLayerIds={["world-clusters", "world-unclustered-point"]}
          onClick={handleMapClick}
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" showCompass={false} />

          <Source
            id="world-tours"
            type="geojson"
            data={geoJsonData}
            cluster={true}
            clusterMaxZoom={12}
            clusterRadius={48}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>

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
        </MapboxMap>
      </div>

      {/* Country legend */}
      <div className="absolute bottom-4 left-4 rounded-xl border border-[#d8c7b5] bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {COUNTRY_LEGEND.map((c) => (
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
