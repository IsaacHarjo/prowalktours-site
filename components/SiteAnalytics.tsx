"use client";

import { Analytics } from "@vercel/analytics/next";

export default function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        // Keep free-text searches and other query values out of analytics.
        const url = new URL(event.url);
        url.search = "";
        url.hash = "";
        return { ...event, url: url.toString() };
      }}
    />
  );
}
