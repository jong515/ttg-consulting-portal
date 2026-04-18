import { createFileRoute } from '@tanstack/react-router';
import { MeetTheTeamSection } from '@/components/about/meet-the-team-section';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <MeetTheTeamSection />
      </main>
      <Footer />
    </div>
  );
}
