// Visitor information checked against the organizer on 25 November 2026.
// Filming notes and stop order supplied by Isaac; these describe his 2025 visit.
export const freiburgGuide = {
  url: "https://www.prowalktours.com/christmas-markets/freiburg",
  title: "Freiburg Christmas Market 2026: My Guide & Walking Route | Prowalk Tours",
  description: "Explore Freiburg at Christmas with my Old Town walk, market stops, 2026 dates and opening hours, and practical links for planning your visit.",
  hero: { src: "/images/homepage/freiburg-christmas-market.jpg", alt: "Lights and wooden stalls on my Christmas market visit in Freiburg" },
  personalTake: "What I enjoyed most about Freiburg was the feeling of being part of everyday life. On the day I visited, the regular market was running on Münsterplatz, with flowers, meats and cheeses alongside the Christmas atmosphere. It seemed to draw mostly local people, and it didn’t feel overly crowded.",
  personalTakeMore: "After visiting a different Christmas market almost every day, that mix was a welcome change. I noticed the Black Forest character in the food and some of the Christmas merchandise, and Freiburg felt less commercial to me. I visited with my friend Bobby during our December 2025 trip, which started in Basel and took us through Alsace up to Strasbourg.",
  filmedOn: "16 December 2025",
  weather: "9°C / 49°F",
  filmedRouteUrl: "https://www.google.com/maps/d/viewer?mid=1cow1Bl-XUxiBNkB8w78b4uhOkR5MGWM",
  season: {
    dates: "19 November–23 December 2026",
    checkedOn: "2026-11-25",
    hours: [
      { label: "Monday–Saturday", time: "10:00–20:30" },
      { label: "Sunday", time: "11:30–19:30" },
    ],
    exceptions: "Opening day, 19 November: 14:00–20:30. Closed on 22 November (Totensonntag). Final day, 23 December: 10:00–19:30. All times are local to Freiburg.",
  },
  sources: {
    official: "https://weihnachtsmarkt.freiburg.de/en/",
    map: "https://weihnachtsmarkt.freiburg.de/en/map",
    directions: "https://weihnachtsmarkt.freiburg.de/en/directions",
    trains: "https://www.bahn.de/en",
  },
  stops: [
    { name: "Turmstraße", subtitle: "Tower Street", text: "I started my walk among the Christmas stalls on Turmstraße, then returned here toward the end of the route." },
    { name: "Rathausplatz", subtitle: "Town Hall Square", text: "My walk continues into the Christmas market on Rathausplatz before heading along Franziskanerstraße." },
    { name: "Franziskanerstraße", subtitle: "Franciscan Street", text: "I walked through this market street twice, linking the stalls around Rathausplatz with the rest of the Old Town." },
    { name: "Kartoffelmarkt", subtitle: "Another market square", text: "This was my next Christmas market stop before continuing toward Münsterplatz and the cathedral." },
    { name: "Münsterplatz & the Old Town", subtitle: "Beyond the Christmas stalls", text: "I also filmed the cathedral and the produce market on Münsterplatz, then continued through the Old Town to the Schwabentor. These are separate stops in my walk, rather than additional Christmas market locations." },
    { name: "Colombipark", subtitle: "The final market stop in my walk", text: "After returning through the market streets, I finished my walk at the Christmas market in Colombipark." },
  ],
} as const;
