import ContactClient from "./ContactClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Contact Us", "Contact Prowalk Tours about walking tours, footage licensing, partnerships, destination suggestions.", "/contact-us");

export default async function Page({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const initialTopic = ["walk", "sponsorship", "press", "other"].includes(topic ?? "") ? topic : "";
  return <><PageJsonLd title="Contact Us" pathname="/contact-us" /><ContactClient initialTopic={initialTopic} /></>;
}
