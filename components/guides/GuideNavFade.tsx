// Phone-only fade at the right edge of a guide's sticky "In this guide" nav,
// hinting that the row of chips scrolls sideways. The nav is sticky, so it is
// the positioning context for this overlay.
export default function GuideNavFade() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-[#fcfaf7] via-[#fcfaf7]/80 to-transparent lg:hidden" />;
}

// Extra end padding on the scrolling chip row so the last chip can scroll
// clear of the fade on phones.
export const navScrollPad = "pr-16 sm:pr-16 lg:pr-10";

// Breadcrumb links: at least 24px tall so they meet the minimum touch target.
export const crumbClass = "inline-flex min-h-6 items-center hover:underline";
