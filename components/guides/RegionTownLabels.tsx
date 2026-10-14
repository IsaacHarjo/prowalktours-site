"use client";

import type { OrientationPlace } from "../../lib/guides/types";

export type RegionMapFrame = {
  width: number;
  height: number;
  points: { place: OrientationPlace; x: number; y: number }[];
};

export default function RegionTownLabels({ frame, focusCity, selectedCity, onSelect }: {
  frame: RegionMapFrame;
  focusCity: string;
  selectedCity: string;
  onSelect: (city: string) => void;
}) {
  const { width, height } = frame;
  if (!width || !height) return null;
  const compact = width < 500;
  const inset = compact ? 10 : 24;
  const pillWidth = compact ? 108 : 128;
  const gap = 46;
  const visible = frame.points.filter(point => point.place.labelSide && point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height);
  const labels = (["left", "right"] as const).flatMap(side => {
    const points = visible.filter(point => point.place.labelSide === side).sort((a, b) => a.y - b.y);
    const labelX = side === "left" ? inset : width - inset - pillWidth;
    const pinsInRail = visible.filter(point => point.x >= labelX - 7 && point.x <= labelX + pillWidth + 7).sort((a, b) => a.y - b.y);
    // Keep geographic north-to-south order, with enough room for touch targets.
    const rows: number[] = [];
    for (let index = 0; index < points.length; index++) {
      let row = Math.max(76, points[index].y, index ? rows[index - 1] + gap : 0);
      // On narrow maps, move labels past pins that fall within either label rail.
      for (const pin of pinsInRail) {
        if (Math.abs(row - pin.y) < 25) row = pin.y + 25;
      }
      rows.push(row);
    }
    for (let index = rows.length - 1; index >= 0; index--) {
      rows[index] = Math.min(rows[index], index === rows.length - 1 ? height - 48 : rows[index + 1] - gap);
    }
    // A bottom clamp can put a label back over a pin. Find the closest complete
    // arrangement in the free vertical slots, keeping all labels in order.
    if (pinsInRail.length && points.length) {
      const slots: number[] = [];
      for (let y = 76; y <= height - 48; y += 2) {
        if (pinsInRail.every(pin => Math.abs(y - pin.y) >= 25)) slots.push(y);
      }
      const parents: number[][] = [];
      let costs = slots.map(y => (y - points[0].y) ** 2);
      for (let index = 1; index < points.length; index++) {
        let cursor = 0, best = -1;
        parents[index] = [];
        const next = slots.map((y, slot) => {
          while (cursor < slot && slots[cursor] <= y - gap) {
            if (best === -1 || costs[cursor] < costs[best]) best = cursor;
            cursor++;
          }
          parents[index][slot] = best;
          return best < 0 ? Infinity : costs[best] + (y - points[index].y) ** 2;
        });
        costs = next;
      }
      let best = costs.reduce((result, cost, index) => result < 0 || cost < costs[result] ? index : result, -1);
      if (best >= 0 && Number.isFinite(costs[best])) {
        for (let index = points.length - 1; index >= 0; index--) {
          rows[index] = slots[best];
          best = parents[index]?.[best] ?? -1;
        }
      }
    }
    return points.map((point, index) => ({ ...point, side, labelX, labelY: rows[index] }));
  });

  return <svg role="group" viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden" aria-label={`Market towns around ${focusCity}`}>
    {labels.map(({ place, x, y, side, labelX, labelY }) => {
      const edgeX = side === "left" ? labelX + pillWidth : labelX;
      const elbowX = edgeX + (side === "left" ? 10 : -10);
      const path = `M ${edgeX} ${labelY} L ${elbowX} ${labelY} L ${x} ${y}`;
      return <g key={place.city} aria-hidden="true">
        <path d={path} fill="none" strokeWidth="3.5" className="stroke-white/90" />
        <path d={path} fill="none" strokeWidth="1.5" strokeDasharray="2 3" className="stroke-[#176347]" />
        <circle cx={x} cy={y} r={place.city === focusCity ? 7 : 4.5} strokeWidth="2" className="fill-[#176347] stroke-white" />
      </g>;
    })}
    {labels.map(({ place, labelX, labelY }) => {
      const selected = selectedCity === place.city;
      const focused = place.city === focusCity;
      const content = <>
        <rect x={labelX - 3} y={labelY - 22} width={pillWidth + 6} height="44" rx="12" className="fill-transparent stroke-transparent group-focus-visible:stroke-[#176347]" strokeWidth="2" />
        <rect x={labelX} y={labelY - 16} width={pillWidth} height="32" rx="16" strokeWidth={selected ? 2 : 1}
          className={focused ? "fill-[#176347] stroke-white" : selected ? "fill-[#f4e4bc] stroke-[#176347]" : "fill-white stroke-[#c3d1c5] group-hover:fill-[#f4e4bc]"} />
        <text x={labelX + pillWidth / 2} y={labelY} textAnchor="middle" dominantBaseline="central"
          className={`font-sans text-[11px] font-semibold sm:text-xs ${place.marketGuide ? "underline" : ""} ${focused ? "fill-white" : "fill-[#25382f]"}`}>{place.city}</text>
      </>;
      return place.marketGuide
        ? <a key={place.city} href={place.href} tabIndex={0} aria-label={`${place.city} Christmas market`} onClick={() => onSelect(place.city)} className="pointer-events-auto group cursor-pointer outline-none">{content}</a>
        : <g key={place.city} role="button" tabIndex={0} aria-label={`Select ${place.city}`} aria-pressed={selected}
          onClick={() => onSelect(place.city)}
          onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(place.city); } }}
          className="pointer-events-auto group cursor-pointer outline-none">{content}</g>;
    })}
  </svg>;
}
