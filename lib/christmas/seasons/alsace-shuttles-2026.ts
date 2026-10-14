import type { GuideShuttleService } from "../../guides/types";

// Shared by Alsace destination guides. Recheck the official page for each season.
export const alsaceShuttles2026: GuideShuttleService = {
  checkedOn: "2026-10-14",
  introduction: "The Christmas Shuttles connect Colmar with nearby market towns, so you can visit without driving between them. Most routes run only on weekends (Friday–Sunday). The Eguisheim shuttle (line 3) is the exception, with daily service during the shuttle season.",
  dates: "27 November – 20 December 2026",
  departure: "Colmar train station",
  booking: "Online sales open 12 November 2026 at noon (CET). Tickets are not sold at bus stops.",
  fares: [
    { label: "Friday–Sunday", value: "€17 day pass · all lines" },
    { label: "Monday–Thursday", value: "€8 · Eguisheim, line 3 only" },
    { label: "Explorer pass", value: "€10 · lines 4 & 5 only, on operating days" },
  ],
  children: "Under 12s travel free, but still need a booked ticket.",
  routes: [
    { label: "Lines 1 & 2", destinations: "Kaysersberg, Riquewihr & Ribeauvillé", days: "Friday–Sunday" },
    { label: "Line 3", destinations: "Eguisheim", days: "Daily" },
    { label: "Line 4", destinations: "Turckheim & Munster", days: "Friday–Sunday" },
    { label: "Line 5", destinations: "Neuf-Brisach", days: "12 & 13 December only" },
  ],
  note: "Check the timetable and your last return before setting out. Market opening days vary, and traffic can delay the buses.",
  source: { label: "Official shuttle routes, timetables & tickets", href: "https://www.noel-colmar.com/en/christmas-shuttles" },
};
