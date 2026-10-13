import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import type { MetadataRoute } from "next";
import { publicTours } from "../lib/tours/server";

const SITE_URL = "https://www.prowalktours.com";

// Draft documents and a separate design preview must not enter the public sitemap.
const EXCLUDED_TOP_LEVEL = new Set(["home-preview", "privacy-policy", "terms-of-use"]);

function listDirectRouteSlugs(subdirectory: string): string[] {
  const dir = path.join(process.cwd(), "app", subdirectory);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(path.join(dir, entry.name, "page.tsx"))
    )
    .map((entry) => entry.name);
}

function walkRoutesRecursive(
  absoluteDir: string,
  urlPrefix: string,
  out: string[]
): void {
  if (!existsSync(absoluteDir)) return;
  for (const entry of readdirSync(absoluteDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const childAbs = path.join(absoluteDir, entry.name);
    const childUrl = `${urlPrefix}/${entry.name}`;
    if (existsSync(path.join(childAbs, "page.tsx"))) {
      out.push(childUrl);
    }
    walkRoutesRecursive(childAbs, childUrl, out);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const publicSlugs = new Set(publicTours.map((tour) => tour.slug));
  const videoSlugs = listDirectRouteSlugs("videos").filter((slug) => publicSlugs.has(slug));
  const topLevelRoutes = listDirectRouteSlugs("")
    .filter((slug) => !EXCLUDED_TOP_LEVEL.has(slug))
    .map((slug) => `/${slug}`);

  const destinationRoutes: string[] = [];
  walkRoutesRecursive(
    path.join(process.cwd(), "app/destinations"),
    "/destinations",
    destinationRoutes
  );
  walkRoutesRecursive(
    path.join(process.cwd(), "app/christmas-markets"),
    "/christmas-markets",
    destinationRoutes
  );

  const allPaths = [
    "/",
    ...topLevelRoutes,
    ...destinationRoutes,
    ...videoSlugs.map((slug) => `/videos/${slug}`),
  ];

  return [...new Set(allPaths)].map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
  }));
}
