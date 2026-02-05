/**
 * ============================================================
 * INDEX PAGE (HOMEPAGE) - RiskShield
 * ============================================================
 * DeFi Risk Management Platform Landing Page
 * ============================================================
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import CryptoChartSection from "@/components/CryptoChartSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero - What is RiskShield */}
      <HeroSection />
      
      {/* How It Works - 3 Step Process */}
      <HowItWorksSection />
      
      {/* Key Benefits */}
      <FeaturesSection />
      
      {/* Protection Demo - Interactive Chart */}
      <CryptoChartSection />
      
      {/* Final CTA - Join Waitlist */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
