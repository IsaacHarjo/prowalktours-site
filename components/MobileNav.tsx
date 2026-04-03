"use client";

import Link from "next/link";
import { useState } from "react";

type MobileNavProps = {
  items: { label: string; href: string }[];
};

export default function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded-lg p-2 text-[#5c4c33] transition hover:bg-[#f8f3ec] lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Slide-down menu */}
      {open ? (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-[#d8c7b5] bg-white shadow-lg lg:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-4">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[16px] font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
