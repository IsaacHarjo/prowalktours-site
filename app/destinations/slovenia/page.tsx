import SloveniaClient from "./SloveniaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Slovenia Walking Tours", "Explore Slovenia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/slovenia");

export default function Page() { return <><PageJsonLd title="Slovenia Walking Tours" pathname="/destinations/slovenia" /><SloveniaClient /></>; }
