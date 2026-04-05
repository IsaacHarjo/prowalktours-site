import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/dresden-christmas-market-evening-walk-2024/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const dresdenChristmasMarketEveningWalk2024Detail: VideoDetailRecord = {
  slug: "dresden-christmas-market-evening-walk-2024",
  heroEyebrow: "France Walk",
  heroTitle: "Dresden, Germany Christmas Market Evening Walk (2024)",
  heroSubtitle: "Altmarkt - STRIEZELMARKT, Romantischer Weihnachtsmarkt, Neumarkt - Advent at the Neumarkt, Frauenkirche, Br\u00fchlsche Terrasse",
  heroDescription: "Join me for a peaceful evening walking tour through Dresden's Christmas markets",
  routeMapDescription: "Follow this route through Dresden on the interactive map below.",
  licensingDescription: [
    "This Dresden evening walk captures the route in a continuous long-form format, including Altmarkt - STRIEZELMARKT, Romantischer Weihnachtsmarkt, Neumarkt - Advent at the Neumarkt, Frauenkirche, Br\u00fchlsche Terrasse, Schlo\u00dfplatz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Altmarkt - STRIEZELMARKT", timeLabel: "58", seconds: 58, imageSrc: highlightImageSrc("dresden-altmarkt-striezelmarkt.jpg"), alt: "Striezelmarkt on Altmarkt square in Dresden at night 2024 with illuminated Christmas pyramid and stalls", caption: "Striezelmarkt at Night", description: "The Striezelmarkt at night is pure magic \u2014 the Christmas pyramid glows above thousands of illuminated stalls filling Altmarkt square in golden winter light." },
    { title: "Romantischer Weihnachtsmarkt", timeLabel: "45:42", seconds: 2742, imageSrc: highlightImageSrc("dresden-romantischer-weihnachtsmarkt.jpg"), alt: "Romantischer Weihnachtsmarkt at Schlo\u00dfplatz in Dresden at night 2024 with candlelit stalls", caption: "Romantic Market at Night", description: "Candlelit and unhurried, the Romantic Christmas Market at Schlo\u00dfplatz glows softly against the Baroque facades \u2014 the most atmospheric of Dresden's evening markets." },
    { title: "Neumarkt - Advent at the Neumarkt", timeLabel: "52:55", seconds: 3175, imageSrc: highlightImageSrc("dresden-neumarkt-advent-at-the-neumarkt.jpg"), alt: "Advent market at Neumarkt in Dresden at night 2024 with illuminated Frauenkirche dome above", caption: "Neumarkt at Night", description: "The Frauenkirche dome glows above the Advent market at Neumarkt \u2014 one of the most striking night scenes in any German Christmas market city." },
    { title: "Frauenkirche", timeLabel: "1:06:41", seconds: 4001, imageSrc: highlightImageSrc("dresden-frauenkirche.jpg"), alt: "Dresden Frauenkirche illuminated at night during the 2024 Christmas market evening walk", caption: "Frauenkirche at Night", description: "Lit from below against the dark winter sky, the Frauenkirche's sandstone dome takes on an entirely different character at night \u2014 warm, immense, and deeply serene." },
    { title: "Br\u00fchlsche Terrasse", timeLabel: "1:18:11", seconds: 4691, imageSrc: highlightImageSrc("dresden-bruhlsche-terrasse.jpg"), alt: "Br\u00fchlsche Terrasse in Dresden at night 2024 with illuminated Augustus Bridge and Elbe River view", caption: "Terrace at Night", description: "The Balcony of Europe at night reveals the Elbe at its most atmospheric \u2014 the Augustus Bridge lit ahead and the Neustadt lights shimmering across the dark water." },
    { title: "Schlo\u00dfplatz", timeLabel: "1:23:58", seconds: 5038, imageSrc: highlightImageSrc("dresden-schlo-platz.jpg"), alt: "Schlo\u00dfplatz in Dresden at night 2024 with Royal Palace, Hofkirche and equestrian statue illuminated", caption: "Palace Square at Night", description: "Dresden's grandest square at night \u2014 the Royal Palace, Hofkirche, and Semperoper all illuminated, the equestrian statue of Augustus the Strong silhouetted at the center." },
    { title: "Altmarkt - STRIEZELMARKT (return)", timeLabel: "1:32:27", seconds: 5547, imageSrc: highlightImageSrc("dresden-altmarkt-striezelmarkt.jpg"), alt: "Final view of the Striezelmarkt at night in Dresden at the end of the 2024 Christmas market evening walk", caption: "Striezelmarkt Farewell", description: "The walk ends where it began \u2014 the Striezelmarkt in full evening flow, the oldest Christmas market in Europe still drawing crowds under its glowing pyramid as the night deepens." }
  ],
};
