import type { HighlightRecord } from "../../data/video-types";

export type VideoClip = {
  "@type": "Clip";
  name: string;
  startOffset: number;
  endOffset: number;
  url: string;
};

export function buildVideoClips({
  highlights,
  canonicalUrl,
  videoDurationSeconds,
}: {
  highlights: HighlightRecord[];
  canonicalUrl: string;
  videoDurationSeconds: number | undefined;
}): VideoClip[] | undefined {
  if (!highlights.length) return undefined;
  if (
    videoDurationSeconds === undefined ||
    !Number.isFinite(videoDurationSeconds) ||
    videoDurationSeconds <= 0
  ) {
    return undefined;
  }

  const sorted = highlights
    .filter(
      (h) => h.title && Number.isFinite(h.seconds) && h.seconds >= 0
    )
    .slice()
    .sort((a, b) => a.seconds - b.seconds);

  if (!sorted.length) return undefined;

  const clips: VideoClip[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const h = sorted[i];
    const next = sorted[i + 1];
    const endOffset = next ? next.seconds : videoDurationSeconds;
    if (endOffset <= h.seconds) continue;
    clips.push({
      "@type": "Clip",
      name: h.title,
      startOffset: h.seconds,
      endOffset,
      url: `${canonicalUrl}?t=${h.seconds}`,
    });
  }

  return clips.length ? clips : undefined;
}
