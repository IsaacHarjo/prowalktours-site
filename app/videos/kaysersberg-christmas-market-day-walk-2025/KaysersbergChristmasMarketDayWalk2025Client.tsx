"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import LongFormWalkPage, { LongFormWalkStatsRow } from "../../../components/LongFormWalkPage";
import MapSection from "../../../components/MapSection";
import { franceVideos } from "../../../data/videos/france";
import { kaysersbergChristmasMarketDayWalk2025Detail as detail } from "../../../data/video-details/kaysersberg-christmas-market-day-walk-2025";

type YouTubePlayer = { seekTo: (seconds: number, allowSeekAhead?: boolean) => void; playVideo: () => void; destroy: () => void };
type YouTubePlayerNamespace = { Player: new (element: HTMLIFrameElement, options?: { events?: { onReady?: () => void } }) => YouTubePlayer };
declare global { interface Window { YT?: YouTubePlayerNamespace; onYouTubeIframeAPIReady?: () => void } }

const video = franceVideos.find((v) => v.slug === "kaysersberg-christmas-market-day-walk-2025");
const youtubeVideoId = video?.youtubeUrl.split("/").pop() ?? "nViNTHYAgXg";
const heroImagePath = "/kaysersberg-christmas-market-day-walk-2025/hero.jpg";

const breadcrumbs = [{"label":"Home","href":"/"},{"label":"Countries","href":"/countries"},{"label":"France","href":"/destinations/france"},{"label":"KaysersbergChristmas Market Day Walk"}];
const highlights = detail.highlights;
const relatedTours = [
      { title: "Colmar Christmas Market Evening (2023)", href: "/videos/colmar-christmas-market-evening-walk-2023", description: "Colmar old town lit up for Christmas with market stalls and half-timbered houses.", imageSrc: "https://i.ytimg.com/vi/NMQ4Sy3e-Ec/maxresdefault.jpg", imageAlt: "Colmar Christmas market" },
      { title: "Strasbourg Christmas Market Day (2023)", href: "/videos/strasbourg-christmas-market-day-walk-2023", description: "Strasbourg cathedral, Petite France, and the main Christmas market squares.", imageSrc: "https://i.ytimg.com/vi/07LDvkp7jgc/maxresdefault.jpg", imageAlt: "Strasbourg Christmas market" },
      { title: "Riquewihr Christmas Market Evening (2023)", href: "/videos/riquewihr-christmas-market-evening-walk-2023", description: "One of Alsace's most charming villages decorated for Christmas.", imageSrc: "https://i.ytimg.com/vi/fXbDgbvA3o0/maxresdefault.jpg", imageAlt: "Riquewihr Christmas market" }
];

export default function KaysersbergChristmasMarketDayWalk2025Client() {
  const formattedFilmingDate = video?.filmingDates[0]
    ? new Date(`${video.filmingDates[0]}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "Friday, December 12, 2025";

  const topRowStats = [
    { icon: "\ud83d\udcc5", label: "Date", value: formattedFilmingDate },
    { icon: "\ud83d\udccf", label: "Distance", value: "1.50 mi / 2.40 km" },
    { icon: "\ud83d\udd52", label: "Duration", value: video?.durationLabel ?? "1:25:09" },
    { icon: "\u2600\ufe0f", label: "Weather", value: "9°C | 49°F" },
  ];

  const initialYoutubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?start=0&autoplay=0&rel=0&enablejsapi=1&playsinline=1`;

  const overviewSectionRef = useRef<HTMLElement | null>(null);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const highlightsSectionRef = useRef<HTMLElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const routeMapRef = useRef<HTMLElement | null>(null);
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
  const scrollToHighlights = () => highlightsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToRouteMap = () => routeMapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
                <button onClick={scrollToHighlights} className="hidden transition hover:text-white sm:inline-flex" type="button">Highlights</button>
                <button onClick={scrollToRouteMap} className="hidden transition hover:text-white sm:inline-flex" type="button">Route Map</button>
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
            <div key={`${h.title}-${h.seconds}`} className="w-[280px] shrink-0">
              <button onClick={() => handleHighlightClick(h.seconds)} type="button" className="w-full overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg">
                <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-gradient-to-br from-[#d7e6f0] via-[#f8efe2] to-[#e5d3b8] p-4"><img src={h.imageSrc} alt={h.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" /><span className="relative rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#3d3327] shadow-sm">{h.timeLabel}</span></div>
                <div className="p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-[#3d3327]">{h.title}</p><p className="shrink-0 text-sm text-[#8a7a68]">{h.timeLabel}</p></div>{h.description ? <p className="mt-2 text-sm leading-6 text-[#56493a]">{h.description}</p> : null}</div>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="route-map" ref={routeMapRef} className="scroll-mt-32 mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <MapSection eyebrow="Route map" heading="Explore the route" description={detail.routeMapDescription} iframeSrc="https://www.google.com/maps/d/u/0/embed?mid=1iJR-sQx9OKhijZ897vW39j-idI81be4" iframeTitle="Kaysersberg, France Christmas Market Day Walk (2025) route map" eyebrowClassName="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]" headingClassName="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]" descriptionClassName="mt-4 max-w-3xl text-base leading-8 text-[#56493a]" mapCardClassName="mt-8 overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] shadow-lg sm:rounded-[2rem]" mapBackgroundClassName="h-[420px] w-full bg-zinc-100 sm:h-[480px] lg:h-auto lg:aspect-[16/9]">
          <div className="mt-6 rounded-[1.75rem] border border-[#d8c7b5] bg-[#fcfaf6] p-5 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-lg font-semibold tracking-tight text-[#3d3327] sm:text-xl">Take this route with you</p>
                <p className="mt-3 text-[15px] leading-7 text-[#56493a]">Scan to open the route on your phone using Google Maps.</p>
                <a href="https://www.google.com/maps/d/viewer?mid=1iJR-sQx9OKhijZ897vW39j-idI81be4" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2 text-sm font-semibold text-[#167fd5] shadow-sm transition hover:bg-[#edf6fd]">Open the route in Google Maps</a>
              </div>
              <a href="https://www.google.com/maps/d/viewer?mid=1iJR-sQx9OKhijZ897vW39j-idI81be4" target="_blank" rel="noreferrer" className="self-start rounded-[1.5rem] border border-[#e5d7c6] bg-white p-3 shadow-sm transition hover:border-[#cdb7a0]" aria-label="Open route on phone"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent("https://www.google.com/maps/d/viewer?mid=1iJR-sQx9OKhijZ897vW39j-idI81be4")}`} alt="QR code for route" width="132" height="132" className="h-[132px] w-[132px] rounded-xl" /></a>
            </div>
          </div>
        </MapSection>
      </section>
      <section id="licensing" ref={licensingHubRef} className="scroll-mt-32 mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="rounded-[2rem] border border-[#d8c7b5] bg-[#f7efe4] p-7 shadow-xl lg:p-8">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Licensing Hub</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">License this Kaysersberg footage</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">{detail.licensingDescription[0]}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">{detail.licensingDescription[1]}</p>
            </div>
            <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-5 shadow-sm sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf6] p-4"><div className="space-y-3">
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Camera</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">Sony A7S III</span></div>
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Lens</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">Sony FE 24mm f/1.4 GM Lens</span></div>
                    <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Microphone</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">Sony ECM-M1</span></div>
                </div></div>
                <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf6] p-4"><div className="space-y-3">
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Resolution</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">4K UHD</span></div>
                    <div className="border-b border-[#efe3d3] pb-3"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Frame Rate</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">59.94 fps</span></div>
                    <div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">Color</p><span className="mt-1 block text-sm font-semibold text-[#5c4c33]">Rec. 709</span></div>
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
          {relatedTours.map((tour) => (<a key={tour.href} href={tour.href} className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"><div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]"><img src={tour.imageSrc} alt={tour.imageAlt} className="aspect-video w-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.classList.add("bg-gradient-to-br", "from-[#2f261d]", "to-[#4a3c2f]"); }} /></div><p className="text-sm font-semibold text-[#3d3327]">{tour.title}</p><p className="mt-2 text-sm leading-7 text-[#6e5a45]">{tour.description}</p><p className="mt-4 text-sm font-semibold text-[#167fd5]">View tour &rarr;</p></a>))}
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
