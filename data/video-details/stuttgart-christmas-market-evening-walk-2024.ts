import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/stuttgart-christmas-market-evening-walk-2024/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const stuttgartChristmasMarketEveningWalk2024Detail: VideoDetailRecord = {
  slug: "stuttgart-christmas-market-evening-walk-2024",
  heroEyebrow: "France Walk",
  heroTitle: "Stuttgart, Germany Christmas Market Evening Walk (2024)",
  heroSubtitle: "Schlossplatz, King Street Market (Königstraße), Kids Train, Tower View, Christmas Market at Schillerplatz",
  heroDescription: "Join us for an immersive tour that captures all the beautiful sights and festive sounds of the market under the glow of thousands of Christmas lights. Filmed in stunning 4K HDR",
  routeMapDescription: "Follow this route through Stuttgart on the interactive map below.",
  licensingDescription: [
    "This Stuttgart evening walk captures the route in a continuous long-form format, including Schlossplatz, King Street Market (Königstraße), Kids Train, Tower View, Christmas Market at Schillerplatz, Old Castle and Tree.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Schlossplatz", timeLabel: "52", seconds: 52, imageSrc: highlightImageSrc("stuttgart-schlossplatz.jpg"), alt: "Schlossplatz during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Schlossplatz", description: "" },
    { title: "King Street Market (Königstraße)", timeLabel: "5:28", seconds: 328, imageSrc: highlightImageSrc("stuttgart-king-street-market.jpg"), alt: "King Street Market (Königstraße) during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "King Street Market (Königstraße)", description: "" },
    { title: "Kids Train", timeLabel: "14:15", seconds: 855, imageSrc: highlightImageSrc("stuttgart-kids-train.jpg"), alt: "Kids Train during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Kids Train", description: "" },
    { title: "Tower View", timeLabel: "17:56", seconds: 1076, imageSrc: highlightImageSrc("stuttgart-tower-view.jpg"), alt: "Tower View during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Tower View", description: "" },
    { title: "Christmas Market at Schillerplatz", timeLabel: "24:52", seconds: 1492, imageSrc: highlightImageSrc("stuttgart-christmas-market-at-schillerplatz.jpg"), alt: "Christmas Market at Schillerplatz during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Christmas Market at Schillerplatz", description: "" },
    { title: "Old Castle and Tree", timeLabel: "39:40", seconds: 2380, imageSrc: highlightImageSrc("stuttgart-old-castle-and-tree.jpg"), alt: "Old Castle and Tree during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Old Castle and Tree", description: "" },
    { title: "Christmas Market at Karlsplatz", timeLabel: "42:27", seconds: 2547, imageSrc: highlightImageSrc("stuttgart-christmas-market-at-karlsplatz.jpg"), alt: "Christmas Market at Karlsplatz during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Christmas Market at Karlsplatz", description: "" },
    { title: "Christmas Market at Schillerplatz (return)", timeLabel: "50:01", seconds: 3001, imageSrc: highlightImageSrc("stuttgart-christmas-market-at-schillerplatz.jpg"), alt: "Christmas Market at Schillerplatz (return) during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Christmas Market at Schillerplatz (return)", description: "" },
    { title: "Best View of Christmas Pyramid", timeLabel: "59:41", seconds: 3581, imageSrc: highlightImageSrc("stuttgart-best-view-of-christmas-pyramid.jpg"), alt: "Best View of Christmas Pyramid during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Best View of Christmas Pyramid", description: "" },
    { title: "Christmas Market at Marktplatz", timeLabel: "1:04:52", seconds: 3892, imageSrc: highlightImageSrc("stuttgart-christmas-market-at-marktplatz.jpg"), alt: "Christmas Market at Marktplatz during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Christmas Market at Marktplatz", description: "" },
    { title: "Animal Stable at Sporerplatz", timeLabel: "1:16:44", seconds: 4604, imageSrc: highlightImageSrc("stuttgart-animal-stable-at-sporerplatz.jpg"), alt: "Animal Stable at Sporerplatz during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Animal Stable at Sporerplatz", description: "" },
    { title: "Christmas Market at Marktplatz (return)", timeLabel: "1:20:13", seconds: 4813, imageSrc: highlightImageSrc("stuttgart-christmas-market-at-marktplatz.jpg"), alt: "Christmas Market at Marktplatz (return) during Stuttgart, Germany Christmas Market Evening Walk (2024)", caption: "Christmas Market at Marktplatz (return)", description: "" }
  ],
};
