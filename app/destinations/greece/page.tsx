import GreeceClient from "./GreeceClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Greece Walking Tours", "Explore Greece with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/greece");

export default function Page() { return <><PageJsonLd title="Greece Walking Tours" pathname="/destinations/greece" /><GreeceClient /></>; }
