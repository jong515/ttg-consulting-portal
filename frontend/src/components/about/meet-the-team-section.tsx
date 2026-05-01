import { useState } from 'react';
import { Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { publicStorageUrl } from '@/lib/public-assets';
import { cn } from '@/lib/utils';

const team = [
  {
    name: 'Shou Yee',
    title: 'The Insider Advantage',
    initials: 'SY',
    accent: 'from-brand-cream to-white',
    photoPath: 'about/shouyee.png',
    bio: 'Shou Yee graduated from SMU with a double degree in Finance and Economics as a Lee Kong Chian Scholar. He began his professional career at UBS through its Graduate Talent Programme, but his true edge lies in his unique experience on both sides of the scholarship table. Having served on the official selection panel for the Lee Kong Chian Scholarship and as an assessor for global bank recruitment, Shou Yee provides students with an assessor&apos;s-eye view. He teaches them how to navigate the specific criteria and personality traits that selection boards prioritise.',
  },
  {
    name: 'Isaac',
    title: 'The Multidisciplinary Strategist',
    initials: 'I',
    accent: 'from-brand-grey/60 to-white',
    photoPath: 'about/isaac.jpg',
    bio: 'Isaac offers a multidisciplinary perspective that is virtually unmatched, holding a Law degree from Cambridge University and a Medical degree from Duke-NUS. In the world of DSA, many top students struggle to bridge their diverse interests into a cohesive story. Isaac specializes in helping students with "multiple talents"—whether in academics, sports, or the arts—synthesize their domains of interest into a powerful, multifaceted profile that stands out to top-tier Integrated Programme (IP) schools.',
  },
  {
    name: 'Hugo',
    title: 'The Narrative Architect',
    initials: 'H',
    accent: 'from-brand-sage/35 to-white',
    photoPath: 'about/hugo.jpg',
    bio: 'A graduate of UCLA, Hugo is the architect behind the Young Explorers methodology. Hugo&apos;s expertise is built on the belief that a student is more than their grades; he secured his own spot at a coveted US university by mastering the art of the personal narrative despite not having a "perfect" academic record. He specialises in helping students find their "Unique Selling Point," teaching them how to craft authentic stories and personal brands that resonate with interview panels on an emotional and intellectual level.',
  },
  {
    name: 'Martin',
    title: 'The Elite Strategy Specialist',
    initials: 'M',
    accent: 'from-brand-sage/25 to-white',
    photoPath: 'about/martin.jpg',
    bio: 'Martin is a proud representative of the University of Oxford and was offered the PSC/SAFOS Overseas Scholarship—a testament to his standing among the top tier of student leaders in Singapore. Having successfully navigated the most rigorous selection process in the country, Martin possesses a deep understanding of what it takes to excel in elite international environments, from the historic halls of Oxford to the competitive offices of GIC in London. He specializes in training students to tackle high-level applications with the refined communication skills required to win over the most discerning selection panels.',
  },
];

function TeamAvatar({
  photoUrl,
  initials,
  accent,
  name,
}: {
  photoUrl: string;
  initials: string;
  accent: string;
  name: string;
}) {
  const [showFallback, setShowFallback] = useState(() => !photoUrl);

  const circleClass = 'size-28 shrink-0 rounded-full border-2 border-brand-grey';

  if (showFallback) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-linear-to-br text-lg font-semibold text-brand-dark/90',
          circleClass,
          accent
        )}
        aria-hidden
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={`Photo of ${name}`}
      className={cn('object-cover', circleClass)}
      onError={() => setShowFallback(true)}
    />
  );
}

export function MeetTheTeamSection() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="meet-the-team-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2
          id="meet-the-team-heading"
          className="text-center text-3xl font-bold tracking-tight text-brand-dark md:text-[2rem] md:leading-tight"
        >
          About Us
        </h2>
        <div className="mx-auto mt-4 max-w-4xl space-y-4 text-center text-base leading-relaxed text-brand-dark/75">
          <p>
            We spent years navigating the corridors of global banks, law firms, hospitals, and
            world-class universities. Along the way, we noticed a recurring truth: in the real
            world, your grades get you into the room, but your voice gets you the seat.
          </p>
          <p>
            We saw brilliant students miss out on life-changing opportunities-not because they
            weren&apos;t smart enough, but because they hadn&apos;t yet found their personal brand or the
            confidence to speak their truth authentically.
          </p>
          <p>
            We came together to create Beyond Grades because we believe these "insider" skills
            shouldn&apos;t be a secret.
          </p>
          <p>
            Whether you are preparing for a DSA interview, a university application, or a
            competitive scholarship, we are here to help you find your voice and position yourself
            for success. From free resources to specialised coaching, we are dedicated to making
            high-level mentorship accessible to every student who is ready to be heard.
          </p>
        </div>

        <h3 className="mt-12 text-center text-2xl font-bold tracking-tight text-brand-dark md:text-[1.75rem]">
          Meet the Team
        </h3>

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
                  <TeamAvatar
                    photoUrl={publicStorageUrl(member.photoPath)}
                    initials={member.initials}
                    accent={member.accent}
                    name={member.name}
                  />
                  <h3 className="mt-5 font-bold text-brand-dark">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-indigo">{member.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-dark/75">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com"
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
