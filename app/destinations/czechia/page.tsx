import CzechiaClient from "./CzechiaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Czechia Walking Tours", "Explore Czechia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/czechia");

export default function Page() { return <><PageJsonLd title="Czechia Walking Tours" pathname="/destinations/czechia" /><CzechiaClient /></>; }
