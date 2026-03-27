import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-20 md:pt-24 pb-16">
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-brand-accent mb-4">
        Education consulting portal
      </p>

      <h1 className="font-serif text-4xl md:text-[52px] font-semibold leading-[1.15] text-brand-text max-w-xl mb-6">
        Every child&rsquo;s path is worth planning
      </h1>

      <p className="text-brand-text-muted max-w-[540px] text-lg leading-relaxed mb-10">
        Access expert resources, track programme progress, and make confident
        decisions for your child&rsquo;s education journey&thinsp;&mdash;&thinsp;all
        in one place.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          asChild
          size="lg"
          className="bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg h-12 px-6 text-base"
        >
          <a href="/auth/login">
            Access your portal
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="bg-brand-accent-light text-brand-accent border-brand-accent/20 hover:bg-brand-accent-light/80 rounded-lg h-12 px-6 text-base"
        >
          <a href="#programmes">Explore resources</a>
        </Button>
      </div>
    </section>
  );
}
