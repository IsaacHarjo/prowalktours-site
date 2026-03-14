import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/homepage/hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[#1f1812]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f1812]/75 via-[#1f1812]/45 to-transparent" />

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#f3dfc4]">
              Immersive Travel Videos
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Explore the world one walk at a time
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
              Experience real walks, natural sound, and unforgettable places
              through immersive videos filmed around the world.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/countries"
                className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
              >
                Browse Countries
              </Link>

              <Link
                href="#map"
                className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Explore the Map
              </Link>
            </div>

            <form
              action="/search"
              method="get"
              className="mt-8 max-w-2xl rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  name="q"
                  placeholder="Search countries, cities, or walks"
                  className="h-14 flex-1 rounded-xl border border-transparent bg-transparent px-5 text-[17px] text-[#2f261d] outline-none placeholder:text-[#8a7a68]"
                />
                <button
                  type="submit"
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-[#3d3327] px-6 text-base font-semibold text-white transition hover:bg-[#2f261d]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section
        id="countries"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-10"
      >
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Next Section
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Browse by Country
          </h2>
          <p className="mt-3 max-w-2xl text-[17px] leading-8 text-[#6c5b49]">
            This is where your country section will go next.
          </p>
        </div>
      </section>

      <section
        id="map"
        className="mx-auto max-w-7xl px-6 pb-20 lg:px-10"
      >
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Future Feature
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Interactive World Map
          </h2>
          <p className="mt-3 max-w-2xl text-[17px] leading-8 text-[#6c5b49]">
            This is where the clickable map section can go after the country
            section is built.
          </p>
        </div>
      </section>
    </main>
  );
}
