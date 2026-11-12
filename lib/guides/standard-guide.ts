import type { GuideFaq, GuidePhoto, GuideSource } from "./types";

// The "standard guide": the sections every Christmas market guide shares.
// Personal sections are optional and stay hidden until Ike supplies them;
// every dated block carries its official source and the date it was checked.

export type StandardGuideSeason = {
  year: number;
  checkedOn: string;
  dates: string;
  datesLabel: string;
  hours: { label: string; value: string }[];
  source: GuideSource;
  notes?: string[];
  extras: { title: string; text: string; source: GuideSource; checkedOn: string }[];
};

export type StandardGuide = {
  slug: string;
  city: string;
  country: string;
  regionLabel: string;
  title: string;
  introduction: string;
  hero: GuidePhoto;
  mobileHero: GuidePhoto;
  cardPhoto: GuidePhoto;
  /** "Why I love …": hidden until Ike writes it. */
  personalTake?: { title: string; paragraphs: string[]; filmingPhoto: string; photoAlt: string };
  /** Ike's timing and visiting tips: hidden until Ike writes them. */
  tips?: { label: string; value: string }[];
  routeIntroduction: string;
  glance: { label: string; value: string }[];
  season: StandardGuideSeason;
  transport: { title: string; text: string; source: GuideSource; checkedOn: string }[];
  walksIntroduction: string;
  gallery: GuidePhoto[];
  faq: GuideFaq[];
  visits: { title: string; text: string };
  nearby: { city: string; text: string; href: string; label: string }[];
};
