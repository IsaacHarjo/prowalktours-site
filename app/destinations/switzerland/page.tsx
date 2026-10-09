import SwitzerlandClient from "./SwitzerlandClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Switzerland Walking Tours", "Explore Switzerland with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/switzerland");

export default function Page() { return <><PageJsonLd title="Switzerland Walking Tours" pathname="/destinations/switzerland" /><SwitzerlandClient /></>; }
