import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { TeamBanner } from "@/components/team-banner";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import OurBestServiceSection from "@/components/our-best-service-section";
import OurTeamMember from "@/components/our-team-member";

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
    </main>
  );
}