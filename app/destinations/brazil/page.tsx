import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Brazil Walking Tours", "Explore Brazil with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/brazil");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Brazil Walking Tours" pathname="/destinations/brazil" />
      <CountryWalksPage
        country="Brazil"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1APnpgf5Q725Bg1GXBMb5YvSKULLzTYo",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1APnpgf5Q725Bg1GXBMb5YvSKULLzTYo&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Brazil")}
      />
    </>
  );
}
