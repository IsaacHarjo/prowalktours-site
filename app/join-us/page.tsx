import JoinUsClient from "./JoinUsClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";

export const metadata = pageMetadata("Join Us", "Introduce your filming work and destination ideas to Prowalk Tours.", "/join-us");

export default function Page() {
  return <><PageJsonLd title="Join Us" pathname="/join-us" /><JoinUsClient /></>;
}
