import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/dresden-christmas-market-evening-walk-2022/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const dresdenChristmasMarketEveningWalk2022Detail: VideoDetailRecord = {
  slug: "dresden-christmas-market-evening-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Dresden, Germany Christmas Market Evening Walk (2022)",
  heroSubtitle: "Altmarket Square, Romantischer Weihnachtsmarkt, Neumarkt, Bruhl's Terrace, Augustus Bridge",
  heroDescription: "This is an evening tour around the Christmas Market's in Dresden",
  routeMapDescription: "Follow this route through Dresden on the interactive map below.",
  licensingDescription: [
    "This Dresden evening walk captures the route in a continuous long-form format, including Altmarket Square, Romantischer Weihnachtsmarkt, Neumarkt, Bruhl's Terrace, Augustus Bridge, Augustusmarkt.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Altmarket Square", timeLabel: "56", seconds: 56, imageSrc: highlightImageSrc("dresden-altmarket-square.jpg"), alt: "Altmarkt square in Dresden at night with the Striezelmarkt stalls and Christmas pyramid illuminated", caption: "Altmarkt at Night", description: "As darkness falls over the Striezelmarkt, the Altmarkt transforms \u2014 the market's thousands of lights flicker on across the square and the famous Christmas pyramid begins to glow against the winter sky." },
    { title: "Romantischer Weihnachtsmarkt", timeLabel: "52:05", seconds: 3125, imageSrc: highlightImageSrc("dresden-romantischer-weihnachtsmarkt.jpg"), alt: "Romantischer Weihnachtsmarkt in Dresden at night with candlelit stalls and Frauenkirche dome glowing behind", caption: "Romantic Market at Night", description: "The Romantic Christmas Market at night earns its name completely \u2014 candlelit stalls, the glow of the Frauenkirche dome beyond, and the smell of pine and cinnamon in the cold evening air." },
    { title: "Neumarkt", timeLabel: "58:38", seconds: 3518, imageSrc: highlightImageSrc("dresden-neumarkt.jpg"), alt: "Neumarkt square in Dresden at night with the illuminated Frauenkirche dome reflected in wet cobblestones", caption: "Neumarkt at Night", description: "Neumarkt square at night becomes one of Dresden's most photogenic scenes \u2014 the Frauenkirche dome illuminated above, its reflection caught in the market stalls and wet cobblestones of the square below." },
    { title: "Bruhl's Terrace", timeLabel: "1:21:15", seconds: 4875, imageSrc: highlightImageSrc("dresden-bruhl-s-terrace.jpg"), alt: "Br\u00fchlsche Terrasse in Dresden at night with views of the illuminated Augustus Bridge and Elbe River", caption: "Terrace at Night", description: "The Br\u00fchlsche Terrasse at night offers one of Europe's great urban views \u2014 the Elbe River dark below, the Augustus Bridge lit ahead, and the lights of the Neustadt district glimmering on the far bank." },
    { title: "Augustus Bridge", timeLabel: "1:28:05", seconds: 5285, imageSrc: highlightImageSrc("dresden-augustus-bridge.jpg"), alt: "Augustus Bridge over the Elbe River in Dresden at night with the Baroque city skyline behind", caption: "Augustus Bridge", description: "The Augustus Bridge has spanned the Elbe at Dresden since 1319 \u2014 walking across at night reveals the city's Baroque skyline in full, the silhouette of domes and towers reflected in the dark river below." },
    { title: "Augustusmarkt", timeLabel: "1:35:14", seconds: 5714, imageSrc: highlightImageSrc("dresden-augustusmarkt.jpg"), alt: "Augustusmarkt Christmas market on the Neustadt bank in Dresden at night with river views behind", caption: "Augustusmarkt", description: "The Augustusmarkt on the Neustadt bank of the Elbe offers a quieter alternative market experience \u2014 local crafts, warm drinks, and a view back across the river toward Dresden's famous silhouette." },
    { title: "Augustus Bridge (return)", timeLabel: "1:47:24", seconds: 6444, imageSrc: highlightImageSrc("dresden-augustus-bridge.jpg"), alt: "View from Augustus Bridge returning to Dresden Altstadt at night with the full Baroque skyline ahead", caption: "Bridge Return", description: "Crossing back over the Augustus Bridge toward the Altstadt, the full panorama of Dresden's Baroque skyline \u2014 the Frauenkirche, Hofkirche, and Royal Palace \u2014 stretches across the night horizon." },
    { title: "SchloBplatz", timeLabel: "1:52:45", seconds: 6765, imageSrc: highlightImageSrc("dresden-schlobplatz.jpg"), alt: "Schlo\u00dfplatz in Dresden at night with the illuminated Royal Palace, Hofkirche, and equestrian statue", caption: "Palace Square at Night", description: "Schlo\u00dfplatz at night is bathed in warm light from the Royal Palace and Hofkirche \u2014 the equestrian statue of Augustus the Strong stands silhouetted at the center of one of Germany's grandest Baroque squares." },
    { title: "Altmarket Square (return)", timeLabel: "2:01:15", seconds: 7275, imageSrc: highlightImageSrc("dresden-altmarket-square.jpg"), alt: "Final view of Altmarkt square in Dresden at night with the Striezelmarkt and Christmas pyramid glowing", caption: "Striezelmarkt Farewell", description: "The walk closes with a final pass through the Striezelmarkt as the evening winds down \u2014 the Christmas pyramid still turning slowly above the Altmarkt, its lights the last thing to fade into the Dresden night." }
  ],
};
