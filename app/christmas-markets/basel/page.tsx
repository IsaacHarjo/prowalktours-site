import ChristmasMarketPreview, { marketPreviewMetadata } from "../../../components/guides/ChristmasMarketPreview";

export const metadata = marketPreviewMetadata("Basel");

export default function BaselChristmasPage() {
  return <ChristmasMarketPreview city="Basel" />;
}
