import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Japan Walking Tours", "Explore Japan with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/japan");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Japan Walking Tours" pathname="/destinations/japan" />
      <CountryWalksPage
        country="Japan"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1pS8h16VBoC4_O3WcTzNnW4ttoznl2L0",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1pS8h16VBoC4_O3WcTzNnW4ttoznl2L0&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Japan")}
      />
    </>
  );
}
