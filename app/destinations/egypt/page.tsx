import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Egypt Walking Tours", "Explore Egypt with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/egypt");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Egypt Walking Tours" pathname="/destinations/egypt" />
      <CountryWalksPage
        country="Egypt"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1WaJS5t2sr3lKd5YaOacdn2k_FwbZbZY",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1WaJS5t2sr3lKd5YaOacdn2k_FwbZbZY&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Egypt")}
      />
    </>
  );
}
