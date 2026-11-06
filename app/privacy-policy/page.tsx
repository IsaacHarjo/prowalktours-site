import PrivacyPolicyClient from "./PrivacyPolicyClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Privacy Policy", "How Prowalk Tours handles contact messages, website information, videos, maps, and privacy requests.", "/privacy-policy");

export default function Page() {
  return <><PageJsonLd title="Privacy Policy" pathname="/privacy-policy" /><PrivacyPolicyClient /></>;
}
