import type { GuideTripPlanning } from "../guides/types";

// Personal details and advice supplied by Ike on 24 November 2026.
// Transport details checked against the linked operators; times vary by service.
export const colmarTripPlanning: GuideTripPlanning = {
  arrival: [
    {
      title: "From Paris",
      paragraphs: ["Take a TGV from Paris Gare de l’Est. The fastest direct trains take about 2 hours 20 minutes; many journeys with a change at Strasbourg take roughly 2½–3 hours. Compare the actual departures for your travel date on SNCF Connect. Booking early can give you more choice of fares."],
      sources: [{ label: "Paris–Colmar trains & tickets", href: "https://www.sncf-connect.com/en-en/train/route/paris/colmar" }],
      checkedOn: "2026-11-24",
    },
    {
      title: "Flying into EuroAirport",
      paragraphs: ["EuroAirport Basel-Mulhouse-Freiburg is a convenient airport south of Colmar. There is no train station at the terminal: take bus 11 from the French-side arrivals area to Saint-Louis station, about 10–15 minutes away.", "From Saint-Louis, direct trains serve Colmar, Mulhouse, Sélestat and Strasbourg. The airport describes the rail connections as roughly half-hourly; check your particular train and allow time for the bus transfer."],
      sources: [{ label: "EuroAirport bus & rail connections", href: "https://www.euroairport.com/transports" }],
      checkedOn: "2026-11-24",
    },
    {
      title: "Flying into Strasbourg",
      paragraphs: ["From Strasbourg Airport, take the train from Entzheim-Aéroport to Strasbourg’s main station, about 8 minutes, then change for Colmar. Fast direct trains from Strasbourg to Colmar take about 30 minutes. Allow extra time for the connection: that half-hour is not the whole airport journey."],
      sources: [
        { label: "Strasbourg Airport train transfer", href: "https://www.strasbourg.aeroport.fr/en/passengers/car-parks-and-access/shuttle-train/" },
        { label: "Strasbourg–Colmar trains", href: "https://www.sncf-connect.com/en-en/train/route/strasbourg/colmar" },
      ],
      checkedOn: "2026-11-24",
    },
    {
      title: "Coming from Basel or Strasbourg",
      paragraphs: ["Both cities make a straightforward day trip to Colmar by regional train. On my own trip, I visited Basel, Strasbourg and Freiburg along with the Alsace villages. If you are coming for the day, check the last train back so you can leave time for the markets after dark."],
      sources: [
        { label: "Basel–Colmar trains", href: "https://www.sncf-connect.com/en-en/train/route/basel/colmar" },
        { label: "Strasbourg–Colmar trains", href: "https://www.sncf-connect.com/en-en/train/route/strasbourg/colmar" },
      ],
      checkedOn: "2026-11-24",
    },
    {
      title: "Driving to Colmar",
      paragraphs: ["We had a car on my December 2025 trip because we were filming in several villages. It made getting around easy. We arrived at Parking Rapp around 11 a.m., and finding a space was very easy that day. The garage is a short walk from the old town. For a market visit, plan your parking before setting out; the weekend park-and-ride details are below.", "If you are only visiting Colmar, I would choose the train for simplicity. The Christmas Shuttles can also take you to nearby market towns on their operating days. Check the routes, dates and booking details below before planning a village day without a car."],
    },
  ],
  stays: [
    {
      title: "In Colmar’s old town",
      paragraphs: ["For atmosphere, this would be my first choice. You can walk out into the markets and return after dark for the lights without having to catch a train home. I would reserve as soon as your December dates are settled, especially for a Friday or Saturday night."],
    },
    {
      title: "Near Colmar station",
      paragraphs: ["This is practical if you are arriving by train or using the Christmas Shuttles, which leave from the station. Allow about 15 minutes to walk towards the old town, depending on your accommodation and destination. The tourist office puts the first market about 12 minutes from the station; my mapped 800-metre approach only takes you to the start of the suggested route."],
      sources: [{ label: "Official station-to-market walking information", href: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/practical" }],
    },
    {
      title: "In Strasbourg",
      paragraphs: ["Choose Strasbourg if you want a bigger-city base with a wider choice of hotels and restaurants, then visit Colmar by train. For me, Colmar is at its best around sunset and into the evening, so check the return trains before you go."],
    },
    {
      title: "In a wine village",
      paragraphs: ["Bobby and I stayed in an apartment in Westhalten, a small village south of Colmar, and drove to a different market town each day. It was perfect for my trip. After long days of walking around the markets, I enjoyed coming back to my own little apartment to relax. I would recommend a base like this if you have a car and want to explore several towns.", "Without a car, check transport from the exact village before booking: the Christmas Shuttles do not serve every village, and Westhalten is not on the listed routes."],
      sources: [{ label: "Check which villages the Christmas Shuttles serve", href: "https://www.noel-colmar.com/en/christmas-shuttles" }],
    },
  ],
  tip: "For a weekend trip, I would base myself in Colmar for at least two nights. Spend one evening walking the markets, and use a day on the Christmas Shuttle to see Kaysersberg, Riquewihr or Eguisheim. Check the shuttle season and operating days before choosing your dates.",
};
