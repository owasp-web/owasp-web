import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import FeaturedSection from "@/components/FeaturedSection";
import WhatsOnDeckSection from "@/components/WhatsOnDeckSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import NewsSection from "@/components/NewsSection";
import HighlightedResourcesSection from "@/components/HighlightedResourcesSection";
import QuestionSection from "@/components/QuestionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <GlobalNetworkSection />
        <FeaturedSection />
        <WhatsOnDeckSection />
        <UpcomingEventsSection />
        <HighlightedResourcesSection />
        <NewsSection />
        <QuestionSection />
      </main>
      <Footer />
    </>
  );
}
