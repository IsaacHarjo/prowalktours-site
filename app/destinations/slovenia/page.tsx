import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Slovenia Walking Tours", "Explore Slovenia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/slovenia");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Slovenia Walking Tours" pathname="/destinations/slovenia" />
      <CountryWalksPage
        country="Slovenia"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1heg7838h4XKHawdhJgf4CrsGDcx9YjY",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1heg7838h4XKHawdhJgf4CrsGDcx9YjY&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Slovenia")}
      />
    </>
  );
}
