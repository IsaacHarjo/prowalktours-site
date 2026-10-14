import type { DestinationGuide } from "../guides/types";
import { colmarPhotos as photos } from "./colmar-photos";

// Moments refer to cues in the owner's 2023 day/evening SRT captions.
// Photos are from the separately dated archive, not video frame captures.
export const colmarGuide: DestinationGuide = {
  slug: "colmar", city: "Colmar", region: "Alsace", country: "France",
  title: "Christmas in Colmar",
  introduction: "Half-timbered houses, canals and little squares full of light. Explore Colmar through my daytime and evening walks, then use the current market information to plan a visit of your own.",
  hero: photos.C157, mobileHero: photos.C257, featuredTourId: "fr-0026",
  markets: [
    { name: "Place des Dominicains", text: "Wooden stalls gathered beside the Dominican church. Look up from the stalls to take in the church and the surrounding facades." },
    { name: "Place de l’Ancienne Douane", text: "An old-town square around the Schwendi fountain, with the Koïfhus nearby. A useful place to pause between the northern squares and the canals." },
    { name: "Koïfhus", text: "The former customs house hosts an indoor market focused on crafts. Pair it with the stalls outside on Place de l’Ancienne Douane." },
    { name: "Place Jeanne d’Arc", text: "A market with a focus on regional food and Alsatian products, tucked among the old town’s buildings." },
    { name: "Petite Venise", text: "The family-oriented market at Place des Six Montagnes Noires, near the canals and half-timbered houses of Little Venice." },
    { name: "The Gourmet Market", text: "A place to sit down for food at Montagne Verte. Its opening period and evening hours differ from the main markets; see the separate schedule above." },
  ],
  marketsSource: { label: "Explore the six markets on Colmar’s official site", href: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/presentation/six-christmas-markets" },
  moments: [
    { title: "The stalls beside the church", text: "The evening walk reaches the Dominican church market early in the route. See how the stalls sit against the church before exploring the surrounding lanes.", photo: photos.C188, tourId: "fr-0026", seconds: 323 },
    { title: "Saint-Martin in daylight", text: "Take a break from the stalls for a closer look at Saint-Martin’s stonework. You can see it in my daytime walk.", photo: photos.C198, tourId: "fr-0027", seconds: 1275 },
    { title: "Around the old customs house", text: "Join the evening walk at the Koïfhus steps, then continue around the old customs house and its market square. Nearby canal bridges offer another view of the decorations.", photo: photos.C254, tourId: "fr-0026", seconds: 2018 },
    { title: "Along the Quai de la Poissonnerie", text: "Return in daylight for a different view of the canals and half-timbered houses. This stretch appears late in the daytime walk.", photo: photos.C147, tourId: "fr-0027", seconds: 5550 },
  ],
  fieldNote: {
    title: "Leave room for something warm",
    text: "In the 2023 evening walk, I stopped to watch chimney cakes being made—one of my favorite Christmas market treats. My later photos also caught the steam rising from a marrons chauds chestnut roaster. The little stops are part of the walk, too.",
    photo: photos.C220, tourId: "fr-0026", seconds: 5146,
  },
  gallery: [photos.C236, photos.C205, photos.C080],
  route: {
    title: "Colmar, with more of Alsace around it",
    text: "On my December 2025 trip, I filmed Basel, several Alsace towns, Freiburg and Strasbourg. If you’re visiting Colmar, these walks can help you decide where else you’d like to go.",
    stops: ["Basel", "Kaysersberg", "Ribeauvillé", "Riquewihr", "Colmar", "Freiburg", "Strasbourg"],
    note: "These towns are listed in the order I filmed them. I’m still adding where I stayed, how I traveled between stops and how much time to allow.",
  },
  nearby: [
    { city: "Riquewihr", text: "Continue through the streets of another Alsace village.", href: "/christmas-markets?city=Riquewihr#browse-walks" },
    { city: "Strasbourg", text: "Explore a larger city’s Christmas squares and lights.", href: "/christmas-markets?city=Strasbourg#browse-walks" },
    { city: "Kaysersberg & Ribeauvillé", text: "See more of the villages from the filming route.", href: "/christmas-markets?country=France#browse-walks" },
  ],
};
