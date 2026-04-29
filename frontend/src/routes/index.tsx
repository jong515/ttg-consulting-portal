import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { WhySection } from '@/components/landing/why-section';
import { PrepLoungeSection } from '@/components/landing/prep-lounge-section';
import { CommunityQnaSection } from '@/components/landing/community-qna-section';
import { VideoSampleCarouselSection } from '@/components/landing/video-sample-carousel-section';
import { StatsSection } from '@/components/landing/stats-section';
import { FinalFeaturesCtaSection } from '@/components/landing/final-features-cta-section';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main>
        <HeroSection />
        <WhySection />
        <PrepLoungeSection />
        <VideoSampleCarouselSection />
        <CommunityQnaSection />
        <StatsSection />
        <FinalFeaturesCtaSection />
      </main>
      <Footer />
    </div>
  );
}
