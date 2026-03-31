import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-catacombs-tour-2020/highlights";

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
  imageSrc: highlightImageSrc("paris-catacombs-placeholder.jpg"),
  alt: `${title} during the Paris Catacombs tour`,
  caption,
  description,
});

export const parisCatacombsTour2020Detail: VideoDetailRecord = {
  slug: "paris-catacombs-tour-2020",
  heroEyebrow: "France Tour",
  heroTitle: "Paris Catacombs Tour",
  heroSubtitle:
    "Underground ossuary, historic tunnels, and one of Paris's most unusual landmark experiences",
  heroDescription:
    "This tour explores the Paris Catacombs, one of the city's most unusual and historic underground sites. After entering from the top-level entrance, the route descends into the ossuary and passes corridors lined with bones and skulls, including some of the most recognizable stacked arrangements and memorial features inside the catacombs.",
  routeMapDescription:
    "The Paris Catacombs entrance is located in the 14th arrondissement on the Left Bank. The underground route follows a fixed path through approximately 2 km of tunnels in the ossuary. Use this map to find the entrance and plan your visit.",
  licensingDescription: [
    "This Paris Catacombs tour captures one of the city's most distinctive historic attractions in a focused long-form format, including the entrance sequence, underground ossuary corridors, stacked bone walls, and key memorial features.",
    "The footage is suitable for editorial, documentary, educational, travel, and history-focused licensing when you need atmospheric underground coverage of the Paris Catacombs and its landmark interior spaces.",
  ],
  highlights: [
    h(
      "Introduction",
      "0:00",
      0,
      "Introduction",
      "The tour opens with the first look at the Paris Catacombs experience."
    ),
    h(
      "Top Level Entrance",
      "1:25",
      85,
      "Top Level Entrance",
      "The entrance sequence sets up the descent into the underground site."
    ),
    h(
      "Entering the Catacombs",
      "1:56",
      116,
      "Entering the Catacombs",
      "The route moves below ground and into the historic tunnel system."
    ),
    h(
      "Stacks of Bones and Skulls",
      "3:17",
      197,
      "Stacks of Bones and Skulls",
      "One of the most recognizable visual sections of the ossuary appears early in the tour."
    ),
    h(
      "Column of Bones",
      "20:35",
      1235,
      "Column of Bones",
      "A distinct memorial arrangement highlights the site's formal bone displays."
    ),
    h(
      "Exiting the Catacombs",
      "22:11",
      1331,
      "Exiting the Catacombs",
      "The tour returns to the surface after the final underground stretch."
    ),
  ],
};
