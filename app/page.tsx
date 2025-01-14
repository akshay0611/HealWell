import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { TeamBanner } from "@/components/team-banner";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import OurBestServiceSection from "@/components/our-best-service-section";
import OurTeamMember from "@/components/our-team-member";
import WhyChooseUs from "@/components/why-choose-us";
import OurPortfolio from "@/components/our-portfolio";
import OurWatchVideo from "@/components/our-watch-video"
import ContactUs from "@/components/contact-us"
import OurLatestBlog from "@/components/our-latest-blog"
import Footer from "@/components/footer"


export default function Home() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <Hero />
      <TeamBanner />
      <AboutSection />
      <StatsSection />
      <OurBestServiceSection/>
      <OurTeamMember />
      <WhyChooseUs />
      <OurPortfolio/>
      <OurWatchVideo />
      <ContactUs/>
      <OurLatestBlog />
      <Footer/>
    </main>
  );
}