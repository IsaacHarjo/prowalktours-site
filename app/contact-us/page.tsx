import ContactClient from "./ContactClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Contact Us", "Contact Prowalk Tours about walking tours, footage licensing, partnerships, destination suggestions, and the planned Roku application.", "/contact-us");

export default function Page() {
  return <><PageJsonLd title="Contact Us" pathname="/contact-us" /><ContactClient /></>;
}
