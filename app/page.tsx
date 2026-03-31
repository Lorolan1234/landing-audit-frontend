import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ReportPreview } from "@/components/landing/ReportPreview";
import { ForWhom } from "@/components/landing/ForWhom";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <Hero />
      <TrustBar />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <ReportPreview />
      <ForWhom />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
