import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/dresden-christmas-market-day-walk-2022/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const dresdenChristmasMarketDayWalk2022Detail: VideoDetailRecord = {
  slug: "dresden-christmas-market-day-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Dresden, Germany Christmas Market Day Walk (2022)",
  heroSubtitle: "Intro and Map, Altmarkt - STRIEZELMARKT, Neumarkt - Advent at the Neumarkt, Frauenkirche, Br\u00fchlsche Terrasse",
  heroDescription: "This is a tour through the Christmas Markets of Dresden starting at Altmarkt Square.",
  routeMapDescription: "Follow this route through Dresden on the interactive map below.",
  licensingDescription: [
    "This Dresden day walk captures the route in a continuous long-form format, including Intro and Map, Altmarkt - STRIEZELMARKT, Neumarkt - Advent at the Neumarkt, Frauenkirche, Br\u00fchlsche Terrasse, Schlo\u00dfplatz.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro and Map", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("dresden-intro-and-map.jpg"), alt: "Route map showing the Dresden Christmas market day walk path through the historic Altstadt", caption: "Route Overview", description: "An overview map introduces the route through Dresden's historic Christmas markets, centered on the Striezelmarkt \u2014 Europe's oldest Christmas market, held continuously since 1434." },
    { title: "Altmarkt - STRIEZELMARKT", timeLabel: "35", seconds: 35, imageSrc: highlightImageSrc("dresden-altmarkt-striezelmarkt.jpg"), alt: "Striezelmarkt on Altmarkt square in Dresden by day, Europe's oldest Christmas market with Christmas pyramid", caption: "Striezelmarkt", description: "The Striezelmarkt on Altmarkt square is where the German Christmas market tradition began in 1434 \u2014 its towering Christmas pyramid, Stollen cake stalls, and wooden folk art figures are iconic across the world." },
    { title: "Neumarkt - Advent at the Neumarkt", timeLabel: "36:06", seconds: 2166, imageSrc: highlightImageSrc("dresden-neumarkt-advent-at-the-neumarkt.jpg"), alt: "Advent at the Neumarkt Christmas market in Dresden with stalls surrounding the Frauenkirche dome", caption: "Neumarkt Advent Market", description: "The Advent market at Neumarkt square surrounds the rebuilt Frauenkirche with traditional stalls selling handcrafted ornaments, Erzgebirge wooden figures, and hot Gl\u00fchwein in the winter air." },
    { title: "Frauenkirche", timeLabel: "49:52", seconds: 2992, imageSrc: highlightImageSrc("dresden-frauenkirche.jpg"), alt: "Dresden Frauenkirche church dome rising above Neumarkt square in winter daylight", caption: "Frauenkirche", description: "Dresden's Frauenkirche \u2014 destroyed in the 1945 bombing and rebuilt stone by stone by 2005 \u2014 stands as one of Europe's most powerful symbols of reconciliation, its sandstone dome dominating Neumarkt square." },
    { title: "Br\u00fchlsche Terrasse", timeLabel: "54:40", seconds: 3280, imageSrc: highlightImageSrc("dresden-bruhlsche-terrasse.jpg"), alt: "Br\u00fchlsche Terrasse elevated promenade in Dresden overlooking the Elbe River in winter", caption: "Balcony of Europe", description: "The Br\u00fchlsche Terrasse \u2014 once called the 'Balcony of Europe' \u2014 runs along the Elbe River above the old city walls, offering sweeping views of the river and the Augustus Bridge below." },
    { title: "Schlo\u00dfplatz", timeLabel: "59:51", seconds: 3591, imageSrc: highlightImageSrc("dresden-schlo-platz.jpg"), alt: "Schlo\u00dfplatz in Dresden with Baroque royal palace and Hofkirche visible in winter daylight", caption: "Palace Square", description: "Schlo\u00dfplatz sits at the intersection of Dresden's greatest Baroque landmarks \u2014 the Royal Palace, the Hofkirche, and the Semperoper Opera House all visible from this historic square." },
    { title: "Theaterplatz", timeLabel: "1:02:34", seconds: 3754, imageSrc: highlightImageSrc("dresden-theaterplatz.jpg"), alt: "Theaterplatz in Dresden with the Semperoper opera house and equestrian statue of King Johann", caption: "Theatre Square", description: "Theaterplatz is one of Europe's finest Baroque ensembles \u2014 the Semperoper opera house and the equestrian statue of King Johann face each other across a grand square used for concerts and celebrations." },
    { title: "Romantischer Weihnachtsmarkt", timeLabel: "1:09:03", seconds: 4143, imageSrc: highlightImageSrc("dresden-romantischer-weihnachtsmarkt.jpg"), alt: "Romantischer Weihnachtsmarkt at Schlo\u00dfplatz in Dresden with candlelit stalls and baroque buildings", caption: "Romantic Market", description: "The Romantic Christmas Market at Schlo\u00dfplatz sets a more intimate scene than the Striezelmarkt \u2014 fewer stalls but a carefully curated atmosphere of candlelight, craft goods, and baroque architecture overhead." }
  ],
};
