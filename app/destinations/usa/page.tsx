import UnitedStatesClient from "./UnitedStatesClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";

export const metadata = pageMetadata("United States Walking Tours", "Explore United States with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/usa");

export default function Page() { return <><PageJsonLd title="United States Walking Tours" pathname="/destinations/usa" /><UnitedStatesClient /></>; }
