import MainNavBar from "../../components/mainNavBar";
import Footer from "../../components/footer";
import HeroSection from "./sections/heroSection";
import Stories from "./sections/stories";

export default function Home() {
  return (
    <>
      <MainNavBar />
      <HeroSection />
      <Stories />
      <Footer />
    </>
  );
}
