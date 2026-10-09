import AustriaClient from "./AustriaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Austria Walking Tours", "Explore Austria with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/austria");

export default function Page() { return <><PageJsonLd title="Austria Walking Tours" pathname="/destinations/austria" /><AustriaClient /></>; }
