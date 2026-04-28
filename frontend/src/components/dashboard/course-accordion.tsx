import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Lock, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const CHEVRON_COLLAPSED = '\u25B6';
const CHEVRON_EXPANDED = '\u25BC';

const course1Lessons = [
  { title: 'What is DSA?', duration: '8 min' },
  { title: 'Pathways and school fit', duration: '12 min' },
  { title: 'Building your timeline', duration: '10 min' },
  { title: 'Portfolio basics', duration: '14 min' },
];

export function CourseAccordion() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const courseProgress = 42;

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden border-border py-0 shadow-sm">
        <button
          type="button"
          className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/40"
          onClick={() => setOpen1((o) => !o)}
          aria-expanded={open1}
        >
          <span className="mt-0.5 font-mono text-sm text-muted-foreground" aria-hidden>
            {open1 ? CHEVRON_EXPANDED : CHEVRON_COLLAPSED}
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">DSA Pathways &amp; Overview</h3>
              <Badge className="border-0 bg-brand-sage font-medium text-brand-dark hover:bg-brand-sage/90">
                Free
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Course 1 — Unlocked</p>
          </div>
        </button>

        {open1 && (
          <CardContent className="space-y-4 border-t border-border px-5 pb-5 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Your progress</span>
                <span className="font-medium text-foreground">{courseProgress}%</span>
              </div>
              <Progress
                value={courseProgress}
                className="h-2 bg-brand-sage/25 **:data-[slot=progress-indicator]:bg-brand-sage"
              />
            </div>
            <ul className="grid gap-2">
              {course1Lessons.map((lesson) => (
                <li
                  key={lesson.title}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm shadow-xs"
                >
                  <Video className="size-4 shrink-0 text-brand-indigo" aria-hidden />
                  <span className="min-w-0 flex-1 font-medium text-foreground">{lesson.title}</span>
                  <span className="shrink-0 tabular-nums text-xs text-muted-foreground">{lesson.duration}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>

      <Card
        className={cn(
          'overflow-hidden border-border py-0 shadow-sm',
          !open2 && 'bg-muted/25'
        )}
      >
        <button
          type="button"
          className={cn(
            'flex w-full items-start gap-3 px-5 py-4 text-left transition-colors',
            open2 ? 'hover:bg-muted/40' : 'hover:bg-muted/50'
          )}
          onClick={() => setOpen2((o) => !o)}
          aria-expanded={open2}
        >
          <span className="mt-0.5 font-mono text-sm text-muted-foreground" aria-hidden>
            {open2 ? CHEVRON_EXPANDED : CHEVRON_COLLAPSED}
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Lock className="size-4 text-muted-foreground" aria-hidden />
              <h3 className="font-semibold text-foreground">DSA Interview Preparation</h3>
            </div>
            <p className="text-sm text-muted-foreground">Course 2 — Premium</p>
          </div>
        </button>

        {open2 && (
          <CardContent className="border-t border-border bg-muted/20 px-5 pb-5 pt-4">
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-muted/40 px-6 py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Lock className="size-6 text-muted-foreground" aria-hidden />
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                This course is included with a premium account. Upgrade to unlock video modules,
                workbooks, and structured interview prep.
              </p>
              <Button
                asChild
                className="h-10 px-6 font-semibold"
              >
                <Link to="/auth/sign-up">
                  Upgrade to Access
                  <span aria-hidden> →</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
