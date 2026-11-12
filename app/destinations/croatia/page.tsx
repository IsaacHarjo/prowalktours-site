import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Croatia Walking Tours", "Explore Croatia with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/croatia");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Croatia Walking Tours" pathname="/destinations/croatia" />
      <CountryWalksPage
        country="Croatia"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1dSa03kDRLpJmrqbG1Z52XOjO7KuhBh4",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1dSa03kDRLpJmrqbG1Z52XOjO7KuhBh4&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Croatia")}
      />
    </>
  );
}
