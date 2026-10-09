import TravelAccessoriesClient from "./TravelAccessoriesClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Travel Accessories", "Explore Travel Accessories equipment and retailer links from the Prowalk Tours filming gear archive.", "/travel-accessories");
export default function Page() { return <><PageJsonLd title="Travel Accessories" pathname="/travel-accessories" /><TravelAccessoriesClient /></>; }
