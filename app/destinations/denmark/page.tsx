import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Denmark Walking Tours", "Explore Denmark with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/denmark");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Denmark Walking Tours" pathname="/destinations/denmark" />
      <CountryWalksPage
        country="Denmark"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1r-1urzo7Iz1C9CenakE5OLtEq1TUACE",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1r-1urzo7Iz1C9CenakE5OLtEq1TUACE&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Denmark")}
      />
    </>
  );
}
