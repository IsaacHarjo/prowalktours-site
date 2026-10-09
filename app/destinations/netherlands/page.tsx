import NetherlandsClient from "./NetherlandsClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Netherlands Walking Tours", "Explore Netherlands with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/netherlands");

export default function Page() { return <><PageJsonLd title="Netherlands Walking Tours" pathname="/destinations/netherlands" /><NetherlandsClient /></>; }
