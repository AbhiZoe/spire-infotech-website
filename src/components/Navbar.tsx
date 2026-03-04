import React, { useState, useEffect, useCallback } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technologies", href: "#technologies" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SpireLogo: React.FC = () => (
  <a
    href="#hero"
    className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-lg"
    aria-label="Spire Infotech – Home"
  >
    {/* Icon mark */}
    <div className="relative w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary-500/50 group-hover:shadow-xl flex-shrink-0">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 6 L11 2 L18 6 L18 16 L11 20 L4 16 Z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M11 2 L11 20 M4 6 L18 16 M18 6 L4 16"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-white font-bold text-lg tracking-tight transition-colors duration-200 group-hover:text-primary-400">
        Spire
      </span>
      <span className="text-primary-400 font-semibold text-xs tracking-widest uppercase transition-colors duration-200 group-hover:text-primary-300">
        Infotech
      </span>
    </div>
  </a>
);

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    // Determine active section
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-secondary-900/95 backdrop-blur-md shadow-2xl shadow-black/30 border-b border-white/5"
            : "bg-secondary-900/80 backdrop-blur-sm"
        }`}
        style={{ height: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <SpireLogo />

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className={`nav-link relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary-400 rounded-full transition-all duration-300 ${
                      isActive ? "w-4/5" : "w-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-400 hover:shadow-primary-400/40 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        navLinks={navLinks}
        activeSection={activeSection}
        onClose={() => setMobileOpen(false)}
        onNavClick={handleNavClick}
      />
    </>
  );
};

export default Navbar;
