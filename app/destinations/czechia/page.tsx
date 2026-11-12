import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Czechia Walking Tours", "Explore Czechia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/czechia");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Czechia Walking Tours" pathname="/destinations/czechia" />
      <CountryWalksPage
        country="Czechia"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1XHRsQknoYh_w_el_vPxPyKVKaRT-ZY8",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1XHRsQknoYh_w_el_vPxPyKVKaRT-ZY8&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Czechia")}
      />
    </>
  );
}
