import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Australia Walking Tours", "Explore Australia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/australia");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Australia Walking Tours" pathname="/destinations/australia" />
      <CountryWalksPage
        country="Australia"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1oIZTMWjFoeM5HKrP7b8BbCBmXTGrCg0",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1oIZTMWjFoeM5HKrP7b8BbCBmXTGrCg0&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Australia")}
      />
    </>
  );
}
