import Link from "next/link";
import { readyChristmasGuides } from "../lib/christmas/ready-guides";
import { normalizeCategories } from "../lib/tours/core";

export default function PlanYourVisit({ city, themes }: { city?: string; themes?: readonly string[] }) {
  const guide = city && normalizeCategories([...(themes ?? [])]).includes("christmas-market") ? readyChristmasGuides[city] : undefined;
  if (!guide) return null;

  return (
    <div className="mt-6">
      <Link href={guide.href} className="inline-flex min-h-11 max-w-full items-center rounded-2xl bg-[#176347] px-5 py-3 text-sm font-semibold leading-6 text-white transition hover:bg-[#124e38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
        Plan your visit: my {city} Christmas guide <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </div>
  );
}
