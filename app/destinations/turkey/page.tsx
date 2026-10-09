import TurkeyClient from "./TurkeyClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Turkey Walking Tours", "Explore Turkey with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/turkey");

export default function Page() { return <><PageJsonLd title="Turkey Walking Tours" pathname="/destinations/turkey" /><TurkeyClient /></>; }
