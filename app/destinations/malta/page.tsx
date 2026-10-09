import MaltaClient from "./MaltaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Malta Walking Tours", "Explore Malta with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/malta");

export default function Page() { return <><PageJsonLd title="Malta Walking Tours" pathname="/destinations/malta" /><MaltaClient /></>; }
