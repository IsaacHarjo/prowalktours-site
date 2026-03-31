import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-latin-quarter-marais-evening-walk-2020/highlights";

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
  imageSrc: highlightImageSrc("paris-latin-quarter-placeholder.jpg"),
  alt: `${title} during the Paris Latin Quarter & Marais Evening Walk`,
  caption,
  description,
});

export const parisLatinQuarterMaraisEveningWalk2020Detail: VideoDetailRecord = {
  slug: "paris-latin-quarter-marais-evening-walk-2020",
  heroEyebrow: "France Tour",
  heroTitle: "Paris Latin Quarter & Marais Evening Walk",
  heroSubtitle:
    "Historic streets after dark through the Latin Quarter and Marais, with a night bike ride through Bastille, Hôtel de Ville, and the Louvre",
  heroDescription:
    "This evening walk through Paris focuses on some of the city\u2019s most beautiful streets and neighborhoods after dark. Starting at Place Saint-Michel, the route moves through the narrow medieval lanes of the Latin Quarter \u2014 Rue de la Huchette, Rue Saint-S\u00E9verin, Rue de la Harpe \u2014 before passing through the historic Cour du Commerce Saint-Andr\u00E9 and into the Marais. The walk continues along Rue des Barres, Rue des Rosiers, and Rue de Rivoli before expanding into the Bastille nightlife streets. The final stretch transitions to a night bike ride past the Courtyard of H\u00F4tel de Ville, the Louvre Pyramid, and the Seine.",
  routeMapDescription:
    "This route traces the evening walk through the Latin Quarter and Marais, starting at Place Saint-Michel and winding through Rue de la Huchette, Rue Saint-S\u00E9verin, and Rue de la Harpe before passing through the Cour du Commerce Saint-Andr\u00E9 and into the Marais along Rue des Barres and Rue des Rosiers. The route continues to the Bastille nightlife streets before transitioning to a night bike ride past H\u00F4tel de Ville, the Louvre Pyramid, and the Seine.",
  licensingDescription: [
    "This Paris evening walk captures the Latin Quarter, Marais, and Bastille neighborhoods in a continuous long-form format filmed after dark in July 2020, including narrow historic streets, lively nightlife areas, and iconic Paris landmarks at night.",
    "The footage is suitable for editorial, documentary, travel, and atmospheric licensing when you need extended coverage of Paris streets at night, including Place Saint-Michel, Rue des Rosiers, H\u00F4tel de Ville, the Louvre Pyramid, and the Seine.",
  ],
  highlights: [
    h(
      "Intro and Map",
      "0:00",
      0,
      "Intro and Map",
      "The walk opens with an overview map of the evening route through Paris."
    ),
    h(
      "Place Saint-Michel",
      "1:07",
      67,
      "Place Saint-Michel",
      "The fountain at Place Saint-Michel marks the start of the Latin Quarter stretch."
    ),
    h(
      "Rue de la Huchette",
      "3:51",
      231,
      "Rue de la Huchette",
      "One of the Latin Quarter\u2019s most famous dining streets comes alive with restaurants and crowds after dark."
    ),
    h(
      "Rue Saint-S\u00E9verin",
      "8:10",
      490,
      "Rue Saint-S\u00E9verin",
      "A quieter medieval lane running parallel to the main Latin Quarter streets."
    ),
    h(
      "Rue de la Harpe",
      "12:27",
      747,
      "Rue de la Harpe",
      "Another classic Latin Quarter alley lined with restaurants and old Parisian architecture."
    ),
    h(
      "Cour du Commerce Saint-Andr\u00E9",
      "15:59",
      959,
      "Cour du Commerce Saint-Andr\u00E9",
      "A historic covered passage dating to the 18th century, tucked between the Latin Quarter and Saint-Germain."
    ),
    h(
      "Rue Gr\u00E9goire de Tours",
      "18:25",
      1105,
      "Rue Gr\u00E9goire de Tours",
      "A short atmospheric street connecting Saint-Germain to the busier Latin Quarter lanes."
    ),
    h(
      "Rue des Barres",
      "22:39",
      1359,
      "Rue des Barres",
      "One of Paris\u2019s most photogenic medieval streets, running alongside the Saint-Gervais church in the Marais."
    ),
    h(
      "Rue des Rosiers",
      "25:17",
      1517,
      "Rue des Rosiers",
      "The historic heart of the Jewish quarter in the Marais, lined with falafel shops and old Parisian facades."
    ),
    h(
      "Rue de Rivoli",
      "31:09",
      1869,
      "Rue de Rivoli",
      "One of Paris\u2019s main east-west arteries, running alongside the Tuileries and Marais at night."
    ),
    h(
      "Rue de la Roquette",
      "34:26",
      2066,
      "Rue de la Roquette",
      "A lively Bastille-area street with bars, cafes, and nightlife crowds in full swing."
    ),
    h(
      "Rue de Lappe",
      "37:39",
      2259,
      "Rue de Lappe",
      "One of Bastille\u2019s most well-known nightlife streets, packed with bars and music venues."
    ),
    h(
      "Rue de Charonne",
      "42:24",
      2544,
      "Rue de Charonne",
      "A trendy street extending east from Bastille into one of Paris\u2019s most popular evening neighborhoods."
    ),
    h(
      "Bike Ride Begins",
      "45:50",
      2750,
      "Bike Ride Begins",
      "The walk transitions to a night bike ride through central Paris."
    ),
    h(
      "Courtyard of the H\u00F4tel de Ville",
      "50:04",
      3004,
      "Courtyard of the H\u00F4tel de Ville",
      "The grand courtyard of Paris\u2019s city hall, lit up on a summer night."
    ),
    h(
      "Louvre Pyramid",
      "56:39",
      3399,
      "Louvre Pyramid",
      "The iconic glass pyramid at the Louvre glows in the Cour Napol\u00E9on after dark."
    ),
    h(
      "Seine River",
      "1:01:07",
      3667,
      "Seine River",
      "The bike ride ends along the Seine with views across the river toward the Île de la Cit\u00E9."
    ),
  ],
};
