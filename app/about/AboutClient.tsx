"use client";
import Image from "next/image";
import Link from "next/link";
import InfoPage from "../../components/InfoPage";
import FilmingPhotoGallery, { type FilmingPhoto } from "../../components/FilmingPhotoGallery";
import CameraSettingsGuide from "../../components/CameraSettingsGuide";

// Add selected photos here; stages without a photo remain clean text cards.
const filmingSetups: {
  title: string;
  description: string;
  photo?: { src: string; alt: string; caption: string };
  photos?: FilmingPhoto[];
}[] = [
  {
    title: "Starting with a GoPro",
    description: "From 2017 to 2022, a GoPro was my main camera for the walks.",
    photos: [
      { src: "/images/about/gopro/gopro-filming-rig.jpg", alt: "Holding my GoPro filming rig outdoors", caption: "My GoPro filming setup", focus: "center-left" },
      { src: "/images/about/gopro/rome.jpg", alt: "With my GoPro outside the Colosseum", caption: "Filming in Rome" },
      { src: "/images/about/gopro/pyramids.jpg", alt: "Holding my GoPro with a pyramid behind me", caption: "With my GoPro in Egypt" },
    ],
  },
  {
    title: "Moving to Sony",
    description: "In 2022, I switched to my Sony camera with a DJI RS 2 gimbal, but the setup got pretty heavy on long walks.",
    photos: [
      { src: "/images/about/rs2/capri.jpg", alt: "Holding my Sony camera rig overlooking the coast of Capri", caption: "Filming in Capri" },
      { src: "/images/about/rs2/prague.jpg", alt: "With my Sony camera and gimbal-mounted microphones in Prague", caption: "Filming in Prague" },
      { src: "/images/about/rs2/central-park.jpg", alt: "Filming in Central Park with my Sony camera and RS2 gimbal", caption: "Filming in Central Park, New York" },
    ],
  },
  {
    title: "A smaller setup for the walk",
    description: "I eventually moved to the smaller DJI RS 4 Mini gimbal. This is the Sony setup I use today.",
    photos: [
      { src: "/images/about/rs4-mini/filming-in-colmar.jpg", alt: "Holding my Sony camera and DJI RS 4 Mini beside the canal in Colmar", caption: "Filming in Colmar with my Sony setup" },
      { src: "/images/about/rs4-mini/filming-in-kaysersberg.jpg", alt: "Holding my Sony camera and gimbal beside a fountain in Kaysersberg", caption: "Filming in Kaysersberg" },
      { src: "/images/about/rs4-mini/kaysersberg-over-the-shoulder.jpg", alt: "Looking over my shoulder as I film the half-timbered houses in Kaysersberg", caption: "The view over my shoulder in Kaysersberg" },
      { src: "/images/about/rs4-mini/filming-christmas-lights.jpg", alt: "Filming Christmas market lights with my Sony camera and RS 4 Mini", caption: "Out filming the Christmas lights" },
      { src: "/images/about/rs4-mini/filming-on-stone-steps.jpg", alt: "Filming with my camera while standing on stone steps", caption: "My setup on a daytime walk" },
      { src: "/images/about/rs4-mini/evening-camera-view.jpg", alt: "The back of my Sony camera showing a street during an evening recording", caption: "Behind the camera on an evening walk" },
    ],
  },
];

export default function AboutClient() {
  return <InfoPage title="About Prowalk Tours" intro="A walk can be a way to discover somewhere new, revisit a favorite place, or simply enjoy the sights and sounds of everyday life.">
    <section className="grid items-start gap-8 md:grid-cols-[1fr_280px]">
      <div><h2>How it all started</h2>
        <p>Ciao, I’m Isaac Harjo, aka Ike. My family and I moved to Italy in 2014 after I got a job with DoDEA as a high school math teacher. The idea for Prowalk Tours came from my uncle Knut: he wanted a video of Naples to watch while walking on his treadmill.</p>
        <p>I filmed that first <a href="https://youtu.be/ljudH28fomA" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Naples walk on February 11, 2017</a>, and shared it on YouTube three days later. The channel grew from that simple idea into an archive of walks around the world.</p>
        <p>It took 145 days for that first video to reach 2,000 views. By July 9, 2017, I had just four videos on the channel: Naples, Pompeii, the Spanish Quarter, and the Path of the Gods. At the end of my first year, I had 1,284 subscribers.</p>
        <p>The archive includes daytime and evening walks, Christmas markets, cycling, drone footage, and 360° experiences. Browse by <Link href="/countries">country</Link>, search for a <Link href="/search">landmark</Link>, or explore the <Link href="/#world-map">tour map</Link>.</p>
        <p>Since 2017, my walks have received nearly 200 million views on YouTube, with viewers spending a combined almost 11,000 years watching. Those are lifetime totals as of November 2026.</p>
        <p>Thank you for watching, sharing your memories, suggesting new places, and supporting the next walk.</p>
      </div>
      <Image src="/images/about/isaac-harjo.jpg" alt="A photo of me in front of the Colosseum in Rome" width={1000} height={1000} className="h-auto w-full rounded-3xl" sizes="(max-width: 767px) 100vw, 280px" />
    </section>
    <section aria-labelledby="channel-names">
      <h2 id="channel-names">The name changed along the way</h2>
      <p>I started the channel as Prowalks, later changed it to Prowalks Walking Tours, and finally settled on Prowalk Tours. Here are the three logos from those stages.</p>
      <ol className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { name: "Prowalks", image: "prowalks.jpg", stage: "The original name" },
          { name: "Prowalks Walking Tours", image: "prowalks-walking-tours.jpg", stage: "The next chapter" },
          { name: "Prowalk Tours", image: "prowalk-tours.png", stage: "The name today" },
        ].map(({ name, image, stage }) => <li key={name} className="rounded-2xl border border-[#dce2d9] bg-white p-5 text-center">
          <div className="relative mx-auto h-36 w-36">
            <Image src={`/images/about/channel-history/${image}`} alt={`My ${name} channel logo`} fill sizes="144px" className="object-contain" />
          </div>
          <h3 className="mt-4 text-base">{name}</h3>
          <p className="text-sm text-[#6e5a45]">{stage}</p>
        </li>)}
      </ol>
    </section>
    <section aria-labelledby="filming-through-the-years">
      <h2 id="filming-through-the-years">My filming setup through the years</h2>
      <p>Here are the three main camera setups I’ve used to film my walks over the years.</p>
      <div className="mt-6 grid min-w-0 grid-cols-1 gap-8">
        {filmingSetups.map((setup) => <article key={setup.title} className="min-w-0 overflow-hidden rounded-2xl border border-[#dce2d9] bg-white">
          {setup.photo && <figure>
            <div className="relative aspect-[4/3]">
              <Image src={setup.photo.src} alt={setup.photo.alt} fill sizes="(min-width: 768px) 350px, 100vw" className="object-contain p-3" />
            </div>
            <figcaption className="px-5 pb-2 text-sm text-[#56665d]">{setup.photo.caption}</figcaption>
          </figure>}
          <div className="p-5">
            <h3 className="text-lg font-semibold">{setup.title}</h3>
            <p className="mt-3 text-sm leading-6">{setup.description}</p>
            {setup.photos && <div className="mt-5"><FilmingPhotoGallery photos={setup.photos} /></div>}
          </div>
        </article>)}
      </div>
      <p><Link href="/filming-gear">See my filming gear and recommendations →</Link></p>
    </section>
    <section aria-labelledby="camera-settings" className="min-w-0">
      <h2 id="camera-settings">My daytime camera settings</h2>
      <p>These are the starting points for my daytime walks with the Sony A7S III. I adjust them as conditions change, and I’m still refining my setup.</p>
      <CameraSettingsGuide />
      <p>I’m always open to suggestions and improvements. What would you change? <Link href="/contact-us">Send me a note →</Link></p>
    </section>
    <section><h2>Behind the scenes</h2><p>Listen to my conversation on <a href="https://open.spotify.com/episode/0ej0AH4GXys0gKdUHkhAzW" target="_blank" rel="noreferrer">The Video Creatr Podcast</a>.</p><p>For professional projects, visit <Link href="/licensing">footage licensing</Link> and <Link href="/press">Press &amp; Partnerships</Link>. You can also <Link href="/contact-us">get in touch</Link>.</p></section>
  </InfoPage>;
}
