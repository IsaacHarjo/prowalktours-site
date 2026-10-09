import AboutClient from "./AboutClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("About Prowalk Tours", "Meet Isaac Harjo and discover the story behind Prowalk Tours: immersive 4K walking tours with binaural audio.", "/about");

export default function Page() {
  return <><PageJsonLd title="About Prowalk Tours" pathname="/about" /><AboutClient /></>;
}
