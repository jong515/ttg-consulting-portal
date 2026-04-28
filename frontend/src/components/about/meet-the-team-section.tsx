import { Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const team = [
  {
    name: 'Dr. Sarah Lim',
    title: 'Senior DSA Consultant',
    initials: 'SL',
    accent: 'from-brand-cream to-white',
    bio: 'Former HOD with 15+ years guiding families through talent pathways. Specialises in portfolio strategy and school fit across Singapore’s top institutions.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'Marcus Tan',
    title: 'Former MOE Teacher',
    initials: 'MT',
    accent: 'from-brand-grey/60 to-white',
    bio: 'Ex-MOE educator focused on interview readiness and authentic student voice. Helps candidates articulate strengths without sounding rehearsed.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'Priya Krishnan',
    title: 'Interview & Communications Coach',
    initials: 'PK',
    accent: 'from-brand-sage/35 to-white',
    bio: 'Trained in performance and rhetoric; designs mock panels and feedback loops so students enter interviews calm, clear, and confident.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'James Ong',
    title: 'Pathways & Admissions Strategist',
    initials: 'JO',
    accent: 'from-brand-sage/25 to-white',
    bio: 'Maps timelines, deadlines, and backup plans for each family. Experienced with IP, O-Level, and integrated programme entry routes.',
    linkedin: 'https://www.linkedin.com',
  },
];

export function MeetTheTeamSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="meet-the-team-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2
          id="meet-the-team-heading"
          className="text-center text-3xl font-bold tracking-tight text-brand-dark md:text-[2rem] md:leading-tight"
        >
          The Experts Behind Your DSA Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-brand-dark/75">
          Our consultants combine classroom experience, admissions insight, and a warm, practical
          approach—so your child is never preparing alone.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.name}>
              <Card
                className={cn(
                  'h-full border border-brand-grey bg-white py-0 shadow-none transition-shadow duration-200',
                  'hover:shadow-md'
                )}
              >
                <CardContent className="flex flex-col items-center px-5 pb-6 pt-8 text-center">
                  <div
                    className={cn(
                      'flex size-28 shrink-0 items-center justify-center rounded-full border-2 border-brand-grey bg-linear-to-br text-lg font-semibold text-brand-dark/90',
                      member.accent
                    )}
                    aria-hidden
                  >
                    {member.initials}
                  </div>
                  <h3 className="mt-5 font-bold text-brand-dark">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-indigo">{member.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/75">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-indigo underline-offset-4 hover:underline"
                  >
                    <Linkedin className="size-4 shrink-0" aria-hidden />
                    LinkedIn
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
