import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Switzerland Walking Tours", "Explore Switzerland with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/switzerland");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Switzerland Walking Tours" pathname="/destinations/switzerland" />
      <CountryWalksPage
        country="Switzerland"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1uK5KWsq20tuGkpW0q98Us_0craTfAkQ",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1uK5KWsq20tuGkpW0q98Us_0craTfAkQ&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Switzerland")}
      />
    </>
  );
}
