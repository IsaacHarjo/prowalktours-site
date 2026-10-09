import DenmarkClient from "./DenmarkClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Denmark Walking Tours", "Explore Denmark with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/denmark");

export default function Page() { return <><PageJsonLd title="Denmark Walking Tours" pathname="/destinations/denmark" /><DenmarkClient /></>; }
