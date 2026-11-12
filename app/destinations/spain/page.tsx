import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Spain Walking Tours", "Explore Spain with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/spain");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Spain Walking Tours" pathname="/destinations/spain" />
      <CountryWalksPage
        country="Spain"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1N3lkIYI0ONRTKAM8UPyrmXZun2XsElk",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1N3lkIYI0ONRTKAM8UPyrmXZun2XsElk&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Spain")}
      />
    </>
  );
}
