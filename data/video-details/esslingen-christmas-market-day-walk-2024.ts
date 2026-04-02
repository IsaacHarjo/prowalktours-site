import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/esslingen-christmas-market-day-walk-2024/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const esslingenChristmasMarketDayWalk2024Detail: VideoDetailRecord = {
  slug: "esslingen-christmas-market-day-walk-2024",
  heroEyebrow: "France Walk",
  heroTitle: "Esslingen, Germany Christmas Market Day Walk (2024)",
  heroSubtitle: "Intro and Map, Schelz Tower, St. Dionys Town Church (Outside), Christmas Market at Marktplatz, Children's Medieval Market",
  heroDescription: "This is a tour through the medieval Christmas Markets in Esslingen.",
  routeMapDescription: "Follow this route through Esslingen on the interactive map below.",
  licensingDescription: [
    "This Esslingen day walk captures the route in a continuous long-form format, including Intro and Map, Schelz Tower, St. Dionys Town Church (Outside), Christmas Market at Marktplatz, Children's Medieval Market, Medieval Market at Rathausplatz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro and Map", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("esslingen-intro-and-map.jpg"), alt: "Intro and Map during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Intro and Map", description: "" },
    { title: "Schelz Tower", timeLabel: "52", seconds: 52, imageSrc: highlightImageSrc("esslingen-schelz-tower.jpg"), alt: "Schelz Tower during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Schelz Tower", description: "" },
    { title: "St. Dionys Town Church (Outside)", timeLabel: "4:30", seconds: 270, imageSrc: highlightImageSrc("esslingen-st-dionys-town-church.jpg"), alt: "St. Dionys Town Church (Outside) during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "St. Dionys Town Church (Outside)", description: "" },
    { title: "Christmas Market at Marktplatz", timeLabel: "5:55", seconds: 355, imageSrc: highlightImageSrc("esslingen-christmas-market-at-marktplatz.jpg"), alt: "Christmas Market at Marktplatz during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Christmas Market at Marktplatz", description: "" },
    { title: "Children's Medieval Market", timeLabel: "26:53", seconds: 1613, imageSrc: highlightImageSrc("esslingen-children-s-medieval-market.jpg"), alt: "Children's Medieval Market during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Children's Medieval Market", description: "" },
    { title: "Medieval Market at Rathausplatz", timeLabel: "36:58", seconds: 2218, imageSrc: highlightImageSrc("esslingen-medieval-market-at-rathausplatz.jpg"), alt: "Medieval Market at Rathausplatz during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Medieval Market at Rathausplatz", description: "" },
    { title: "Medieval Market at Hafenmarkt", timeLabel: "58:03", seconds: 3483, imageSrc: highlightImageSrc("esslingen-medieval-market-at-hafenmarkt.jpg"), alt: "Medieval Market at Hafenmarkt during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Medieval Market at Hafenmarkt", description: "" },
    { title: "Street Market", timeLabel: "1:13:40", seconds: 4420, imageSrc: highlightImageSrc("esslingen-street-market.jpg"), alt: "Street Market during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Street Market", description: "" },
    { title: "Harpist Playing O Come, All Ye Faithful", timeLabel: "1:15:42", seconds: 4542, imageSrc: highlightImageSrc("esslingen-harpist-playing-o-come-all-ye-faithful.jpg"), alt: "Harpist Playing O Come, All Ye Faithful during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Harpist Playing O Come, All Ye Faithful", description: "" },
    { title: "Christmas Market at Fischbrunnenplatz", timeLabel: "1:23:02", seconds: 4982, imageSrc: highlightImageSrc("esslingen-christmas-market-at-fischbrunnenplatz.jpg"), alt: "Christmas Market at Fischbrunnenplatz during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Christmas Market at Fischbrunnenplatz", description: "" },
    { title: "Georg-Christian-von-Kessler-Platz", timeLabel: "1:27:01", seconds: 5221, imageSrc: highlightImageSrc("esslingen-georg-christian-von-kessler-platz.jpg"), alt: "Georg-Christian-von-Kessler-Platz during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "Georg-Christian-von-Kessler-Platz", description: "" },
    { title: "St. Dionys Town Church (Inside)", timeLabel: "1:28:26", seconds: 5306, imageSrc: highlightImageSrc("esslingen-st-dionys-town-church.jpg"), alt: "St. Dionys Town Church (Inside) during Esslingen, Germany Christmas Market Day Walk (2024)", caption: "St. Dionys Town Church (Inside)", description: "" }
  ],
};
