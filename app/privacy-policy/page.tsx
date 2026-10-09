import PrivacyPolicyClient from "./PrivacyPolicyClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Privacy Policy", "Review draft covering privacy for the new Prowalk Tours website and planned independent Roku application.", "/privacy-policy", true);

export default function Page() {
  return <><PageJsonLd title="Privacy Policy" pathname="/privacy-policy" /><PrivacyPolicyClient /></>;
}
