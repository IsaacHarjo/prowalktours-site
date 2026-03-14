import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Countries", href: "/countries" },
  { label: "Map", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Store", href: "/" },
  { label: "Licensing", href: "/licensing" },
  { label: "About", href: "/" },
];

const socialLinks = {
  facebook: "https://facebook.com/prowalktours",
  instagram: "https://instagram.com/prowalktours",
  linkedin: "https://www.linkedin.com/in/isaac-harjo-87374b71/",
  x: "https://x.com/ProwalkTours",
  tiktok: "https://www.tiktok.com/@prowalktours",
  youtube: "https://www.youtube.com/@ProwalkTours",
};

const footerSections = {
  explore: [
    { label: "Countries", href: "/countries" },
    { label: "Italy", href: "/destinations/italy" },
    { label: "Campania", href: "/destinations/italy/campania" },
    { label: "Naples", href: "/destinations/italy/campania/naples" },
  ],
  resources: [
    { label: "Licensing", href: "/licensing" },
    { label: "Featured Walk", href: "/videos/naples-daytime-walk-2023" },
    { label: "YouTube Channel", href: socialLinks.youtube },
    { label: "Travel Videos", href: "/" },
  ],
  social: [
    { label: "Instagram", href: socialLinks.instagram },
    { label: "YouTube", href: socialLinks.youtube },
    { label: "TikTok", href: socialLinks.tiktok },
    { label: "Facebook", href: socialLinks.facebook },
  ],
};

export const metadata: Metadata = {
  title: "Prowalk Tours",
  description: "Immersive walking tours, 360 videos, drone footage, and licensing.",
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c7b5] bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1.22fr_auto_1fr] items-center pl-2 pr-6 lg:pl-4 lg:pr-10">
        <div className="justify-self-start">
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Prowalk Tours homepage"
          >
            <Image
              src="/logo/prowalk-logo-horizontal.png"
              alt="Prowalk Tours"
              width={220}
              height={48}
              className="h-7 w-auto sm:h-[1.875rem] md:h-8"
              priority
            />
          </Link>
        </div>

        <nav className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-8 text-[17px] font-semibold tracking-[0.04em] text-[#5c4c33]">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition hover:text-[#167fd5]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-self-end gap-3 text-[#5c4c33] lg:flex">
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="transition hover:text-[#167fd5]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4V11H7.3v3H10v8h3.5z" />
            </svg>
          </a>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-[#167fd5]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-[#167fd5]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.5 9.75h2.88V19H5.5V9.75Zm4.69 0h2.76v1.26h.04c.38-.73 1.32-1.5 2.72-1.5 2.91 0 3.45 1.91 3.45 4.4V19h-2.88v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.38V19h-2.87V9.75Z" />
            </svg>
          </a>

          <a
            href={socialLinks.x}
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="transition hover:text-[#167fd5]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.9 3H21l-6.8 7.8L22.2 21h-6.3l-4.9-6.4L5.4 21H3.3l7.2-8.2L2 3h6.4l4.4 5.8L18.9 3Zm-2.2 16h1.7L7.2 4.9H5.4L16.7 19Z" />
            </svg>
          </a>

          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="transition hover:text-[#167fd5]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14 3c.2 1.7 1.2 3.1 2.8 3.9 1 .5 2 .8 3.2.8v3c-1.7 0-3.4-.5-4.8-1.5v5.2c0 3.2-2.5 5.6-5.7 5.6S4 17.6 4 14.4c0-3.1 2.4-5.5 5.4-5.6v3c-1.3.1-2.4 1.2-2.4 2.6 0 1.5 1.2 2.6 2.6 2.6 1.5 0 2.5-1.1 2.5-2.6V3h1.9Z" />
            </svg>
          </a>

          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="transition hover:text-[#167fd5]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-[#efe3d3] lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 px-6 py-3 text-[16px] font-semibold tracking-[0.04em] text-[#5c4c33]">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#d8c7b5] bg-[#f7f1e8] text-[#3d3327]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-2xl font-bold tracking-[0.16em] text-[#3d3327]">
              PROWALK TOURS
            </p>
            <p className="mt-3 max-w-sm text-[15px] leading-7 text-[#6e5a45]">
              Immersive walking tours, city atmosphere, drone footage, and
              destination storytelling from around the world.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-[#5c4c33]">
              {footerSections.explore.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-[#167fd5]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              Resources
            </p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-[#5c4c33]">
              {footerSections.resources.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-[#167fd5]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="transition hover:text-[#167fd5]">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              Social
            </p>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-[#5c4c33]">
              {footerSections.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-[#167fd5]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#dccbb7] pt-4 text-sm text-[#7c6b59]">
          <p>© 2026 Prowalk Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
