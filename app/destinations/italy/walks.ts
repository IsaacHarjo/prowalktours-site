import "server-only";
import { discoveryVideos } from "../../../lib/tours/server";

// YouTube shows ujOrTmi-lCY as members-only (checked 20 November 2026).
// The master Sheet still marks it-0200 ready; reconcile its availability there
// before removing this page-level exclusion. Do not infer access from titles.
export const italyWalks = discoveryVideos
  .filter(walk => walk.country === "Italy" && walk.id !== "it-0200")
  .map(walk => ({ ...walk, region: ({ campania: "Campania", lazio: "Lazio", apulia: "Puglia" } as Record<string, string>)[walk.region.trim().toLowerCase()] || walk.region.trim() }));
