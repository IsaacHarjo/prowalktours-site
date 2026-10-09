import CampaniaClient from "./CampaniaClient";
import { pageMetadata } from "../../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../../components/PageJsonLd";

export const metadata = pageMetadata("Campania Walking Tours", "Explore Campania with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/italy/campania");

export default function Page() { return <><PageJsonLd title="Campania Walking Tours" pathname="/destinations/italy/campania" /><CampaniaClient /></>; }
