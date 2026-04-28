import { Link } from '@tanstack/react-router';
import { Award, ShieldCheck, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
  badgeClassName: string;
};

const features: Feature[] = [
  {
    title: '#1 DSA Prep Resource',
    description: 'Rated top by Singapore parents for clarity and structure.',
    icon: <Award className="h-5 w-5 text-brand-indigo" aria-hidden="true" />,
    badgeClassName: 'bg-brand-sage/35',
  },
  {
    title: 'Higher Offer Rate',
    description: 'Our students are 3x more likely to receive DSA offers.',
    icon: <ShieldCheck className="h-5 w-5 text-brand-indigo" aria-hidden="true" />,
    badgeClassName: 'bg-brand-grey/60',
  },
  {
    title: 'Expert Consultants',
    description: 'Real experience from former MOE and DSA insiders.',
    icon: <Users className="h-5 w-5 text-brand-indigo" aria-hidden="true" />,
    badgeClassName: 'bg-brand-sage/25',
  },
] as const;

export function FinalFeaturesCtaSection() {
  return (
    <section className="w-full bg-brand-grey/20">
      <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-22">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="text-brand-dark text-3xl md:text-[44px] font-bold tracking-[-0.02em] leading-[1.08]">
              Over 80% of Our Students
              <br />
              Secure DSA Offers
              <br />
              With Our Resources
            </h2>
            <p className="mt-5 text-brand-dark/75 text-base md:text-lg leading-relaxed max-w-[520px]">
              A guided system built for busy parents — combine proven frameworks,
              community answers, and expert feedback to prepare confidently.
            </p>
          </div>

          <div>
            <div className="grid gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 rounded-2xl border border-brand-grey bg-white px-6 py-5 hover:shadow-sm transition-shadow"
                >
                  <div
                    className={[
                      'h-12 w-12 shrink-0 rounded-xl grid place-items-center',
                      f.badgeClassName,
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-brand-dark font-semibold text-base">
                      {f.title}
                    </div>
                    <p className="mt-1 text-sm md:text-[15px] text-brand-dark/75 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="w-full h-12">
                <Link to="/auth/sign-up">Start Your Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

