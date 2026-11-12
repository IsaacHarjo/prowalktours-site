import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Austria Walking Tours", "Explore Austria with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/austria");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Austria Walking Tours" pathname="/destinations/austria" />
      <CountryWalksPage
        country="Austria"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1xPs7GDENtCFajLsrcyL-4tNBA5Ry39w",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1xPs7GDENtCFajLsrcyL-4tNBA5Ry39w&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Austria")}
      />
    </>
  );
}
