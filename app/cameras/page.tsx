import CamerasClient from "./CamerasClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Cameras", "Browse Sony, GoPro, Insta360, Osmo Pocket, and phone filming equipment in the Prowalk Tours gear archive.", "/cameras");
export default function Page() { return <><PageJsonLd title="Cameras" pathname="/cameras" /><CamerasClient /></>; }
