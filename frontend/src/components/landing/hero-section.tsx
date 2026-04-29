import { Link } from '@tanstack/react-router';
import { ChevronRight, FileText, Trophy, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="w-full bg-brand-cream">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-medium text-brand-dark/70 mb-5">
              beyondgrades · DSA consulting portal
            </p>

            <h1 className="text-brand-dark text-4xl md:text-[56px] font-bold leading-[1.05] tracking-[-0.02em] max-w-xl mb-6">
              Your DSA Journey
              <br />
              Starts Here
            </h1>

            <p className="text-brand-dark/75 max-w-[560px] text-lg leading-relaxed mb-10">
              A guided portal for Singapore parents to navigate DSA pathways,
              build standout profiles, and prepare confidently for interviews.
            </p>

            <Button asChild size="lg" className="h-12 px-7">
              <Link to="/auth/sign-up">
                Get Started
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <div className="mt-4 text-sm text-brand-dark/70">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-brand-indigo underline underline-offset-4 hover:opacity-80"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-[560px] rounded-2xl border border-brand-grey bg-brand-grey/20 p-8 shadow-[0_18px_50px_-35px_rgba(26,26,46,0.25)]">
              <div className="flex items-center justify-between mb-6">
                <div className="h-2.5 w-24 rounded-full bg-brand-grey" />
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-grey" />
                  <span className="h-2 w-2 rounded-full bg-brand-grey" />
                  <span className="h-2 w-2 rounded-full bg-brand-grey" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-white border border-brand-grey p-6">
                <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-brand-indigo/10 blur-2xl" />
                <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-brand-sage/30 blur-2xl" />

                <div className="relative">
                  <div className="mx-auto w-full max-w-[360px]">
                    <div className="flex items-end justify-center gap-5">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-brand-grey/60" />
                        <div className="mt-3 h-20 w-28 rounded-2xl bg-brand-grey/40" />
                      </div>

                      <div className="relative">
                        <div className="h-18 w-40 rounded-2xl bg-brand-grey/30 border border-brand-grey" />
                        <div className="absolute left-5 top-4 h-2 w-20 rounded-full bg-brand-grey" />
                        <div className="absolute left-5 top-9 h-2 w-28 rounded-full bg-brand-grey/80" />
                        <div className="absolute right-4 -top-5 h-10 w-10 rounded-2xl bg-white border border-brand-grey shadow-sm flex items-center justify-center text-brand-indigo">
                          <Video className="h-5 w-5" />
                        </div>
                        <div className="absolute -right-3 top-9 h-10 w-10 rounded-2xl bg-white border border-brand-grey shadow-sm flex items-center justify-center text-brand-indigo">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="absolute left-3 -top-7 h-10 w-10 rounded-2xl bg-white border border-brand-grey shadow-sm flex items-center justify-center text-brand-indigo">
                          <Trophy className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3">
                      <span className="h-2.5 w-20 rounded-full bg-brand-grey" />
                      <span className="h-2.5 w-14 rounded-full bg-brand-grey" />
                      <span className="h-2.5 w-24 rounded-full bg-brand-grey" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-xs text-brand-dark/60 text-center">
                Your prep lounge: videos, guides, and community support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
