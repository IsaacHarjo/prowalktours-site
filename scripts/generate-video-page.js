#!/usr/bin/env node
/**
 * scripts/generate-video-page.js
 *
 * Generates a complete video page (data file + page.tsx + Client.tsx)
 * from country CSV files and all-highlights.csv for a given slug.
 *
 * Usage:
 *   node scripts/generate-video-page.js <slug> [--dry-run]
 *   node scripts/generate-video-page.js --batch <slug1> <slug2> ... [--dry-run]
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_PATHS = [
  path.join(ROOT, 'data', 'maps', 'france.csv'),
  path.join(ROOT, 'data', 'maps', 'germany.csv'),
];
const HIGHLIGHTS_CSV = path.join(ROOT, 'data', 'import', 'all-highlights.csv');
const dryRun = process.argv.includes('--dry-run');
const batchMode = process.argv.includes('--batch');
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));

if (args.length === 0) {
  console.error('Usage: node scripts/generate-video-page.js <slug> [--dry-run]');
  console.error('       node scripts/generate-video-page.js --batch <slug1> <slug2> ... [--dry-run]');
  process.exit(1);
}

// ─── CSV parser ──────────────────────────────────────────────────────────────

function parseCsv(content) {
  const rows = [];
  let currentRow = [], currentValue = '', inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const c = content[i], next = content[i + 1];
    if (c === '"') { if (inQuotes && next === '"') { currentValue += '"'; i++; } else { inQuotes = !inQuotes; } continue; }
    if (c === ',' && !inQuotes) { currentRow.push(currentValue); currentValue = ''; continue; }
    if ((c === '\n' || c === '\r') && !inQuotes) { if (c === '\r' && next === '\n') i++; currentRow.push(currentValue); if (currentRow.some(v => v !== '')) rows.push(currentRow); currentRow = []; currentValue = ''; continue; }
    currentValue += c;
  }
  currentRow.push(currentValue);
  if (currentRow.some(v => v !== '')) rows.push(currentRow);
  return rows;
}

// ─── Load CSV data ───────────────────────────────────────────────────────────

// Load all country CSVs into one combined row set
let csvHeader = null;
let csvRows = [];
for (const csvPath of CSV_PATHS) {
  if (!fs.existsSync(csvPath)) continue;
  const [header, ...rows] = parseCsv(fs.readFileSync(csvPath, 'utf8'));
  if (!csvHeader) csvHeader = header;
  csvRows = csvRows.concat(rows);
}
const col = {}; (csvHeader || []).forEach((h, i) => { col[h] = i; });
function get(row, name) { return (row[col[name]] || '').trim(); }

const [hlHeader, ...hlRows] = parseCsv(fs.readFileSync(HIGHLIGHTS_CSV, 'utf8'));
const hlCol = {}; hlHeader.forEach((h, i) => { hlCol[h] = i; });

// ─── Gear config by filming date ─────────────────────────────────────────────

function getGear(filmedDate) {
  if (!filmedDate) return { camera: 'GoPro Hero 8', mic: 'H1 Zoom Handy Recorder', audio: 'Binaural (Roland CS-10EM)', res: '4K UHD', fps: '50 fps', color: 'Rec. 709' };
  const d = new Date(filmedDate + 'T12:00:00');
  if (d < new Date('2018-01-01T00:00:00')) {
    return { camera: 'GoPro Hero 6', mic: 'H1 Zoom Handy Recorder', audio: 'Binaural (Roland CS-10EM)', res: '1080p HD', fps: '30 fps', color: 'Rec. 709' };
  }
  if (d < new Date('2022-06-01T00:00:00')) {
    return { camera: 'GoPro Hero 8', mic: 'H1 Zoom Handy Recorder', audio: 'Binaural (Roland CS-10EM)', res: '4K UHD', fps: '50 fps', color: 'Rec. 709' };
  }
  return { camera: 'Sony A7S III', lens: 'Sony FE 24mm f/1.4 GM Lens', mic: 'Sony ECM-M1', res: '4K UHD', fps: '59.94 fps', color: 'Rec. 709' };
}

// ─── Determine breadcrumb region ─────────────────────────────────────────────

function getBreadcrumbs(city, region) {
  const c = city.toLowerCase();
  if (c === 'paris' || c === 'chessy' || c === 'montmartre') {
    return [
      { label: 'Home', href: '/' },
      { label: 'Countries', href: '/countries' },
      { label: 'France', href: '/destinations/france' },
      { label: 'Paris', href: '/destinations/france/paris' },
    ];
  }
  if (['menton','nice','antibes','monaco','cannes'].includes(c)) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Countries', href: '/countries' },
      { label: 'France', href: '/destinations/france' },
      { label: 'French Riviera', href: '/destinations/france/french-riviera' },
    ];
  }
  if (['avignon','nimes','arles'].includes(c)) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Countries', href: '/countries' },
      { label: 'France', href: '/destinations/france' },
      { label: 'Provence', href: '/destinations/france/provence' },
    ];
  }
  // Alsace Christmas Markets
  if (['colmar','strasbourg','kaysersberg','ribeauvillé','riquewihr','ribeauville'].includes(c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())) {
    return [
      { label: 'Home', href: '/' },
      { label: 'Countries', href: '/countries' },
      { label: 'France', href: '/destinations/france' },
    ];
  }
  // Default France fallback
  return [
    { label: 'Home', href: '/' },
    { label: 'Countries', href: '/countries' },
    { label: 'France', href: '/destinations/france' },
  ];
}

function getBreadcrumbsForCountry(country, city, region) {
  if (country === 'Germany') {
    return [
      { label: 'Home', href: '/' },
      { label: 'Countries', href: '/countries' },
      { label: 'Germany', href: '/destinations/germany' },
    ];
  }
  return getBreadcrumbs(city, region);
}

function getRelatedTours(city, slug, country) {
  const c = city.toLowerCase();
  const tours = [];
  if (c === 'paris' || c === 'chessy' || c === 'montmartre') {
    const pool = [
      { title: 'Paris Evening Walk (2022)', href: '/videos/paris-evening-walk-2022', description: 'A long-form evening route through central Paris landmarks.', imageSrc: 'https://i.ytimg.com/vi/fKgP6JGAM_A/maxresdefault.jpg', imageAlt: 'Paris evening walk' },
      { title: 'Paris Day Walk (2020)', href: '/videos/paris-landmarks-day-walk-2020', description: 'A 12-mile daytime route through Paris landmarks and the Eiffel Tower.', imageSrc: 'https://i.ytimg.com/vi/oz1Mgu8e1N4/maxresdefault.jpg', imageAlt: 'Paris day walk' },
      { title: 'Montmartre Day Walk (2020)', href: '/videos/montmartre-day-walk-2020', description: 'Moulin Rouge, La Maison Rose, Place du Tertre, and Sacré-Cœur.', imageSrc: 'https://i.ytimg.com/vi/yqOlY5uBBbo/maxresdefault.jpg', imageAlt: 'Montmartre day walk' },
    ];
    return pool.filter(t => t.href !== `/videos/${slug}`).slice(0, 3);
  }
  // Germany Christmas Markets — cross-link between cities
  if (country === 'Germany') {
    const germanyPool = [
      { title: 'Nuremberg Christmas Market Evening (2024)', href: '/videos/nuremberg-nuremberg-christmas-market-evening-walk-2024', description: 'The Christkindlesmarkt and old town of Nuremberg lit up for Christmas.', imageSrc: 'https://i.ytimg.com/vi/placeholder/maxresdefault.jpg', imageAlt: 'Nuremberg Christmas market' },
      { title: 'Dresden Christmas Market Day (2024)', href: '/videos/dresden-dresden-christmas-market-day-walk-2024', description: 'The Striezelmarkt and Frauenkirche area in Dresden by day.', imageSrc: 'https://i.ytimg.com/vi/placeholder/maxresdefault.jpg', imageAlt: 'Dresden Christmas market' },
      { title: 'Cologne Christmas Market Evening (2024)', href: '/videos/cologne-cologne-christmas-market-evening-walk-2024', description: 'The cathedral Christmas market and old town squares of Cologne.', imageSrc: 'https://i.ytimg.com/vi/placeholder/maxresdefault.jpg', imageAlt: 'Cologne Christmas market' },
      { title: 'Rothenburg ob der Tauber Evening (2024)', href: '/videos/rothenburg-ob-der-tauber-rothenburg-ob-der-tauber-christmas-market-evening-walk-2024', description: 'A medieval walled town with one of Germany\'s most atmospheric Christmas markets.', imageSrc: 'https://i.ytimg.com/vi/placeholder/maxresdefault.jpg', imageAlt: 'Rothenburg Christmas market' },
      { title: 'Munich Christmas Market Evening (2024)', href: '/videos/munich-munich-christmas-market-evening-walk-2024', description: 'Marienplatz and the surrounding Christmas markets of Munich.', imageSrc: 'https://i.ytimg.com/vi/placeholder/maxresdefault.jpg', imageAlt: 'Munich Christmas market' },
    ];
    return germanyPool.filter(t => t.href !== `/videos/${slug}`).slice(0, 3);
  }

  // Alsace — cross-link between towns
  const alsacePool = [
    { title: 'Colmar Christmas Market Evening (2023)', href: '/videos/colmar-christmas-market-evening-walk-2023', description: 'Colmar old town lit up for Christmas with market stalls and half-timbered houses.', imageSrc: 'https://i.ytimg.com/vi/NMQ4Sy3e-Ec/maxresdefault.jpg', imageAlt: 'Colmar Christmas market' },
    { title: 'Strasbourg Christmas Market Day (2023)', href: '/videos/strasbourg-christmas-market-day-walk-2023', description: 'Strasbourg cathedral, Petite France, and the main Christmas market squares.', imageSrc: 'https://i.ytimg.com/vi/07LDvkp7jgc/maxresdefault.jpg', imageAlt: 'Strasbourg Christmas market' },
    { title: 'Riquewihr Christmas Market Evening (2023)', href: '/videos/riquewihr-christmas-market-evening-walk-2023', description: 'One of Alsace\'s most charming villages decorated for Christmas.', imageSrc: 'https://i.ytimg.com/vi/fXbDgbvA3o0/maxresdefault.jpg', imageAlt: 'Riquewihr Christmas market' },
    { title: 'Kaysersberg Christmas Market Day (2025)', href: '/videos/kaysersberg-christmas-market-day-walk-2025', description: 'A medieval Alsace village with a castle, bridge, and Christmas market.', imageSrc: 'https://i.ytimg.com/vi/nViNTHYAgXg/maxresdefault.jpg', imageAlt: 'Kaysersberg Christmas market' },
    { title: 'Ribeauvillé Medieval Christmas Market (2025)', href: '/videos/ribeauville-day-walk-2025', description: 'A medieval-themed Christmas market in the Alsace wine route town.', imageSrc: 'https://i.ytimg.com/vi/4AYDKWizfmY/maxresdefault.jpg', imageAlt: 'Ribeauvillé Christmas market' },
  ];
  return alsacePool.filter(t => t.href !== `/videos/${slug}`).slice(0, 3);
}

// ─── Slugify for highlight image filenames ────────────────────────────────────

function slugify(str) {
  return str
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\([^)]*\)/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ─── Convert map URL from edit to embed/viewer ───────────────────────────────

function mapEditToEmbed(url) {
  if (!url) return { embed: '', viewer: '' };
  const midMatch = /mid=([^&]+)/.exec(url);
  if (!midMatch) return { embed: '', viewer: '' };
  const mid = midMatch[1];
  return {
    embed: `https://www.google.com/maps/d/u/0/embed?mid=${mid}`,
    viewer: `https://www.google.com/maps/d/viewer?mid=${mid}`,
  };
}

// ─── Extract YouTube ID ──────────────────────────────────────────────────────

function ytId(url) {
  const m = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(url);
  return m ? m[1] : '';
}

// ─── Duration string to ISO 8601 ─────────────────────────────────────────────

function durationToIso(label) {
  const parts = label.split(':').map(Number);
  if (parts.length === 3) return `PT${parts[0]}H${parts[1]}M${parts[2]}S`;
  if (parts.length === 2) return `PT${parts[0]}M${parts[1]}S`;
  return `PT${label}`;
}

// ─── PascalCase for component names ──────────────────────────────────────────

function toPascalCase(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toCamelCase(slug) {
  const pascal = toPascalCase(slug);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Generate one page
// ═══════════════════════════════════════════════════════════════════════════════

function generatePage(slug) {
  // Find tour in CSV
  let tourRow = null;
  for (const row of csvRows) {
    const s = (get(row, 'slug_override') || get(row, 'slug'));
    if (s === slug) { tourRow = row; break; }
  }
  if (!tourRow) { console.error(`  ✗ Slug "${slug}" not found in any country CSV`); return false; }

  const tourId = get(tourRow, 'tour_id');
  const country = get(tourRow, 'country');
  const title = get(tourRow, 'title');
  const city = get(tourRow, 'city');
  const region = get(tourRow, 'region');
  const videoType = get(tourRow, 'video_type');
  const filmedDate = get(tourRow, 'filmed_date_iso');
  const tempF = get(tourRow, 'temp_f');
  const tempC = get(tourRow, 'temp_c');
  const youtubeUrl = get(tourRow, 'youtube_url');
  const mapUrl = get(tourRow, 'map_url');
  const distLabel = get(tourRow, 'distance_label');
  const distMi = get(tourRow, 'distance_miles');
  const distKm = get(tourRow, 'distance_km');
  const durLabel = get(tourRow, 'duration_label');
  const descLong = get(tourRow, 'description_long') || get(tourRow, 'description_short');
  const landmarks = get(tourRow, 'landmarks');
  const videoId = ytId(youtubeUrl);
  const { embed: mapEmbed, viewer: mapViewer } = mapEditToEmbed(mapUrl);
  const gear = getGear(filmedDate);
  const breadcrumbsBase = getBreadcrumbsForCountry(country, city, region);
  const relatedTours = getRelatedTours(city, slug, country);
  const citySlug = slugify(city);

  // Get highlights
  const highlights = [];
  for (const row of hlRows) {
    const hlSlug = (row[hlCol['slug']] || '').trim();
    if (hlSlug !== slug) continue;
    const hlTitle = (row[hlCol['highlight_title']] || '').trim();
    const hlSeconds = parseInt(row[hlCol['seconds']] || '0', 10);
    const hlTimeLabel = (row[hlCol['time_label']] || '').trim().replace(/^0+:/, '');
    if (hlTimeLabel === '0:00:00' || hlTimeLabel === '00:00:00') {
      highlights.push({ title: hlTitle, timeLabel: '0:00', seconds: 0 });
    } else {
      // Clean up time label: remove leading zeros
      let tl = hlTimeLabel.replace(/^0+/, '').replace(/^:/, '');
      if (!tl || tl === '0') tl = '0:00';
      highlights.push({ title: hlTitle, timeLabel: tl, seconds: hlSeconds });
    }
  }

  // Weather string
  let weather = 'Daytime';
  if (tempF && tempC) weather = `${tempC}\u00b0C | ${tempF}\u00b0F`;
  if (videoType === 'evening-walk') weather = weather === 'Daytime' ? 'Evening' : weather;

  // Short title for breadcrumb
  const shortTitle = title.replace(/,?\s*France\s*/i, '').replace(/\s*\(\d{4}\)\s*$/, '').trim();

  const componentName = toPascalCase(slug) + 'Client';
  const detailVarName = toCamelCase(slug) + 'Detail';
  const exportName = detailVarName;

  // Metadata description (under 155 chars)
  const metaDesc = `${title.replace(/\(\d{4}\)/, '').trim()} in 4K. ${descLong.split('.')[0].substring(0, 100)}.`;
  const metaDescShort = metaDesc.length > 155 ? metaDesc.substring(0, 152) + '...' : metaDesc;

  // ─── data/video-details/[slug].ts ────────────────────────────────────────

  const hlEntries = highlights.map(h => {
    const fn = `${citySlug}-${slugify(h.title)}.jpg`;
    return `    { title: ${JSON.stringify(h.title)}, timeLabel: ${JSON.stringify(h.timeLabel)}, seconds: ${h.seconds}, imageSrc: highlightImageSrc(${JSON.stringify(fn)}), alt: ${JSON.stringify(h.title + ' during ' + title)}, caption: ${JSON.stringify(h.title)}, description: "" }`;
  });

  const detailFile = `import type { VideoDetailRecord } from "../video-types";

const highlightImageBasePath = "/${slug}/highlights";
const highlightImageSrc = (filename: string) => \`\${highlightImageBasePath}/\${filename}\`;

export const ${exportName}: VideoDetailRecord = {
  slug: ${JSON.stringify(slug)},
  heroEyebrow: "France ${videoType === 'evening-walk' ? 'Walk' : videoType === '360-tour' ? '360° Tour' : 'Walk'}",
  heroTitle: ${JSON.stringify(title)},
  heroSubtitle: ${JSON.stringify(landmarks.split(',').slice(0, 5).map(s => s.trim()).join(', '))},
  heroDescription: ${JSON.stringify(descLong)},
  routeMapDescription: ${JSON.stringify(mapUrl ? `Follow this route through ${city} on the interactive map below.` : '')},
  licensingDescription: [
    ${JSON.stringify(`This ${city} ${videoType.replace(/-/g, ' ')} captures the route in a continuous long-form format, including ${landmarks.split(',').slice(0, 6).map(s => s.trim()).join(', ')}.`)},
    ${JSON.stringify(`The footage is suitable for editorial, documentary, travel, educational, and destination-focused licensing.`)},
  ],
  highlights: [
${hlEntries.join(',\n')}
  ],
};
`;

  // ─── app/videos/[slug]/page.tsx ──────────────────────────────────────────

  const breadcrumbItems = [...breadcrumbsBase, { label: shortTitle }];
  const bcJson = breadcrumbItems.map((b, i) => {
    const item = b.href ? `, item: \`\${siteUrl}${b.href}\`` : `, item: pageUrl`;
    return `      { "@type": "ListItem", position: ${i + 1}, name: ${JSON.stringify(b.label)}${item} }`;
  });

  const pageFile = `import type { Metadata } from "next";
import Script from "next/script";
import ${componentName} from "./${componentName}";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = \`\${siteUrl}/videos/${slug}\`;
const heroImagePath = "/${slug}/hero.jpg";
const ogImageUrl = \`\${siteUrl}\${heroImagePath}\`;
const metadataTitle = ${JSON.stringify(title)};
const metadataDescription = ${JSON.stringify(metaDescShort)};

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: ${JSON.stringify(title)} }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
${bcJson.join(',\n')}
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/${videoId}",
    contentUrl: "https://www.youtube.com/watch?v=${videoId}",
    uploadDate: ${JSON.stringify(filmedDate)},
    duration: ${JSON.stringify(durationToIso(durLabel))},
    url: pageUrl,
  };

  return (
    <>
      <Script id="${slug}-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="${slug}-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <${componentName} />
    </>
  );
}
`;

  // ─── Client component ────────────────────────────────────────────────────

  const breadcrumbsCode = JSON.stringify(breadcrumbItems.map(b => b.href ? { label: b.label, href: b.href } : { label: b.label }));

  const gearLeft = gear.lens
    ? `<div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Camera</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.camera}</span></div>
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Lens</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.lens}</span></div>
                    <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Microphone</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.mic}</span></div>`
    : `<div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Camera</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.camera}</span></div>
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Microphone</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.mic}</span></div>
                    <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Audio</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.audio}</span></div>`;

  const mapSection = mapEmbed ? `
      <section id="route-map" ref={routeMapRef} className="scroll-mt-32 mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <MapSection eyebrow="Route map" heading="Explore the route" description={detail.routeMapDescription} iframeSrc="${mapEmbed}" iframeTitle="${title} route map" eyebrowClassName="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]" headingClassName="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]" descriptionClassName="mt-4 max-w-3xl text-base leading-8 text-[#56493a]" mapCardClassName="mt-8 overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] shadow-lg sm:rounded-[2rem]" mapBackgroundClassName="h-[420px] w-full bg-zinc-100 sm:h-[480px] lg:h-auto lg:aspect-[16/9]">
          <div className="mt-6 rounded-[1.75rem] border border-[#d8c7b5] bg-[#fcfaf6] p-5 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-lg font-semibold tracking-tight text-[#3d3327] sm:text-xl">Take this route with you</p>
                <p className="mt-3 text-[15px] leading-7 text-[#56493a]">Scan to open the route on your phone using Google Maps.</p>
                <a href="${mapViewer}" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2 text-sm font-semibold text-[#167fd5] shadow-sm transition hover:bg-[#edf6fd]">Open the route in Google Maps</a>
              </div>
              <a href="${mapViewer}" target="_blank" rel="noreferrer" className="self-start rounded-[1.5rem] border border-[#e5d7c6] bg-white p-3 shadow-sm transition hover:border-[#cdb7a0]" aria-label="Open route on phone"><img src={\`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=\${encodeURIComponent("${mapViewer}")}\`} alt="QR code for route" width="132" height="132" className="h-[132px] w-[132px] rounded-xl" /></a>
            </div>
          </div>
        </MapSection>
      </section>` : '';

  const mapImport = mapEmbed ? `\nimport MapSection from "../../../components/MapSection";` : '';
  const mapNavButton = mapEmbed ? `\n                <button onClick={scrollToRouteMap} className="hidden transition hover:text-white sm:inline-flex" type="button">Route Map</button>` : '';
  const mapRef = mapEmbed ? `\n  const routeMapRef = useRef<HTMLElement | null>(null);` : '';
  const mapScroll = mapEmbed ? `\n  const scrollToRouteMap = () => routeMapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });` : '';

  const relatedToursCode = relatedTours.map(t =>
    `      { title: ${JSON.stringify(t.title)}, href: ${JSON.stringify(t.href)}, description: ${JSON.stringify(t.description)}, imageSrc: ${JSON.stringify(t.imageSrc)}, imageAlt: ${JSON.stringify(t.imageAlt)} }`
  ).join(',\n');

  const distStat = distMi && distKm
    ? `{ icon: "\\ud83d\\udccf", label: "Distance", value: "${distMi} mi / ${distKm} km" },`
    : `{ icon: "\\ud83c\\udfe0", label: "Type", value: "${videoType === '360-tour' ? '360° VR Tour' : 'Attraction Tour'}" },`;

  const clientFile = `"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import LongFormWalkPage, { LongFormWalkStatsRow } from "../../../components/LongFormWalkPage";${mapImport}
import { ${country.toLowerCase()}Videos } from "../../../data/videos/${country.toLowerCase()}";
import { ${exportName} as detail } from "../../../data/video-details/${slug}";

type YouTubePlayer = { seekTo: (seconds: number, allowSeekAhead?: boolean) => void; playVideo: () => void; destroy: () => void };
type YouTubePlayerNamespace = { Player: new (element: HTMLIFrameElement, options?: { events?: { onReady?: () => void } }) => YouTubePlayer };
declare global { interface Window { YT?: YouTubePlayerNamespace; onYouTubeIframeAPIReady?: () => void } }

const video = ${country.toLowerCase()}Videos.find((v) => v.slug === ${JSON.stringify(slug)});
const youtubeVideoId = video?.youtubeUrl.split("/").pop() ?? ${JSON.stringify(videoId)};
const heroImagePath = "/${slug}/hero.jpg";

const breadcrumbs = ${breadcrumbsCode};
const highlights = detail.highlights;
const relatedTours = [
${relatedToursCode}
];

export default function ${componentName}() {
  const formattedFilmingDate = video?.filmingDates[0]
    ? new Date(\`\${video.filmingDates[0]}T12:00:00\`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : ${JSON.stringify(filmedDate ? new Date(filmedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown date')};

  const topRowStats = [
    { icon: "\\ud83d\\udcc5", label: "Date", value: formattedFilmingDate },
    ${distStat}
    { icon: "\\ud83d\\udd52", label: "Duration", value: video?.durationLabel ?? ${JSON.stringify(durLabel)} },
    { icon: "${videoType === 'evening-walk' ? '\\ud83c\\udf19' : '\\u2600\\ufe0f'}", label: "Weather", value: ${JSON.stringify(weather)} },
  ];

  const initialYoutubeEmbedUrl = \`https://www.youtube.com/embed/\${youtubeVideoId}?start=0&autoplay=0&rel=0&enablejsapi=1&playsinline=1\`;

  const overviewSectionRef = useRef<HTMLElement | null>(null);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const highlightsSectionRef = useRef<HTMLElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);${mapRef}
  const licensingHubRef = useRef<HTMLElement | null>(null);
  const relatedToursRef = useRef<HTMLElement | null>(null);
  const playerIframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pendingSeekRef = useRef<number | null>(null);

  useEffect(() => {
    let u = false;
    const init = () => { if (u || playerRef.current || !playerIframeRef.current || !window.YT?.Player) return; playerRef.current = new window.YT.Player(playerIframeRef.current, { events: { onReady: () => { if (pendingSeekRef.current === null) return; const s = pendingSeekRef.current; pendingSeekRef.current = null; playerRef.current?.seekTo(s, true); playerRef.current?.playVideo(); } } }); };
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); init(); };
    if (window.YT?.Player) init();
    else if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) { const s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(s); }
    return () => { u = true; window.onYouTubeIframeAPIReady = prev; playerRef.current?.destroy(); playerRef.current = null; };
  }, []);

  const handleHighlightClick = (seconds: number) => { pendingSeekRef.current = seconds; playerRef.current?.seekTo(seconds, true); playerRef.current?.playVideo(); if (playerRef.current) pendingSeekRef.current = null; setTimeout(() => { videoSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50); };
  const scrollToOverview = () => overviewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollHighlights = (d: "left" | "right") => { highlightsRef.current?.scrollBy({ left: d === "left" ? -340 : 340, behavior: "smooth" }); };
  const scrollToHighlights = () => highlightsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });${mapScroll}
  const scrollToLicensing = () => licensingHubRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToRelatedTours = () => relatedToursRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <LongFormWalkPage
      stickyNav={
        <section className="sticky top-16 z-40 border-y border-[#7f5f49] bg-[#3d3327]/95 text-white backdrop-blur">
          <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-6 py-2 sm:py-3 lg:px-10">
            <div className="justify-self-end sm:justify-self-start">
              <div className="flex min-w-max items-center gap-4 text-xs font-semibold text-white/90 sm:gap-6 sm:text-sm">
                <button onClick={scrollToOverview} className="hidden transition hover:text-white sm:inline-flex" type="button">Overview</button>
                <button onClick={scrollToHighlights} className="hidden transition hover:text-white sm:inline-flex" type="button">Highlights</button>${mapNavButton}
                <button onClick={scrollToLicensing} className="hidden transition hover:text-white sm:inline-flex" type="button">Licensing</button>
                <button onClick={scrollToRelatedTours} className="hidden transition hover:text-white sm:inline-flex" type="button">Related Tours</button>
              </div>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#8f735c] bg-[#4a3c2f] px-3 py-1.5 text-sm font-semibold text-white/90 md:flex">
              <div className="h-4 w-6 overflow-hidden rounded-[2px] border border-white/20"><div className="grid h-full grid-cols-3"><div className="bg-[#0055a4]" /><div className="bg-white" /><div className="bg-[#ef4135]" /></div></div>
              <span>France</span>
            </div>
          </nav>
        </section>
      }
    >
      <section id="overview" ref={overviewSectionRef} className="scroll-mt-32 border-b border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8a7a68]">
            {breadcrumbs.map((item: { label: string; href?: string }, index: number) => (<div key={item.label} className="inline-flex items-center gap-2">{item.href ? (<Link href={item.href} className="transition hover:text-[#167fd5]">{item.label}</Link>) : (<span className="font-medium text-[#5c4c33]">{item.label}</span>)}{index < breadcrumbs.length - 1 ? <span aria-hidden="true" className="text-[#bba893]">/</span> : null}</div>))}
          </nav>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">{detail.heroEyebrow}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">{detail.heroTitle}</h1>
              <p className="mt-3 text-xl text-[#6e5a45]">{detail.heroSubtitle}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">{detail.heroDescription}</p>
              <div className="mt-8 space-y-4 border-y border-[#d8c7b5]/80 py-4 text-[#3d3327]"><LongFormWalkStatsRow stats={topRowStats} /></div>
            </div>
            <div className="relative hidden overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm lg:block"><div className="relative aspect-[4/3] w-full"><img src={heroImagePath} alt={detail.heroTitle} className="h-full w-full object-cover" loading="eager" /></div></div>
          </div>
        </div>
      </section>

      <section ref={videoSectionRef as React.RefObject<HTMLElement>} className="mx-auto max-w-6xl px-6 pb-6 pt-6 lg:px-10 lg:pb-6 lg:pt-14">
        <div className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg"><div className="aspect-video w-full bg-black"><iframe ref={playerIframeRef} className="h-full w-full" src={initialYoutubeEmbedUrl} title={detail.heroTitle} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></div>
      </section>

      <section id="highlights" ref={highlightsSectionRef} className="scroll-mt-32 mx-auto max-w-6xl rounded-[2rem] border border-[#e4d3b2] bg-gradient-to-br from-[#f4e6bc] via-[#fbf3dc] to-[#f7ede3] px-6 py-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Video Highlights</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">Jump to highlights</h2></div>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => scrollHighlights("left")} className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]" aria-label="Scroll highlights left" type="button">&lt;</button>
            <button onClick={() => scrollHighlights("right")} className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]" aria-label="Scroll highlights right" type="button">&gt;</button>
          </div>
        </div>
        <div ref={highlightsRef} className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2">
          {highlights.map((h) => (
            <div key={\`\${h.title}-\${h.seconds}\`} className="w-[280px] shrink-0">
              <button onClick={() => handleHighlightClick(h.seconds)} type="button" className="w-full overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg">
                <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-gradient-to-br from-[#d7e6f0] via-[#f8efe2] to-[#e5d3b8] p-4"><img src={h.imageSrc} alt={h.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" /><span className="relative rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#3d3327] shadow-sm">{h.timeLabel}</span></div>
                <div className="p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-[#3d3327]">{h.title}</p><p className="shrink-0 text-sm text-[#8a7a68]">{h.timeLabel}</p></div>{h.description ? <p className="mt-2 text-sm leading-6 text-[#56493a]">{h.description}</p> : null}</div>
              </button>
            </div>
          ))}
        </div>
      </section>
${mapSection}
      <section id="licensing" ref={licensingHubRef} className="scroll-mt-32 mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="rounded-[2rem] border border-[#d8c7b5] bg-[#f7efe4] p-7 shadow-xl lg:p-8">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Licensing Hub</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">License this ${city} footage</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">{detail.licensingDescription[0]}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">{detail.licensingDescription[1]}</p>
            </div>
            <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-5 shadow-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf6] p-4"><div className="space-y-3">
                    ${gearLeft}
                </div></div>
                <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf6] p-4"><div className="space-y-3">
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Resolution</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.res}</span></div>
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Frame Rate</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.fps}</span></div>
                    <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Color</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">${gear.color}</span></div>
                </div></div>
              </div>
              <div className="mt-5 flex justify-center"><Link href="/licensing" className="inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-[#167fd5] px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#09679e]">Request License Quote</Link></div>
            </div>
          </div>
        </div>
      </section>

      <section id="related-tours" ref={relatedToursRef} className="scroll-mt-32 mx-auto max-w-6xl px-6 pb-16 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Related Tours</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">Explore more from France</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">Continue exploring with more walks and tours from France.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTours.map((tour) => (<a key={tour.href} href={tour.href} className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"><div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]"><img src={tour.imageSrc} alt={tour.imageAlt} className="aspect-video w-full object-cover" loading="lazy" /></div><p className="text-sm font-semibold text-[#3d3327]">{tour.title}</p><p className="mt-2 text-sm leading-7 text-[#6e5a45]">{tour.description}</p><p className="mt-4 text-sm font-semibold text-[#167fd5]">View tour &rarr;</p></a>))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-10">
        <div className="rounded-[2rem] border border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8] p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Stay Connected</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">Don&apos;t miss the next tour</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#56493a]">Get updates when new France tours, destination pages, and long-form videos go live on ProWalk Tours.</p>
              <p className="mt-3 text-sm text-[#8a7a68]">Occasional updates only. Unsubscribe anytime.</p>
              <a href="https://www.youtube.com/@ProWalkTours?sub_confirmation=1" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d52b1e] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#b82217]">Join the Journey - Subscribe to ProWalk Tours</a>
            </div>
            <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                <div><label className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">First Name</label><input type="text" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]" /></div>
                <div><label className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">Email</label><input type="email" className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]" /></div>
                <button type="button" className="mt-2 rounded-2xl bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09679e]">Notify Me</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LongFormWalkPage>
  );
}
`;

  // ─── Write files ─────────────────────────────────────────────────────────

  const detailPath = path.join(ROOT, 'data', 'video-details', `${slug}.ts`);
  const pageDir = path.join(ROOT, 'app', 'videos', slug);
  const pagePath = path.join(pageDir, 'page.tsx');
  const clientPath = path.join(pageDir, `${componentName}.tsx`);
  const publicDir = path.join(ROOT, 'public', slug, 'highlights');

  if (dryRun) {
    console.log(`  [DRY RUN] Would create:`);
    console.log(`    ${path.relative(ROOT, detailPath)}`);
    console.log(`    ${path.relative(ROOT, pagePath)}`);
    console.log(`    ${path.relative(ROOT, clientPath)}`);
    console.log(`    ${path.relative(ROOT, publicDir)}/`);
    console.log(`    ${highlights.length} highlights`);
    return true;
  }

  // Skip if page already exists
  if (fs.existsSync(pagePath)) {
    console.log(`  ⚠ Page already exists, skipping: ${slug}`);
    return true;
  }

  fs.mkdirSync(pageDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  // Only write detail file if it doesn't exist (preserve hand-edited ones)
  if (!fs.existsSync(detailPath)) {
    fs.writeFileSync(detailPath, detailFile, 'utf8');
  } else {
    console.log(`  ℹ Detail file exists, keeping: ${path.relative(ROOT, detailPath)}`);
  }

  fs.writeFileSync(pagePath, pageFile, 'utf8');
  fs.writeFileSync(clientPath, clientFile, 'utf8');

  console.log(`  ✓ ${slug} (${highlights.length} highlights)`);
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n${'═'.repeat(60)}`);
console.log(`  generate-video-page${dryRun ? '  [DRY RUN]' : ''}`);
console.log(`${'═'.repeat(60)}\n`);

let success = 0, failed = 0;
for (const slug of args) {
  if (generatePage(slug)) success++;
  else failed++;
}

console.log(`\n  Done: ${success} generated, ${failed} failed`);
console.log(`${'═'.repeat(60)}\n`);
