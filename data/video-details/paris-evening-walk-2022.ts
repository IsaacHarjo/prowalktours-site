import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-evening-walk-2022/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

const h = (
  title: string,
  timeLabel: string,
  seconds: number,
  caption: string,
  description: string
) => ({
  title,
  timeLabel,
  seconds,
  imageSrc: highlightImageSrc("paris-evening-walk-placeholder-highlight.svg"),
  alt: `${title} during the Paris evening walk`,
  caption,
  description,
});

export const parisEveningWalk2022Detail: VideoDetailRecord = {
  slug: "paris-evening-walk-2022",
  heroEyebrow: "France Walk",
  heroTitle: "Paris, France Evening Walk (2022)",
  heroSubtitle:
    "Latin Quarter, Notre-Dame, Marais, Eiffel Tower and the Seine",
  heroDescription:
    "This long-form Paris evening walk follows a broad route through central neighborhoods and major landmarks, moving from Saint-Michel and the Latin Quarter to Notre-Dame, the Marais, Bastille, the Eiffel Tower, the Louvre, Pont Neuf, and the Panth\u00e9on before ending near Place de la Contrescarpe.",
  routeMapDescription:
    "Follow this Paris route from Place Saint-Michel into the Latin Quarter, past Notre-Dame and riverside streets, through the Marais and Bastille districts, across to the Eiffel Tower, then back toward the Louvre, Pont Neuf, and the Left Bank for a long evening circuit across central Paris.",
  licensingDescription: [
    "This Paris evening walk captures a wide range of recognizable city footage, including Left Bank streets, Notre-Dame approaches, Marais lanes, the Bastille area, Eiffel Tower views, Seine waterfront segments, and Louvre-adjacent scenes in a single long-form route.",
    "The footage is suitable for editorial, travel, documentary, educational, and destination-focused licensing where you need atmospheric Paris street coverage spanning major landmarks, neighborhood context, and evening city ambience.",
  ],
  highlights: [
    h(
      "Intro and Map",
      "0:00",
      0,
      "Intro and map",
      "The video opens with a route overview before the evening walk begins in central Paris."
    ),
    h(
      "Place Saint-Michel",
      "1:08",
      68,
      "Place Saint-Michel",
      "The walk starts in the Saint-Michel area at one of the Left Bank's most recognizable meeting points."
    ),
    h(
      "Rue de la Huchette",
      "2:12",
      132,
      "Rue de la Huchette",
      "A lively pedestrian street introduces the early Latin Quarter atmosphere."
    ),
    h(
      "Notre-Dame",
      "7:05",
      425,
      "Notre-Dame",
      "Views around Notre-Dame anchor the first major landmark section of the route."
    ),
    h(
      "Rue Saint-S\u00e9verin",
      "11:12",
      672,
      "Rue Saint-S\u00e9verin",
      "The route continues through another classic Latin Quarter street scene."
    ),
    h(
      "Rue de la Harpe",
      "17:40",
      1060,
      "Rue de la Harpe",
      "Evening foot traffic and storefronts define this stretch near Saint-Michel."
    ),
    h(
      "Cour du Commerce Saint-Andr\u00e9",
      "21:28",
      1288,
      "Cour du Commerce Saint-Andr\u00e9",
      "A more historic passage adds texture and contrast to the route."
    ),
    h(
      "Rue Gr\u00e9goire de Tours",
      "28:31",
      1711,
      "Rue Gr\u00e9goire de Tours",
      "The walk threads through another Left Bank street with a neighborhood feel."
    ),
    h(
      "Rue de Buci",
      "30:44",
      1844,
      "Rue de Buci",
      "This busy street segment brings more cafes, lights, and local activity into view."
    ),
    h(
      "Rue des Barres",
      "34:41",
      2081,
      "Rue des Barres",
      "The route shifts into a narrower historic street with a different mood."
    ),
    h(
      "Rue du Bourg Tibourg",
      "39:19",
      2359,
      "Rue du Bourg Tibourg",
      "Marais streets and denser evening pedestrian flow take over here."
    ),
    h(
      "Rue des Rosiers",
      "43:58",
      2638,
      "Rue des Rosiers",
      "A well-known Marais corridor adds another recognizable Paris neighborhood stop."
    ),
    h(
      "Rue de Rivoli",
      "50:35",
      3035,
      "Rue de Rivoli",
      "The walk expands onto one of Paris's broad landmark-lined arteries."
    ),
    h(
      "H\u00f4tel de Ville",
      "52:52",
      3172,
      "H\u00f4tel de Ville",
      "The route pauses near one of the city's most prominent civic landmarks."
    ),
    h(
      "Seine River Walk",
      "56:08",
      3368,
      "Seine River Walk",
      "A riverside segment introduces open views and a calmer pace along the Seine."
    ),
    h(
      "Place de la Bastille",
      "1:20:08",
      4808,
      "Place de la Bastille",
      "The Bastille area marks a major transition point later in the walk."
    ),
    h(
      "Rue de Lappe",
      "1:24:33",
      5073,
      "Rue de Lappe",
      "A narrower nightlife street shifts the atmosphere again."
    ),
    h(
      "Rue de Charonne",
      "1:31:10",
      5470,
      "Rue de Charonne",
      "The route keeps moving through a longer neighborhood stretch east of Bastille."
    ),
    h(
      "Eiffel Tower Tour",
      "1:34:44",
      5684,
      "Eiffel Tower tour",
      "The walk jumps to the Eiffel Tower area for a major landmark-focused segment."
    ),
    h(
      "Pont d'I\u00e9na",
      "1:44:42",
      6282,
      "Pont d'I\u00e9na",
      "Bridge views frame the Eiffel Tower approach and nearby traffic flow."
    ),
    h(
      "Eiffel Tower",
      "1:48:19",
      6499,
      "Eiffel Tower",
      "The tower becomes the central visual anchor of this part of the route."
    ),
    h(
      "Bike Ride Begins",
      "1:59:00",
      7140,
      "Bike ride begins",
      "The final stretch changes pace as the route transitions into a bike segment."
    ),
    h(
      "Louvre Museum",
      "2:07:19",
      7639,
      "Louvre Museum",
      "The route passes the Louvre during the late return across the city."
    ),
    h(
      "Pont Neuf",
      "2:12:46",
      7966,
      "Pont Neuf",
      "This bridge segment reconnects the route with the Seine and older core of Paris."
    ),
    h(
      "Place Saint-Michel",
      "2:15:14",
      8114,
      "Place Saint-Michel return",
      "The walk loops back toward Saint-Michel late in the route."
    ),
    h(
      "Panth\u00e9on",
      "2:19:11",
      8351,
      "Panth\u00e9on",
      "The final Left Bank landmarks include a pass by the Panth\u00e9on."
    ),
    h(
      "Place de la Contrescarpe",
      "2:21:25",
      8485,
      "Place de la Contrescarpe",
      "The route closes near a classic Paris square at the end of the evening circuit."
    ),
  ],
};
