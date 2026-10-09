import SonyA7siiiClient from "./SonyA7siiiClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Sony A7S III", "Explore Sony A7S III equipment and retailer links from the Prowalk Tours filming gear archive.", "/sony-a7siii");
export default function Page() { return <><PageJsonLd title="Sony A7S III" pathname="/sony-a7siii" /><SonyA7siiiClient /></>; }
