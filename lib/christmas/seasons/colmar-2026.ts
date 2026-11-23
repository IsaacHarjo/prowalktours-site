import type { GuideSeason } from "../../guides/types";
import { alsaceShuttles2026 } from "./alsace-shuttles-2026";

// Recheck these official sources when changing the year. Never roll dates forward automatically.
export const colmar2026: GuideSeason = {
  year: 2026,
  checkedOn: "2026-11-23",
  dates: "23 November – 29 December 2026",
  hours: [
    { label: "Monday–Thursday", value: "11:00–19:00" },
    { label: "Friday–Sunday", value: "10:00–20:00" },
  ],
  exceptions: "24 December: 11:00–17:00. 25 and 26 December: 10:00–20:00. All times are local to Colmar.",
  source: { label: "Official Colmar dates & opening hours", href: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/practical" },
  extraMarket: {
    title: "Visiting after Christmas?",
    dates: "23 November 2026 – 3 January 2027",
    hours: "The main markets finish on 29 December, but the Gourmet Market and Ferris wheel at Montagne Verte, along with the Place Rapp Christmas fair, continue through 3 January 2027. All three open daily 11:00–22:00, closing at 17:00 on 31 December.",
    source: { label: "Official extended-season dates & hours", href: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/practical" },
    checkedOn: "2026-11-23",
  },
  crowdForecast: {
    text: "To help choose a time for your walk, compare the tourist office’s crowd forecasts by date and time. These are estimates, not live visitor counts; check the opening hours and transport for your chosen day too.",
    source: { label: "Check the official crowd forecast calendar", href: "https://www.noel-colmar.com/en/attendance-forecasts" },
    checkedOn: "2026-11-23",
  },
  officialMap: {
    text: "Save the tourist office’s English map to your phone before setting out. Alongside my suggested walk, it is useful for finding toilets, parking, information points and shuttle stops.",
    source: { label: "Download the official 2026 Colmar map (English PDF)", href: "https://reservation.tourisme-colmar.com/medias/documents/documentation/documentation-NOEL26P-UK.pdf" },
    checkedOn: "2026-11-23",
  },
  transport: [
    { title: "Weekend park & ride — €5 per day", text: "Leave your car at Parc des Expositions, Avenue de la Foire aux Vins. The €5 daily parking fee includes the return shuttle to Rue Saint-Eloi. It runs on 28–29 November and 5–6, 12–13 and 19–20 December 2026; there is no park-and-ride service on 26–27 December. Saturday service runs 09:00–23:30 and Sunday service 09:00–21:10, with the last return to the car park at those closing times. Buses run every 10 minutes from 09:30, changing to every 20 minutes after 21:30 on Saturdays. This local shuttle is separate from the Christmas Shuttles between towns.", source: { label: "Official park-and-ride dates & timetable", href: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/practical" }, checkedOn: "2026-11-23" },
    { title: "Arrive by train", text: "Colmar station is at 9 Place de la Gare. Regional trains connect it with Strasbourg, Sélestat, Mulhouse and Basel, among other destinations. Check a connection for your actual travel date, then continue towards the old town on foot or by local bus.", source: { label: "Colmar station & train connections", href: "https://www.sncf-connect.com/gares/colmar/colmar" } },
    { title: "Move around Colmar", text: "Use TRACE for local bus routes and current service information. Christmas road closures and diversions can affect the final part of your journey; check the operator before setting out.", source: { label: "TRACE local transport", href: "https://www.trace-colmar.fr/" }, checkedOn: "2026-11-11" },
  ],
  shuttles: alsaceShuttles2026,
};
