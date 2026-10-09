import JapanClient from "./JapanClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Japan Walking Tours", "Explore Japan with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/japan");

export default function Page() { return <><PageJsonLd title="Japan Walking Tours" pathname="/destinations/japan" /><JapanClient /></>; }
