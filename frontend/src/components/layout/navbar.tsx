import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { usePortalAuth } from '@/auth/auth-context';
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
  const { isLoaded, isSignedIn, signOut } = usePortalAuth();

  return (
    <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#0B1B3A] flex items-center justify-center text-white text-sm font-semibold tracking-tight">
            bg
          </div>
          <span className="font-semibold text-[#0B1B3A] group-hover:opacity-80 transition-opacity">
            beyondgrades
          </span>
        </Link>

        <div className="hidden md:flex items-center justify-center gap-8 flex-1 px-8">
          <Link
            to="/about"
            className="text-sm text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
          >
            About us
          </Link>
          <Link
            to="/consult"
            className="text-sm text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
          >
            Consult us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {!isLoaded ? (
            <div className="relative h-9 w-40 rounded-md bg-brand-border/40">
              <span className="sr-only">Loading account</span>
            </div>
          ) : isSignedIn ? (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                className="border-[#0B1B3A]/20 text-[#0B1B3A] hover:bg-[#0B1B3A]/5"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-[#1E2A4A]/70 hover:text-[#0B1B3A]"
                onClick={() => void signOut()}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-[#0B1B3A]/20 text-[#0B1B3A] hover:bg-[#0B1B3A]/5"
              >
                <Link to="/auth/login">Log In</Link>
              </Button>
              <Button asChild className="bg-[#0B1B3A] hover:bg-[#0B1B3A]/92 text-white">
                <Link to="/auth/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
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
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="text-brand-text-muted hover:text-brand-text transition-colors py-3 px-3 rounded-lg hover:bg-brand-accent-light"
              >
                About us
              </Link>
              <Link
                to="/consult"
                onClick={() => setOpen(false)}
                className="text-brand-text-muted hover:text-brand-text transition-colors py-3 px-3 rounded-lg hover:bg-brand-accent-light"
              >
                Consult us
              </Link>
              {!isLoaded ? (
                <div className="relative mt-4 h-10 rounded-md bg-brand-border/40">
                  <span className="sr-only">Loading account</span>
                </div>
              ) : isSignedIn ? (
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild variant="outline" className="border-brand-border">
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-brand-text-muted"
                    onClick={() => {
                      setOpen(false);
                      void signOut();
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className="mt-4 grid gap-2">
                  <Button asChild variant="outline" className="border-brand-border">
                    <Link to="/auth/login" onClick={() => setOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-[#0B1B3A] hover:bg-[#0B1B3A]/92 text-white"
                  >
                    <Link to="/auth/sign-up" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
