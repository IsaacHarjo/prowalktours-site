import FrenchRivieraClient from "./FrenchRivieraClient";
import { pageMetadata } from "../../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../../components/PageJsonLd";

export const metadata = pageMetadata("French Riviera Walking Tours", "Explore French Riviera with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/france/french-riviera");

export default function Page() { return <><PageJsonLd title="French Riviera Walking Tours" pathname="/destinations/france/french-riviera" /><FrenchRivieraClient /></>; }
