import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Norway Walking Tours", "Explore Norway with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/norway");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Norway Walking Tours" pathname="/destinations/norway" />
      <CountryWalksPage
        country="Norway"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1seCCNQYf_wd6OVvtekyDs8wtMnOQxgw",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1seCCNQYf_wd6OVvtekyDs8wtMnOQxgw&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Norway")}
      />
    </>
  );
}
