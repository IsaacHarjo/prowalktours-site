import PhoneClient from "./PhoneClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Phone Filming", "Explore Phone Filming equipment and retailer links from the Prowalk Tours filming gear archive.", "/phone");
export default function Page() { return <><PageJsonLd title="Phone Filming" pathname="/phone" /><PhoneClient /></>; }
