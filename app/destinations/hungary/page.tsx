import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Hungary Walking Tours", "Explore Hungary with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/hungary");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Hungary Walking Tours" pathname="/destinations/hungary" />
      <CountryWalksPage
        country="Hungary"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1lTJ7wip3txNf6ao2UxgpvhpInpMwA8k",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1lTJ7wip3txNf6ao2UxgpvhpInpMwA8k&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Hungary")}
      />
    </>
  );
}
