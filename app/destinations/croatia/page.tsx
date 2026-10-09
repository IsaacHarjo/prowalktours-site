import CroatiaClient from "./CroatiaClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("Croatia Walking Tours", "Explore Croatia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/croatia");

export default function Page() { return <><PageJsonLd title="Croatia Walking Tours" pathname="/destinations/croatia" /><CroatiaClient /></>; }
