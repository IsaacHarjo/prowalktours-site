import TermsOfUseClient from "./TermsOfUseClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Terms of Use", "Review draft covering use of the Prowalk Tours website and planned Roku application, content rights, and footage licensing.", "/terms-of-use", true);

export default function Page() {
  return <><PageJsonLd title="Terms of Use" pathname="/terms-of-use" /><TermsOfUseClient /></>;
}
