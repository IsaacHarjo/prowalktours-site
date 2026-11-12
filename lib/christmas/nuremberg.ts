import type { StandardGuide } from "../guides/standard-guide";
import { walkingDistanceKm } from "../guides/visitor-map-types";
import { nurembergVisitorMap } from "./nuremberg-visitor-map";

// Pilot for the standard guide. Dates, hours and transport were checked on the
// official pages (christkindlesmarkt.de, tourismus.nuernberg.de and the city's
// 2026 information sheet). The personal take and the Q&A marked "mine" are
// Ike's own words, supplied 12 November 2026; only typos may be corrected.
// Photos are Ike's own, from his 2022 and 2024 visits.
const checkedOn = "2026-11-11";
const checkedToday = "2026-11-12";
const citySheet = { label: "City of Nuremberg 2026 information sheet (PDF)", href: "https://www.nuernberg.de/imperia/md/kommunikation_stadtmarketing/dokumente/internet/ckm/ckm_26_information_en.pdf" };
const christkindPage = { label: "The Nuremberg Christkind", href: "https://www.christkindlesmarkt.de/en/christkind" };
const christkindVisits = { label: "The Christkind at the Children’s Christmas Market", href: "https://www.christkindlesmarkt.de/en/for-children/children-s-christmas-market-kinderweihnacht-1.2373258" };
const christkindVisitsDe = { label: "Das Christkind auf der Kinderweihnacht (German)", href: "https://www.christkindlesmarkt.de/fuer-kinder/kinderweihnacht/das-christkind-auf-der-kinderweihnacht-1.8337339" };
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
  personalTake: {
    title: "Why I love Nuremberg at Christmas",
    paragraphs: [
      "What I love about Nuremberg is the close, community feel between all the different markets and the people there. The main market sits in front of the church on Hauptmarkt, another church nearby has a market around it, and the river and its bridges run through the middle with more stalls around them. Everywhere you look there’s beautiful scenery.",
      "The atmosphere is one of the best I’ve found, and that comes from the historic center. You can spend all your time in it and it has everything a Christmas market should have. If you feel like exploring further, down the more modern streets to the other markets, you can. But you don’t have to.",
    ],
  },
  routeIntroduction: "I arrived by train both times, and one full day was enough for me to walk the market by day and again in the evening. This map follows the route I filmed on my 2024 daytime walk. Each stop links to the moment it appears in my walks, so you can watch it before you go. You can also show the routes of my 2024 evening walk and my 2022 walks.",
  glance: [
    { label: "The route", value: "The one I filmed in 2024" },
    { label: "Length", value: `About ${walkingDistanceKm(nurembergVisitorMap.route).toFixed(1)} km` },
    { label: "Starts at", value: "Fleischbrücke" },
  ],
  season: {
    year: 2026, checkedOn: checkedToday,
    dates: "27 November – 24 December 2026",
    datesLabel: "Christkindlesmarkt on Hauptmarkt",
    // The city's 2026 information sheet gives the full hours: 22:00 on the
    // opening day only, which explains the tourism page's 22:00.
    hours: [
      { label: "Opening day, 27 November", value: "10:00–22:00" },
      { label: "28 November – 23 December", value: "10:00–21:00" },
    ],
    source: citySheet,
    extras: [
      { title: "Christmas Eve", text: "24 December: 10:00–14:00.", source: citySheet, checkedOn: checkedToday },
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
  // Questions that only repeated the dates and transport blocks were removed.
  faq: [
    { kind: "mine", question: "How long should I allow, and is day or evening better?",
      answer: "One night is about right. I arrived the evening before, spent the full day there and left the next morning. You don’t need two nights. You could arrive in the morning, spend the whole day and leave that night, or arrive around noon, drop your bags at the hotel and stay through the evening before leaving the next morning.\n\nI like to see the market both by day and after dark. During the day you can see much more of the surrounding buildings and architecture. In the evening the lights come on at all the markets and the atmosphere gets better. It also gets more crowded, but it’s prettier." },
    { kind: "mine", question: "If I’m short on time, what should I skip?",
      answer: "Focus on Hauptmarkt. The Pegnitz River splits the Old Town in two, and the main Christmas markets are all around the main square on the north side. If you only have a couple of hours, spend them there.\n\nThe Handwerkerhof, by the train station, doesn’t need a place in your main visit. It’s a cute area, but it’s small, and if you arrive by train you’ll walk past it on your way into town and again on your way out. A quick look costs you nothing, so see it then.\n\nThe same goes for the area south of the river. You can walk down Karolinenstraße to Ludwigsplatz and Jakobsplatz, where you’ll find more stalls, the Ehekarussell fountain, the Weißer Turm and more of the city’s architecture. It’s all worth seeing, but the heart of the market is Hauptmarkt." },
    { kind: "mine", question: "What should I eat and drink?",
      answer: "I don’t have one item to recommend. Explore the food stands and try the local gingerbread, the bratwursts and the sweets. Every stand has something different, and it’s fun to try something new. Make trying the food a big part of your visit." },
    { kind: "mine", question: "Is it good for families?",
      answer: "Yes. Nuremberg has a large Children’s Christmas Market, and the Christkind, the market’s Christmas angel, is a big part of the season here.",
      official: {
        label: "From the official Christkindlesmarkt website",
        text: "The Nuremberg Christkind is elected every two years and opens the market each year with a prologue. From 1 December 2026, she visits the Children’s Christmas Market (Kinderweihnacht) on Hans-Sachs-Platz every Tuesday to Friday at 14:30. She invites children to ride the merry-go-round for free, and they can talk to her and hand in their wish lists. The German page adds that she then visits the main Christkindlesmarkt at about 15:00.",
        sources: [christkindPage, christkindVisits, christkindVisitsDe],
        checkedOn: checkedToday,
      } },
    { kind: "mine", question: "Cash or card?", answer: "Most places take both cash and card, in euros." },
    { kind: "official", question: "Where is the Children’s Christmas Market?", answer: "On Hans-Sachs-Platz.", source: children, checkedOn },
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
