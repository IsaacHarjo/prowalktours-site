import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/antibes-daytime-walk-2025/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

const h = (
  title: string,
  timeLabel: string,
  seconds: number,
  filename: string,
  caption: string,
  description: string
) => ({
  title,
  timeLabel,
  seconds,
  imageSrc: highlightImageSrc(filename),
  alt: `${title} in Antibes, France`,
  caption,
  description,
});

export const antibesDaytimeWalk2025Detail: VideoDetailRecord = {
  slug: "antibes-daytime-walk-2025",
  heroEyebrow: "France Walk",
  heroTitle: "Antibes, France Walking Tour",
  heroSubtitle: "Old Town, Picasso Museum, Market and Seafront",
  heroDescription:
    "Explore Antibes, France in this 4K daytime walking tour through the historic Old Town, waterfront promenades, local market streets, marina, beaches, and public squares. This walk passes the Picasso Museum, Antibes Cathedral, le Marche provencal, Place Nationale, Plage de la Gravette, the marina, Le Nomade sculpture, Boulevard d'Aguillon, and more scenic corners of Antibes.",
  routeMapDescription:
    "Follow this Antibes walking route from the seafront promenade into Old Town lanes, around Musee Picasso and Antibes Cathedral, through le Marche provencal and Place Nationale, down to Plage de la Gravette, the marina, Le Nomade, and more scenic corners of the French Riviera waterfront.",
  licensingDescription: [
    "This Antibes daytime walk covers the historic Old Town, Picasso Museum area, market streets, cathedral, marina, beaches, and waterfront promenades in a long-form format suited to editorial and destination storytelling.",
    "The footage is well suited for travel, documentary, educational, editorial, and tourism-focused licensing when you need detailed street-level coverage of Antibes, its public squares, seafront, and landmark-rich Riviera atmosphere.",
  ],
  highlights: [
    h("Intro & Map", "0:00", 0, "antibes-intro-map0.jpg", "Intro and map", "The walk opens with a route overview of Antibes."),
    h("Promenade Amiral de Grasse", "0:53", 53, "antibes-promenade-amiral-de-grasse-scenic-promenade0.jpg", "Promenade Amiral de Grasse", "Opening seafront views along one of Antibes' scenic promenades."),
    h("Musee Picasso", "12:59", 779, "antibes-musee-picasso-museum0.jpg", "Musee Picasso", "The route reaches the Picasso Museum area above the coast."),
    h("Antibes Cathedral", "19:52", 1192, "antibes-cathedrale-notre-dame-de-l-immaculee-conception0.jpg", "Antibes Cathedral", "Historic church architecture anchors this Old Town section."),
    h("le Marche provencal Outdoor Market", "23:20", 1400, "antibes-le-marche-provencal-outdoor-market0.jpg", "le Marche provencal", "A lively market sequence filled with local color and movement."),
    h("Rue Georges Clemenceau", "37:19", 2239, "antibes-rue-georges-clemenceau-street0.jpg", "Rue Georges Clemenceau", "The route continues through one of Antibes' central streets."),
    h("Place Nationale", "39:44", 2384, "antibes-place-nationale-town-square0.jpg", "Place Nationale", "A key public square in the middle of Old Town activity."),
    h("Rue Sade", "43:25", 2605, "antibes-rue-sade-street0.jpg", "Rue Sade", "A quieter street segment framed by shops and facades."),
    h("Hat Store - Acte II", "43:53", 2633, "antibes-acte-ii-hat-store0.jpg", "Acte II", "A storefront detail highlight in the commercial core."),
    h("Cheese Shop - Fromagerie de l'Etable", "47:08", 2828, "antibes-fromagerie-de-l-etable-cheese-shop0.jpg", "Fromagerie de l'Etable", "A market-area specialty shop appears along the route."),
    h("le Marche provencal Outdoor Market", "48:51", 2931, "antibes-le-marche-provencal-outdoor-market-20.jpg", "le Marche provencal again", "A second pass through the market captures more vendor activity."),
    h("Place du Barri", "50:47", 3047, "antibes-place-du-barri-square0.jpg", "Place du Barri", "A smaller square opens up just beyond the market lanes."),
    h("Promenade Amiral de Grasse", "51:24", 3084, "antibes-promenade-amiral-de-grasse-scenic-promenade-20.jpg", "Promenade return", "The walk returns to the promenade for more coastal views."),
    h("Plage de la Gravette Beach", "1:01:03", 3663, "antibes-plage-de-la-gravette-beach0.jpg", "Plage de la Gravette", "This beach segment adds a bright Riviera waterfront break."),
    h("Marina", "1:11:30", 4290, "antibes-marina-harbor0.jpg", "Marina", "The route opens into a broad marina and harbor scene."),
    h("Le Nomade Sculpture", "1:14:33", 4473, "antibes-le-nomade-sculpture0.jpg", "Le Nomade", "One of the walk's signature waterfront landmarks comes into view."),
    h("Phare de l'Echauguette Lighthouse", "1:19:47", 4787, "antibes-phare-de-l-echauguette-lighthouse0.jpg", "Phare de l'Echauguette", "The harbor edge leads toward this coastal lighthouse stop."),
    h("Boulevard d'Aguillon", "1:23:40", 5020, "antibes-boulevard-d-aguillon-street0.jpg", "Boulevard d'Aguillon", "A broad waterfront-side boulevard carries the route onward."),
    h("Esplanade du Pre des Pecheurs", "1:26:16", 5176, "antibes-esplanade-du-pre-des-pecheurs-waterfront0.jpg", "Esplanade du Pre des Pecheurs", "A more open public waterfront space appears near the harbor."),
    h("Jardin d'Eden ou paradis", "1:31:23", 5483, "antibes-jardin-d-eden-ou-paradis-garden0.jpg", "Jardin d'Eden", "A garden stop adds a calmer interlude to the route."),
    h("Traverse Lacan", "1:32:01", 5521, "antibes-traverse-lacan-passage0.jpg", "Traverse Lacan", "A passageway sequence connects different layers of Old Town."),
    h("Place des Martyrs de la Resistance", "1:34:27", 5667, "antibes-place-des-martyrs-de-la-resistance-square0.jpg", "Place des Martyrs de la Resistance", "Another central square marks the later portion of the walk."),
    h("Rue de la Republique", "1:36:41", 5801, "antibes-rue-de-la-republique-street0.jpg", "Rue de la Republique", "The route enters a busy shopping street in the center."),
    h("Rue Fourmilliere", "1:40:16", 6016, "antibes-rue-fourmilliere-street0.jpg", "Rue Fourmilliere", "Pedestrian street life continues through another retail corridor."),
    h("La Tarte Tropezienne Pastry Shop", "1:43:02", 6182, "antibes-la-tarte-tropezienne-pastry-shop0.jpg", "La Tarte Tropezienne", "A pastry shop highlight adds another food-focused stop."),
    h("Rue de la Republique", "1:44:00", 6240, "antibes-rue-de-la-republique-street-20.jpg", "Rue de la Republique again", "A second look at this central shopping street follows."),
    h("Rue James Close", "1:47:05", 6425, "antibes-rue-james-close-street0.jpg", "Rue James Close", "The walk shifts into another lane in the Old Town grid."),
    h("Place Nationale", "1:54:10", 6850, "antibes-place-nationale-town-square-20.jpg", "Place Nationale return", "The route loops back through Place Nationale later in the walk."),
    h("Rue Thuret", "1:57:59", 7079, "antibes-rue-thuret-street0.jpg", "Rue Thuret", "A quieter street sequence leads away from the square."),
    h("Boulevard d'Aguillon", "2:01:31", 7291, "antibes-boulevard-d-aguillon-street-20.jpg", "Boulevard d'Aguillon return", "The route returns to Boulevard d'Aguillon near the waterfront."),
    h("Place Jacques Audiberti", "2:04:18", 7458, "antibes-place-jacques-audiberti-square0.jpg", "Place Jacques Audiberti", "A public square closes out the final district crossings."),
    h("le Marche provencal (Empty)", "2:07:36", 7656, "antibes-le-marche-provencal-empty-market0.jpg", "Empty market", "The market returns in a calmer moment late in the walk."),
    h("Place Mariejol", "2:08:36", 7716, "antibes-place-mariejol-square0.jpg", "Place Mariejol", "A final square appears before the closing promenade stretch."),
    h("Promenade Amiral de Grasse", "2:09:30", 7770, "antibes-promenade-amiral-de-grasse-scenic-promenade-30.jpg", "Promenade close", "The route returns once more to the seafront promenade."),
    h("Camera Equipment", "2:15:28", 8128, "antibes-camera-products0.jpg", "Camera equipment", "The walk closes with a brief equipment shot at the end."),
  ],
};

