import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Turkey Walking Tours", "Explore Turkey with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/turkey");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Turkey Walking Tours" pathname="/destinations/turkey" />
      <CountryWalksPage
        country="Turkey"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1pR8-KDoECSj_LrUaNexSv5gxBIYEwXk",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1pR8-KDoECSj_LrUaNexSv5gxBIYEwXk&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Turkey")}
      />
    </>
  );
}
