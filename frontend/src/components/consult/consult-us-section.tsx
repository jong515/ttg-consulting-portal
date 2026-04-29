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
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
            We Are Here to Support Your Child in Their DSA Journey
          </h1>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-dark/80">
            <p>
              When Algene first encouraged me to leave my finance job at UBS to start an education
              company, it wasn&apos;t an easy decision. But what gave me conviction was the vision we
              shared: to build something that goes beyond academics. We wanted to create a place
              that not only helps students excel in their studies but also equips them with the
              confidence, skills, and strategies to thrive in life.
            </p>
            <p>
              My own journey has shown me how important these qualities are. As part of the pioneer
              batch of the Raffles Integrated Programme, I saw how different pathways like DSA
              opened doors for my peers. I was fortunate to receive scholarships myself and later
              sat on scholarship boards, learning first-hand what selectors look for. In my
              professional career, I represented UBS at campus recruitment and assessed candidates
              for global programmes. Sitting on both sides of the table taught me an important
              truth: grades alone are never enough; character, clarity, and confidence often make
              the difference.
            </p>
            <p>
              That&apos;s why at Think Teach Academy, together with Macro Academy and Summit Education
              in the Think Teach Group, we aim to guide students through every stage from academics
              to interviews so they are ready for opportunities when they come.
            </p>
            <p>
              Offering DSA consultation services is a natural extension of this mission. We want to
              give your child the guidance and preparation I wish I had when I was younger, not to
              pressure them, but to help them bring out their best selves with confidence and
              authenticity.
            </p>
            <p>
              Thank you for trusting us to walk alongside your child in this journey. It&apos;s a
              privilege we don&apos;t take lightly, and we&apos;re proud to play a small part in their
              growth.
            </p>
            <p className="pt-2 text-brand-dark">
              Yours in Education,
              <br />
              Shou Yee
              <br />
              Co-Founder, Think Teach Academy
            </p>
          </div>
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
