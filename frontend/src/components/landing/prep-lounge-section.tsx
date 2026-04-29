import { Link } from '@tanstack/react-router';
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const bullets = [
  'Expert-crafted video modules',
  'Downloadable PDF guides',
  'Live Q&A and community answers',
  '1-on-1 consulting sessions available',
] as const;

export function PrepLoungeSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-22">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-brand-dark text-4xl md:text-[52px] font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              Everything You Need to Ace Your DSA.
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
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-linear-to-tr from-brand-indigo/0 via-brand-indigo/10 to-brand-indigo/0 blur-2xl" />

            <div className="mx-auto max-w-[560px]">
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-y-3 rounded-2xl bg-white/40 ring-1 ring-brand-grey/60" />

                <div className="rounded-2xl border border-brand-grey bg-white shadow-[0_20px_60px_-30px_rgba(26,26,46,0.25)]">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-brand-grey">
                    <div>
                      <div className="text-xs text-brand-dark/60">Dashboard</div>
                      <div className="text-sm font-semibold text-brand-dark">Content Library</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-brand-grey" />
                      <span className="h-2 w-2 rounded-full bg-brand-grey" />
                      <span className="h-2 w-2 rounded-full bg-brand-grey" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between rounded-xl border border-brand-grey bg-brand-grey/30 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-indigo/10 text-brand-indigo">
                            <PlayCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-brand-dark">Course 1</div>
                            <div className="text-xs text-brand-dark/60">DSA Foundations</div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-brand-dark/65">In progress</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-brand-grey bg-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-grey/60 text-brand-dark/70">
                            <Lock className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-brand-dark">Course 2</div>
                            <div className="text-xs text-brand-dark/60">Interview Prep (Locked)</div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-brand-dark/55">Locked</span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-brand-grey bg-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-indigo/10 text-brand-indigo">
                            <PlayCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-brand-dark">Module checklist</div>
                            <div className="text-xs text-brand-dark/60">
                              Profile, portfolio, questions
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-brand-dark/65">Updated</span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-brand-grey bg-white px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-brand-dark">Overall progress</div>
                        <div className="text-sm font-semibold text-brand-dark">42%</div>
                      </div>
                      <Progress
                        value={42}
                        className="mt-3 h-2.5 bg-brand-grey **:data-[slot='progress-indicator']:bg-brand-indigo"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-brand-dark/55 text-center">
                Preview of your dashboard after you sign up
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

