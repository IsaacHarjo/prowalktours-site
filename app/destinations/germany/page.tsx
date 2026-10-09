import GermanyClient from "./GermanyClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Germany Walking Tours", "Explore Germany with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/germany");

export default function Page() { return <><PageJsonLd title="Germany Walking Tours" pathname="/destinations/germany" /><GermanyClient /></>; }
