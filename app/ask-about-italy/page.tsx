import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
import AskAboutItalyClient from "./AskAboutItalyClient";

export const metadata = pageMetadata("Ask me about Italy", "Planning a trip to Italy? Ask me where to go, what to see or how to plan your time, with suggestions based on my travels.", "/ask-about-italy");

export default function Page() {
  return <><PageJsonLd title="Ask me about Italy" pathname="/ask-about-italy" /><AskAboutItalyClient /></>;
}
