import FilmingGearClient from "./FilmingGearClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Filming Gear", "Explore the cameras, stabilizers, and binaural audio behind Prowalk Tours, from early GoPro walks to newer Sony A7S III films.", "/filming-gear");

export default function Page() {
  return <><PageJsonLd title="Filming Gear" pathname="/filming-gear" /><FilmingGearClient /></>;
}
