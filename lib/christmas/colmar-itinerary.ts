import type { VisitorMapData } from '../guides/visitor-map-types';

// First-person observations supplied by the owner on 14 October 2026.
// The later stops follow the existing visitor route; original coordinates are unchanged.
export const colmarItinerary: NonNullable<VisitorMapData['itinerary']> = {
  title: 'From the Colmar sign through all six markets',
  introduction: 'Start in Parc du Champ-de-Mars, then follow the stops in order. Allow at least three hours, with longer for food, shopping and the optional detours. You can join the walk at any step.',
  steps: [
    {
      stopId: 'photo-sign', title: 'Parc du Champ-de-Mars & the Colmar sign', label: 'Start here · Photo spot',
      text: 'I like starting in this park. The Colmar sign makes a natural first photo stop before walking into the Christmas markets.',
      tip: 'The sign was here during my December 2025 visit. Seasonal displays can move.',
      onward: 'Head toward Place Rapp and its Christmas fair to pick up the green route on the map.',
    },
    {
      stopId: 'place-rapp', title: 'Place Rapp & the Christmas pyramid', label: 'Fairground · Optional rides',
      text: 'Look for the large Pyramide de Noël, then walk through the fairground. This area is mainly small rides for children, so spend as much or as little time here as you like.',
      tip: 'The fair is an extra stop on the approach to the six Christmas markets.',
      onward: 'Follow the route into the old town toward Place des Dominicains, your first Christmas market.',
    },
    {
      stopId: 'dominicains', title: 'Place des Dominicains & its hidden courtyard', label: 'Christmas market',
      text: 'This is where I head for the main Christmas tree and the stalls around Église des Dominicains. Explore both sides of the church before moving on.',
      highlights: [
        'Look for the small courtyard entrance at 23 Rue des Serruriers. It is easy to miss and worth stepping into when it is open.',
        'Keep walking around the church: the market continues on the other side.',
        'For the loop on my route, continue to Place des Unterlinden, walk through the Monoprix shopping passage to Place de la Mairie, then return to the Dominicains market. The passage has large doors at both ends.',
      ],
      tip: 'The Monoprix passage is a shopping passage. Use the surrounding streets if its doors are closed.',
      onward: 'Continue to Place de la Cathédrale and Saint-Martin.',
    },
    {
      stopId: 'saint-martin', title: 'Place de la Cathédrale & Saint-Martin', label: 'Old-town landmark',
      text: 'Make a full circuit of the church to see the square from every side. I also recommend going inside if it is open to visitors.',
      tip: 'Allow time for the interior and respect any service taking place.',
      onward: 'Walk over to Rue des Marchands and head past Maison Pfister toward the Koïfhus. There are plenty of sweets shops along the way. Pause in front of the Koïfhus: this is one of my favorite views of the Christmas streets.',
    },
    {
      stopId: 'photo-koifhus', title: 'The Koïfhus steps: look back', label: 'Photo spot · Stairs',
      text: 'Walk up the Koïfhus steps and turn back toward Rue des Marchands. The view of the old half-timbered houses is especially good when the Christmas lights are on.',
      tip: 'This viewpoint involves stairs. You can also enjoy the street-level view from in front of the building. Leave room for people using the steps.',
      onward: 'When the passage is open, walk through the Koïfhus toward Place de l’Ancienne Douane. You can also walk around the building.',
    },
    {
      stopId: 'ancienne-douane', title: 'Place de l’Ancienne Douane & Grand Rue', label: 'Christmas market',
      text: 'Take time to explore the stalls on both sides of the Koïfhus, between Place de l’Ancienne Douane and Grand Rue. The fountain, canal and decorated buildings make this a good place to slow down.',
      onward: 'Look inside the Koïfhus for the indoor craft market before leaving this area.',
    },
    {
      stopId: 'koifhus', title: 'Inside the Koïfhus', label: 'Indoor Christmas market',
      text: 'The old customs house also holds a separate indoor craft market. Browse the work by local artisans as well as the outdoor stalls around the building.',
      onward: 'Follow the green route northeast through the old town to Place Jeanne d’Arc.',
    },
    {
      stopId: 'jeanne-arc', title: 'Place Jeanne d’Arc', label: 'Christmas market · Regional food',
      text: 'Browse the regional food and Alsatian products here, including wines, cured meats and Christmas biscuits.',
      onward: 'Follow the route back through the old town and past the Koïfhus toward the Gourmet Market at Montagne Verte.',
    },
    {
      stopId: 'gourmet', title: 'The Gourmet Market', label: 'Christmas market · Food stop',
      text: 'This is a stop for prepared dishes and Alsatian specialties to eat on site or take away. Leave room in the walk for a food break if you want one.',
      tip: 'The Gourmet Market has different opening hours and season dates. See Plan your visit above.',
      onward: 'Continue toward the canal and the Marché Couvert.',
    },
    {
      stopId: 'covered-market', title: 'Marché Couvert & the canal', label: 'Optional food break',
      text: 'The covered food market is another place to look for something to eat and take an indoor break. The canal-side outdoor tables I marked are nearby, if the terrace is open.',
      tip: 'Check the food counters’ hours and available seating. This is separate from the Gourmet Christmas Market.',
      onward: 'Continue along the canal to the marked Petite Venise photo spot.',
    },
    {
      stopId: 'photo-canal', title: 'Petite Venise: the canal view', label: 'Photo spot',
      text: 'Pause for the colorful houses along the water. I like seeing this stretch in daylight and again as the Christmas lights come on.',
      tip: 'The boat departure point is also marked under All map stops if you want to add a ride. Check availability on the day.',
      onward: 'Follow the route west through Petite Venise to Place des Six Montagnes Noires.',
    },
    {
      stopId: 'petite-venise', title: 'Petite Venise children’s market', label: 'Christmas market · Families',
      text: 'Explore the children’s market at Place des Six Montagnes Noires, with its carousel and Santa’s giant letterbox. This completes the six Christmas markets on the walk.',
      onward: 'Follow the green route back through the old town, including Rue des Clefs, and on toward Maison des Têtes. Rue des Clefs is mainly a shopping street: enjoy the lights and storefronts along this part of the walk.',
    },
    {
      stopId: 'photo-maison-des-tetes', title: 'Maison des Têtes', label: 'Photo spot · Architecture',
      text: 'Look up for the carved faces, projecting windows and decorative gable. Try a view of the whole facade, then a closer photo of the details.',
      onward: 'Continue along the final part of the green route toward Parking Rapp.',
    },
    {
      stopId: 'parking-rapp', title: 'Back to Place Rapp', label: 'Finish the walk',
      text: 'The route finishes at Parking Rapp. If you came by train, continue back through Parc du Champ-de-Mars toward the station.',
      tip: 'You can stop here or return to a favorite square to see it after dark.',
    },
  ],
};
