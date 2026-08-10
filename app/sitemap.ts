import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import type { MetadataRoute } from "next";

const SITE_URL = "https://www.prowalktours.com";

const STATIC_ROUTES = ["/", "/countries", "/search", "/licensing"] as const;

function listDirectRouteSlugs(relativeDir: string): string[] {
  const dir = path.join(process.cwd(), relativeDir);
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
  const videoSlugs = listDirectRouteSlugs("app/videos");

  const destinationRoutes: string[] = [];
  walkRoutesRecursive(
    path.join(process.cwd(), "app/destinations"),
    "/destinations",
    destinationRoutes
  );

  const allPaths = [
    ...STATIC_ROUTES,
    ...destinationRoutes,
    ...videoSlugs.map((slug) => `/videos/${slug}`),
  ];

  return allPaths.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
  }));
}
