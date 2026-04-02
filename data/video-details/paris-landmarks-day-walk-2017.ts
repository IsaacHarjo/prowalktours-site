import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-landmarks-day-walk-2017/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

export const parisLandmarksDayWalk2017Detail: VideoDetailRecord = {
  slug: "paris-landmarks-day-walk-2017",
  heroEyebrow: "France Walk",
  heroTitle: "Paris, France Landmarks Day Walk (2017)",
  heroSubtitle:
    "The Louvre, Notre-Dame, Champs-\u00c9lys\u00e9es, Arc de Triomphe, Eiffel Tower, Les Invalides, and the atmospheric old streets of Paris",
  heroDescription:
    "This long daytime walk across Paris connects many of the city\u2019s most iconic landmarks, beginning at the Louvre and continuing along the Seine to Notre-Dame. From there, the route heads west through the Tuileries, Place de la Concorde, and the Champs-\u00c9lys\u00e9es to the Arc de Triomphe, then down to the Eiffel Tower, Champ de Mars, Les Invalides, and Pont Alexandre III before finishing with some of Paris\u2019s most atmospheric old streets, including Cour du Commerce Saint-Andr\u00e9, Rue de Buci, Rue des Rosiers, and Rue des Barres.",
  routeMapDescription:
    "Follow this Paris route from the Louvre along the Seine to Notre-Dame, west through the Tuileries and Champs-\u00c9lys\u00e9es to the Arc de Triomphe, south to the Eiffel Tower and Les Invalides, then back through the Left Bank old streets and the Marais to Notre-Dame.",
  licensingDescription: [
    "This Paris landmarks walk captures a comprehensive cross-city route in a single long-form format filmed in August 2017, including the Louvre, Notre-Dame, Tuileries Garden, Champs-\u00c9lys\u00e9es, Arc de Triomphe, the Eiffel Tower, Champ de Mars, Les Invalides, Pont Alexandre III, Grand Palais, Cour du Commerce Saint-Andr\u00e9, Rue de Buci, Rue des Rosiers, and Rue des Barres.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing when you need extended daytime coverage of Paris\u2019s major landmarks and historic streets.",
  ],
  highlights: [
    { title: "Intro", timeLabel: "0:00", seconds: 0, imageSrc: highlightImageSrc("paris-intro.jpg"), alt: "Intro for the Paris landmarks day walk 2017", caption: "Intro", description: "The walk opens at the start of the route through central Paris." },
    { title: "The Louvre Museum", timeLabel: "0:06", seconds: 6, imageSrc: highlightImageSrc("paris-the-louvre-museum.jpg"), alt: "The Louvre Museum in Paris, France", caption: "The Louvre", description: "The walk begins at the Louvre courtyard and its iconic glass pyramid." },
    { title: "Seine River toward Notre-Dame", timeLabel: "7:40", seconds: 460, imageSrc: highlightImageSrc("paris-seine-river-toward-notre-dame.jpg"), alt: "Walking along the Seine toward Notre-Dame in Paris", caption: "Seine River Walk", description: "The route follows the Seine eastward with views toward \u00cele de la Cit\u00e9." },
    { title: "Notre-Dame", timeLabel: "19:52", seconds: 1192, imageSrc: highlightImageSrc("paris-notre-dame.jpg"), alt: "Notre-Dame in Paris, France", caption: "Notre-Dame", description: "Views of Notre-Dame cathedral before the 2019 fire." },
    { title: "Seine River toward Arc de Triomphe", timeLabel: "25:00", seconds: 1500, imageSrc: highlightImageSrc("paris-seine-river-toward-arc-de-triomphe.jpg"), alt: "Walking along the Seine toward the Arc de Triomphe in Paris", caption: "Seine River Walk", description: "The route heads west along the Seine toward the Tuileries and Champs-\u00c9lys\u00e9es." },
    { title: "Tuileries Garden", timeLabel: "43:22", seconds: 2602, imageSrc: highlightImageSrc("paris-tuileries-garden.jpg"), alt: "Tuileries Garden in Paris, France", caption: "Tuileries Garden", description: "The formal garden stretching from the Louvre to Place de la Concorde." },
    { title: "Luxor Obelisk", timeLabel: "50:41", seconds: 3041, imageSrc: highlightImageSrc("paris-luxor-obelisk.jpg"), alt: "Luxor Obelisk at Place de la Concorde in Paris", caption: "Luxor Obelisk", description: "The 3,300-year-old Egyptian obelisk at the center of Place de la Concorde." },
    { title: "Avenue des Champs-\u00c9lys\u00e9es", timeLabel: "53:47", seconds: 3227, imageSrc: highlightImageSrc("paris-avenue-des-champs-elysees.jpg"), alt: "Champs-\u00c9lys\u00e9es in Paris, France", caption: "Champs-\u00c9lys\u00e9es", description: "The iconic avenue stretches from Place de la Concorde toward the Arc de Triomphe." },
    { title: "Arc de Triomphe", timeLabel: "1:10:40", seconds: 4240, imageSrc: highlightImageSrc("paris-arc-de-triomphe.jpg"), alt: "Arc de Triomphe in Paris, France", caption: "Arc de Triomphe", description: "The monument at the top of the Champs-\u00c9lys\u00e9es overlooking Place Charles de Gaulle." },
    { title: "The Eiffel Tower", timeLabel: "1:28:44", seconds: 5324, imageSrc: highlightImageSrc("paris-the-eiffel-tower.jpg"), alt: "The Eiffel Tower in Paris, France", caption: "Eiffel Tower", description: "The route reaches the Eiffel Tower from the Trocad\u00e9ro side." },
    { title: "Champ de Mars Park", timeLabel: "1:41:00", seconds: 6060, imageSrc: highlightImageSrc("paris-champ-de-mars-park.jpg"), alt: "Champ de Mars in Paris, France", caption: "Champ de Mars", description: "The park stretching from the Eiffel Tower base toward the \u00c9cole Militaire." },
    { title: "Les Invalides", timeLabel: "1:55:18", seconds: 6918, imageSrc: highlightImageSrc("paris-les-invalides.jpg"), alt: "Les Invalides in Paris, France", caption: "Les Invalides", description: "The golden-domed complex housing Napoleon\u2019s tomb and military museums." },
    { title: "Esplanade des Invalides", timeLabel: "2:03:35", seconds: 7415, imageSrc: highlightImageSrc("paris-esplanade-des-invalides.jpg"), alt: "Esplanade des Invalides in Paris, France", caption: "Esplanade des Invalides", description: "The broad lawn stretching from Les Invalides toward the Seine." },
    { title: "Pont Alexandre III", timeLabel: "2:08:59", seconds: 7739, imageSrc: highlightImageSrc("paris-pont-alexandre-iii.jpg"), alt: "Pont Alexandre III in Paris, France", caption: "Pont Alexandre III", description: "Paris\u2019s most ornate bridge connecting Les Invalides to the Grand Palais." },
    { title: "The Grand Palais", timeLabel: "2:13:17", seconds: 7997, imageSrc: highlightImageSrc("paris-the-grand-palais.jpg"), alt: "Grand Palais in Paris, France", caption: "Grand Palais", description: "The glass-roofed exhibition hall near the Champs-\u00c9lys\u00e9es." },
    { title: "Cour du Commerce Saint-Andr\u00e9", timeLabel: "2:22:16", seconds: 8536, imageSrc: highlightImageSrc("paris-cour-du-commerce-saint-andre.jpg"), alt: "Cour du Commerce Saint-Andr\u00e9 in Paris, France", caption: "Cour du Commerce Saint-Andr\u00e9", description: "An 18th-century covered passage tucked between the Latin Quarter and Saint-Germain." },
    { title: "Rue de Buci", timeLabel: "2:25:26", seconds: 8726, imageSrc: highlightImageSrc("paris-rue-de-buci.jpg"), alt: "Rue de Buci in Paris, France", caption: "Rue de Buci", description: "A lively Left Bank street with caf\u00e9s, restaurants, and market stalls." },
    { title: "Rue des Rosiers & Rue Saint-Antoine", timeLabel: "2:27:43", seconds: 8863, imageSrc: highlightImageSrc("paris-rue-des-rosiers-rue-saint-antoine.jpg"), alt: "Rue des Rosiers and Rue Saint-Antoine in the Marais, Paris", caption: "Rue des Rosiers & Rue Saint-Antoine", description: "The walk passes through the heart of the Marais, from the Jewish quarter to Rue Saint-Antoine." },
    { title: "Rue des Barres to Notre-Dame", timeLabel: "2:38:51", seconds: 9531, imageSrc: highlightImageSrc("paris-rue-des-barres-to-notre-dame.jpg"), alt: "Rue des Barres near Notre-Dame in Paris, France", caption: "Rue des Barres to Notre-Dame", description: "The walk finishes on one of Paris\u2019s most photogenic medieval streets before returning to Notre-Dame." },
  ],
};
