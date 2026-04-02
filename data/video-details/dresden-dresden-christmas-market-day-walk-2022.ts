import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/dresden-dresden-christmas-market-day-walk-2022/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const dresdenDresdenChristmasMarketDayWalk2022Detail: VideoDetailRecord = {
  slug: "dresden-dresden-christmas-market-day-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Dresden, Germany Christmas Market Day Walk (2022)",
  heroSubtitle: "Intro and Map, Altmarkt - STRIEZELMARKT, Neumarkt - Advent at the Neumarkt, Frauenkirche, Brühlsche Terrasse",
  heroDescription: "This is a tour through the Christmas Markets of Dresden starting at Altmarkt Square.",
  routeMapDescription: "Follow this route through Dresden on the interactive map below.",
  licensingDescription: [
    "This Dresden day walk captures the route in a continuous long-form format, including Intro and Map, Altmarkt - STRIEZELMARKT, Neumarkt - Advent at the Neumarkt, Frauenkirche, Brühlsche Terrasse, Schloßplatz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro and Map", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("dresden-intro-and-map.jpg"), alt: "Intro and Map during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Intro and Map", description: "" },
    { title: "Altmarkt - STRIEZELMARKT", timeLabel: "35", seconds: 35, imageSrc: highlightImageSrc("dresden-altmarkt-striezelmarkt.jpg"), alt: "Altmarkt - STRIEZELMARKT during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Altmarkt - STRIEZELMARKT", description: "" },
    { title: "Neumarkt - Advent at the Neumarkt", timeLabel: "36:06", seconds: 2166, imageSrc: highlightImageSrc("dresden-neumarkt-advent-at-the-neumarkt.jpg"), alt: "Neumarkt - Advent at the Neumarkt during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Neumarkt - Advent at the Neumarkt", description: "" },
    { title: "Frauenkirche", timeLabel: "49:52", seconds: 2992, imageSrc: highlightImageSrc("dresden-frauenkirche.jpg"), alt: "Frauenkirche during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Frauenkirche", description: "" },
    { title: "Brühlsche Terrasse", timeLabel: "54:40", seconds: 3280, imageSrc: highlightImageSrc("dresden-bruhlsche-terrasse.jpg"), alt: "Brühlsche Terrasse during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Brühlsche Terrasse", description: "" },
    { title: "Schloßplatz", timeLabel: "59:51", seconds: 3591, imageSrc: highlightImageSrc("dresden-schlo-platz.jpg"), alt: "Schloßplatz during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Schloßplatz", description: "" },
    { title: "Theaterplatz", timeLabel: "1:02:34", seconds: 3754, imageSrc: highlightImageSrc("dresden-theaterplatz.jpg"), alt: "Theaterplatz during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Theaterplatz", description: "" },
    { title: "Romantischer Weihnachtsmarkt", timeLabel: "1:09:03", seconds: 4143, imageSrc: highlightImageSrc("dresden-romantischer-weihnachtsmarkt.jpg"), alt: "Romantischer Weihnachtsmarkt during Dresden, Germany Christmas Market Day Walk (2022)", caption: "Romantischer Weihnachtsmarkt", description: "" }
  ],
};
