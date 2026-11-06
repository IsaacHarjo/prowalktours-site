import MicrophonesClient from "./MicrophonesClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Microphones & Audio", "My Sony ECM-M1 microphone, Sound Professionals binaural setup, Zoom recorder, and Roland backup, with equipment links.", "/microphones");
export default function Page() { return <><PageJsonLd title="Microphones & Audio" pathname="/microphones" /><MicrophonesClient /></>; }
