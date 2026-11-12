// Editorial ordering and existing site imagery; tour counts and links come from the live catalogue.
export const featuredChristmasCities: Record<string, string[]> = {
  France: ["Colmar", "Kaysersberg", "Ribeauvillé", "Riquewihr", "Strasbourg"],
  Germany: ["Rothenburg ob der Tauber", "Nuremberg", "Dresden", "Freiburg"],
  Switzerland: ["Basel"],
};
// Filmed destinations can appear before their videos enter the published catalogue.
export const upcomingChristmasDestinations = [
  { country: "Germany", city: "Freiburg", region: "Baden-Württemberg", filmedYear: 2025 },
];
export const christmasDestinationImages: Record<string, string> = {
  "Switzerland/Basel": "/basel-christmas-guide/hero.webp",
  "Germany/Freiburg": "/images/homepage/freiburg-christmas-market.jpg",
  "France/Kaysersberg": "/kaysersberg-christmas-market-day-walk-2025/kaysersberg-introduction.webp",
  "France/Strasbourg": "/strasbourg-christmas-guide/le-gruber-blue-hour.webp",
  "France/Ribeauvillé": "/ribeauville-day-walk-2025/guide/hero.webp",
  "France/Riquewihr": "/riquewihr-christmas-guide/hero.webp",
  "Germany/Rothenburg ob der Tauber": "/images/homepage/rothenburg-christmas-collection.jpeg",
  "Germany/Nuremberg": "/nuremberg-christmas-guide/card.webp",
  "Germany/Dresden": "/dresden-christmas-market-evening-walk-2022/highlights/dresden-altmarket-square.jpg",
};
