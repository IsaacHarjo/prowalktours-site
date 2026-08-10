"use client";

import { useEffect, useState } from "react";

export function useInitialVideoStartTime(): number {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("t");
    const n = Number.parseInt(raw ?? "", 10);
    if (Number.isFinite(n) && n > 0) setStart(n);
  }, []);

  return start;
}
