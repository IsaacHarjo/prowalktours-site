import type { GuideFaq, GuideWalk } from '../guides/types';

export const baselSources = {
  market: 'https://www.basel.com/en/events/christmas/christmas-market',
  christmas: 'https://www.basel.com/en/events/christmas',
  village: 'https://www.basel.com/en/events-calendar/basel-christmas-village-d952927b39',
  advaentsgass: 'https://www.basel.com/en/attractions/advaentsgass-ed42b6ead0',
  parking: 'https://www.basel.com/en/attractions/elisabethen-parking-7b67389c6c',
  airport: 'https://www.basel.com/en/arrival-getting-around/aeroplane',
  card: 'https://www.basel.com/en/baselcard',
  minster: 'https://www.basel.com/en/attractions/basler-muenster-bc9d869a33',
};
// Supplied guide films; these do not replace or renumber the master tour catalogue.
const shared = { country: 'Switzerland', region: 'Basel-Stadt', city: 'Basel', keywords: ['Basel', 'Christmas'], landmarks: ['Münsterplatz', 'Barfüsserplatz', 'Rathaus', 'Mittlere Brücke'], themes: ['christmas-market'], timeOfDay: 'evening', videoType: 'evening-walk', highlights: [], watchDestinationType: 'youtube' as const };
export const baselWalks: GuideWalk[] = [
  { ...shared, id: 'basel-guide-evening-2025', slug: 'basel-evening-walk-2025', siteTitle: 'Basel Christmas Market Evening Walk 2025', youtubeTitle: 'Basel Christmas Market Evening Walk 2025', youtubeId: 'uH54xuhW6U4', youtubeUrl: 'https://youtu.be/uH54xuhW6U4', watchHref: 'https://youtu.be/uH54xuhW6U4', thumbnail: 'https://i.ytimg.com/vi/uH54xuhW6U4/hqdefault.jpg', filmedYear: 2025, filmingDates: ['2025-12-11'], filmingMonthYear: 'December 2025', durationLabel: '1:35:07', durationSeconds: 5707, weather: '10°C', shortDescription: 'From late afternoon on Münsterplatz to the markets, Town Hall and Rhine after dark.', visibility: 'public' },
  { ...shared, id: 'ch-0001', slug: 'basel-switzerland-christmas-market-4k-60fps-with-captions-dexno5w3-m0', siteTitle: 'Basel Christmas Market Evening Walk 2022', youtubeTitle: 'Basel, Switzerland Christmas Market', youtubeId: 'DeXnO5W3-M0', youtubeUrl: 'https://youtu.be/DeXnO5W3-M0', watchHref: 'https://youtu.be/DeXnO5W3-M0', thumbnail: 'https://i.ytimg.com/vi/DeXnO5W3-M0/hqdefault.jpg', filmedYear: 2022, filmingDates: ['2022-12-16'], filmingMonthYear: 'December 2022', durationLabel: '1:17:45', durationSeconds: 4665, weather: '-6°C, fresh snow', shortDescription: 'My snowy December evening through the cathedral market, old town and river views.', visibility: 'public' },
];
export const baselFaqs: GuideFaq[] = [
  { question: 'How much time should I allow?', answer: 'I would give Basel an afternoon and evening. That leaves time for both main markets, something to eat, the Rathaus courtyard and a look over the Rhine. Stay long enough to see Münsterplatz after dark. Add more time for museums, the Minster interior or the optional walks.' },
  { question: 'Where should I start the walk?', answer: 'My suggested route begins at Barfüsserplatz, convenient for trams and the walk from Basel SBB. Both of my evening films begin at Münsterplatz instead. You can join the suggested route there if that suits your arrival better. The route finishes at Münsterplatz, so allow extra time to return to your station or parking garage.' },
  { question: 'Are there Christmas markets after 23 December?', answer: 'The two main markets on Barfüsserplatz and Münsterplatz end on 23 December 2026. The new Christmas village at Theaterplatz is scheduled to continue until 3 January 2027. Check its programme for holiday hours before travelling.', source: { label: 'Basel Christmas Village', href: baselSources.village } },
  { question: 'Is this a step-free route?', answer: 'This is not a verified step-free itinerary. Cathedral Hill and Rheinsprung involve slopes, and the cloister passage and Rathaus gallery may involve steps. The ferry steps below the Pfalz are not needed for the main walk. You can leave out the interior passages and gallery, but check a suitable accessible route for your own needs.' },
  { question: 'Can I use euros at the markets?', answer: 'Switzerland uses Swiss francs (CHF). A fudge seller accepted my euro coins in 2022, but that was an individual kindness, not something I would rely on. Check payment options and prices before ordering, and have a way to pay in francs.' },
  { question: 'Is Basel a good market to visit with children?', answer: 'The Märchenwald on Münsterplatz is worth allowing time for. In 2025 I saw a little train, candle dipping, blacksmithing and bread baked over a fire. Check the current programme, age requirements and prices for activities rather than assuming everything is included.', source: { label: 'Official Christmas programme', href: baselSources.christmas } },
  { question: 'Does the BaselCard cover a stay in France?', answer: 'No. The BaselCard is for eligible overnight guests in the canton of Basel-Stadt. I stayed in France in 2025, so that arrangement is different. Eligible guests receive local public transport benefits, but the card does not cover travel into France.', source: { label: 'BaselCard eligibility and travel area', href: baselSources.card } },
];
