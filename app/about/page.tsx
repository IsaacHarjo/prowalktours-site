import AboutClient from "./AboutClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("About Prowalk Tours", "How I started Prowalk Tours, from a walk through Naples for my uncle’s treadmill to filming places around the world.", "/about");

export default function Page() {
  return <><PageJsonLd title="About Prowalk Tours" pathname="/about" /><AboutClient /></>;
}
