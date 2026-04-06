"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VideoCatalogRecord } from "../data/video-types";

type LiveSearchBarProps = {
  videos: VideoCatalogRecord[];
  action?: string;
  placeholder?: string;
  children?: React.ReactNode;
};

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .replace(/[-'`]+/g, " ")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

function formatVideoType(vt: string) {
  return vt
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function LiveSearchBar({
  videos,
  action = "/search",
  placeholder = "Search a city, landmark, or country...",
  children,
}: LiveSearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    const q = normalizeSearchText(query);
    if (q.length < 2) return [];

    const results: Array<{
      slug: string;
      title: string;
      city: string;
      country: string;
      videoType: string;
      landmarkMatch: string | null;
    }> = [];

    for (const video of videos) {
      if (results.length >= 6) break;

      // Check broad geo match (city/region/country/title)
      const geoFields = [
        video.siteTitle,
        video.city,
        video.region,
        video.country,
        ...video.keywords,
        ...video.themes,
      ];
      const isGeoMatch = geoFields.some((val) =>
        normalizeSearchText(val).includes(q)
      );

      // Check landmark match
      const matchedLandmark = video.landmarks.find((lm) =>
        normalizeSearchText(lm).includes(q)
      );

      if (isGeoMatch || matchedLandmark) {
        results.push({
          slug: video.slug,
          title: video.siteTitle,
          city: video.city,
          country: video.country,
          videoType: video.videoType,
          landmarkMatch: isGeoMatch ? null : (matchedLandmark ?? null),
        });
      }
    }

    return results;
  }, [query, videos]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    },
    []
  );

  const showDropdown = open && query.length >= 2;

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <form action={action} method="get" className="flex items-start gap-3">
        <div className="relative flex-1">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7a68]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              autoComplete="off"
              className="w-full rounded-full border border-[#d8c7b5] bg-[#fcfaf7] py-3 pl-12 pr-4 text-[15px] text-[#2f261d] outline-none transition placeholder:text-[#bba893] focus:border-[#167fd5] focus:ring-2 focus:ring-[#167fd5]/20"
            />
          </div>
          {children}
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-full bg-[#167fd5] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#0f6db9]"
        >
          Search
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showDropdown ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-[#d8c7b5] bg-white shadow-lg">
          {suggestions.length > 0 ? (
            <ul className="divide-y divide-[#f0e8dc]">
              {suggestions.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/videos/${s.slug}`}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#f8f3ec]"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-[#bba893]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#2f261d]">
                        {s.landmarkMatch ? s.landmarkMatch : s.city}
                      </p>
                      <p className="truncate text-xs text-[#8a7a68]">
                        {s.landmarkMatch
                          ? `${s.city}, ${s.country}`
                          : `${s.country} · ${formatVideoType(s.videoType)}`}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <a
              href={`${action}?q=${encodeURIComponent(query)}`}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#f8f3ec]"
              onClick={() => setOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-[#bba893]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <p className="text-sm text-[#6c5b49]">
                Search all tours for{" "}
                <span className="font-semibold text-[#2f261d]">{query}</span>{" "}
                &rarr;
              </p>
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}
