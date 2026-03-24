"use client";

import { useMemo, useState } from "react";

import type { VideoCatalogRecord } from "../data/video-types";

type SearchFilterBarProps = {
  videos: VideoCatalogRecord[];
  initialQuery?: string;
  initialCountry?: string;
  initialRegion?: string;
  initialCity?: string;
  initialType?: string;
  action?: string;
  placeholder?: string;
  submitLabel?: string;
  variant?: "page" | "hero";
};

const uniqueSorted = (values: Array<string | undefined>) =>
  Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
    a.localeCompare(b)
  );

const matchesValue = (value: string | undefined, selectedValue: string) => {
  if (!selectedValue) {
    return true;
  }

  return (value ?? "") === selectedValue;
};

export default function SearchFilterBar({
  videos,
  initialQuery = "",
  initialCountry = "",
  initialRegion = "",
  initialCity = "",
  initialType = "",
  action = "/search",
  placeholder = "Search by keyword",
  submitLabel = "Search",
  variant = "page",
}: SearchFilterBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedType, setSelectedType] = useState(initialType);

  const countries = useMemo(
    () => uniqueSorted(videos.map((video) => video.country)),
    [videos]
  );

  const regionOptions = useMemo(
    () =>
      selectedCountry
        ? uniqueSorted(
            videos
              .filter((video) => matchesValue(video.country, selectedCountry))
              .map((video) => video.region)
          )
        : [],
    [selectedCountry, videos]
  );

  const safeSelectedRegion = regionOptions.includes(selectedRegion)
    ? selectedRegion
    : "";

  const cityOptions = useMemo(
    () =>
      safeSelectedRegion
        ? uniqueSorted(
            videos
              .filter(
                (video) =>
                  matchesValue(video.country, selectedCountry) &&
                  matchesValue(video.region, safeSelectedRegion)
              )
              .map((video) => video.city)
          )
        : [],
    [safeSelectedRegion, selectedCountry, videos]
  );

  const safeSelectedCity = cityOptions.includes(selectedCity)
    ? selectedCity
    : "";

  const videoTypeOptions = useMemo(
    () =>
      selectedCountry
        ? uniqueSorted(
            videos
              .filter(
                (video) =>
                  matchesValue(video.country, selectedCountry) &&
                  matchesValue(video.region, safeSelectedRegion) &&
                  matchesValue(video.city, safeSelectedCity)
              )
              .map((video) => video.videoType)
          )
        : [],
    [safeSelectedCity, safeSelectedRegion, selectedCountry, videos]
  );

  const safeSelectedType = videoTypeOptions.includes(selectedType)
    ? selectedType
    : "";

  const isHero = variant === "hero";
  const formClassName = isHero
    ? "mt-8 max-w-5xl rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl"
    : "mt-8 max-w-5xl rounded-[2rem] border border-[#d8c7b5] bg-white p-3 shadow-sm";
  const inputClassName = isHero
    ? "h-14 w-full rounded-full border border-white/20 bg-white px-12 pr-5 text-[17px] text-[#2f261d] outline-none placeholder:text-[#8a7a68] shadow-sm"
    : "h-14 w-full rounded-full border border-[#d8c7b5] bg-[#fcfaf6] px-12 pr-5 text-[17px] text-[#3d3327] outline-none transition placeholder:text-[#8a7a68] focus:border-[#167fd5] focus:bg-white";
  const buttonClassName = isHero
    ? "inline-flex h-14 items-center justify-center rounded-xl bg-[#3d3327] px-6 text-base font-semibold text-white transition hover:bg-[#2f261d]"
    : "inline-flex h-14 items-center justify-center rounded-[1.25rem] bg-[#167fd5] px-6 text-base font-semibold text-white transition hover:bg-[#09679e]";
  const selectClassName = isHero
    ? "h-12 rounded-xl border border-[#d8c7b5] bg-white px-4 text-[15px] text-[#2f261d] outline-none transition focus:border-[#167fd5] disabled:cursor-not-allowed disabled:bg-[#efe6da] disabled:text-[#9b8f82]"
    : "h-12 rounded-[1.25rem] border border-[#d8c7b5] bg-[#fcfaf6] px-4 text-[15px] text-[#3d3327] outline-none transition focus:border-[#167fd5] disabled:cursor-not-allowed disabled:bg-[#f3ede4] disabled:text-[#9b8f82]";

  return (
    <form action={action} method="get" className={formClassName}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
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
            type="text"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className={inputClassName}
          />
        </div>
        <button type="submit" className={buttonClassName}>
          {submitLabel}
        </button>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <select
          name="country"
          value={selectedCountry}
          onChange={(event) => {
            const nextCountry = event.target.value;

            setSelectedCountry(nextCountry);

            if (!nextCountry) {
              setSelectedType("");
            }
          }}
          className={selectClassName}
        >
          <option value="">All countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          name="region"
          value={safeSelectedRegion}
          onChange={(event) => setSelectedRegion(event.target.value)}
          disabled={!selectedCountry || regionOptions.length === 0}
          className={selectClassName}
        >
          <option value="">
            {selectedCountry ? "All regions" : "Select country first"}
          </option>
          {regionOptions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          name="city"
          value={safeSelectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
          disabled={!safeSelectedRegion || cityOptions.length === 0}
          className={selectClassName}
        >
          <option value="">
            {safeSelectedRegion ? "All cities" : "Select region first"}
          </option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={safeSelectedType}
          onChange={(event) => setSelectedType(event.target.value)}
          disabled={!selectedCountry || videoTypeOptions.length === 0}
          className={selectClassName}
        >
          <option value="">
            {!selectedCountry
              ? "Select country first"
              : videoTypeOptions.length === 0
                ? "No video types"
                : "All video types"}
          </option>
          {videoTypeOptions.map((videoType) => (
            <option key={videoType} value={videoType}>
              {videoType}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}