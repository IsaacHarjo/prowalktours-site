import AustraliaClient from "./AustraliaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Australia Walking Tours", "Explore Australia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/australia");

export default function Page() { return <><PageJsonLd title="Australia Walking Tours" pathname="/destinations/australia" /><AustraliaClient /></>; }
