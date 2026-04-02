import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/cologne-christmas-market-evening-walk-2023/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const cologneChristmasMarketEveningWalk2023Detail: VideoDetailRecord = {
  slug: "cologne-christmas-market-evening-walk-2023",
  heroEyebrow: "France Walk",
  heroTitle: "Cologne, Germany Christmas Market Evening Walk (2023)",
  heroSubtitle: "Intro and Map, Cologne Cathedral, Cathedral Christmas Market, Heinzelmännchen Fountain, Heinzels Winter Fairytale (Alter Markt)",
  heroDescription: "This is an evening walk through the Christmas markets in Cologne.",
  routeMapDescription: "Follow this route through Cologne on the interactive map below.",
  licensingDescription: [
    "This Cologne evening walk captures the route in a continuous long-form format, including Intro and Map, Cologne Cathedral, Cathedral Christmas Market, Heinzelmännchen Fountain, Heinzels Winter Fairytale (Alter Markt), Heinzels Winter Fairytale (Heumarkt).",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro and Map", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("cologne-intro-and-map.jpg"), alt: "Intro and Map during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Intro and Map", description: "" },
    { title: "Cologne Cathedral", timeLabel: "52", seconds: 52, imageSrc: highlightImageSrc("cologne-cathedral.jpg"), alt: "Cologne Cathedral during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Cologne Cathedral", description: "" },
    { title: "Cathedral Christmas Market", timeLabel: "14:31", seconds: 871, imageSrc: highlightImageSrc("cologne-cathedral-christmas-market.jpg"), alt: "Cathedral Christmas Market during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Cathedral Christmas Market", description: "" },
    { title: "Heinzelmännchen Fountain", timeLabel: "25:48", seconds: 1548, imageSrc: highlightImageSrc("cologne-heinzelmannchen-fountain.jpg"), alt: "Heinzelmännchen Fountain during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Heinzelmännchen Fountain", description: "" },
    { title: "Heinzels Winter Fairytale (Alter Markt)", timeLabel: "32:54", seconds: 1974, imageSrc: highlightImageSrc("cologne-heinzels-winter-fairytale.jpg"), alt: "Heinzels Winter Fairytale (Alter Markt) during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Heinzels Winter Fairytale (Alter Markt)", description: "" },
    { title: "Heinzels Winter Fairytale (Heumarkt)", timeLabel: "49:43", seconds: 2983, imageSrc: highlightImageSrc("cologne-heinzels-winter-fairytale.jpg"), alt: "Heinzels Winter Fairytale (Heumarkt) during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Heinzels Winter Fairytale (Heumarkt)", description: "" },
    { title: "Schildergasse", timeLabel: "1:06:50", seconds: 4010, imageSrc: highlightImageSrc("cologne-schildergasse.jpg"), alt: "Schildergasse during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Schildergasse", description: "" },
    { title: "Antoniterkirche", timeLabel: "1:09:44", seconds: 4184, imageSrc: highlightImageSrc("cologne-antoniterkirche.jpg"), alt: "Antoniterkirche during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Antoniterkirche", description: "" },
    { title: "Markt der Engel (The Angel Market)", timeLabel: "1:15:39", seconds: 4539, imageSrc: highlightImageSrc("cologne-markt-der-engel.jpg"), alt: "Markt der Engel (The Angel Market) during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Markt der Engel (The Angel Market)", description: "" },
    { title: "Church of St. Aposteln", timeLabel: "1:31:22", seconds: 5482, imageSrc: highlightImageSrc("cologne-church-of-st-aposteln.jpg"), alt: "Church of St. Aposteln during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Church of St. Aposteln", description: "" },
    { title: "Cologne’s Nikolausdorf (the Nicholas Village)", timeLabel: "1:37:05", seconds: 5825, imageSrc: highlightImageSrc("cologne-s-nikolausdorf.jpg"), alt: "Cologne’s Nikolausdorf (the Nicholas Village) during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Cologne’s Nikolausdorf (the Nicholas Village)", description: "" },
    { title: "Neumarkt", timeLabel: "1:49:52", seconds: 6592, imageSrc: highlightImageSrc("cologne-neumarkt.jpg"), alt: "Neumarkt during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Neumarkt", description: "" },
    { title: "Schildergasse (return)", timeLabel: "1:52:54", seconds: 6774, imageSrc: highlightImageSrc("cologne-schildergasse.jpg"), alt: "Schildergasse (return) during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Schildergasse (return)", description: "" },
    { title: "Hohe Straße", timeLabel: "1:59:34", seconds: 7174, imageSrc: highlightImageSrc("cologne-hohe-stra-e.jpg"), alt: "Hohe Straße during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Hohe Straße", description: "" },
    { title: "Wallrafplatz", timeLabel: "2:04:18", seconds: 7458, imageSrc: highlightImageSrc("cologne-wallrafplatz.jpg"), alt: "Wallrafplatz during Cologne, Germany Christmas Market Evening Walk (2023)", caption: "Wallrafplatz", description: "" }
  ],
};
