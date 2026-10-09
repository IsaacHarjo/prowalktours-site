import JordanClient from "./JordanClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Jordan Walking Tours", "Explore Jordan with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/jordan");

export default function Page() { return <><PageJsonLd title="Jordan Walking Tours" pathname="/destinations/jordan" /><JordanClient /></>; }
