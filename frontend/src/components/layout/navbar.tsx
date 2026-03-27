import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-brand-accent flex items-center justify-center text-white text-sm font-semibold tracking-tight">
            TT
          </div>
          <span className="font-semibold text-brand-text group-hover:text-brand-accent transition-colors">
            Think Teach Group
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#programmes"
            className="text-sm text-brand-text-muted hover:text-brand-text transition-colors"
          >
            Programmes
          </a>
          <a
            href="#about"
            className="text-sm text-brand-text-muted hover:text-brand-text transition-colors"
          >
            About
          </a>
          <Button
            asChild
            className="bg-brand-accent hover:bg-brand-accent/90 text-white"
          >
            <a href="/auth/login">Sign in</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Site navigation links
            </SheetDescription>
            <div className="flex flex-col gap-2 pt-8 px-2">
              <a
                href="#programmes"
                onClick={() => setOpen(false)}
                className="text-brand-text-muted hover:text-brand-text transition-colors py-3 px-3 rounded-lg hover:bg-brand-accent-light"
              >
                Programmes
              </a>
              <a
                href="#about"
                onClick={() => setOpen(false)}
                className="text-brand-text-muted hover:text-brand-text transition-colors py-3 px-3 rounded-lg hover:bg-brand-accent-light"
              >
                About
              </a>
              <Button
                asChild
                className="mt-4 bg-brand-accent hover:bg-brand-accent/90 text-white"
              >
                <a href="/auth/login">Sign in</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
