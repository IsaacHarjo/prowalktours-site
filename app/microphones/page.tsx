import MicrophonesClient from "./MicrophonesClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Microphones & Audio", "Explore Microphones & Audio equipment and retailer links from the Prowalk Tours filming gear archive.", "/microphones");
export default function Page() { return <><PageJsonLd title="Microphones & Audio" pathname="/microphones" /><MicrophonesClient /></>; }
