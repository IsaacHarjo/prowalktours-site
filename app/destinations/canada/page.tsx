import CanadaClient from "./CanadaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Canada Walking Tours", "Explore Canada with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/canada");

export default function Page() { return <><PageJsonLd title="Canada Walking Tours" pathname="/destinations/canada" /><CanadaClient /></>; }
