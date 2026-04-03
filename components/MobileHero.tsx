"use client";

export default function MobileHero() {
  return (
    <div
      className="relative bg-cover bg-center lg:hidden"
      style={{
        backgroundImage: "url('/images/homepage/hero-mobile.jpg')",
        minHeight: "200px",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 px-5 py-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#f3dfc4]">
          Immersive Travel Videos
        </p>
        <h1 className="text-xl font-bold leading-tight text-white">
          Explore the world one walk at a time
        </h1>
        <p className="mt-1 text-sm leading-6 text-white/85">
          421 walks across Italy, France &amp; Germany
        </p>
      </div>
    </div>
  );
}
