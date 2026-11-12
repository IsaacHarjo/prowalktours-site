import type { GuideFaq } from '../guides/types';

// Background checked against the linked tourism-office and museum sources on 14 October 2026.
export const colmarFaq: GuideFaq[] = [
  {
    question: 'Does the walk include steps or indoor passages?',
    answer: 'The elevated Koïfhus photo spot involves stairs; you can enjoy the view from street level too. The Monoprix shopping passage and indoor markets depend on opening hours. If a passage is closed, use the surrounding streets. This is a suggested sightseeing walk, and I have not assessed the full route for step-free access.',
  },
  {
    question: 'Is Rue des Clefs one of the Christmas markets?',
    answer: 'Rue des Clefs is mainly a shopping street. I enjoy walking it during the day and after dark for the shops and Christmas lights, but most of the market stalls are in the squares. It is part of the return through the old town on my suggested route.',
  },
  {
    question: 'What food is Colmar known for?',
    answer: 'Look for Alsatian specialties such as tarte flambée, choucroute, baeckeoffe and Munster cheese. For something sweet, there are kougelhopf cakes, pain d’épices (gingerbread) and bredele Christmas biscuits. Vin chaud is the warm spiced wine you will see at the markets. These are regional specialties; the selection varies between stalls and restaurants.',
    source: { label: 'Alsatian food & Christmas specialties', href: 'https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/presentation/gastronomic-specialities' },
  },
  {
    question: 'What can I do if it’s cold or raining?',
    answer: 'If you want a break from walking outside, leave time for an indoor visit between the markets. The Toy Museum and Choco-Story are two options to consider, especially if you’re visiting with children. Check opening hours and tickets for your date before heading over.',
    items: [
      { title: 'Toy Museum', text: 'An indoor stop focused on toys and games, with collections that span different generations.', source: { label: 'Toy Museum visitor information', href: 'https://museedujouet.colmar.fr/visites/informations-pratiques/' } },
      { title: 'Choco-Story', text: 'Explore the story of chocolate, with tastings included in the museum visit.', source: { label: 'Choco-Story visitor information', href: 'https://www.choco-story-colmar.fr/' } },
    ],
  },
  {
    question: 'Is there a nearby evening outing beyond Colmar?',
    answer: 'Turckheim’s night-watchman walk is an option if you have another evening to spare. A costumed watchman leads the round through town, sharing its history and traditions. For Christmas 2026, departures are at 9pm from the Corps de Garde on Place Turenne, 1–23 December and 26–30 December. Check the latest details and arrange your return journey before setting out, especially if you’re relying on public transport.',
    source: { label: 'Turckheim’s official night-watchman dates & meeting point', href: 'https://turckheim.com/fr/gastronomie-vins/viticulteurs/F235015751_la-ronde-de-lunique-et-authentique-veilleur-de-nuit-pendant-lavent-turckheim' },
    checkedOn: '2026-11-11',
  },
  {
    question: 'Where is Colmar located?',
    answer: 'Colmar is in Alsace, in northeastern France, near the German border. Use the regional map above to see how Colmar fits into a trip around the nearby Christmas market towns.',
    source: { label: 'Colmar tourist office', href: 'https://www.tourisme-colmar.com/en/visit/colmar-seen-by/bloggers' },
  },
  {
    question: 'Why is it called Little Venice?',
    answer: 'Petite Venise, or Little Venice, is the area along the Lauch River. The tourist office traces the nickname to the rows of houses lining both sides of the water. The bridges and colorful half-timbered buildings are part of what makes this stretch so memorable.',
    source: { label: 'About Petite Venise', href: 'https://www.tourisme-colmar.com/en/whats-on/sports-nature/sports-activities/F235008803_little-venice-colmar' },
  },
  {
    question: 'What else is worth seeing in Colmar?',
    answer: 'The suggested walk passes several old-town sights between the markets. If you want to visit a museum as well, allow extra time and check its opening hours separately.',
    items: [
      { title: 'Petite Venise', text: 'Colorful houses, bridges and views along the Lauch River.' },
      { title: 'Saint-Martin & Maison Pfister', text: 'Walk around the church, then look for Maison Pfister as you follow Rue des Marchands toward the Koïfhus.' },
      { title: 'Unterlinden Museum', text: 'The museum includes a former 13th-century convent and houses the Isenheim Altarpiece.', source: { label: 'Unterlinden Museum', href: 'https://www.musee-unterlinden.com/en/the-restoration-of-the-issenheim-altarpiece/' } },
      { title: 'Maison des Têtes', text: 'A Renaissance building from 1609, with 106 carved heads and masks decorating its facade.', source: { label: 'About Maison des Têtes', href: 'https://tourisme-colmar.com/en/visit/presentation/architectural-heritage/architectural-heritage-list/F235008785_house-of-heads-colmar' } },
      { title: 'Koïfhus', text: 'The old customs house, completed in 1480, where Grand Rue meets Rue des Marchands.', source: { label: 'About the Koïfhus', href: 'https://www.tourisme-colmar.com/en/visit/presentation/architectural-heritage/architectural-heritage-list/F235008797_koifhus-colmar' } },
      { title: 'Bartholdi Museum', text: 'A museum in the birthplace of Auguste Bartholdi, the sculptor of the Statue of Liberty.', source: { label: 'Bartholdi Museum', href: 'https://www.musee-bartholdi.fr/musee/histoire-du-musee/' } },
    ],
  },
];
