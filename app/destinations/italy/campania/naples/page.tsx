import NaplesClient from "./NaplesClient";
import { pageMetadata } from "../../../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../../../components/PageJsonLd";

export const metadata = pageMetadata("Naples Walking Tours", "Explore Naples with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/italy/campania/naples");

export default function Page() { return <><PageJsonLd title="Naples Walking Tours" pathname="/destinations/italy/campania/naples" /><NaplesClient /></>; }
