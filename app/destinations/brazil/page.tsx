import BrazilClient from "./BrazilClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Brazil Walking Tours", "Explore Brazil with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/brazil");

export default function Page() { return <><PageJsonLd title="Brazil Walking Tours" pathname="/destinations/brazil" /><BrazilClient /></>; }
