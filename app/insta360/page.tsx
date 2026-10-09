import Insta360Client from "./Insta360Client";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Insta360", "Explore Insta360 equipment and retailer links from the Prowalk Tours filming gear archive.", "/insta360");
export default function Page() { return <><PageJsonLd title="Insta360" pathname="/insta360" /><Insta360Client /></>; }
