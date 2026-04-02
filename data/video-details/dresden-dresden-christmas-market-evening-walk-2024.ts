import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/dresden-dresden-christmas-market-evening-walk-2024/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const dresdenDresdenChristmasMarketEveningWalk2024Detail: VideoDetailRecord = {
  slug: "dresden-dresden-christmas-market-evening-walk-2024",
  heroEyebrow: "France Walk",
  heroTitle: "Dresden, Germany Christmas Market Evening Walk (2024)",
  heroSubtitle: "Altmarkt - STRIEZELMARKT, Romantischer Weihnachtsmarkt, Neumarkt - Advent at the Neumarkt, Frauenkirche, Brühlsche Terrasse",
  heroDescription: "Join me for a peaceful evening walking tour through Dresden’s Christmas markets",
  routeMapDescription: "Follow this route through Dresden on the interactive map below.",
  licensingDescription: [
    "This Dresden evening walk captures the route in a continuous long-form format, including Altmarkt - STRIEZELMARKT, Romantischer Weihnachtsmarkt, Neumarkt - Advent at the Neumarkt, Frauenkirche, Brühlsche Terrasse, Schloßplatz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Altmarkt - STRIEZELMARKT", timeLabel: "58", seconds: 58, imageSrc: highlightImageSrc("dresden-altmarkt-striezelmarkt.jpg"), alt: "Altmarkt - STRIEZELMARKT during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Altmarkt - STRIEZELMARKT", description: "" },
    { title: "Romantischer Weihnachtsmarkt", timeLabel: "45:42", seconds: 2742, imageSrc: highlightImageSrc("dresden-romantischer-weihnachtsmarkt.jpg"), alt: "Romantischer Weihnachtsmarkt during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Romantischer Weihnachtsmarkt", description: "" },
    { title: "Neumarkt - Advent at the Neumarkt", timeLabel: "52:55", seconds: 3175, imageSrc: highlightImageSrc("dresden-neumarkt-advent-at-the-neumarkt.jpg"), alt: "Neumarkt - Advent at the Neumarkt during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Neumarkt - Advent at the Neumarkt", description: "" },
    { title: "Frauenkirche", timeLabel: "1:06:41", seconds: 4001, imageSrc: highlightImageSrc("dresden-frauenkirche.jpg"), alt: "Frauenkirche during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Frauenkirche", description: "" },
    { title: "Brühlsche Terrasse", timeLabel: "1:18:11", seconds: 4691, imageSrc: highlightImageSrc("dresden-bruhlsche-terrasse.jpg"), alt: "Brühlsche Terrasse during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Brühlsche Terrasse", description: "" },
    { title: "Schloßplatz", timeLabel: "1:23:58", seconds: 5038, imageSrc: highlightImageSrc("dresden-schlo-platz.jpg"), alt: "Schloßplatz during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Schloßplatz", description: "" },
    { title: "Altmarkt - STRIEZELMARKT (return)", timeLabel: "1:32:27", seconds: 5547, imageSrc: highlightImageSrc("dresden-altmarkt-striezelmarkt.jpg"), alt: "Altmarkt - STRIEZELMARKT (return) during Dresden, Germany Christmas Market Evening Walk (2024)", caption: "Altmarkt - STRIEZELMARKT (return)", description: "" }
  ],
};
