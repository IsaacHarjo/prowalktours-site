import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Malta Walking Tours", "Explore Malta with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/malta");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Malta Walking Tours" pathname="/destinations/malta" />
      <CountryWalksPage
        country="Malta"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1QmHpQjPAXOFxNvnR8I5GSJEixZgzx2s",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1QmHpQjPAXOFxNvnR8I5GSJEixZgzx2s&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Malta")}
      />
    </>
  );
}
