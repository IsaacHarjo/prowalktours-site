import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/montmartre-evening-walk-2022/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

export const montmartreEveningWalk2022Detail: VideoDetailRecord = {
  slug: "montmartre-evening-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Montmartre, France Evening Walk (2022)",
  heroSubtitle:
    "Place du Tertre, Sacr\u00e9-C\u0153ur, Square Louise Michel, Place des Abbesses, and Rue Lepic at dusk",
  heroDescription:
    "This evening walk through Montmartre begins on Rue Norvins and moves through the artists\u2019 square at Place du Tertre before reaching the Sacr\u00e9-C\u0153ur basilica and its panoramic views over Paris. The route descends through Square Louise Michel and Place Saint-Pierre, continues past Place des Abbesses and down Rue Lepic, and ends near Place Blanche in the Moulin Rouge area.",
  routeMapDescription:
    "Follow this Montmartre evening route from Rue Norvins through Place du Tertre and Sacr\u00e9-C\u0153ur, down through Square Louise Michel and Place Saint-Pierre, past Place des Abbesses and Rue Lepic, to Place Blanche.",
  licensingDescription: [
    "This Montmartre evening walk captures the hilltop village atmosphere, Sacr\u00e9-C\u0153ur basilica, artist squares, and descending streets of Montmartre in a continuous long-form format filmed in July 2022, including Place du Tertre, panoramic city views, and the lively lower streets.",
    "The footage is suitable for editorial, documentary, travel, and atmospheric licensing when you need extended coverage of Montmartre at dusk, including Sacr\u00e9-C\u0153ur, Place du Tertre, Place des Abbesses, Rue Lepic, and Place Blanche.",
  ],
  highlights: [
    {
      title: "Intro and Map",
      timeLabel: "0:00",
      seconds: 0,
      imageSrc: highlightImageSrc("montmartre-intro-and-map.jpg"),
      alt: "Intro and Map for the Montmartre evening walk",
      caption: "Intro and Map",
      description: "The walk opens with a route overview before heading into Montmartre.",
    },
    {
      title: "Rue Norvins",
      timeLabel: "1:42",
      seconds: 102,
      imageSrc: highlightImageSrc("montmartre-rue-norvins.jpg"),
      alt: "Rue Norvins in Montmartre, Paris",
      caption: "Rue Norvins",
      description: "One of Montmartre\u2019s most recognizable old streets sets the tone for the walk.",
    },
    {
      title: "Place du Tertre",
      timeLabel: "2:55",
      seconds: 175,
      imageSrc: highlightImageSrc("montmartre-place-du-tertre.jpg"),
      alt: "Place du Tertre in Montmartre, Paris",
      caption: "Place du Tertre",
      description: "The famous artists\u2019 square with painters, portrait artists, and restaurant terraces.",
    },
    {
      title: "En Haut des Escaliers",
      timeLabel: "9:06",
      seconds: 546,
      imageSrc: highlightImageSrc("montmartre-en-haut-des-escaliers.jpg"),
      alt: "En Haut des Escaliers in Montmartre, Paris",
      caption: "En Haut des Escaliers",
      description: "The top of the Montmartre stairways with views opening up over Paris.",
    },
    {
      title: "Place Jean Marais",
      timeLabel: "11:46",
      seconds: 706,
      imageSrc: highlightImageSrc("montmartre-place-jean-marais.jpg"),
      alt: "Place Jean Marais in Montmartre, Paris",
      caption: "Place Jean Marais",
      description: "A small square near Sacr\u00e9-C\u0153ur named after the French actor.",
    },
    {
      title: "Sacr\u00e9-C\u0153ur",
      timeLabel: "14:39",
      seconds: 879,
      imageSrc: highlightImageSrc("montmartre-sacre-c-ur.jpg"),
      alt: "Sacr\u00e9-C\u0153ur basilica in Montmartre, Paris",
      caption: "Sacr\u00e9-C\u0153ur",
      description: "The white-domed basilica at the summit of Montmartre with sweeping views over Paris.",
    },
    {
      title: "Square Louise Michel",
      timeLabel: "25:18",
      seconds: 1518,
      imageSrc: highlightImageSrc("montmartre-square-louise-michel.jpg"),
      alt: "Square Louise Michel in Montmartre, Paris",
      caption: "Square Louise Michel",
      description: "The terraced park cascading down from Sacr\u00e9-C\u0153ur toward the lower streets.",
    },
    {
      title: "Place Saint-Pierre",
      timeLabel: "29:59",
      seconds: 1799,
      imageSrc: highlightImageSrc("montmartre-place-saint-pierre.jpg"),
      alt: "Place Saint-Pierre in Montmartre, Paris",
      caption: "Place Saint-Pierre",
      description: "The square at the base of the Sacr\u00e9-C\u0153ur steps, a busy meeting point.",
    },
    {
      title: "Rue Yvonne le Tac",
      timeLabel: "33:43",
      seconds: 2023,
      imageSrc: highlightImageSrc("montmartre-rue-yvonne-le-tac.jpg"),
      alt: "Rue Yvonne le Tac in Montmartre, Paris",
      caption: "Rue Yvonne le Tac",
      description: "A quieter side street connecting the upper and lower parts of Montmartre.",
    },
    {
      title: "Place des Abbesses",
      timeLabel: "36:05",
      seconds: 2165,
      imageSrc: highlightImageSrc("montmartre-place-des-abbesses.jpg"),
      alt: "Place des Abbesses in Montmartre, Paris",
      caption: "Place des Abbesses",
      description: "One of Montmartre\u2019s liveliest squares with its Art Nouveau metro entrance and caf\u00e9 terraces.",
    },
    {
      title: "Rue Lepic",
      timeLabel: "47:11",
      seconds: 2831,
      imageSrc: highlightImageSrc("montmartre-rue-lepic.jpg"),
      alt: "Rue Lepic in Montmartre, Paris",
      caption: "Rue Lepic",
      description: "The winding street descending from upper Montmartre, lined with shops and restaurants.",
    },
    {
      title: "Place Blanche",
      timeLabel: "51:51",
      seconds: 3111,
      imageSrc: highlightImageSrc("montmartre-place-blanche.jpg"),
      alt: "Place Blanche in Montmartre, Paris",
      caption: "Place Blanche",
      description: "The walk ends near the Moulin Rouge area at the foot of Montmartre.",
    },
  ],
};
