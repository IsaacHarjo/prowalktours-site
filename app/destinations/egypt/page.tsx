import EgyptClient from "./EgyptClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Egypt Walking Tours", "Explore Egypt with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/egypt");

export default function Page() { return <><PageJsonLd title="Egypt Walking Tours" pathname="/destinations/egypt" /><EgyptClient /></>; }
