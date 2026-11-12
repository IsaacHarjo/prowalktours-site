import { readdirSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import legacyVideoRedirects from "./lib/legacy-video-redirects.json";
import legacyPageRedirects from "./lib/legacy-page-redirects.json";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://api.mapbox.com https://events.mapbox.com;
  style-src 'self' 'unsafe-inline' https://api.mapbox.com;
  img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com https://api.qrserver.com https://api.mapbox.com https://*.tiles.mapbox.com https://www.google.com https://maps.gstatic.com https://maps.google.com;
  font-src 'self' https://api.mapbox.com;
  connect-src 'self' https://formspree.io https://api.mapbox.com https://*.tiles.mapbox.com https://events.mapbox.com;
  frame-src https://www.youtube.com https://www.google.com https://player.mediadelivery.net;
  media-src 'self' https://vz-76a3e58b-c05.b-cdn.net;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  worker-src 'self' blob:;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Tour slugs with a local card image (public/images/cards/<slug>-card.jpg).
// Read whenever the config loads (every build and dev start) and inlined for
// components/CardImage.tsx, so cards without a file go straight to their
// fallback instead of requesting a missing file. Adding a card needs no code
// change.
const cardImageSlugs = readdirSync(path.join(process.cwd(), "public", "images", "cards"))
  .filter((file) => file.endsWith("-card.jpg"))
  .map((file) => file.slice(0, -"-card.jpg".length))
  .sort();

const nextConfig: NextConfig = {
  env: {
    CARD_IMAGE_SLUGS: cardImageSlugs.join(","),
  },
  async redirects() {
    // Exact video matches from the saved Squarespace inventory. Internal
    // /videos/ pages are permanent; YouTube fallbacks are temporary so future
    // on-site walk pages can replace them.
    // Squarespace year archives, year/tag listings and retired pages:
    // permanent to a destination or guide page, temporary to a search link.
    // /destinations has no index page; /countries is the destination index.
    // Temporary so the index can move to /destinations later without a
    // cached permanent redirect pointing the other way.
    return [
      { source: "/destinations", destination: "/countries", permanent: false },
      ...legacyVideoRedirects,
      ...legacyPageRedirects,
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
