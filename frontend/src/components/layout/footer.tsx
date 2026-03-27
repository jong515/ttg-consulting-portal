export function Footer() {
  return (
    <footer className="border-t border-brand-border">
      <div className="mx-auto max-w-[1200px] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-brand-text-muted">
          &copy; {new Date().getFullYear()} Think Teach Group. All rights
          reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-[13px] text-brand-text-muted hover:text-brand-text transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-[13px] text-brand-text-muted hover:text-brand-text transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-[13px] text-brand-text-muted hover:text-brand-text transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
