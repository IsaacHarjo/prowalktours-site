import type { ReactNode } from "react";

export type LongFormWalkStat = {
  icon: string;
  label: string;
  value: string;
};

type LongFormWalkPageProps = {
  stickyNav: ReactNode;
  children: ReactNode;
  className?: string;
};

type LongFormWalkStatsRowProps = {
  stats: LongFormWalkStat[];
};

export function LongFormWalkStatsRow({ stats }: LongFormWalkStatsRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="inline-flex min-w-0 items-center gap-3"
        >
          <span aria-hidden="true" className="text-base leading-none">
            {stat.icon}
          </span>
          <div className="flex min-w-0 items-baseline gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
              {stat.label}
            </p>
            <p className="text-sm font-bold leading-6 text-[#3d3327] sm:text-[15px]">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LongFormWalkPage({
  stickyNav,
  children,
  className = "min-h-screen bg-[#fcfaf6] text-[#3d3327]",
}: LongFormWalkPageProps) {
  return (
    <div className={className}>
      {stickyNav}
      {children}
    </div>
  );
}
