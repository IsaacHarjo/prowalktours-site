import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/dresden-christmas-market-evening-walk-2022/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const dresdenChristmasMarketEveningWalk2022Detail: VideoDetailRecord = {
  slug: "dresden-christmas-market-evening-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Dresden, Germany Christmas Market Evening Walk (2022)",
  heroSubtitle: "Altmarket Square, Romantischer Weihnachtsmarkt, Neumarkt, Bruhl’s Terrace, Augustus Bridge",
  heroDescription: "This is an evening tour around the Christmas Market's in Dresden",
  routeMapDescription: "Follow this route through Dresden on the interactive map below.",
  licensingDescription: [
    "This Dresden evening walk captures the route in a continuous long-form format, including Altmarket Square, Romantischer Weihnachtsmarkt, Neumarkt, Bruhl’s Terrace, Augustus Bridge, Augustusmarkt.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Altmarket Square", timeLabel: "56", seconds: 56, imageSrc: highlightImageSrc("dresden-altmarket-square.jpg"), alt: "Altmarket Square during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Altmarket Square", description: "" },
    { title: "Romantischer Weihnachtsmarkt", timeLabel: "52:05", seconds: 3125, imageSrc: highlightImageSrc("dresden-romantischer-weihnachtsmarkt.jpg"), alt: "Romantischer Weihnachtsmarkt during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Romantischer Weihnachtsmarkt", description: "" },
    { title: "Neumarkt", timeLabel: "58:38", seconds: 3518, imageSrc: highlightImageSrc("dresden-neumarkt.jpg"), alt: "Neumarkt during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Neumarkt", description: "" },
    { title: "Bruhl’s Terrace", timeLabel: "1:21:15", seconds: 4875, imageSrc: highlightImageSrc("dresden-bruhl-s-terrace.jpg"), alt: "Bruhl’s Terrace during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Bruhl’s Terrace", description: "" },
    { title: "Augustus Bridge", timeLabel: "1:28:05", seconds: 5285, imageSrc: highlightImageSrc("dresden-augustus-bridge.jpg"), alt: "Augustus Bridge during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Augustus Bridge", description: "" },
    { title: "Augustusmarkt", timeLabel: "1:35:14", seconds: 5714, imageSrc: highlightImageSrc("dresden-augustusmarkt.jpg"), alt: "Augustusmarkt during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Augustusmarkt", description: "" },
    { title: "Augustus Bridge (return)", timeLabel: "1:47:24", seconds: 6444, imageSrc: highlightImageSrc("dresden-augustus-bridge.jpg"), alt: "Augustus Bridge (return) during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Augustus Bridge (return)", description: "" },
    { title: "SchloBplatz", timeLabel: "1:52:45", seconds: 6765, imageSrc: highlightImageSrc("dresden-schlobplatz.jpg"), alt: "SchloBplatz during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "SchloBplatz", description: "" },
    { title: "Altmarket Square (return)", timeLabel: "2:01:15", seconds: 7275, imageSrc: highlightImageSrc("dresden-altmarket-square.jpg"), alt: "Altmarket Square (return) during Dresden, Germany Christmas Market Evening Walk (2022)", caption: "Altmarket Square (return)", description: "" }
  ],
};
