import { Link } from '@tanstack/react-router';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CommunityQnaCard = {
  id: string;
  question: string;
  daysAgo: number;
  views: number;
  replies: number;
  consultantName: string;
  answerPreview: string;
};

const qnaCards: CommunityQnaCard[] = [
  {
    id: 'qna-1',
    question: 'When should my child start DSA prep?',
    daysAgo: 2,
    views: 1240,
    replies: 18,
    consultantName: 'Michelle Tan',
    answerPreview:
      'Start with clarity on the DSA category and timeline, then build evidence month-by-month. For most families, the best time is when you can consistently track CCA progress and portfolio artifacts without burning out.',
  },
  {
    id: 'qna-2',
    question: 'What CCA activities help DSA applications?',
    daysAgo: 4,
    views: 980,
    replies: 11,
    consultantName: 'Daniel Koh',
    answerPreview:
      'Schools look for commitment, growth, and documented impact. Choose CCAs where your child can progress, lead, and show sustained training — and make sure you capture outcomes (competitions, performances, roles, reflections).',
  },
  {
    id: 'qna-3',
    question: 'How do we prepare for DSA interviews without sounding rehearsed?',
    daysAgo: 6,
    views: 1560,
    replies: 27,
    consultantName: 'Siti Aisyah',
    answerPreview:
      'Build a story bank instead of memorising scripts. Practice answering with a simple structure (context → action → result → learning), then vary prompts so your child stays natural and confident under follow-up questions.',
  },
  {
    id: 'qna-4',
    question: 'What should go into a DSA portfolio for sports?',
    daysAgo: 8,
    views: 1125,
    replies: 14,
    consultantName: 'Aaron Lim',
    answerPreview:
      'Keep it selective: a 1-page summary, key achievements, verified records, and evidence of training consistency. Add short reflections that show coachability and teamwork — and align everything to the school’s sport culture.',
  },
  {
    id: 'qna-5',
    question: 'Does academic performance still matter for DSA?',
    daysAgo: 10,
    views: 2040,
    replies: 33,
    consultantName: 'Rachel Ng',
    answerPreview:
      'Yes — it’s often the gatekeeper after talent. Aim for stability and improvement, and be ready to explain dips. The strongest profiles connect academics to habits: discipline, reflection, and the ability to juggle commitments.',
  },
];

function formatCompactNumber(n: number) {
  return Intl.NumberFormat('en-SG', { notation: 'compact' }).format(n);
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
}

export function CommunityQnaSection() {
  const headingId = useId();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const getScrollStep = () => {
    const el = scrollAreaRef.current;
    if (!el) return 360;
    const firstCard = el.querySelector<HTMLElement>('[data-qna-card]');
    const cardWidth = firstCard?.offsetWidth ?? 320;
    return cardWidth + 24; // card width + typical gap
  };

  const updateScrollButtons = () => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
  };

  const scrollByAmount = (amount: number) => {
    const el = scrollAreaRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollAreaRef.current;
    if (!el) return;

    const onScroll = () => updateScrollButtons();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const fadeId = useMemo(
    () => `community-qna-fade-${headingId.replace(/:/g, '')}`,
    [headingId]
  );

  return (
    <section aria-labelledby={headingId} className="w-full bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-18 md:py-22">
        <h2
          id={headingId}
          className="text-left text-brand-dark text-3xl md:text-[40px] font-bold tracking-[-0.02em]"
        >
          Our Community is Here to Help With All Your DSA Questions
        </h2>

        <div className="relative mt-8 md:mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 hidden items-center justify-between md:flex">
            <div className="pointer-events-auto">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => scrollByAmount(-getScrollStep())}
                disabled={!canScrollLeft}
                className="h-11 w-11 rounded-full bg-white/85 hover:bg-white shadow-sm"
                aria-label="Scroll community answers left"
              >
                <ChevronLeft className="h-5 w-5 text-brand-dark" />
              </Button>
            </div>
            <div className="pointer-events-auto">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => scrollByAmount(getScrollStep())}
                disabled={!canScrollRight}
                className="h-11 w-11 rounded-full bg-white/85 hover:bg-white shadow-sm"
                aria-label="Scroll community answers right"
              >
                <ChevronRight className="h-5 w-5 text-brand-dark" />
              </Button>
            </div>
          </div>

          <div
            className="relative overflow-hidden"
            style={
              {
                maskImage: `linear-gradient(to right, transparent 0, black 44px, black calc(100% - 44px), transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent 0, black 44px, black calc(100% - 44px), transparent 100%)`,
              } as CSSProperties
            }
            aria-describedby={fadeId}
          >
            <p id={fadeId} className="sr-only">
              Scroll horizontally to view more community Q&A cards.
            </p>

            <div
              ref={scrollAreaRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pr-10 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {qnaCards.map((card) => (
                <article
                  key={card.id}
                  data-qna-card
                  className="shrink-0 w-[300px] sm:w-[320px]"
                >
                  <Card className="h-full rounded-2xl border border-brand-grey bg-white shadow-none hover:shadow-sm transition-shadow">
                    <CardContent className="px-6 pt-6 pb-0">
                      <h3 className="text-brand-dark font-semibold text-base leading-snug line-clamp-2">
                        {card.question}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-dark/65">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {card.daysAgo}d ago
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          {formatCompactNumber(card.views)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {card.replies}
                        </span>
                      </div>

                      <div className="mt-5 flex items-start gap-3">
                        <Avatar size="sm" className="mt-0.5">
                          <AvatarFallback className="bg-brand-sage/35 text-brand-dark">
                            {initials(card.consultantName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="text-xs text-brand-dark/70">
                            Best answer by{' '}
                            <span className="font-semibold text-brand-dark">
                              {card.consultantName}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-brand-dark/80 leading-relaxed line-clamp-3">
                            {card.answerPreview}
                          </p>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="px-6 pt-5 pb-6">
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          'w-full rounded-lg bg-white'
                        )}
                      >
                        View Full Answer
                      </Button>
                    </CardFooter>
                  </Card>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-brand-dark/75">
              Sign up to access all community answers
            </p>
            <Button asChild size="lg" className="h-11 px-7">
              <Link to="/auth/sign-up">Join Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

