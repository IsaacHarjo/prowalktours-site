import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("United States Walking Tours", "Explore United States with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/usa");

export default function Page() {
  return (
    <>
      <PageJsonLd title="United States Walking Tours" pathname="/destinations/usa" />
      <CountryWalksPage
        country="USA"
        inSentence="the United States"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1tK1BxpTYoDbl9253VX2cKsHCjadtkV8",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1tK1BxpTYoDbl9253VX2cKsHCjadtkV8&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("USA")}
      />
    </>
  );
}
