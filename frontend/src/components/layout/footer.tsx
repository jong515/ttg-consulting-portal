export function Footer() {
  return (
    <footer className="bg-white border-t border-[#0B1B3A]/10">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#0B1B3A]">
              Resources
            </h3>
            <ul className="mt-4 grid gap-2">
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  DSA Pathways
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Interview Prep
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Timeline &amp; Deadlines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  PDF Downloads
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#0B1B3A]">
              Platform
            </h3>
            <ul className="mt-4 grid gap-2">
              <li>
                <a
                  href="/auth/sign-up"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="/auth/login"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Log In
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#0B1B3A]">
              Company
            </h3>
            <ul className="mt-4 grid gap-2">
              <li>
                <a
                  href="#about"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Meet the Team
                </a>
              </li>
              <li>
                <a
                  href="#consult"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Consult Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#0B1B3A]">
              Contact
            </h3>
            <ul className="mt-4 grid gap-2">
              <li>
                <a
                  href="#consult"
                  className="text-[13px] text-[#1E2A4A]/70 hover:text-[#0B1B3A] transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#0B1B3A]">
                Connect with us
              </div>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#0B1B3A]/10 text-[#0B1B3A]/70 hover:text-[#0B1B3A] hover:bg-[#0B1B3A]/3 transition-colors"
                >
                  {/* lightweight inline icons to avoid extra deps */}
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                    <path
                      d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M17.5 6.5h.01"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#0B1B3A]/10 text-[#0B1B3A]/70 hover:text-[#0B1B3A] hover:bg-[#0B1B3A]/3 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                    <path
                      d="M14 3v10.2a3.8 3.8 0 1 1-3-3.7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 7.3c1.2 1.6 3 2.6 5 2.7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#0B1B3A]/10 text-[#0B1B3A]/70 hover:text-[#0B1B3A] hover:bg-[#0B1B3A]/3 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                    <path
                      d="M10 15.5V8.5l6 3.5-6 3.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M21 12c0 3.3-.3 5-1 5.8-1 1.2-3 1.2-8 1.2s-7 0-8-1.2C3.3 17 3 15.3 3 12s.3-5 1-5.8C5 5 7 5 12 5s7 0 8 1.2c.7.8 1 2.5 1 5.8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#0B1B3A]/10 text-[#0B1B3A]/70 hover:text-[#0B1B3A] hover:bg-[#0B1B3A]/3 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                    <path
                      d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-7 border-t border-[#0B1B3A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#1E2A4A]/65">
            &copy; {new Date().getFullYear()} Think Teach Group. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[12px] text-[#1E2A4A]/65 hover:text-[#0B1B3A] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[12px] text-[#1E2A4A]/65 hover:text-[#0B1B3A] transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
