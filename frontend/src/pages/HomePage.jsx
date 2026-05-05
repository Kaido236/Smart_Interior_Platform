import FloatingChatButton from "../components/common/FloatingChatButton.jsx";
import FeaturedProducts from "../components/home/FeaturedProducts.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import WhySmartInterior from "../components/home/WhySmartInterior.jsx";

function HomePage() {
  return (
    <section className="home-page">
      <HeroSection />
      <HowItWorks />
      <FeaturedProducts />
      <WhySmartInterior />
      <FloatingChatButton />
    </section>
  );
}

export default HomePage;
