import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/aachen-christmas-market-evening-walk-2024/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const aachenChristmasMarketEveningWalk2024Detail: VideoDetailRecord = {
  slug: "aachen-christmas-market-evening-walk-2024",
  heroEyebrow: "France Walk",
  heroTitle: "Aachen, Germany Christmas Market Evening Walk (2024)",
  heroSubtitle: "Intro and Map, Katschhof, Marktplatz am Rathaus, Karlsbrunnen Fountain, Katschhof",
  heroDescription: "This is an evening walking tour around the Christmas Markets in Aachen.",
  routeMapDescription: "Follow this route through Aachen on the interactive map below.",
  licensingDescription: [
    "This Aachen evening walk captures the route in a continuous long-form format, including Intro and Map, Katschhof, Marktplatz am Rathaus, Karlsbrunnen Fountain, Katschhof, Puppenbrunnen Fountain.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro and Map", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("aachen-intro-and-map.jpg"), alt: "Intro and Map during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Intro and Map", description: "" },
    { title: "Katschhof", timeLabel: "52", seconds: 52, imageSrc: highlightImageSrc("aachen-katschhof.jpg"), alt: "Katschhof during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Katschhof", description: "" },
    { title: "Marktplatz am Rathaus", timeLabel: "13:37", seconds: 817, imageSrc: highlightImageSrc("aachen-marktplatz-am-rathaus.jpg"), alt: "Marktplatz am Rathaus during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Marktplatz am Rathaus", description: "" },
    { title: "Karlsbrunnen Fountain", timeLabel: "23:50", seconds: 1430, imageSrc: highlightImageSrc("aachen-karlsbrunnen-fountain.jpg"), alt: "Karlsbrunnen Fountain during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Karlsbrunnen Fountain", description: "" },
    { title: "Katschhof (return)", timeLabel: "28:21", seconds: 1701, imageSrc: highlightImageSrc("aachen-katschhof.jpg"), alt: "Katschhof (return) during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Katschhof (return)", description: "" },
    { title: "Puppenbrunnen Fountain", timeLabel: "34:24", seconds: 2064, imageSrc: highlightImageSrc("aachen-puppenbrunnen-fountain.jpg"), alt: "Puppenbrunnen Fountain during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Puppenbrunnen Fountain", description: "" },
    { title: "Krämerstraße", timeLabel: "35:38", seconds: 2138, imageSrc: highlightImageSrc("aachen-kramerstra-e.jpg"), alt: "Krämerstraße during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Krämerstraße", description: "" },
    { title: "Hühnermarkt", timeLabel: "36:50", seconds: 2210, imageSrc: highlightImageSrc("aachen-huhnermarkt.jpg"), alt: "Hühnermarkt during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Hühnermarkt", description: "" },
    { title: "Hof", timeLabel: "40:40", seconds: 2440, imageSrc: highlightImageSrc("aachen-hof.jpg"), alt: "Hof during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Hof", description: "" },
    { title: "Münsterplatz", timeLabel: "44:55", seconds: 2695, imageSrc: highlightImageSrc("aachen-munsterplatz.jpg"), alt: "Münsterplatz during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Münsterplatz", description: "" },
    { title: "Spitzgässchen", timeLabel: "50:28", seconds: 3028, imageSrc: highlightImageSrc("aachen-spitzgasschen.jpg"), alt: "Spitzgässchen during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Spitzgässchen", description: "" },
    { title: "Aachen Cathedral", timeLabel: "54:46", seconds: 3286, imageSrc: highlightImageSrc("aachen-aachen-cathedral.jpg"), alt: "Aachen Cathedral during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Aachen Cathedral", description: "" },
    { title: "Schmiedstraße", timeLabel: "1:10:17", seconds: 4217, imageSrc: highlightImageSrc("aachen-schmiedstra-e.jpg"), alt: "Schmiedstraße during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Schmiedstraße", description: "" },
    { title: "Kleinmarschierstraße", timeLabel: "1:11:42", seconds: 4302, imageSrc: highlightImageSrc("aachen-kleinmarschierstra-e.jpg"), alt: "Kleinmarschierstraße during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Kleinmarschierstraße", description: "" },
    { title: "Münsterplatz (return)", timeLabel: "1:12:06", seconds: 4326, imageSrc: highlightImageSrc("aachen-munsterplatz.jpg"), alt: "Münsterplatz (return) during Aachen, Germany Christmas Market Evening Walk (2024)", caption: "Münsterplatz (return)", description: "" }
  ],
};
