import type { GuideSeason } from "../../guides/types";

// Recheck these official sources when changing the year. Never roll dates forward automatically.
export const colmar2026: GuideSeason = {
  year: 2026,
  checkedOn: "2026-10-13",
  dates: "23 November – 29 December 2026",
  hours: [
    { label: "Monday–Thursday", value: "11:00–19:00" },
    { label: "Friday–Sunday", value: "10:00–20:00" },
  ],
  exceptions: "24 December: 11:00–17:00. 25 and 26 December: 10:00–20:00. All times are local to Colmar.",
  source: { label: "Official Colmar dates & opening hours", href: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/practical" },
  extraMarket: {
    title: "The Gourmet Market stays longer",
    dates: "23 November 2026 – 3 January 2027",
    hours: "Daily 11:00–22:00; 31 December 11:00–17:00. At the Montagne Verte sports ground, Rue de la Montagne Verte.",
    source: { label: "Gourmet Market schedule", href: "https://www.tourisme-colmar.com/fr/toutes-les-fiches/F235015379_marche-de-noel-marche-gourmand-colmar" },
  },
  transport: [
    { title: "Arrive by train", text: "Colmar station is at 9 Place de la Gare. Regional trains connect it with Strasbourg, Sélestat, Mulhouse and Basel, among other destinations. Check a connection for your actual travel date, then continue towards the old town on foot or by local bus.", source: { label: "Colmar station & train connections", href: "https://www.sncf-connect.com/gares/colmar/colmar" } },
    { title: "Continue to the Alsace villages", text: "The 2026 Christmas shuttles run from 27 November to 20 December, with routes and operating days varying by destination. They serve places including Kaysersberg, Riquewihr, Ribeauvillé and Eguisheim. Online ticket sales are announced for 12 November at noon. Check the route timetable before choosing a day.", source: { label: "Official 2026 Christmas shuttles", href: "https://www.noel-colmar.com/fr/navettes-de-noel" } },
    { title: "Move around Colmar", text: "Use TRACE for local bus routes and current service information. Christmas road closures and diversions can affect the final part of your journey; check the operator before setting out.", source: { label: "TRACE local transport", href: "https://www.trace-colmar.fr/" } },
  ],
};
