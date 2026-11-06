import TermsOfUseClient from "./TermsOfUseClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Terms of Use", "Using the Prowalk Tours website, walking tours, travel guides, and footage licensing services.", "/terms-of-use");

export default function Page() {
  return <><PageJsonLd title="Terms of Use" pathname="/terms-of-use" /><TermsOfUseClient /></>;
}
