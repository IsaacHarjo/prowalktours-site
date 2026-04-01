import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-catacombs-tour-2020/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

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
    {
      title: "Introduction",
      timeLabel: "0:00",
      seconds: 0,
      imageSrc: highlightImageSrc("paris-introduction.jpg"),
      alt: "Introduction during the Paris Catacombs tour",
      caption: "Introduction",
      description:
        "The tour opens with the first look at the Paris Catacombs experience.",
    },
    {
      title: "Top Level Entrance",
      timeLabel: "1:25",
      seconds: 85,
      imageSrc: highlightImageSrc("paris-top-level-entrance.jpg"),
      alt: "Top Level Entrance during the Paris Catacombs tour",
      caption: "Top Level Entrance",
      description:
        "The entrance sequence sets up the descent into the underground site.",
    },
    {
      title: "Entering the Catacombs",
      timeLabel: "1:56",
      seconds: 116,
      imageSrc: highlightImageSrc("paris-entering-the-catacombs.jpg"),
      alt: "Entering the Catacombs during the Paris Catacombs tour",
      caption: "Entering the Catacombs",
      description:
        "The route moves below ground and into the historic tunnel system.",
    },
    {
      title: "Stacks of Bones and Skulls",
      timeLabel: "3:17",
      seconds: 197,
      imageSrc: highlightImageSrc("paris-stacks-of-bones-and-skulls.jpg"),
      alt: "Stacks of Bones and Skulls during the Paris Catacombs tour",
      caption: "Stacks of Bones and Skulls",
      description:
        "One of the most recognizable visual sections of the ossuary appears early in the tour.",
    },
    {
      title: "Column of Bones",
      timeLabel: "20:35",
      seconds: 1235,
      imageSrc: highlightImageSrc("paris-column-of-bones.jpg"),
      alt: "Column of Bones during the Paris Catacombs tour",
      caption: "Column of Bones",
      description:
        "A distinct memorial arrangement highlights the site's formal bone displays.",
    },
    {
      title: "Exiting the Catacombs",
      timeLabel: "22:11",
      seconds: 1331,
      imageSrc: highlightImageSrc("paris-exiting-the-catacombs.jpg"),
      alt: "Exiting the Catacombs during the Paris Catacombs tour",
      caption: "Exiting the Catacombs",
      description:
        "The tour returns to the surface after the final underground stretch.",
    },
  ],
};
