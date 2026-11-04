import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedOpportunities from "@/components/FeaturedOpportunities";
import HowItWorks from "@/components/HowItWorks";
import AIPlanning from "@/components/AIPlanning";
import MembershipPlans from "@/components/MembershipPlans";
import PremiumOpportunities from "@/components/PremiumOpportunities";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <main className="flex-1">
        <FeaturedOpportunities />
        <HowItWorks />
        <AIPlanning />
        <MembershipPlans />
        <PremiumOpportunities />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
