import { Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const team = [
  {
    name: 'Dr. Sarah Lim',
    title: 'Senior DSA Consultant',
    initials: 'SL',
    accent: 'from-amber-100 to-orange-50',
    bio: 'Former HOD with 15+ years guiding families through talent pathways. Specialises in portfolio strategy and school fit across Singapore’s top institutions.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'Marcus Tan',
    title: 'Former MOE Teacher',
    initials: 'MT',
    accent: 'from-sky-100 to-blue-50',
    bio: 'Ex-MOE educator focused on interview readiness and authentic student voice. Helps candidates articulate strengths without sounding rehearsed.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'Priya Krishnan',
    title: 'Interview & Communications Coach',
    initials: 'PK',
    accent: 'from-violet-100 to-purple-50',
    bio: 'Trained in performance and rhetoric; designs mock panels and feedback loops so students enter interviews calm, clear, and confident.',
    linkedin: 'https://www.linkedin.com',
  },
  {
    name: 'James Ong',
    title: 'Pathways & Admissions Strategist',
    initials: 'JO',
    accent: 'from-emerald-100 to-teal-50',
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
          className="text-center text-3xl font-bold tracking-tight text-[#0B1B3A] md:text-[2rem] md:leading-tight"
        >
          The Experts Behind Your DSA Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[#1E2A4A]/75">
          Our consultants combine classroom experience, admissions insight, and a warm, practical
          approach—so your child is never preparing alone.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.name}>
              <Card
                className={cn(
                  'h-full border border-[#0B1B3A]/12 bg-white py-0 shadow-none transition-shadow duration-200',
                  'hover:shadow-md hover:border-[#0B1B3A]/18'
                )}
              >
                <CardContent className="flex flex-col items-center px-5 pb-6 pt-8 text-center">
                  <div
                    className={cn(
                      'flex size-28 shrink-0 items-center justify-center rounded-full border-2 border-[#0B1B3A]/10 bg-linear-to-br text-lg font-semibold text-[#0B1B3A]/85',
                      member.accent
                    )}
                    aria-hidden
                  >
                    {member.initials}
                  </div>
                  <h3 className="mt-5 font-bold text-[#0B1B3A]">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#1B6B4A]">{member.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#1E2A4A]/75">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B1B3A] underline-offset-4 hover:underline"
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
