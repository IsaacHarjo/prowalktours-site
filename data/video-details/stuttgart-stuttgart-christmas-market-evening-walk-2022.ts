import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/stuttgart-stuttgart-christmas-market-evening-walk-2022/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const stuttgartStuttgartChristmasMarketEveningWalk2022Detail: VideoDetailRecord = {
  slug: "stuttgart-stuttgart-christmas-market-evening-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Stuttgart, Germany Christmas Market Evening Walk (2022)",
  heroSubtitle: "Intro and Map, Schlossplatz, Christmas Market Entrance, Schillerplatz, Old Castle",
  heroDescription: "This is an evening tour through the Christmas Markets of Stuttgart.",
  routeMapDescription: "Follow this route through Stuttgart on the interactive map below.",
  licensingDescription: [
    "This Stuttgart evening walk captures the route in a continuous long-form format, including Intro and Map, Schlossplatz, Christmas Market Entrance, Schillerplatz, Old Castle, Karlsplatz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro and Map", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("stuttgart-intro-and-map.jpg"), alt: "Intro and Map during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Intro and Map", description: "" },
    { title: "Schlossplatz", timeLabel: "52", seconds: 52, imageSrc: highlightImageSrc("stuttgart-schlossplatz.jpg"), alt: "Schlossplatz during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Schlossplatz", description: "" },
    { title: "Christmas Market Entrance", timeLabel: "14:44", seconds: 884, imageSrc: highlightImageSrc("stuttgart-christmas-market-entrance.jpg"), alt: "Christmas Market Entrance during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Christmas Market Entrance", description: "" },
    { title: "Schillerplatz", timeLabel: "16:19", seconds: 979, imageSrc: highlightImageSrc("stuttgart-schillerplatz.jpg"), alt: "Schillerplatz during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Schillerplatz", description: "" },
    { title: "Old Castle", timeLabel: "24:14", seconds: 1454, imageSrc: highlightImageSrc("stuttgart-old-castle.jpg"), alt: "Old Castle during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Old Castle", description: "" },
    { title: "Karlsplatz", timeLabel: "26:57", seconds: 1617, imageSrc: highlightImageSrc("stuttgart-karlsplatz.jpg"), alt: "Karlsplatz during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Karlsplatz", description: "" },
    { title: "Schillerplatz (return)", timeLabel: "33:15", seconds: 1995, imageSrc: highlightImageSrc("stuttgart-schillerplatz.jpg"), alt: "Schillerplatz (return) during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Schillerplatz (return)", description: "" },
    { title: "Marktplatz", timeLabel: "45:49", seconds: 2749, imageSrc: highlightImageSrc("stuttgart-marktplatz.jpg"), alt: "Marktplatz during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Marktplatz", description: "" },
    { title: "Sporerplatz", timeLabel: "48:27", seconds: 2907, imageSrc: highlightImageSrc("stuttgart-sporerplatz.jpg"), alt: "Sporerplatz during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Sporerplatz", description: "" },
    { title: "Marktplatz (return)", timeLabel: "51:38", seconds: 3098, imageSrc: highlightImageSrc("stuttgart-marktplatz.jpg"), alt: "Marktplatz (return) during Stuttgart, Germany Christmas Market Evening Walk (2022)", caption: "Marktplatz (return)", description: "" }
  ],
};
