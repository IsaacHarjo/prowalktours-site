import PortugalClient from "./PortugalClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Portugal Walking Tours", "Explore Portugal with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/portugal");

export default function Page() { return <><PageJsonLd title="Portugal Walking Tours" pathname="/destinations/portugal" /><PortugalClient /></>; }
