import CountryWalksPage from "../../../components/CountryWalksPage";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import { getCountryWalkGroups } from "../../../lib/tours/countryWalks";

export const metadata = pageMetadata("Netherlands Walking Tours", "Explore Netherlands with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/netherlands");

export default function Page() {
  return (
    <>
      <PageJsonLd title="Netherlands Walking Tours" pathname="/destinations/netherlands" />
      <CountryWalksPage
        country="Netherlands"
        inSentence="the Netherlands"
        map={{
          embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1MUO_QR_xuFsrEg3dC7JnlJhdkK3hSGE",
          fullUrl: "https://www.google.com/maps/d/edit?mid=1MUO_QR_xuFsrEg3dC7JnlJhdkK3hSGE&usp=sharing",
        }}
        walkGroups={getCountryWalkGroups("Netherlands")}
      />
    </>
  );
}
