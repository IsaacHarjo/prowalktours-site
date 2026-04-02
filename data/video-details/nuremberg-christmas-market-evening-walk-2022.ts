import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/nuremberg-christmas-market-evening-walk-2022/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const nurembergChristmasMarketEveningWalk2022Detail: VideoDetailRecord = {
  slug: "nuremberg-christmas-market-evening-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Nuremberg, Germany Christmas Market Evening Walk (2022)",
  heroSubtitle: "Fleischbrücke Bridge, Hauptmarkt - Christkindlesmarkt, Schöner Brunnen, St. Sebaldus Church, Sister Cities Market - Rathausplatz",
  heroDescription: "This walking tour around the Christmas Markets of Nuremberg",
  routeMapDescription: "Follow this route through Nuremberg on the interactive map below.",
  licensingDescription: [
    "This Nuremberg evening walk captures the route in a continuous long-form format, including Fleischbrücke Bridge, Hauptmarkt - Christkindlesmarkt, Schöner Brunnen, St. Sebaldus Church, Sister Cities Market - Rathausplatz, Children’s Market - Hans-Sachs-Platz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Fleischbrücke Bridge", timeLabel: "1:06", seconds: 66, imageSrc: highlightImageSrc("nuremberg-fleischbrucke-bridge.jpg"), alt: "Fleischbrücke Bridge during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Fleischbrücke Bridge", description: "" },
    { title: "Hauptmarkt - Christkindlesmarkt", timeLabel: "3:54", seconds: 234, imageSrc: highlightImageSrc("nuremberg-hauptmarkt-christkindlesmarkt.jpg"), alt: "Hauptmarkt - Christkindlesmarkt during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Hauptmarkt - Christkindlesmarkt", description: "" },
    { title: "Schöner Brunnen", timeLabel: "23:49", seconds: 1429, imageSrc: highlightImageSrc("nuremberg-schoner-brunnen.jpg"), alt: "Schöner Brunnen during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Schöner Brunnen", description: "" },
    { title: "St. Sebaldus Church", timeLabel: "27:12", seconds: 1632, imageSrc: highlightImageSrc("nuremberg-st-sebaldus-church.jpg"), alt: "St. Sebaldus Church during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "St. Sebaldus Church", description: "" },
    { title: "Sister Cities Market - Rathausplatz", timeLabel: "28:20", seconds: 1700, imageSrc: highlightImageSrc("nuremberg-sister-cities-market-rathausplatz.jpg"), alt: "Sister Cities Market - Rathausplatz during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Sister Cities Market - Rathausplatz", description: "" },
    { title: "Children’s Market - Hans-Sachs-Platz", timeLabel: "47:00", seconds: 2820, imageSrc: highlightImageSrc("nuremberg-children-s-market-hans-sachs-platz.jpg"), alt: "Children’s Market - Hans-Sachs-Platz during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Children’s Market - Hans-Sachs-Platz", description: "" },
    { title: "Museum Bridge", timeLabel: "57:09", seconds: 3429, imageSrc: highlightImageSrc("nuremberg-museum-bridge.jpg"), alt: "Museum Bridge during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Museum Bridge", description: "" },
    { title: "Königstraße", timeLabel: "59:25", seconds: 3565, imageSrc: highlightImageSrc("nuremberg-konigstra-e.jpg"), alt: "Königstraße during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Königstraße", description: "" },
    { title: "Church of St. Lorenz (Lorenzkirche)", timeLabel: "1:00:17", seconds: 3617, imageSrc: highlightImageSrc("nuremberg-church-of-st-lorenz.jpg"), alt: "Church of St. Lorenz (Lorenzkirche) during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Church of St. Lorenz (Lorenzkirche)", description: "" },
    { title: "Craftmen’s Courtyard (Handwerkerhof)", timeLabel: "1:09:42", seconds: 4182, imageSrc: highlightImageSrc("nuremberg-craftmen-s-courtyard.jpg"), alt: "Craftmen’s Courtyard (Handwerkerhof) during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Craftmen’s Courtyard (Handwerkerhof)", description: "" },
    { title: "Karolinenstraße", timeLabel: "1:22:31", seconds: 4951, imageSrc: highlightImageSrc("nuremberg-karolinenstra-e.jpg"), alt: "Karolinenstraße during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Karolinenstraße", description: "" },
    { title: "Hefnersplatz", timeLabel: "1:27:26", seconds: 5246, imageSrc: highlightImageSrc("nuremberg-hefnersplatz.jpg"), alt: "Hefnersplatz during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Hefnersplatz", description: "" },
    { title: "Karlsbücke", timeLabel: "1:30:07", seconds: 5407, imageSrc: highlightImageSrc("nuremberg-karlsbucke.jpg"), alt: "Karlsbücke during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Karlsbücke", description: "" },
    { title: "Trödelmarkt", timeLabel: "1:31:40", seconds: 5500, imageSrc: highlightImageSrc("nuremberg-trodelmarkt.jpg"), alt: "Trödelmarkt during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Trödelmarkt", description: "" },
    { title: "Hangman's Bridge", timeLabel: "1:33:47", seconds: 5627, imageSrc: highlightImageSrc("nuremberg-hangman-s-bridge.jpg"), alt: "Hangman's Bridge during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Hangman's Bridge", description: "" },
    { title: "Maxbrücke Bridge", timeLabel: "1:36:12", seconds: 5772, imageSrc: highlightImageSrc("nuremberg-maxbrucke-bridge.jpg"), alt: "Maxbrücke Bridge during Nuremberg, Germany Christmas Market Evening Walk (2022)", caption: "Maxbrücke Bridge", description: "" }
  ],
};
