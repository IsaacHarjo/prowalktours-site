import type { StandardGuide } from "../guides/standard-guide";
import { walkingDistanceKm } from "../guides/visitor-map-types";
import { nurembergVisitorMap } from "./nuremberg-visitor-map";

// Pilot for the standard guide. Dates, hours and transport were checked on the
// official pages on 11 November 2026 (christkindlesmarkt.de and
// tourismus.nuernberg.de). Personal take and tips are deliberately absent until
// Ike writes them. Photos are Ike's own, from his 2022 and 2024 visits.
const checkedOn = "2026-11-11";
const market = { label: "Official Christkindlesmarkt website", href: "https://www.christkindlesmarkt.de/en/" };
const tourism = { label: "Nuremberg tourism: Christkindlesmarkt", href: "https://tourismus.nuernberg.de/en/experience/christkindlesmarkt/" };
const ceremony = { label: "Opening ceremony", href: "https://www.christkindlesmarkt.de/en/christmas-market/opening-ceremony" };
const children = { label: "For children", href: "https://www.christkindlesmarkt.de/en/for-children" };
const publicTransport = { label: "Public transport to the market", href: "https://www.christkindlesmarkt.de/en/your-visit/getting-there/public-transport-in-the-city-1.2373202" };

const photo = (file: string, alt: string, year: number, width = 1600, height = 900) => ({ src: `/nuremberg-christmas-guide/${file}.webp`, alt, year, width, height });

export const nurembergGuide: StandardGuide = {
  slug: "nuremberg", city: "Nuremberg", country: "Germany", regionLabel: "Bavaria, Germany",
  title: "Christmas in Nuremberg",
  introduction: "Explore Nuremberg’s Christkindlesmarkt through my daytime and evening walks from 2022 and 2024, then use the official 2026 information to plan a visit of your own.",
  hero: photo("hero", "The Christmas market on Hauptmarkt at night, with two illuminated trees in front of the Frauenkirche, 2022", 2022, 1920, 1080),
  mobileHero: photo("hero-mobile", "The Christmas market on Hauptmarkt at night, with two illuminated trees in front of the Frauenkirche, 2022", 2022, 900, 1200),
  cardPhoto: photo("card", "Snow-covered Christmas market stalls leading towards the Frauenkirche in Nuremberg, 2022", 2022, 1280, 800),
  routeIntroduction: "This map follows the route I filmed on my 2024 daytime walk. Each stop links to the moment it appears in my walks, so you can watch it before you go. You can also show the routes of my 2024 evening walk and my 2022 walks.",
  glance: [
    { label: "The route", value: "The one I filmed in 2024" },
    { label: "Length", value: `About ${walkingDistanceKm(nurembergVisitorMap.route).toFixed(1)} km` },
    { label: "Starts at", value: "Fleischbrücke" },
  ],
  season: {
    year: 2026, checkedOn,
    dates: "27 November – 24 December 2026",
    datesLabel: "Christkindlesmarkt on Hauptmarkt",
    hours: [{ label: "Monday–Sunday", value: "10:00–21:00" }],
    source: market,
    notes: ["The city tourism page lists 22:00 as the closing time; the market’s own website gives 21:00. Check before an evening visit."],
    extras: [
      { title: "Christmas Eve", text: "24 December: 10:00–14:00.", source: tourism, checkedOn },
      { title: "Opening ceremony", text: "Friday 27 November 2026 at 17:30. The Nuremberg Christkind opens the market by reciting a prologue from the balcony of the Frauenkirche on Hauptmarkt.", source: ceremony, checkedOn },
      { title: "Sister Cities Market & regional stalls", text: "The Sister Cities Market and the Original Regional stalls close a day earlier: their last day is 23 December.", source: tourism, checkedOn },
    ],
  },
  transport: [
    { title: "U-Bahn and bus", text: "Take the U1 to Lorenzkirche, bus 36 to Hauptmarkt (right at the market), or buses 37, 46 and 47 to Heilig-Geist-Spital.", source: publicTransport, checkedOn },
    { title: "Nürnberg Card", text: "The Nürnberg Card includes free travel on public transport. The market’s website and the city tourism site describe the covered area slightly differently, so check it for your journey.", source: publicTransport, checkedOn },
  ],
  walksIntroduction: "Watch my daytime and evening walks from 2022 and 2024. Put on your headphones for the sounds of the streets and markets.",
  // Captions name the place only where it is certain from the photo itself.
  // The sign and bauble photos have no GPS; their places await Ike.
  gallery: [
    { ...photo("hauptmarkt-snow", "Snow-covered Christmas market stalls on Hauptmarkt in front of the Frauenkirche, 2022", 2022), caption: "Hauptmarkt and the Frauenkirche" },
    { ...photo("schoner-brunnen", "The Schöner Brunnen fountain beside the Christmas market, with the Frauenkirche behind, 2022", 2022), caption: "Schöner Brunnen, Hauptmarkt" },
    { ...photo("henkersteg-snow", "The covered Henkersteg bridge and stone arches over the Pegnitz after snowfall, 2022", 2022), caption: "Henkersteg over the Pegnitz" },
    { ...photo("handwerkerhof-gate", "The arched entrance to the Handwerkerhof framed by two Christmas trees covered in lights, 2024", 2024), caption: "Handwerkerhof entrance" },
    photo("christkindlesmarkt-sign", "An illuminated Christkindlesmarkt sign with an angel hanging over a shopping street at night, 2024", 2024),
    photo("painted-bauble", "A hand-painted Christmas bauble with a snowy village scene at a market stall, 2024", 2024),
  ],
  faq: [
    { question: "When is the Christkindlesmarkt open in 2026?", answer: "From 27 November to 24 December 2026, Monday to Sunday 10:00–21:00. On Christmas Eve, 24 December, it is open 10:00–14:00. The city tourism page lists 22:00 as the daily closing time, so check before an evening visit.", source: market, checkedOn },
    { question: "When is the opening ceremony?", answer: "Friday 27 November 2026 at 17:30. Each year the Nuremberg Christkind opens the market by reciting a prologue from the balcony of the Frauenkirche on Hauptmarkt.", source: ceremony, checkedOn },
    { question: "Where is the Children’s Christmas Market?", answer: "On Hans-Sachs-Platz. It is one of the stops on my map.", source: children, checkedOn },
    { question: "Are all the markets open until Christmas Eve?", answer: "No. The Sister Cities Market and the Original Regional stalls have their last day on 23 December. The main market on Hauptmarkt continues until 24 December.", source: tourism, checkedOn },
    { question: "How do I get to the market by public transport?", answer: "Take the U1 to Lorenzkirche, bus 36 to Hauptmarkt, or buses 37, 46 and 47 to Heilig-Geist-Spital. The Nürnberg Card includes free travel on public transport.", source: publicTransport, checkedOn },
  ],
  visits: {
    title: "My visits to Nuremberg at Christmas",
    text: "I filmed a daytime and an evening walk on 14 December 2022, then returned and filmed both again on 11 December 2024.",
  },
  nearby: [
    { city: "Rothenburg ob der Tauber", text: "My daytime and evening walks through Rothenburg’s Christmas market.", href: "/christmas-markets?city=Rothenburg%20ob%20der%20Tauber#browse-walks", label: "Watch the walks" },
    { city: "Munich", text: "My evening walk through Munich’s Christmas markets.", href: "/christmas-markets?city=Munich#browse-walks", label: "Watch the walk" },
    { city: "Germany", text: "Every German Christmas market I’ve filmed, from Aachen to Dresden.", href: "/christmas-markets?country=Germany", label: "Browse Germany" },
  ],
};
