import FilmingGearClient from "./FilmingGearClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Filming Gear & Recommendations", "Browse the cameras, microphones, and travel accessories I use or recommend for filming my walking tours.", "/filming-gear");

export default function Page() {
  return <><PageJsonLd title="Filming Gear" pathname="/filming-gear" /><FilmingGearClient /></>;
}
