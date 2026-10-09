import ItalyClient from "./ItalyClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Italy Walking Tours", "Explore Italy with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/italy");

export default function Page() { return <><PageJsonLd title="Italy Walking Tours" pathname="/destinations/italy" /><ItalyClient /></>; }
