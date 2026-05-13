import BenefitsSection from "@/components/landing/BenefitSection";
import CTASection from "@/components/landing/CallToAction";
import FeaturesSection from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/HeroSection";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
    </div>
  )
}

