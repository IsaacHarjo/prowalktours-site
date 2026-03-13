export type VideoRecord = {
  id: string;
  slug: string;
  siteTitle: string;
  youtubeTitle: string;
  youtubeUrl: string;
  thumbnail: string;
  country: string;
  region: string;
  city: string;
  filmingDates: string[];
  filmingMonthYear: string;
  durationLabel: string;
  durationSeconds: number;
  weather: string;
  shortDescription: string;
  keywords: string[];
  landmarks: string[];
  themes: string[];
  timeOfDay: string;
  videoType: string;
  visibility: string;
  highlights: Array<{
    title: string;
    timeLabel: string;
    seconds: number;
    imageSrc: string;
    alt: string;
  }>;
};

export const videos: VideoRecord[] = [
  {
    id: "naples-daytime-walk-2023",
    slug: "naples-daytime-walk-2023",
    siteTitle: "Naples, Italy — July 2023",
    youtubeTitle: "Naples, Italy — July 2023",
    youtubeUrl: "https://www.youtube.com/watch?v=990AqbKb18c",
    thumbnail: "https://i.ytimg.com/vi/990AqbKb18c/maxresdefault.jpg",
    country: "Italy",
    region: "Campania",
    city: "Naples",
    filmingDates: ["2023-07-06", "2023-07-22", "2023-07-23"],
    filmingMonthYear: "July 2023",
    durationLabel: "5h 45m",
    durationSeconds: 20700,
    weather: "Sunny, 90°F / 32°C",
    shortDescription:
      "Explore Naples from Montesanto through the historic center, Sanità, the Spanish Quarter, and the waterfront in this immersive long-form walking tour filmed over three days in July 2023.",
    keywords: [
      "Naples",
      "Napoli",
      "Italy",
      "Campania",
      "walking tour",
      "day walk",
      "historic center",
      "Sanità",
      "Spanish Quarter",
      "waterfront",
      "July 2023",
    ],
    landmarks: [
      "Pignasecca Market",
      "Spaccanapoli",
      "Piazza del Gesu Nuovo",
      "Basilica di Santa Chiara",
      "San Gregorio Armeno",
      "National Archaeological Museum",
      "Quartieri Spagnoli",
      "Galleria Umberto I",
      "Piazza del Plebiscito",
      "Castel dell'Ovo",
      "Via Partenope",
    ],
    themes: [
      "historic center",
      "street life",
      "markets",
      "churches",
      "piazzas",
      "waterfront views",
      "urban exploration",
    ],
    timeOfDay: "daytime",
    videoType: "walking tour",
    visibility: "public",
    highlights: [
      {
        title: "Pignasecca Market",
        timeLabel: "7:21",
        seconds: 441,
        imageSrc: "/naples-day-july-2023/highlights/pignasecca.jpg",
        alt: "Fruit stall at Pignasecca Market in Naples, Italy",
      },
      {
        title: "Spaccanapoli",
        timeLabel: "28:05",
        seconds: 1685,
        imageSrc: "/naples-day-july-2023/highlights/spaccanapoli.jpg",
        alt: "Crowded Spaccanapoli street in Naples, Italy",
      },
      {
        title: "Leather Shop",
        timeLabel: "30:44",
        seconds: 1844,
        imageSrc: "/naples-day-july-2023/highlights/leather-shop.jpg",
        alt: "Leather craftsman working in a small shop in Naples, Italy",
      },
      {
        title: "Piazza del Gesu Nuovo",
        timeLabel: "33:48",
        seconds: 2028,
        imageSrc: "/naples-day-july-2023/highlights/naples-piazza-gesu-nuovo.jpg",
        alt: "Piazza del Gesu Nuovo with cafes and street decorations in Naples, Italy",
      },
      {
        title: "Church of Gesu Nuovo",
        timeLabel: "35:48",
        seconds: 2148,
        imageSrc: "/naples-day-july-2023/highlights/naples-church-of-gesu-nuovo.jpg",
        alt: "Interior of Gesu Nuovo Church in Naples, Italy",
      },
      {
        title: "Basilica di Santa Chiara",
        timeLabel: "48:23",
        seconds: 2903,
        imageSrc: "/naples-day-july-2023/highlights/naples-basilica-di-santa-chiara-church.jpg",
        alt: "Facade of the Basilica di Santa Chiara in Naples, Italy",
      },
      {
        title: "Palazzo Venezia",
        timeLabel: "59:20",
        seconds: 3560,
        imageSrc: "/naples-day-july-2023/highlights/palazzo-venezia.jpg",
        alt: "Courtyard entrance of Palazzo Venezia in Naples, Italy",
      },
      {
        title: "Piazza San Domenico Maggiore",
        timeLabel: "1:09:47",
        seconds: 4187,
        imageSrc: "/naples-day-july-2023/highlights/piazza-san-domenico-maggiore.jpg",
        alt: "Piazza San Domenico Maggiore in Naples, Italy",
      },
      {
        title: "Piazzetta Nilo",
        timeLabel: "1:13:37",
        seconds: 4417,
        imageSrc: "/naples-day-july-2023/highlights/naples-piazzetta-nilo-town-square.jpg",
        alt: "Piazzetta Nilo with cafes and flags in Naples, Italy",
      },
      {
        title: "Doll Hospital",
        timeLabel: "1:29:17",
        seconds: 5357,
        imageSrc: "/naples-day-july-2023/highlights/doll-hospital.jpg",
        alt: "Vintage doll display inside the Doll Hospital in Naples, Italy",
      },
      {
        title: "San Gennaro Mural",
        timeLabel: "1:42:14",
        seconds: 6134,
        imageSrc: "/naples-day-july-2023/highlights/naples-san-gennaro-mural-painting.jpg",
        alt: "San Gennaro mural on a narrow street in Naples, Italy",
      },
      {
        title: "Via dei Tribunali",
        timeLabel: "1:48:40",
        seconds: 6520,
        imageSrc: "/naples-day-july-2023/highlights/via-dei-tribunali.jpg",
        alt: "Busy Via dei Tribunali in Naples, Italy",
      },
      {
        title: "Duomo di Napoli",
        timeLabel: "1:50:18",
        seconds: 6618,
        imageSrc: "/naples-day-july-2023/highlights/duomo.jpg",
        alt: "Facade of Naples Cathedral in Naples, Italy",
      },
      {
        title: "San Lorenzo Maggiore",
        timeLabel: "2:14:59",
        seconds: 8099,
        imageSrc: "/naples-day-july-2023/highlights/san-lorenzo-maggiore.jpg",
        alt: "Interior of San Lorenzo Maggiore in Naples, Italy",
      },
      {
        title: "San Gregorio Armeno",
        timeLabel: "2:22:39",
        seconds: 8559,
        imageSrc: "/naples-day-july-2023/highlights/san-gregorio-armeno.jpg",
        alt: "Crowded San Gregorio Armeno street in Naples, Italy",
      },
      {
        title: "Bust of Pulcinella",
        timeLabel: "2:48:56",
        seconds: 10136,
        imageSrc: "/naples-day-july-2023/highlights/bust-of-pulcinella.jpg",
        alt: "Bust of Pulcinella in Naples, Italy",
      },
      {
        title: "Piazza Vincenzo Bellini",
        timeLabel: "2:57:33",
        seconds: 10653,
        imageSrc: "/naples-day-july-2023/highlights/piazza-vincenzo-bellini.jpg",
        alt: "Piazza Vincenzo Bellini in Naples, Italy",
      },
      {
        title: "Via Port'Alba",
        timeLabel: "3:03:09",
        seconds: 10989,
        imageSrc: "/naples-day-july-2023/highlights/via-portalba.jpg",
        alt: "Archway entrance on Via Port'Alba in Naples, Italy",
      },
      {
        title: "Piazza Dante",
        timeLabel: "3:06:24",
        seconds: 11184,
        imageSrc: "/naples-day-july-2023/highlights/piazza-dante.jpg",
        alt: "Piazza Dante with curved facade and clock tower in Naples, Italy",
      },
      {
        title: "Galleria Principe di Napoli",
        timeLabel: "3:13:42",
        seconds: 11622,
        imageSrc: "/naples-day-july-2023/highlights/naples-galleria-principe-di-napoli.jpg",
        alt: "Entrance to Galleria Principe di Napoli in Naples, Italy",
      },
      {
        title: "National Archaeological Museum",
        timeLabel: "3:16:09",
        seconds: 11769,
        imageSrc: "/naples-day-july-2023/highlights/archaeological-museum.jpg",
        alt: "National Archaeological Museum of Naples in Naples, Italy",
      },
      {
        title: "Piazza Cavour",
        timeLabel: "3:18:26",
        seconds: 11906,
        imageSrc: "/naples-day-july-2023/highlights/naples-piazza-cavour.jpg",
        alt: "Fountain and buildings at Piazza Cavour in Naples, Italy",
      },
      {
        title: "Via Vergini (Outdoor Market)",
        timeLabel: "3:26:12",
        seconds: 12372,
        imageSrc: "/naples-day-july-2023/highlights/naples-via-vergini-market.jpg",
        alt: "Outdoor market on Via Vergini in Naples, Italy",
      },
      {
        title: "Palazzo dello Spagnolo",
        timeLabel: "3:31:06",
        seconds: 12666,
        imageSrc: "/naples-day-july-2023/highlights/naples-palazzo-dello-spagnolo.jpg",
        alt: "Interior courtyard of Palazzo dello Spagnolo in Naples, Italy",
      },
      {
        title: "San Felice Palace",
        timeLabel: "3:39:18",
        seconds: 13158,
        imageSrc: "/naples-day-july-2023/highlights/naples-san-felice-palace.jpg",
        alt: "Courtyard facade of Palazzo San Felice in Naples, Italy",
      },
      {
        title: "Basilica di Santa Maria della Sanita",
        timeLabel: "3:44:21",
        seconds: 13461,
        imageSrc:
          "/naples-day-july-2023/highlights/naples-basilica-di-santa-maria-della-sanita-church.jpg",
        alt: "Basilica di Santa Maria della Sanita in Naples, Italy",
      },
      {
        title: "Ponte Maddalena Cerasuolo",
        timeLabel: "3:47:25",
        seconds: 13645,
        imageSrc: "/naples-day-july-2023/highlights/naples-ponte-maddalena-cerasuolo.jpg",
        alt: "Ponte Maddalena Cerasuolo arch in Naples, Italy",
      },
      {
        title: "Piazza Dante",
        timeLabel: "3:55:46",
        seconds: 14146,
        imageSrc: "/naples-day-july-2023/highlights/naples-piazza-dante-2.jpg",
        alt: "People relaxing in Piazza Dante in Naples, Italy",
      },
      {
        title: "Via Toledo",
        timeLabel: "3:58:55",
        seconds: 14335,
        imageSrc: "/naples-day-july-2023/highlights/naples-via-toledo-2-street.jpg",
        alt: "Pedestrians on Via Toledo in Naples, Italy",
      },
      {
        title: "Quartieri Spagnoli",
        timeLabel: "4:09:16",
        seconds: 14956,
        imageSrc: "/naples-day-july-2023/highlights/naples-spanish-quarter-2.jpg",
        alt: "Decorated street in Quartieri Spagnoli in Naples, Italy",
      },
      {
        title: "Largo Maradona",
        timeLabel: "4:18:41",
        seconds: 15521,
        imageSrc: "/naples-day-july-2023/highlights/largo-maradona.jpg",
        alt: "Diego Maradona mural at Largo Maradona in Naples, Italy",
      },
      {
        title: "Galleria Umberto I",
        timeLabel: "4:42:01",
        seconds: 16921,
        imageSrc: "/naples-day-july-2023/highlights/naples-galleria-umberto-i.jpg",
        alt: "Interior of Galleria Umberto I in Naples, Italy",
      },
      {
        title: "Gran Caffe Gambrinus",
        timeLabel: "4:50:58",
        seconds: 17458,
        imageSrc: "/naples-day-july-2023/highlights/naples-gambrinus-cafe.jpg",
        alt: "Exterior of Gran Caffe Gambrinus in Naples, Italy",
      },
      {
        title: "Piazza del Plebiscito",
        timeLabel: "4:53:22",
        seconds: 17602,
        imageSrc: "/naples-day-july-2023/highlights/piazza-del-plebiscito.jpg",
        alt: "Piazza del Plebiscito and Basilica of San Francesco di Paola in Naples, Italy",
      },
      {
        title: "Waterfront Lungomare",
        timeLabel: "5:00:45",
        seconds: 18045,
        imageSrc: "/naples-day-july-2023/highlights/naples-waterfront-1.jpg",
        alt: "Lungomare waterfront promenade in Naples, Italy",
      },
      {
        title: "Rotonda Swimming Hole",
        timeLabel: "5:04:52",
        seconds: 18292,
        imageSrc: "/naples-day-july-2023/highlights/naples-rotonda-via-nazario-sauro-2.jpg",
        alt: "People swimming near Via Nazario Sauro on the Naples waterfront, Italy",
      },
      {
        title: "Fontana del Gigante",
        timeLabel: "5:15:57",
        seconds: 18957,
        imageSrc: "/naples-day-july-2023/highlights/naples-fontana-del-gigante-fountain.jpg",
        alt: "Fontana del Gigante near the waterfront in Naples, Italy",
      },
      {
        title: "Castel dell'Ovo",
        timeLabel: "5:18:53",
        seconds: 19133,
        imageSrc: "/naples-day-july-2023/highlights/castel-dellovo.jpg",
        alt: "Walkway leading to Castel dell'Ovo in Naples, Italy",
      },
      {
        title: "Via Partenope",
        timeLabel: "5:33:05",
        seconds: 19985,
        imageSrc: "/naples-day-july-2023/highlights/naples-waterfront2.jpg",
        alt: "Via Partenope waterfront road in Naples, Italy",
      },
    ],
  },
];
