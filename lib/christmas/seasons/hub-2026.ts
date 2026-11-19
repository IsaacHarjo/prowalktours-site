// Editorial season data, separate from filming dates and the master tour Sheet.
// Rechecked against the linked organisers/tourism offices on 19 November 2026.
// Never roll these dates forward automatically. City-wide cards name the market
// covered by the dates; other markets in the same city may follow another calendar.
export type HubMarketSeason = { dates: string; market: string; note?: string; source: string };
export const hubSeasonYear = 2026;
export const hubSeasonCheckedOn = "2026-11-19";
export const hubMarketSeasons: Record<string, HubMarketSeason> = {
  "France/Colmar": { dates: "23 Nov–29 Dec 2026", market: "Main Christmas markets", note: "Gourmet Market continues to 3 Jan 2027.", source: "https://www.noel-colmar.com/en/colmar-the-magic-of-christmas/practical" },
  "France/Kaysersberg": { dates: "27–29 Nov · 4–6, 11–13 & 18–20 Dec 2026", market: "Artisan Christmas market", note: "Friday–Sunday only on these four weekends.", source: "https://www.kaysersberg.com/pratique/foire-aux-questions/" },
  "France/Ribeauvillé": { dates: "5–6 & 12–13 Dec 2026", market: "Medieval Christmas market", note: "Two weekends only.", source: "https://www.ribeauville.fr/fr/marche-de-noel-medieval-1.html" },
  "France/Riquewihr": { dates: "27 Nov–20 Dec 2026", market: "Traditional Christmas market", source: "https://www.tourisme-colmar.com/fr/loisirs-fr/culture/bibliotheques/F229002783_marche-de-noel-traditionnel-de-riquewihr-riquewihr" },
  "France/Strasbourg": { dates: "27 Nov–24 Dec 2026", market: "Strasbourg Christmas markets", source: "https://noel.strasbourg.eu/foire-aux-questions/" },
  "Germany/Rothenburg ob der Tauber": { dates: "20 Nov–23 Dec 2026", market: "Reiterlesmarkt", note: "Closed 22 Nov.", source: "https://www.rothenburg-tourismus.de/reiterlesmarkt" },
  "Germany/Nuremberg": { dates: "27 Nov–24 Dec 2026", market: "Christkindlesmarkt", note: "Sister Cities Market closes 23 Dec.", source: "https://tourismus.nuernberg.de/erleben/christkindlesmarkt/" },
  "Germany/Dresden": { dates: "25 Nov–24 Dec 2026", market: "Striezelmarkt on Altmarkt", source: "https://www.sachsen-tourismus.de/event/dresdner-striezelmarkt" },
  "Germany/Freiburg": { dates: "19 Nov–23 Dec 2026", market: "Freiburg Christmas market", note: "Closed 22 Nov.", source: "https://weihnachtsmarkt.freiburg.de/en/" },
  "Germany/Aachen": { dates: "20 Nov–23 Dec 2026", market: "Aachen Christmas market", note: "Opens at 6pm on 22 Nov.", source: "https://www.aachen-tourismus.de/service/faq/" },
  "Germany/Cologne": { dates: "16 Nov–23 Dec 2026", market: "Christmas market at the cathedral", note: "Closed 22 Nov. Other Cologne markets have separate dates.", source: "https://www.koelnerweihnachtsmarkt.com/de/" },
  "Germany/Esslingen": { dates: "24 Nov–22 Dec 2026", market: "Medieval & Christmas market", source: "https://www.esslingen-info.com/en/events/esslingen-christmas-medieval-market" },
  "Germany/Munich": { dates: "20 Nov–24 Dec 2026", market: "Christkindlmarkt at Marienplatz", source: "https://stadt.muenchen.de/infos/christkindlmarkt.html" },
  "Germany/Stuttgart": { dates: "25 Nov–23 Dec 2026", market: "Stuttgart Christmas market", source: "https://www.stuttgarter-weihnachtsmarkt.de/de/" },
  "Switzerland/Basel": { dates: "26 Nov–23 Dec 2026", market: "Barfüsserplatz & Münsterplatz", note: "Theaterplatz Christmas Village continues to 3 Jan 2027.", source: "https://www.basel.com/en/events/christmas/christmas-market" },
  "Austria/Vienna": { dates: "13 Nov–26 Dec 2026", market: "Rathausplatz Christmas market", note: "Other Vienna markets have separate dates.", source: "https://www.wien.info/en/now-on/christmas/christmas-markets-342664" },
  "Czechia/Prague": { dates: "28 Nov 2026–6 Jan 2027", market: "Old Town & Wenceslas Square markets", source: "https://prague.eu/en/christmas-markets" },
  "Denmark/Copenhagen": { dates: "13 Nov 2026–3 Jan 2027", market: "Christmas in Tivoli", note: "Ticketed entry. Other Copenhagen markets have separate dates.", source: "https://www.tivoli.dk/en/opening-hours-and-seasons/christmas-in-tivoli" },
  "Hungary/Budapest": { dates: "13 Nov 2026–1 Jan 2027", market: "Advent Basilica, Szent István Square", note: "Other Budapest markets have separate dates.", source: "https://adventbazilika.hu/en/opening-hours" },
  "Italy/Limatola Castle": { dates: "6–8, 13–15 & 20–22 Nov · 26 Nov–13 Dec 2026", market: "Cadeaux al Castello", note: "Selected November weekends, then daily from 26 Nov. Ticketed entry.", source: "https://cadeauxalcastello.it/" },
  "Norway/Oslo": { dates: "7 Nov 2026–3 Jan 2027", market: "Jul i Vinterland, Spikersuppa", note: "Closed 24 Dec.", source: "https://www.julivinterland.no/info/hva-er-apningstidene-pa-jul-i-vinterland" },
};
