import SponsorClient from "./SponsorClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Sponsor Prowalk Tours", "Discuss brand partnerships, travel equipment, and sponsorship opportunities with Prowalk Tours.", "/sponsor");

export default function Page() {
  return <><PageJsonLd title="Sponsor Prowalk Tours" pathname="/sponsor" /><SponsorClient /></>;
}

