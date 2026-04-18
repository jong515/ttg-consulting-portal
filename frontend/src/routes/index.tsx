import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { PrepLoungeSection } from '@/components/landing/prep-lounge-section';
import { CommunityQnaSection } from '@/components/landing/community-qna-section';
import { VideoSampleCarouselSection } from '@/components/landing/video-sample-carousel-section';
import { StudentsSocialProofSection } from '@/components/landing/students-social-proof-section';
import { StatsSection } from '@/components/landing/stats-section';
import { FinalFeaturesCtaSection } from '@/components/landing/final-features-cta-section';
import { CtaSection } from '@/components/landing/cta-section';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main>
        <HeroSection />
        <PrepLoungeSection />
        <VideoSampleCarouselSection />
        <CommunityQnaSection />
        <StudentsSocialProofSection />
        <StatsSection />
        <FinalFeaturesCtaSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
