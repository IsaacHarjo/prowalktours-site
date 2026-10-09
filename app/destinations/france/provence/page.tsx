import ProvenceClient from "./ProvenceClient";
import { pageMetadata } from "../../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../../components/PageJsonLd";

export const metadata = pageMetadata("Provence Walking Tours", "Explore Provence with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/france/provence");

export default function Page() { return <><PageJsonLd title="Provence Walking Tours" pathname="/destinations/france/provence" /><ProvenceClient /></>; }
