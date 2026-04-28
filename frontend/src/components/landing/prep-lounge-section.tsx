import { Link } from '@tanstack/react-router';
import { CheckCircle2, FileText, Trophy, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bullets = [
  '555,000+ peer parents in community',
  'Expert-crafted video modules',
  'Downloadable PDF guides',
  'Live Q&A and community answers',
  '1-on-1 consulting sessions available',
  'Trusted by over 80% of our DSA students',
] as const;

export function PrepLoungeSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-22">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-brand-indigo mb-4">
              PREP LOUNGE
            </p>

            <h2 className="text-brand-dark text-4xl md:text-[52px] font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              Everything You Need to Ace Your DSA Interview.
            </h2>

            <ul className="grid gap-3 mb-7">
              {bullets.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-sage shrink-0" />
                  <span className="text-brand-dark/80">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-brand-dark/75 leading-relaxed max-w-[560px] mb-7">
              Join a structured prep space designed for busy parents — learn the
              strategy, practice confidently, and get answers when you need them.
            </p>

            <Button asChild size="lg" className="h-12 rounded-full px-7">
              <Link to="/auth/sign-up">Sign Up for Free →</Link>
            </Button>
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
                  {/* simple flat illustration: student + floating icons */}
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

