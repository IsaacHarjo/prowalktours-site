// One registry owns source files and map presentation. Country identity stays
// on each tour; mapGroup controls presentation only (e.g. Monaco near France).
export const tourCountries = [
  { name: "Italy", source: "italy.csv", color: "#009246", index: 0, center: [12.5674, 41.8719] as [number, number], zoom: 5.5 },
  { name: "France", source: "france.csv", color: "#ED2939", index: 1, center: [2.3522, 46.2276] as [number, number], zoom: 5.2 },
  { name: "Germany", source: "germany.csv", color: "#FFCE00", index: 2, center: [10.4515, 51.1657] as [number, number], zoom: 5.5 },
  { name: "Canada", source: "canada.csv", color: "#D80621", index: 3, center: [-123.1207, 49.2827] as [number, number], zoom: 5.5 },
  ...([
    ["USA", "#2563eb"], ["Egypt", "#9a3412"], ["Greece", "#0369a1"],
    ["Malta", "#be123c"], ["Croatia", "#4338ca"], ["Hungary", "#15803d"],
    ["Portugal", "#047857"], ["Jordan", "#92400e"], ["Czechia", "#1d4ed8"],
    ["Switzerland", "#b91c1c"], ["Austria", "#9f1239"], ["Australia", "#0e7490"],
    ["Brazil", "#166534"], ["Turkey", "#c2410c"], ["Japan", "#be185d"],
    ["Netherlands", "#c2410c"], ["Spain", "#a16207"], ["Norway", "#475569"],
    ["Slovenia", "#0f766e"], ["Denmark", "#991b1b"],
  ] as const).map(([name, color], offset) => ({ name, color, index: offset + 4, source: "" })),
] as const;
