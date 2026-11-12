import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Jordan Walking Tours", "Explore Jordan with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/jordan");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Jordan Walking Tours" pathname="/destinations/jordan" />
      <CountryWalksPage
        country="Jordan"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1d_QEuLjD-93OEVN-oOJHX3aAVtf6cmM",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1d_QEuLjD-93OEVN-oOJHX3aAVtf6cmM&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Jordan")}
      />
    </>
  );
}
