import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";

import type { SearchHitRecord } from "../video-types";

type FranceHighlightCsvRow = {
  tour_id: string;
  slug: string;
  title: string;
  youtube_url: string;
  time_label: string;
  seconds: string;
  highlight_title: string;
  landmark: string;
  search_terms: string;
};

const CSV_PATH = path.join(process.cwd(), "data", "import", "all-highlights.csv");
const REQUIRED_COLUMNS = [
  "tour_id",
  "slug",
  "title",
  "youtube_url",
  "time_label",
  "seconds",
  "highlight_title",
  "landmark",
  "search_terms",
] as const;

function parseCsv(content: string) {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const nextChar = content[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      currentRow.push(currentValue);
      const hasNonEmptyValue = currentRow.some((value) => value !== "");
      if (hasNonEmptyValue) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentValue = "";
      continue;
    }

    currentValue += char;
  }

  currentRow.push(currentValue);
  if (currentRow.some((value) => value !== "")) {
    rows.push(currentRow);
  }

  return rows;
}

function getCsvRows() {
  const content = readFileSync(CSV_PATH, "utf8");
  const [headerRow = [], ...dataRows] = parseCsv(content);
  const headers = new Map(headerRow.map((header, index) => [header, index]));

  for (const column of REQUIRED_COLUMNS) {
    if (!headers.has(column)) {
      throw new Error(`Missing required France highlights CSV column: ${column}`);
    }
  }

  return dataRows.map((row) => {
    const record = {} as FranceHighlightCsvRow;

    for (const column of REQUIRED_COLUMNS) {
      record[column] = row[headers.get(column) ?? -1] ?? "";
    }

    return record;
  });
}

function toSearchTerms(value: string) {
  return value
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);
}

function toSearchHitRecord(row: FranceHighlightCsvRow): SearchHitRecord | null {
  const seconds = Number.parseInt(row.seconds, 10);

  if (!row.slug.trim() || !row.youtube_url.trim() || Number.isNaN(seconds)) {
    return null;
  }

  return {
    tour_id: row.tour_id,
    slug: row.slug,
    title: row.title,
    youtube_url: row.youtube_url,
    time_label: row.time_label,
    seconds,
    highlight_title: row.highlight_title,
    landmark: row.landmark || row.highlight_title,
    search_terms: toSearchTerms(row.search_terms),
  };
}

export const franceSearchHits: SearchHitRecord[] = getCsvRows()
  .map(toSearchHitRecord)
  .filter((row): row is SearchHitRecord => row !== null);
