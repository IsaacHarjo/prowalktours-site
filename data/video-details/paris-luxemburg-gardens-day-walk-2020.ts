import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-luxemburg-gardens-day-walk-2020/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

export const parisLuxemburgGardensDayWalk2020Detail: VideoDetailRecord = {
  slug: "paris-luxemburg-gardens-day-walk-2020",
  heroEyebrow: "France Walk",
  heroTitle: "Paris Luxembourg Gardens Walk (2020)",
  heroSubtitle:
    "Grand Basin, sailboats, the Statue of Liberty, Orangerie du S\u00e9nat, rose garden, and Palais du Luxembourg",
  heroDescription:
    "This walk explores Luxembourg Gardens, one of Paris\u2019s most elegant and relaxing public spaces. Beginning at Porte Gay-Lussac, the route circles the Grand Basin, passes the sailboats, Porte de l\u2019Observatoire, Porte Fleurus, the basketball court, the Statue of Liberty, the Orangerie du S\u00e9nat, the rose garden, the Delacroix monument, and the Palais du Luxembourg before exiting near Porte Od\u00e9on. It is a compact Paris garden walk centered on the beauty, layout, and atmosphere of the Jardin du Luxembourg.",
  routeMapDescription:
    "Follow this route through Luxembourg Gardens from Porte Gay-Lussac, around the Grand Basin and sailboats, past Porte de l\u2019Observatoire and Porte Fleurus, the Statue of Liberty, the Orangerie du S\u00e9nat and rose garden, around the Palais du Luxembourg, and out through Porte Od\u00e9on.",
  licensingDescription: [
    "This Luxembourg Gardens walk captures one of Paris\u2019s most elegant public spaces in a continuous long-form format filmed in July 2020, including the Grand Basin and sailboats, garden paths, the Statue of Liberty, the Orangerie du S\u00e9nat, the rose garden, the Delacroix monument, and the Palais du Luxembourg.",
    "The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing when you need extended daytime coverage of the Jardin du Luxembourg\u2019s landscape, monuments, and atmosphere.",
  ],
  highlights: [
    { title: "Entrance at Porte Gay-Lussac", timeLabel: "0:00", seconds: 0, imageSrc: highlightImageSrc("paris-entrance-at-porte-gay-lussac.jpg"), alt: "Entrance at Porte Gay-Lussac, Luxembourg Gardens", caption: "Porte Gay-Lussac", description: "The walk begins at the Boulevard Saint-Michel entrance to Luxembourg Gardens." },
    { title: "Grand Basin \u2013 Les Voiliers du Luxembourg", timeLabel: "3:55", seconds: 235, imageSrc: highlightImageSrc("paris-grand-basin-les-voiliers-du-luxembourg.jpg"), alt: "Grand Basin with sailboats in Luxembourg Gardens", caption: "Grand Basin", description: "The central pond with its toy sailboats, surrounded by Luxembourg\u2019s formal garden." },
    { title: "Grand Basin Walk toward Porte de l\u2019Observatoire", timeLabel: "7:00", seconds: 420, imageSrc: highlightImageSrc("paris-grand-basin-walk-toward-porte-de-l-observatoire.jpg"), alt: "Walking around Grand Basin toward Porte de l\u2019Observatoire", caption: "Grand Basin Walk", description: "The route circles the basin toward the southern gate." },
    { title: "Porte de l\u2019Observatoire", timeLabel: "11:25", seconds: 685, imageSrc: highlightImageSrc("paris-porte-de-l-observatoire.jpg"), alt: "Porte de l\u2019Observatoire at Luxembourg Gardens", caption: "Porte de l\u2019Observatoire", description: "The southern gate with views toward the Paris Observatory." },
    { title: "Garden View of Grand Basin", timeLabel: "15:00", seconds: 900, imageSrc: highlightImageSrc("paris-garden-view-of-grand-basin.jpg"), alt: "Garden view of Grand Basin in Luxembourg Gardens", caption: "Garden View", description: "A wider perspective of the Grand Basin and formal gardens from the south side." },
    { title: "Walking toward Porte Fleurus", timeLabel: "16:56", seconds: 1016, imageSrc: highlightImageSrc("paris-walking-toward-porte-fleurus.jpg"), alt: "Walking toward Porte Fleurus in Luxembourg Gardens", caption: "Toward Porte Fleurus", description: "The route continues along garden paths toward the western side." },
    { title: "Terrain de basket-ball", timeLabel: "17:47", seconds: 1067, imageSrc: highlightImageSrc("paris-terrain-de-basket-ball.jpg"), alt: "Basketball court in Luxembourg Gardens", caption: "Basketball Court", description: "An unexpected basketball court tucked into the garden grounds." },
    { title: "Statue of Liberty", timeLabel: "19:37", seconds: 1177, imageSrc: highlightImageSrc("paris-statue-of-liberty.jpg"), alt: "Statue of Liberty in Luxembourg Gardens, Paris", caption: "Statue of Liberty", description: "The small bronze replica of the Statue of Liberty in the western garden." },
    { title: "Porte Fleurus", timeLabel: "21:14", seconds: 1274, imageSrc: highlightImageSrc("paris-porte-fleurus.jpg"), alt: "Porte Fleurus at Luxembourg Gardens", caption: "Porte Fleurus", description: "The western gate of Luxembourg Gardens." },
    { title: "Le Triomphe de Sil\u00e8ne", timeLabel: "22:07", seconds: 1327, imageSrc: highlightImageSrc("paris-le-triomphe-de-silene.jpg"), alt: "Le Triomphe de Sil\u00e8ne sculpture in Luxembourg Gardens", caption: "Le Triomphe de Sil\u00e8ne", description: "A dramatic sculpture group near the garden\u2019s northwestern paths." },
    { title: "Orangerie du S\u00e9nat", timeLabel: "23:16", seconds: 1396, imageSrc: highlightImageSrc("paris-orangerie-du-senat.jpg"), alt: "Orangerie du S\u00e9nat in Luxembourg Gardens", caption: "Orangerie du S\u00e9nat", description: "The Senate\u2019s orangery building along the garden\u2019s northern edge." },
    { title: "Roseraie du Luxembourg", timeLabel: "23:39", seconds: 1419, imageSrc: highlightImageSrc("paris-roseraie-du-luxembourg.jpg"), alt: "Rose garden in Luxembourg Gardens", caption: "Rose Garden", description: "The garden\u2019s rose collection in a formal setting near the Orangerie." },
    { title: "Monument \u00e0 Delacroix", timeLabel: "24:46", seconds: 1486, imageSrc: highlightImageSrc("paris-monument-a-delacroix.jpg"), alt: "Monument \u00e0 Delacroix in Luxembourg Gardens", caption: "Delacroix Monument", description: "Aim\u00e9-Jules Dalou\u2019s monument to the painter Eug\u00e8ne Delacroix." },
    { title: "Palais du Luxembourg to Porte Od\u00e9on", timeLabel: "25:19", seconds: 1519, imageSrc: highlightImageSrc("paris-palais-du-luxembourg-to-porte-odeon.jpg"), alt: "Walking around Palais du Luxembourg toward Porte Od\u00e9on", caption: "Palais du Luxembourg", description: "The route circles the palace before heading to the garden\u2019s exit." },
    { title: "Porte Od\u00e9on", timeLabel: "28:17", seconds: 1697, imageSrc: highlightImageSrc("paris-porte-odeon.jpg"), alt: "Porte Od\u00e9on exit from Luxembourg Gardens", caption: "Porte Od\u00e9on", description: "The walk ends at the Od\u00e9on gate on the northern edge of Luxembourg Gardens." },
  ],
};
