import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/ribeauville-day-walk-2025/highlights";
const highlightImageSrc = (filename: string) => `${highlightImageBasePath}/${filename}`;

export const ribeauvilleDayWalk2025Detail: VideoDetailRecord = {
  slug: "ribeauville-day-walk-2025",
  heroEyebrow: "France Walk",
  heroTitle: "Ribeauvillé, France Medieval Christmas Market Walk (2025)",
  heroSubtitle: "Medieval Market at Place de la République, Viking Village at Place du Bouc, Sipp Courtyard, Place de la Sinne, Cour du Grand Bailli",
  heroDescription: "This walk explores the Ribeauvillé Medieval Christmas Market, one of the most distinctive holiday events in Alsace. The route moves through Place de la République, Place du Bouc, the Sipp Courtyard, Place de la Sinne, Cour du Grand Bailli, Salle de la Tour des Bouchers, Place de l’Hotel de Ville, Cour de la Médiathèque, Place de la 1ère Armée, and Place Gouraud. More than a standard Christmas market walk, it emphasizes the town’s medieval setting, themed stalls, and festive performances.",
  routeMapDescription: "Follow this route through Ribeauvillé on the interactive map below.",
  licensingDescription: [
    "This Ribeauvillé day walk captures the route in a continuous long-form format, including Medieval Market at Place de la République, Viking Village at Place du Bouc, Sipp Courtyard, Place de la Sinne, Cour du Grand Bailli, Salle de la Tour des Bouchers.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.",
  ],
  highlights: [
    { title: "Intro", timeLabel: "00", seconds: 0, imageSrc: highlightImageSrc("ribeauville-intro.jpg"), alt: "Intro during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Intro", description: "" },
    { title: "Medieval Market at Place de la République", timeLabel: "37", seconds: 37, imageSrc: highlightImageSrc("ribeauville-medieval-market-at-place-de-la-republique.jpg"), alt: "Medieval Market at Place de la République during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Medieval Market at Place de la République", description: "" },
    { title: "Viking Village at Place du Bouc", timeLabel: "11:09", seconds: 669, imageSrc: highlightImageSrc("ribeauville-viking-village-at-place-du-bouc.jpg"), alt: "Viking Village at Place du Bouc during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Viking Village at Place du Bouc", description: "" },
    { title: "Sipp Courtyard", timeLabel: "28:19", seconds: 1699, imageSrc: highlightImageSrc("ribeauville-sipp-courtyard.jpg"), alt: "Sipp Courtyard during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Sipp Courtyard", description: "" },
    { title: "Place de la Sinne", timeLabel: "42:38", seconds: 2558, imageSrc: highlightImageSrc("ribeauville-place-de-la-sinne.jpg"), alt: "Place de la Sinne during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Place de la Sinne", description: "" },
    { title: "Cour du Grand Bailli", timeLabel: "46:11", seconds: 2771, imageSrc: highlightImageSrc("ribeauville-cour-du-grand-bailli.jpg"), alt: "Cour du Grand Bailli during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Cour du Grand Bailli", description: "" },
    { title: "Salle de la Tour des Bouchers", timeLabel: "1:01:35", seconds: 3695, imageSrc: highlightImageSrc("ribeauville-salle-de-la-tour-des-bouchers.jpg"), alt: "Salle de la Tour des Bouchers during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Salle de la Tour des Bouchers", description: "" },
    { title: "Food and Smiles at the Apple Hut", timeLabel: "1:01:56", seconds: 3716, imageSrc: highlightImageSrc("ribeauville-food-and-smiles-at-the-apple-hut.jpg"), alt: "Food and Smiles at the Apple Hut during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Food and Smiles at the Apple Hut", description: "" },
    { title: "Place de l’Hotel de Ville", timeLabel: "1:06:02", seconds: 3962, imageSrc: highlightImageSrc("ribeauville-place-de-l-hotel-de-ville.jpg"), alt: "Place de l’Hotel de Ville during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Place de l’Hotel de Ville", description: "" },
    { title: "Cour de la Médiathèque", timeLabel: "1:33:26", seconds: 5606, imageSrc: highlightImageSrc("ribeauville-cour-de-la-mediatheque.jpg"), alt: "Cour de la Médiathèque during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Cour de la Médiathèque", description: "" },
    { title: "Place de la 1ère Armée", timeLabel: "1:42:38", seconds: 6158, imageSrc: highlightImageSrc("ribeauville-place-de-la-1ere-armee.jpg"), alt: "Place de la 1ère Armée during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Place de la 1ère Armée", description: "" },
    { title: "Place Gouraud", timeLabel: "1:50:44", seconds: 6644, imageSrc: highlightImageSrc("ribeauville-place-gouraud.jpg"), alt: "Place Gouraud during Ribeauvillé, France Medieval Christmas Market Walk (2025)", caption: "Place Gouraud", description: "" }
  ],
};
