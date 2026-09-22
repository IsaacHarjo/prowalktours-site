/** Apply a timestamp to the already-resolved watch destination. */
export function withWatchTimestamp(href: string, seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return href;
  const url = new URL(href, "https://www.prowalktours.com");
  url.searchParams.delete("t");
  url.searchParams.delete("start");
  url.searchParams.set(url.pathname.startsWith("/embed/") ? "start" : "t", String(Math.floor(seconds)));
  return href.startsWith("/") ? `${url.pathname}${url.search}${url.hash}` : url.toString();
}
