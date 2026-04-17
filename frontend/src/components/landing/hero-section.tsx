import { Link } from '@tanstack/react-router';
import { ChevronRight, Lock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function HeroSection() {
  return (
    <section className="w-full bg-brand-bg">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] font-medium text-[#1E2A4A]/70 mb-5">
              beyondgrades · DSA consulting portal
            </p>

            <h1 className="text-[#0B1B3A] text-4xl md:text-[56px] font-semibold leading-[1.05] tracking-[-0.02em] max-w-xl mb-6">
              Your DSA Journey
              <br />
              Starts Here
            </h1>

            <p className="text-[#1E2A4A]/75 max-w-[560px] text-lg leading-relaxed mb-10">
              A guided portal for Singapore parents to navigate DSA pathways,
              build standout profiles, and prepare confidently for interviews.
            </p>

            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg px-7 bg-[#0B1B3A] hover:bg-[#0B1B3A]/92 text-white shadow-sm"
            >
              <Link to="/auth/sign-up">
                Get Started
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            <div className="mt-4 text-sm text-[#1E2A4A]/70">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-[#0B1B3A] underline underline-offset-4 hover:opacity-80"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-linear-to-tr from-[#0B1B3A]/0 via-[#0B1B3A]/6 to-[#0B1B3A]/0 blur-2xl" />

            <div className="mx-auto max-w-[560px]">
              <div className="relative">
                <div className="absolute inset-0 -z-10 translate-y-3 rounded-2xl bg-white/40 ring-1 ring-[#0B1B3A]/8" />

                <div className="rounded-2xl border border-[#0B1B3A]/12 bg-white shadow-[0_20px_60px_-30px_rgba(11,27,58,0.45)]">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#0B1B3A]/10">
                    <div>
                      <div className="text-xs text-[#1E2A4A]/60">
                        Dashboard
                      </div>
                      <div className="text-sm font-semibold text-[#0B1B3A]">
                        Content Library
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#0B1B3A]/20" />
                      <span className="h-2 w-2 rounded-full bg-[#0B1B3A]/20" />
                      <span className="h-2 w-2 rounded-full bg-[#0B1B3A]/20" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between rounded-xl border border-[#0B1B3A]/10 bg-[#F8FAFF] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1B3A]/10 text-[#0B1B3A]">
                            <PlayCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#0B1B3A]">
                              Course 1
                            </div>
                            <div className="text-xs text-[#1E2A4A]/60">
                              DSA Foundations
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#0B1B3A]/65">
                          In progress
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-[#0B1B3A]/10 bg-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1B3A]/8 text-[#0B1B3A]/70">
                            <Lock className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#0B1B3A]">
                              Course 2
                            </div>
                            <div className="text-xs text-[#1E2A4A]/60">
                              Interview Prep (Locked)
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#1E2A4A]/55">
                          Locked
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-[#0B1B3A]/10 bg-white px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1B3A]/10 text-[#0B1B3A]">
                            <PlayCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#0B1B3A]">
                              Module checklist
                            </div>
                            <div className="text-xs text-[#1E2A4A]/60">
                              Profile, portfolio, questions
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#0B1B3A]/65">
                          Updated
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#0B1B3A]/10 bg-white px-4 py-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-[#0B1B3A]">
                          Overall progress
                        </div>
                        <div className="text-sm font-semibold text-[#0B1B3A]">
                          42%
                        </div>
                      </div>
                      <Progress
                        value={42}
                        className="mt-3 h-2.5 bg-[#0B1B3A]/10 **:data-[slot='progress-indicator']:bg-[#0B1B3A]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-[#1E2A4A]/55 text-center">
                Preview of your dashboard after you sign up
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
