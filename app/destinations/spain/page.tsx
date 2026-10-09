import SpainClient from "./SpainClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Spain Walking Tours", "Explore Spain with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/spain");

export default function Page() { return <><PageJsonLd title="Spain Walking Tours" pathname="/destinations/spain" /><SpainClient /></>; }
