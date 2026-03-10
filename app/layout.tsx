import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

type DropdownItem = {
  label: string;
  href?: string;
};

type NavItem = {
  label: string;
  href?: string;
  items?: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    label: "Destinations",
    items: [
      { label: "Naples, Italy", href: "/destinations/italy/campania/naples" },
      { label: "Campania", href: "/destinations/italy/campania/naples" },
      { label: "Italy", href: "/destinations/italy/campania/naples" },
      { label: "All Destinations" },
    ],
  },
  {
    label: "Tours",
    items: [
      {
        label: "Naples Daytime Walk — July 2023",
        href: "/videos/naples-daytime-walk-2023",
      },
      { label: "Day Walks" },
      { label: "Night Walks" },
      { label: "Long Walks" },
    ],
  },
  {
    label: "360 / VR",
    items: [
      { label: "360 Walking Tours" },
      { label: "VR Headset-Friendly Videos" },
      { label: "Featured 360 Cities" },
    ],
  },
  {
    label: "Drone",
    items: [
      { label: "City Aerials" },
      { label: "Waterfronts & Coastlines" },
      { label: "Historic Landmarks" },
    ],
  },
  {
    label: "Licensing",
    items: [
      { label: "License Footage", href: "/licensing" },
      { label: "Request a Quote", href: "/licensing" },
      { label: "Licensing FAQ" },
    ],
  },
  {
    label: "Gear",
    items: [
      { label: "My Camera Kit" },
      { label: "Walking Tour Setup" },
      { label: "360 & VR Gear" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About Prowalk Tours" },
      { label: "Contact" },
      { label: "Support the Channel" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Prowalk Tours",
  description: "Immersive walking tours, 360 videos, drone footage, and licensing.",
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c7b5] bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
        <div className="justify-self-start">
  <Link
    href="/"
    className="shrink-0 text-xl font-bold tracking-[0.2em] text-[#3d3327] sm:text-2xl"
  >
    PROWALK TOURS
  </Link>
</div>

        <nav className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-[#5c4c33]">
            {navItems.map((item) => (
              <li key={item.label} className="group relative">
                {item.items ? (
                  <>
                    <span className="cursor-default transition hover:text-[#167fd5]">
                      {item.label}
                    </span>

                    <div className="invisible absolute left-0 top-full z-50 mt-4 w-64 rounded-2xl border border-[#d8c7b5] bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="space-y-1">
                        {item.items.map((subItem) =>
                          subItem.href ? (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block rounded-xl px-3 py-2 text-sm text-[#5c4c33] transition hover:bg-[#fff7ee] hover:text-[#167fd5]"
                            >
                              {subItem.label}
                            </Link>
                          ) : (
                            <span
                              key={subItem.label}
                              className="block rounded-xl px-3 py-2 text-sm text-[#a08f7e]"
                            >
                              {subItem.label}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="transition hover:text-[#167fd5]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block" />
      </div>

      <div className="border-t border-[#efe3d3] lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 py-3 text-sm font-medium text-[#5c4c33]">
          {navItems.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} className="whitespace-nowrap">
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className="whitespace-nowrap">
                {item.label}
              </span>
            )
          )}
        </div>
      </div>
    </header>
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
      </body>
    </html>
  );
}