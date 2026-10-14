export function christmasMarketHref(city: string): string | undefined {
  switch (city) {
    case "Colmar": return "/christmas-markets/colmar";
    case "Ribeauvillé": return "/christmas-markets/ribeauville";
    case "Kaysersberg": return "/christmas-markets/kaysersberg";
    case "Riquewihr": return "/christmas-markets/riquewihr";
    case "Strasbourg": return "/christmas-markets/strasbourg";
    case "Basel": return "/christmas-markets/basel";
    default: return undefined;
  }
}
