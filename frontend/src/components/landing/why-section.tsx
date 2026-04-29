import { BadgeCheck, MessageSquareText, Sparkles } from 'lucide-react';

const whyPoints = [
  {
    title: 'Discover the Narrative',
    description: 'Defining "Who am I?" beyond grades.',
    icon: <Sparkles className="h-5 w-5 text-brand-indigo" aria-hidden />,
  },
  {
    title: 'Develop Personal Brand',
    description: 'Learning to showcase unique projects and interests.',
    icon: <BadgeCheck className="h-5 w-5 text-brand-indigo" aria-hidden />,
  },
  {
    title: 'Master Communication',
    description:
      "Developing the presence and clarity needed for the world's most competitive rooms.",
    icon: <MessageSquareText className="h-5 w-5 text-brand-indigo" aria-hidden />,
  },
] as const;

export function WhySection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-22">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-indigo">
              The Why
            </p>
            <h2 className="mt-4 text-brand-dark text-3xl md:text-[44px] font-bold tracking-[-0.02em] leading-[1.08]">
              The &quot;Why&quot;
            </h2>
            <p className="mt-5 text-brand-dark/75 text-base md:text-lg leading-relaxed max-w-[560px]">
              Many believe that DSA is only for those with elite talents in sports or the arts. We
              offer a different perspective. Whether a child is successful in their application or
              not, the process itself is invaluable. It is a workshop for life that teaches
              students to explore their identity and articulate their thinking with confidence.
            </p>
          </div>

          <div className="grid gap-4">
            {whyPoints.map((point) => (
              <div
                key={point.title}
                className="flex items-start gap-4 rounded-2xl border border-brand-grey bg-white px-6 py-5 shadow-none"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-grey/30"
                  aria-hidden
                >
                  {point.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-brand-dark font-semibold text-base">
                    {point.title}
                  </div>
                  <p className="mt-1 text-sm md:text-[15px] text-brand-dark/75 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

