import type { MapCoordinate } from '../guides/map-types';
import type { VisitorMapData } from '../guides/visitor-map-types';
import source from './colmar-visitor-route.json';
import { colmarPhotos as photos } from './colmar-photos';
import { colmarStopGalleries } from './colmar-stop-galleries';
import { colmarItinerary } from './colmar-itinerary';

// Preserve the owner's visitor-route geometry and pin positions independently
// of the 2023 filmed routes. Names and descriptions below are editorial copy.
function point(name: string): MapCoordinate {
  const pin = source.points.find(item => item.name === name);
  if (!pin) throw new Error(`Missing visitor-map pin: ${name}`);
  return pin.coordinates as MapCoordinate;
}
function line(name: string): MapCoordinate[] {
  const route = source.lines.find(item => item.name === name);
  if (!route) throw new Error(`Missing visitor-map route: ${name}`);
  return route.coordinates as MapCoordinate[];
}

export const colmarVisitorMap: VisitorMapData = {
  city: 'Colmar', sourceUrl: source.sourceUrl, importedOn: source.importedOn,
  route: line('Line 3'), stationApproach: line('Walking Route From Train'),
  itinerary: colmarItinerary,
  stops: ([
    { id: 'dominicains', name: 'Place des Dominicains — Christmas Market', shortName: 'Dominicains', category: 'market', icon: 'market', marketNumber: 1, coordinates: point('Place des Dominicains'),
      video: { libraryId: '780712', videoId: 'bf5a0466-fc37-4b38-918a-0b7af75f080a', title: 'Place des Dominicains & its hidden courtyard' },
      text: 'Christmas decorations and gifts beneath the Dominican Church. Take in the church and surrounding facades as you browse the stalls.', tip: 'A good first market if you are joining the walk from Place Rapp. Return after dark for the illuminated square.', photo: photos.C188 },
    { id: 'ancienne-douane', name: 'Place de l’Ancienne Douane — Christmas Market', shortName: 'Ancienne Douane', category: 'market', icon: 'market', marketNumber: 2, coordinates: point('Place de l’Ancienne Douane'),
      video: { libraryId: '780712', videoId: 'e60b4ad0-f87b-44ee-83b7-002592c21637', title: 'Place de l’Ancienne Douane & Grand Rue' },
      text: 'Chalets around the Schwendi Fountain and canal, with decorations and crafts beside the old customs house.', tip: 'The outdoor market and the indoor Koïfhus market are separate stops close together.', photo: photos.C254 },
    { id: 'koifhus', name: 'Koïfhus — Indoor Craft Market', shortName: 'Koïfhus', category: 'market', icon: 'market', marketNumber: 3, coordinates: point('Koïfhus Indoor Market'),
      video: { libraryId: '780712', videoId: 'ba8540d1-7825-4b1c-97a7-ffbe294bfdb2', title: 'Inside the Koïfhus' },
      text: 'Step into the historic customs house to browse ceramics, glass, woodwork, jewelry, and other work by local artisans.', tip: 'Look for the indoor craft market as well as the stalls outside.' },
    { id: 'jeanne-arc', name: 'Place Jeanne d’Arc — Alsatian Food Market', shortName: 'Jeanne d’Arc', category: 'market', icon: 'market', marketNumber: 4, coordinates: point('Place Jeanne d’Arc'),
      video: { libraryId: '780712', videoId: '82eabbc1-3efe-4ee5-b245-d05a0c5e2625', title: 'Place Jeanne d’Arc' },
      text: 'A market focused on regional products: Alsatian wines, cured meats, Christmas biscuits, and other food gifts.' },
    { id: 'petite-venise', name: 'Petite Venise — Children’s Christmas Market', shortName: 'Petite Venise', category: 'market', icon: 'market', marketNumber: 5, coordinates: point('Place des Six Montagnes'),
      video: { libraryId: '780712', videoId: '5b1da26e-288a-4213-9542-0126c75f5277', title: 'Petite Venise children’s market' },
      text: 'The family-focused market at Place des Six Montagnes Noires, with a carousel and Santa’s giant letterbox near the canals.' },
    { id: 'gourmet', name: 'Marché Gourmand — Gourmet Market', shortName: 'Gourmet Market', category: 'market', icon: 'market', marketNumber: 6, coordinates: point('Gourmet Market'),
      video: { libraryId: '780712', videoId: 'd04b83ab-e296-4f48-9d4b-35b33d064a9b', title: 'The Gourmet Market' },
      text: 'Prepared dishes and Alsatian specialties to eat on site or take away in the Montagne Verte area.', tip: 'This is separate from the covered food market. Its season and evening hours differ from the main markets; check the dates section above.' },
    { id: 'photo-koifhus', name: 'Koïfhus Steps — Elevated Photo Spot', shortName: 'Koïfhus photo', category: 'photo', icon: 'camera', coordinates: point('BEST PHOTO LOCATION (Koïfhus)'),
      video: { libraryId: '780712', videoId: '566bfe15-2275-4bea-9d92-7908e92eff4a', title: 'The Koïfhus steps: look back' },
      text: 'My marked viewpoint for the decorated buildings and busy Christmas streets around the Koïfhus.', tip: 'Walk up the Koïfhus steps for the elevated view. This viewpoint involves stairs; leave space for people passing.', photo: photos.C157 },
    { id: 'photo-canal', name: 'Petite Venise — Canal Photo Spot', shortName: 'Canal photo', category: 'photo', icon: 'camera', coordinates: point('Petite Venice Photo'),
      video: { libraryId: '780712', videoId: '2f1e7544-6b1c-40a0-9ce7-6446694ccac5', title: 'Petite Venise: the canal view' },
      text: 'Pause at my marked canal viewpoint for the half-timbered houses and Christmas decorations along the water.', tip: 'Try this stop in daylight for the building colors, then again as the Christmas lights come on.', photo: photos.C147 },
    { id: 'photo-sign', name: 'Colmar Sign — Champ de Mars Photo Spot', shortName: 'Colmar sign', category: 'photo', icon: 'camera', coordinates: point('Colmar Sign'),
      video: { libraryId: '780712', videoId: '001e831a-c218-473c-af0d-bc9e87c487e4', title: 'Colmar sign in Parc du Champ de Mars' },
      text: 'The Colmar sign was here in Parc du Champ de Mars during my December 2025 visit. It makes a natural photo stop on the approach from the station or Place Rapp.', tip: 'Seasonal installations can move; this pin records the location from my visit.',
      photo: { src: '/images/guides/colmar/colmar-sign-champ-de-mars-2025.webp', alt: 'Large red COLMAR letters in Parc du Champ de Mars, with Christmas decorations hanging among the trees.', year: 2025, width: 1200, height: 675 } },
    { id: 'photo-maison-des-tetes', name: 'Maison des Têtes — Facade Photo Spot', shortName: 'Maison des Têtes', category: 'photo', icon: 'camera', coordinates: point('Maison des Têtes'),
      text: 'Look up for the carved faces and ornate projecting windows of Maison des Têtes.', tip: 'Try one photo of the whole facade and another closer view of the carved details.',
      photo: { src: '/images/guides/colmar/maison-des-tetes-facade-2025.webp', alt: 'The ornate Maison des Têtes facade in Colmar, with carved faces, projecting windows and a decorative gable against a blue sky.', year: 2025, width: 1000, height: 1333 } },
    { id: 'station', name: 'Colmar Station — Arrive by Train', shortName: 'Train station', category: 'arrival', icon: 'train', coordinates: point('Train Arrival'),
      text: 'Follow the dashed blue approach from the station to join the suggested walk by Champ de Mars and Place Rapp.', tip: 'The mapped approach is about 800 m. Allow extra time for the Colmar sign and the fairground before continuing toward the markets.' },
    { id: 'parking-rapp', name: 'Parking Rapp — Arrive by Car', shortName: 'Parking Rapp', category: 'arrival', icon: 'parking', coordinates: point('Parking #1 - Place Rapp'),
      text: 'I parked here during my December 2025 visit. Start with the Colmar sign and Place Rapp’s fairground, then continue to Place des Dominicains.', tip: 'This pin helps you orient yourself on foot. Follow the car park’s signs for the vehicle entrance.' },
    { id: 'parking-josse', name: 'Parking Saint-Josse — Arrive by Car', shortName: 'Saint-Josse', category: 'arrival', icon: 'parking', coordinates: point('Parking #2 - Parking St Josse'),
      text: 'An alternative parking location marked on my visitor map, east of the old town.', tip: 'Use walking directions from the car park to your chosen stop. A connection from this car park is not included in the drawn route.' },
    { id: 'join-walk', name: 'Join the Walk — Place des Dominicains', shortName: 'Join the walk', category: 'arrival', icon: 'start', coordinates: point('START HERE'),
      text: 'Already in the old town? Join the suggested walk here, near Place des Dominicains.', tip: 'If arriving by train or parking at Place Rapp, the approach through Champ de Mars adds the Colmar sign and fairground first.' },
    { id: 'covered-market', name: 'Marché Couvert — Covered Food Market', shortName: 'Covered market', category: 'useful', icon: 'food', coordinates: point('Covered Market'),
      video: { libraryId: '780712', videoId: '29dee81b-247b-492e-b83f-7547db31716b', title: 'Marché Couvert & the canal' },
      text: 'The covered food market is a useful stop for food and an indoor break near the canal.', tip: 'I marked this as a place to sit and eat indoors. Check the individual food counters’ hours and seating when you visit.' },
    { id: 'canal-boats', name: 'Petite Venise — Canal Boat Rides', shortName: 'Canal boat rides', category: 'useful', icon: 'boat', coordinates: point('Boat Rides on Canal'),
      text: 'This is the boat departure point I marked in Petite Venise. A ride along the canal is an optional stop as you explore this part of town.', tip: 'Check departures and availability before planning your visit around a boat ride.' },
    { id: 'canal-restaurant', name: 'Canal-side Restaurant — Outdoor Tables', shortName: 'Canal-side dining', category: 'useful', icon: 'food', coordinates: point('Outdoor Restaurant on Canal'),
      text: 'I marked this spot for an outdoor meal beside the canal, near the covered market.', tip: 'Check whether the terrace is open when you visit, especially during the Christmas season.' },
    { id: 'groceries', name: 'Groceries & Essentials', shortName: 'Groceries', category: 'useful', icon: 'basket', coordinates: point('Grocery Store'),
      text: 'The grocery stop I marked for snacks, water, and everyday supplies near the northern end of the walk.', tip: 'Check the shop’s posted opening hours, especially on Sundays and holidays.' },
    { id: 'saint-martin', name: 'Saint-Martin Church', shortName: 'Saint-Martin', category: 'useful', icon: 'landmark', coordinates: point('Saint Martin'),
      video: { libraryId: '780712', videoId: '8c651bef-7116-4624-89f9-c3c7b530b34c', title: 'Place de la Cathédrale & Saint-Martin' },
      text: 'Pause in Place de la Cathédrale to look at the church and surrounding old-town buildings between the market squares.', photo: photos.C198 },
    { id: 'place-rapp', name: 'Place Rapp — Christmas Fair & Rides', shortName: 'Fair & rides', category: 'useful', icon: 'fair', coordinates: point('Place Rapp (Carnival Rides)'),
      text: 'The fairground and rides near Champ de Mars are an extra stop on the approach to the old-town Christmas markets.', tip: 'Allow a little extra time here if you are visiting with children. This fairground is separate from the six main markets.' },
  ] as VisitorMapData['stops']).map(stop => ({ ...stop, photos: colmarStopGalleries[stop.id] })),
};
