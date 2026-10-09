import LicensingClient from "./LicensingClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Footage Licensing", "License Prowalk Tours 4K footage and binaural audio for television, streaming, commercial projects, and institutional displays. Prepare a licensing inquiry.", "/licensing");
export default function LicensingPage() { return <><PageJsonLd title="Footage Licensing" pathname="/licensing" /><LicensingClient /></>; }
