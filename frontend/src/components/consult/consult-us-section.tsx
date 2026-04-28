import { Link } from '@tanstack/react-router';
import { Lock, Phone } from 'lucide-react';
import { usePortalAuth } from '@/auth/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CONTACT_PHONE = '+65 6123 4567';
const CONTACT_EMAIL = 'consult@beyondgrades.sg';

export function ConsultUsSection() {
  const { isLoaded, isSignedIn } = usePortalAuth();
  const showContact = isLoaded && isSignedIn;
  const obscureContact = !isLoaded || !isSignedIn;

  return (
    <section className="bg-white py-16 md:py-24" aria-label="Consultation details">
      <div className="mx-auto max-w-[900px] px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
            Ready to Get Personalised DSA Guidance?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-dark/80">
            A 1-on-1 consultation is your chance to align strategy with your child’s strengths. We
            cover <strong className="font-semibold text-brand-dark">pathway mapping</strong> to clarify
            realistic options, <strong className="font-semibold text-brand-dark">interview coaching</strong>{' '}
            with structured practice and feedback, and{' '}
            <strong className="font-semibold text-brand-dark">school-specific prep</strong> so you know
            what each shortlist school tends to value—and how to prepare for it.
          </p>
        </div>

        <div className="relative mt-12 md:mt-14">
          <div className="overflow-hidden rounded-2xl border border-brand-grey bg-brand-grey/20 shadow-sm">
            <div
              className={cn(
                'px-8 py-10 transition-[filter]',
                obscureContact && 'blur-md select-none'
              )}
              aria-hidden={!showContact}
            >
              <h2 className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-brand-dark/80">
                Contact us directly
              </h2>
              <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
                {showContact ? (
                  <>
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-lg font-semibold text-brand-dark"
                    >
                      <Phone className="size-5 shrink-0 text-brand-sage" aria-hidden />
                      {CONTACT_PHONE}
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-lg font-semibold text-brand-dark underline-offset-2 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-2 text-lg font-semibold text-brand-dark">
                      <Phone className="size-5 shrink-0 text-brand-sage" aria-hidden />
                      {CONTACT_PHONE}
                    </span>
                    <span className="text-lg font-semibold text-brand-dark">{CONTACT_EMAIL}</span>
                  </>
                )}
              </div>
              <p className="mt-4 text-center text-xs text-brand-dark/55">
                Weekdays 9am–6pm (SGT). We typically reply within one business day.
              </p>
            </div>

            {obscureContact && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/50 px-6 backdrop-blur-md">
                {!isLoaded ? (
                  <span className="text-sm font-medium text-brand-dark/80">Loading…</span>
                ) : (
                  <>
                    <div className="flex size-12 items-center justify-center rounded-full bg-brand-grey/60 text-brand-dark">
                      <Lock className="size-6" aria-hidden />
                    </div>
                    <p className="max-w-sm text-center text-base font-medium text-brand-dark">
                      Log in to view our contact details
                    </p>
                    <Button asChild className="h-10 px-8 font-semibold">
                      <Link to="/auth/login">Log In to Continue</Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
