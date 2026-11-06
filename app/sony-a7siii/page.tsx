import SonyA7siiiClient from "./SonyA7siiiClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Sony A7S III", "My Sony walking-tour setup: camera, daytime and night lenses, NiSi filter, stabilizer, audio, and accessories.", "/sony-a7siii");
export default function Page() { return <><PageJsonLd title="Sony A7S III" pathname="/sony-a7siii" /><SonyA7siiiClient /></>; }
