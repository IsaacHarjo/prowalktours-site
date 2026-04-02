import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-eiffel-tower-day-walk-2020/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

export const parisEiffelTowerDayWalk2020Detail: VideoDetailRecord = {
  slug: "paris-eiffel-tower-day-walk-2020",
  heroEyebrow: "France Tour",
  heroTitle: "Paris Eiffel Tower Tour (2020)",
  heroSubtitle:
    "Champ de Mars, the entrance, elevator rides, Level 2, the summit interior and exterior, Level 1, and the stairs back down",
  heroDescription:
    "This tour focuses on the full Eiffel Tower experience, beginning on the ground near Champ de Mars and continuing through the entrance and elevator rides up the monument. The route includes Level 2, the summit interior and exterior, the descent to Level 1, and the stairs back down to ground level. Rather than a general city walk, this video is an attraction-focused tour of one of Paris\u2019s most famous landmarks from entrance to exit.",
  routeMapDescription: "",
  licensingDescription: [
    "This Eiffel Tower tour captures the full visitor experience in a continuous long-form format filmed in July 2020, including Champ de Mars, the entrance and security, elevator rides to Level 2 and the summit, 360-degree panoramic views from the top, Level 1, and the stairway descent.",
    "The footage is suitable for editorial, documentary, travel, educational, and attraction-focused licensing when you need extended coverage of the Eiffel Tower interior, exterior views, elevator experience, and panoramic Paris views from multiple levels.",
  ],
  highlights: [
    { title: "Champ de Mars", timeLabel: "5:38", seconds: 338, imageSrc: highlightImageSrc("paris-champ-de-mars.jpg"), alt: "Champ de Mars approaching the Eiffel Tower", caption: "Champ de Mars", description: "The walk approaches the Eiffel Tower through Champ de Mars park." },
    { title: "Eiffel Tower Entrance", timeLabel: "12:30", seconds: 750, imageSrc: highlightImageSrc("paris-eiffel-tower-entrance.jpg"), alt: "Eiffel Tower entrance and security checkpoint", caption: "Entrance", description: "The security checkpoint and entrance area at the base of the tower." },
    { title: "Elevator Ride to Level 2", timeLabel: "14:35", seconds: 875, imageSrc: highlightImageSrc("paris-elevator-ride-to-level-2.jpg"), alt: "Elevator ride to Level 2 of the Eiffel Tower", caption: "Elevator to Level 2", description: "The first elevator ride takes visitors from the ground to Level 2." },
    { title: "Level 2", timeLabel: "22:51", seconds: 1371, imageSrc: highlightImageSrc("paris-level-2.jpg"), alt: "Eiffel Tower Level 2 views", caption: "Level 2", description: "The second floor offers sweeping views across central Paris." },
    { title: "Elevator Ride to Level 3", timeLabel: "24:27", seconds: 1467, imageSrc: highlightImageSrc("paris-elevator-ride-to-level-3.jpg"), alt: "Elevator ride to the summit of the Eiffel Tower", caption: "Elevator to Summit", description: "The second elevator continues from Level 2 to the summit." },
    { title: "Level 3 (Interior)", timeLabel: "26:48", seconds: 1608, imageSrc: highlightImageSrc("paris-level-3.jpg"), alt: "Eiffel Tower summit interior", caption: "Summit Interior", description: "The enclosed summit level with historical displays and Gustave Eiffel\u2019s office." },
    { title: "Level 3 (Exterior)", timeLabel: "34:31", seconds: 2071, imageSrc: highlightImageSrc("paris-level-3.jpg"), alt: "Eiffel Tower summit exterior panoramic views", caption: "Summit Exterior", description: "Panoramic views from the open-air summit platform in every direction." },
    { title: "Elevator Ride to Level 1", timeLabel: "38:00", seconds: 2280, imageSrc: highlightImageSrc("paris-elevator-ride-to-level-1.jpg"), alt: "Elevator descent to Level 1 of the Eiffel Tower", caption: "Elevator to Level 1", description: "The descent from the summit back through Level 2 to Level 1." },
    { title: "Level 1", timeLabel: "44:23", seconds: 2663, imageSrc: highlightImageSrc("paris-level-1.jpg"), alt: "Eiffel Tower Level 1 with glass floor", caption: "Level 1", description: "The first floor with its glass floor section and closer views of the city." },
    { title: "Walking Steps down to Ground Level", timeLabel: "49:31", seconds: 2971, imageSrc: highlightImageSrc("paris-walking-steps-down-to-ground-level.jpg"), alt: "Walking down the stairs of the Eiffel Tower", caption: "Stairs Down", description: "The stairway descent from Level 1 through the iron lattice structure." },
    { title: "Ground Level", timeLabel: "52:45", seconds: 3165, imageSrc: highlightImageSrc("paris-walking-steps-down-to-ground-level.jpg"), alt: "Back at ground level beneath the Eiffel Tower", caption: "Ground Level", description: "The tour ends back at ground level beneath the tower." },
  ],
};
