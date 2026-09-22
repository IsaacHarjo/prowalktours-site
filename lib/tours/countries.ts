// One registry owns source files and map presentation. Country identity stays
// on each tour; mapGroup controls presentation only (e.g. Monaco near France).
export const tourCountries = [
  { name: "Italy", source: "italy.csv", color: "#009246", index: 0, center: [12.5674, 41.8719] as [number, number], zoom: 5.5 },
  { name: "France", source: "france.csv", color: "#ED2939", index: 1, center: [2.3522, 46.2276] as [number, number], zoom: 5.2 },
  { name: "Germany", source: "germany.csv", color: "#FFCE00", index: 2, center: [10.4515, 51.1657] as [number, number], zoom: 5.5 },
  { name: "Canada", source: "canada.csv", color: "#D80621", index: 3, center: [-123.1207, 49.2827] as [number, number], zoom: 5.5 },
] as const;
