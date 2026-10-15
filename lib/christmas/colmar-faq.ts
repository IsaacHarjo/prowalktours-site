import type { GuideFaq } from '../guides/types';

// Background checked against the linked tourism-office and museum sources on 14 October 2026.
export const colmarFaq: GuideFaq[] = [
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
  {
    question: 'What food is Colmar known for?',
    answer: 'Look for Alsatian specialties such as tarte flambée, choucroute, baeckeoffe and Munster cheese. For something sweet, there are kougelhopf cakes, pain d’épices (gingerbread) and bredele Christmas biscuits. Vin chaud is the warm spiced wine you will see at the markets. These are regional specialties; the selection varies between stalls and restaurants.',
    source: { label: 'Alsatian food & Christmas specialties', href: 'https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/presentation/gastronomic-specialities' },
  },
  {
    question: 'Is Rue des Clefs one of the Christmas markets?',
    answer: 'Rue des Clefs is mainly a shopping street. I enjoy walking it during the day and after dark for the shops and Christmas lights, but most of the market stalls are in the squares. It is part of the return through the old town on my suggested route.',
  },
  {
    question: 'Does the walk include steps or indoor passages?',
    answer: 'The elevated Koïfhus photo spot involves stairs; you can enjoy the view from street level too. The Monoprix shopping passage and indoor markets depend on opening hours. If a passage is closed, use the surrounding streets. This is a suggested sightseeing walk, and I have not assessed the full route for step-free access.',
  },
];
