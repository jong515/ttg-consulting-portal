import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { PrepLoungeSection } from '@/components/landing/prep-lounge-section';
import { VideoSampleCarouselSection } from '@/components/landing/video-sample-carousel-section';
import { StatsSection } from '@/components/landing/stats-section';
import { ProgrammesSection } from '@/components/landing/programmes-section';
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
        <StatsSection />
        <ProgrammesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
