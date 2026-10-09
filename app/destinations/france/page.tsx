import FranceClient from "./FranceClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("France Walking Tours", "Explore France with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/france");

export default function Page() { return <><PageJsonLd title="France Walking Tours" pathname="/destinations/france" /><FranceClient /></>; }
