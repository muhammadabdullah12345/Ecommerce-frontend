import BestSellers from "../components/BestSellers";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import NewsletterBox from "../components/NewsletterBox";
import OurPolicy from "../components/OurPolicy";

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellers />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}

export default Home;
