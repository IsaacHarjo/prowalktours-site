import PressClient from "./PressClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Press & Partnerships", "Prowalk Tours media coverage, Janson Media distribution partnership, institutional licensing, and sponsorship inquiries.", "/press");

export default function Page() {
  return <><PageJsonLd title="Press & Partnerships" pathname="/press" /><PressClient /></>;
}

