import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/paris-promenade-plantee-day-walk-2020/highlights";

const highlightImageSrc = (filename: string) =>
  `${highlightImageBasePath}/${filename}`;

export const parisPromenadePlanteeDayWalk2020Detail: VideoDetailRecord = {
  slug: "paris-promenade-plantee-day-walk-2020",
  heroEyebrow: "France Walk",
  heroTitle: "Paris Promenade Plant\u00e9e Walk (2020)",
  heroSubtitle:
    "Coul\u00e9e Verte Ren\u00e9-Dumont, Viaduc des Arts, Jardin de Reuilly, and Paris\u2019s elevated greenway",
  heroDescription:
    "This walk follows the Coul\u00e9e Verte Ren\u00e9-Dumont, also known as the Promenade Plant\u00e9e, one of Paris\u2019s most distinctive linear parks. Beginning near Bastille, the route moves along the elevated greenway and related garden paths, including views around Jardin de Reuilly, before turning back along the same corridor. It is a quieter side of Paris, focused more on urban green space, old railway infrastructure, and a slower local atmosphere than the city\u2019s main monument routes.",
  routeMapDescription:
    "Follow this route along the Coul\u00e9e Verte Ren\u00e9-Dumont from near Bastille, past the Viaduc des Arts and Avenue Daumesnil, through Jardin de Reuilly to the turnaround point, and back along the same elevated greenway.",
  licensingDescription: [
    "This Promenade Plant\u00e9e walk captures Paris\u2019s elevated greenway in a continuous long-form format filmed in July 2020, including the Coul\u00e9e Verte Ren\u00e9-Dumont, Viaduc des Arts arches, Jardin de Reuilly, and the tree-lined corridor above Avenue Daumesnil.",
    "The footage is suitable for editorial, documentary, travel, urban planning, and atmospheric licensing when you need extended coverage of Paris\u2019s green spaces, elevated parks, and quieter neighborhood character away from the main tourist landmarks.",
  ],
  highlights: [
    {
      title: "Intro",
      timeLabel: "0:00",
      seconds: 0,
      imageSrc: highlightImageSrc("paris-intro.jpg"),
      alt: "Intro for the Paris Promenade Plant\u00e9e walk",
      caption: "Intro",
      description: "The walk opens with an overview of the Coul\u00e9e Verte Ren\u00e9-Dumont route.",
    },
    {
      title: "Walk Begins",
      timeLabel: "0:37",
      seconds: 37,
      imageSrc: highlightImageSrc("paris-walk-begins.jpg"),
      alt: "Promenade Plant\u00e9e elevated greenway in Paris",
      caption: "Walk Begins",
      description: "The elevated greenway opens up above the Viaduc des Arts near Bastille.",
    },
    {
      title: "Reuilly Garden",
      timeLabel: "16:36",
      seconds: 996,
      imageSrc: highlightImageSrc("paris-reuilly-garden.jpg"),
      alt: "Jardin de Reuilly along the Promenade Plant\u00e9e in Paris",
      caption: "Reuilly Garden",
      description: "The route passes through Jardin de Reuilly, a green pocket park along the corridor.",
    },
    {
      title: "Half-way Point",
      timeLabel: "30:05",
      seconds: 1805,
      imageSrc: highlightImageSrc("paris-half-way-point.jpg"),
      alt: "Turnaround point on the Coul\u00e9e Verte Ren\u00e9-Dumont",
      caption: "Half-way Point",
      description: "The walk reaches its turnaround point before heading back along the greenway.",
    },
    {
      title: "Reuilly Garden (return)",
      timeLabel: "41:39",
      seconds: 2499,
      imageSrc: highlightImageSrc("paris-reuilly-garden-return.jpg"),
      alt: "Jardin de Reuilly on the return along the Promenade Plant\u00e9e",
      caption: "Reuilly Garden (return)",
      description: "The return pass through Reuilly Garden on the way back toward Bastille.",
    },
  ],
};
