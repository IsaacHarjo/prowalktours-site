import ChristmasMarketPreview, { marketPreviewMetadata } from "../../../components/guides/ChristmasMarketPreview";

export const metadata = marketPreviewMetadata("Strasbourg");

export default function StrasbourgChristmasPage() {
  return <ChristmasMarketPreview city="Strasbourg" />;
}
