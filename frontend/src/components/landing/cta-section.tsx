import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section id="consult" className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="bg-brand-indigo rounded-2xl px-8 py-14 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-white/70 max-w-md">
            Log in to your portal to access resources, track progress, and stay
            on top of your child&rsquo;s journey.
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-white text-brand-indigo hover:bg-white/90 rounded-lg h-12 px-8 text-base shrink-0"
        >
          <Link to="/auth/login">Sign in to portal</Link>
        </Button>
      </div>
    </section>
  );
}
