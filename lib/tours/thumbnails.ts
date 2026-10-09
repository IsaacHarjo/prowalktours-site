/** YouTube previews used by every world-map tour card. */
export function mapThumbnailSources(youtubeUrl: string): string[] {
  const id = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})(?=$|[?&#/])/.exec(youtubeUrl)?.[1];
  return id ? ["mqdefault", "hqdefault"].map(size => `https://img.youtube.com/vi/${id}/${size}.jpg`) : [];
}
