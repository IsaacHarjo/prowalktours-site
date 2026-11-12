import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Greece Walking Tours", "Explore Greece with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/greece");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Greece Walking Tours" pathname="/destinations/greece" />
      <CountryWalksPage
        country="Greece"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1Nkio52GJAcw5Kvy_sNl_02fPoUvq10Q",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1Nkio52GJAcw5Kvy_sNl_02fPoUvq10Q&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Greece")}
      />
    </>
  );
}
