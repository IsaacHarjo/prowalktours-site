import OsmoPocketClient from "./OsmoPocketClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Osmo Pocket", "Explore Osmo Pocket equipment and retailer links from the Prowalk Tours filming gear archive.", "/osmo-pocket");
export default function Page() { return <><PageJsonLd title="Osmo Pocket" pathname="/osmo-pocket" /><OsmoPocketClient /></>; }
