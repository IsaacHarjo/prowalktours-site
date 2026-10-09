import CountriesClient from "./CountriesClient";
import { pageMetadata } from "../../lib/seo/pageMetadata";
import PageJsonLd from "../../components/PageJsonLd";

export const metadata = pageMetadata("Browse Countries", "Browse Prowalk Tours by country. Explore destination maps, cities, and immersive walking tour videos.", "/countries");

export default function Page() { return <><PageJsonLd title="Browse Countries" pathname="/countries" /><CountriesClient /></>; }
