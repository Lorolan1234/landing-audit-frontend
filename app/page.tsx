import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ReportPreview } from "@/components/landing/ReportPreview";
import { ForWhom } from "@/components/landing/ForWhom";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { Footer } from "@/components/layout/Footer";
import { SHOW_PRICING } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07070a]">
      <Hero />
      <TrustBar />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <ReportPreview />
      <ForWhom />
      {SHOW_PRICING && <Pricing />}
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
