import SupportClient from "./SupportClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Support the Walks", "Support Prowalk Tours through YouTube membership, Patreon, or a one-time PayPal contribution.", "/support");

export default function Page() {
  return <><PageJsonLd title="Support the Walks" pathname="/support" /><SupportClient /></>;
}
