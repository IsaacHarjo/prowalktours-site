"use client";

import { useMemo, useRef, useState } from "react";
import MapboxMap, {
  GeolocateControl,
  NavigationControl,
  Popup,
  Layer,
  Source,
  type LayerProps,
  type MapMouseEvent,
  type MapRef,
  type ViewState,
} from "react-map-gl/mapbox";
import type { Feature, FeatureCollection, Point } from "geojson";
import type { GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { ExploreMapFeature } from "../data/maps/types";
import {
  filterExploreMapFeatures,
  formatVideoTypeLabel,
  getVideoTypeFilterOptions,
} from "../data/maps/filters";
import ExploreMapDrawer from "./ExploreMapDrawer";

type ExploreVideoMapProps = {
  features: ExploreMapFeature[];
  initialViewState: Pick<ViewState, "longitude" | "latitude" | "zoom">;
  mapStyle?: string;
};

type FeatureProperties = {
  cluster?: boolean;
  cluster_id?: number;
  point_count?: number;
  point_count_abbreviated?: string;
  featureIndex?: number;
};

type ClusterSelection = {
  clusterId: number;
  center: [number, number];
  features: ExploreMapFeature[];
};

type ClusterSource = GeoJSONSource & {
  getClusterExpansionZoom: (
    clusterId: number,
    callback: (error: Error | null, zoom: number) => void
  ) => void;
  getClusterLeaves: (
    clusterId: number,
    limit: number,
    offset: number,
    callback: (
      error: Error | null,
      features: Array<Feature<Point, FeatureProperties>>
    ) => void
  ) => void;
};

const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "explore-video-features",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#167fd5",
      10,
      "#0f6db9",
      30,
      "#0a4f8b",
    ],
    "circle-radius": ["step", ["get", "point_count"], 18, 10, 22, 30, 28],
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
  },
};

const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "explore-video-features",
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
  id: "unclustered-point",
  type: "circle",
  source: "explore-video-features",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#f4e6bc",
    "circle-radius": 8,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#2f261d",
  },
};

export default function ExploreVideoMap({
  features,
  initialViewState,
  mapStyle = "mapbox://styles/mapbox/satellite-streets-v12",
}: ExploreVideoMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const mapboxToken =
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN ??
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedCluster, setSelectedCluster] =
    useState<ClusterSelection | null>(null);
  const [selectedVideoTypes, setSelectedVideoTypes] = useState<string[]>([]);

  const videoTypeOptions = useMemo(
    () => getVideoTypeFilterOptions(features),
    [features]
  );

  const visibleFeatures = useMemo(
    () => filterExploreMapFeatures(features, selectedVideoTypes),
    [features, selectedVideoTypes]
  );

  const featureLookup = useMemo(
    () => new Map(visibleFeatures.map((feature) => [feature.tourId, feature])),
    [visibleFeatures]
  );

  const selectedFeature = useMemo(
    () =>
      selectedTourId
        ? visibleFeatures.find((feature) => feature.tourId === selectedTourId) ?? null
        : null,
    [selectedTourId, visibleFeatures]
  );

  const visibleSelectedCluster = useMemo(() => {
    if (!selectedCluster) {
      return null;
    }

    const nextFeatures = selectedCluster.features.filter((feature) =>
      featureLookup.has(feature.tourId)
    );

    if (nextFeatures.length === 0) {
      return null;
    }

    return {
      ...selectedCluster,
      features: nextFeatures,
    };
  }, [featureLookup, selectedCluster]);

  const geoJsonData = useMemo<FeatureCollection<Point, FeatureProperties>>(
    () => ({
      type: "FeatureCollection",
      features: visibleFeatures.map((feature, featureIndex) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [feature.longitude, feature.latitude],
        },
        properties: {
          featureIndex,
        },
      })),
    }),
    [visibleFeatures]
  );

  const toggleVideoType = (videoType: string) => {
    setSelectedVideoTypes((current) =>
      current.includes(videoType)
        ? current.filter((item) => item !== videoType)
        : [...current, videoType]
    );
  };

  const clearSelection = () => {
    setSelectedTourId(null);
    setSelectedCluster(null);
  };

  const zoomToCluster = (clusterId: number, center: [number, number]) => {
    const map = mapRef.current?.getMap();
    if (!map) {
      return;
    }

    const source = map.getSource("explore-video-features") as ClusterSource;
    if (!source) {
      return;
    }

    source.getClusterExpansionZoom(clusterId, (error, zoom) => {
      if (error) {
        return;
      }

      map.easeTo({ center, zoom: zoom ?? map.getZoom(), duration: 500 });
    });
  };

  const openClusterSelection = (
    clusterId: number,
    center: [number, number],
    pointCount: number
  ) => {
    const map = mapRef.current?.getMap();
    if (!map) {
      return;
    }

    const source = map.getSource("explore-video-features") as ClusterSource;
    if (!source) {
      return;
    }

    source.getClusterLeaves(clusterId, pointCount, 0, (error, leaves) => {
      if (error) {
        return;
      }

      const safeLeaves = leaves ?? [];

      const clusterFeatures = safeLeaves
        .map((leaf) => {
          const featureIndex = leaf.properties?.featureIndex;
          return typeof featureIndex === "number"
            ? visibleFeatures[featureIndex] ?? null
            : null;
        })
        .filter((feature): feature is ExploreMapFeature => feature !== null);

      setSelectedTourId(null);
      setSelectedCluster({
        clusterId,
        center,
        features: clusterFeatures,
      });
      map.easeTo({ center, duration: 500 });
    });
  };

  const handleMapClick = (event: MapMouseEvent) => {
    const map = mapRef.current?.getMap();
    if (!map) {
      return;
    }

    const renderedFeatures = map.queryRenderedFeatures(event.point, {
      layers: ["clusters", "unclustered-point"],
    }) as Array<Feature<Point, FeatureProperties>>;

    const clicked = renderedFeatures[0];
    if (!clicked) {
      clearSelection();
      return;
    }

    if (clicked.properties?.cluster) {
      const clusterId = clicked.properties.cluster_id;
      const pointCount = clicked.properties.point_count;
      const coordinates = clicked.geometry.coordinates as [number, number];

      if (typeof clusterId !== "number" || typeof pointCount !== "number") {
        return;
      }

      openClusterSelection(clusterId, coordinates, pointCount);
      return;
    }

    const featureIndex = clicked.properties?.featureIndex;
    if (typeof featureIndex === "number") {
      setSelectedCluster(null);
      setSelectedTourId(visibleFeatures[featureIndex]?.tourId ?? null);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="rounded-[1.5rem] border border-[#d8c7b5] bg-[#fff7ed] p-6 text-[#7c2d12] shadow-sm sm:rounded-[2rem]">
        <p className="text-lg font-semibold">Mapbox token missing</p>
        <p className="mt-2 text-sm leading-7">
          Set <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable the interactive
          map on this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        {videoTypeOptions.map((option) => {
          const selected = selectedVideoTypes.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleVideoType(option.value)}
              aria-pressed={selected}
              className={
                selected
                  ? "rounded-full border border-[#167fd5] bg-[#167fd5] px-4 py-2 text-sm font-semibold text-white transition"
                  : "rounded-full border border-[#d8c7b5] bg-white px-4 py-2 text-sm font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white shadow-sm sm:rounded-[2rem]">
        <div className="h-[420px] w-full bg-[#f8f3ec] sm:h-[480px] lg:h-auto lg:aspect-[16/9]">
          <MapboxMap
            ref={mapRef}
            initialViewState={initialViewState}
            mapStyle={mapStyle}
            mapboxAccessToken={mapboxToken}
            interactiveLayerIds={["clusters", "unclustered-point"]}
            onClick={handleMapClick}
            style={{ width: "100%", height: "100%" }}
          >
            <NavigationControl position="top-right" showCompass={false} />
            <GeolocateControl
              position="top-right"
              trackUserLocation={true}
              showUserHeading={true}
              positionOptions={{ enableHighAccuracy: true }}
            />

            <Source
              id="explore-video-features"
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

            {selectedFeature ? (
              <Popup
                longitude={selectedFeature.longitude}
                latitude={selectedFeature.latitude}
                anchor="bottom"
                closeButton={false}
                closeOnClick={false}
                offset={16}
                onClose={() => setSelectedTourId(null)}
              >
                <div className="hidden w-[320px] md:block">
                  <div className="overflow-hidden rounded-[1.25rem] border border-[#eadfce] bg-white shadow-sm">
                    <img
                      src={selectedFeature.thumbnailSrc}
                      alt={selectedFeature.title}
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
                        {selectedFeature.city}, {selectedFeature.region}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-[#2f261d]">
                        {selectedFeature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#6c5b49]">
                        {selectedFeature.descriptionShort}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                        <span className="rounded-full border border-[#eadfce] bg-[#fcfaf7] px-3 py-1">
                          {formatVideoTypeLabel(selectedFeature.videoType)}
                        </span>
                        <span className="rounded-full border border-[#eadfce] bg-[#fcfaf7] px-3 py-1">
                          {selectedFeature.durationLabel}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-col gap-3">
                        <a
                          href={selectedFeature.youtubeUrl} target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
                        >
                          Watch 4K Walk
                        </a>
                        {selectedFeature.mapUrl ? (
                          <a
                            href={selectedFeature.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-5 py-3 text-sm font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
                          >
                            View Walking Route
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            ) : null}

            {visibleSelectedCluster ? (
              <Popup
                longitude={visibleSelectedCluster.center[0]}
                latitude={visibleSelectedCluster.center[1]}
                anchor="bottom"
                closeButton={false}
                closeOnClick={false}
                offset={16}
                onClose={() => setSelectedCluster(null)}
              >
                <div className="hidden w-[360px] md:block">
                  <div className="rounded-[1.25rem] border border-[#eadfce] bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
                          Cluster Results
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-[#2f261d]">
                          {visibleSelectedCluster.features.length} videos in this area
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#6c5b49]">
                          Browse the videos in this cluster or zoom in for a closer view.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          zoomToCluster(
                            visibleSelectedCluster.clusterId,
                            visibleSelectedCluster.center
                          )
                        }
                        className="shrink-0 rounded-full border border-[#167fd5] bg-white px-3 py-1.5 text-sm font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
                      >
                        Zoom in
                      </button>
                    </div>

                    <div className="mt-4 max-h-[360px] space-y-4 overflow-y-auto pr-1">
                      {visibleSelectedCluster.features.map((item) => (
                        <div
                          key={item.tourId}
                          className="rounded-[1rem] border border-[#eadfce] bg-[#fcfaf7] p-3"
                        >
                          <div className="overflow-hidden rounded-[0.9rem] border border-[#eadfce] bg-white">
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
                  </div>
                </div>
              </Popup>
            ) : null}
          </MapboxMap>
        </div>
      </div>

      <div className="mt-4 text-sm leading-7 text-[#6c5b49]">
        Showing {visibleFeatures.length} mapped videos across Italy.
      </div>

      <ExploreMapDrawer
        feature={selectedFeature}
        clusterFeatures={visibleSelectedCluster?.features}
        onZoomIn={
          visibleSelectedCluster
            ? () =>
                zoomToCluster(
                  visibleSelectedCluster.clusterId,
                  visibleSelectedCluster.center
                )
            : undefined
        }
        onClose={clearSelection}
      />
    </div>
  );
}
