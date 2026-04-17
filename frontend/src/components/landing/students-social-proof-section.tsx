import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function StudentsSocialProofSection() {
  return (
    <section className="w-full bg-[#0B1B3A]">
      <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-24">
        <div className="text-center">
          <h2 className="text-white text-3xl md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1]">
            Join Over 555,000 Students &amp; Parents Preparing for DSA
          </h2>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            Trusted across Singapore&apos;s top primary schools.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-8 border-white/80 text-white bg-transparent hover:bg-white/10 hover:text-white"
            >
              <Link to="/auth/sign-up">Parents – Join Now</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="h-12 rounded-full px-8 bg-[#2563EB] hover:bg-[#2563EB]/92 text-white shadow-sm"
            >
              <Link to="/auth/sign-up">Students – Join Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

