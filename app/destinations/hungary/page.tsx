import HungaryClient from "./HungaryClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Hungary Walking Tours", "Explore Hungary with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/hungary");

export default function Page() { return <><PageJsonLd title="Hungary Walking Tours" pathname="/destinations/hungary" /><HungaryClient /></>; }
