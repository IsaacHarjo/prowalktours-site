import NorwayClient from "./NorwayClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Norway Walking Tours", "Explore Norway with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/norway");

export default function Page() { return <><PageJsonLd title="Norway Walking Tours" pathname="/destinations/norway" /><NorwayClient /></>; }
