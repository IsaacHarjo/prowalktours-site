import GoproClient from "./GoproClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("GoPro & Action Cameras", "Explore GoPro & Action Cameras equipment and retailer links from the Prowalk Tours filming gear archive.", "/gopro");
export default function Page() { return <><PageJsonLd title="GoPro & Action Cameras" pathname="/gopro" /><GoproClient /></>; }
