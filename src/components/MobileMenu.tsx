import React, { useEffect, useRef } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  activeSection: string;
  onClose: () => void;
  onNavClick: (href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navLinks,
  activeSection,
  onClose,
  onNavClick,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Trap focus inside menu when open
  useEffect(() => {
    if (!isOpen) return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-secondary-900 border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 flex-shrink-0">
              <svg
                width="20"
                height="20"
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
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-base tracking-tight">Spire</span>
              <span className="text-primary-400 font-semibold text-xs tracking-widest uppercase">Infotech</span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1" aria-label="Mobile navigation">
          {navLinks.map(({ label, href }, index) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(href);
                }}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`mobile-nav-item flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-500/15 text-primary-400 border border-primary-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/8"
                } ${isOpen ? "animate-slide-in-left" : ""}`}
              >
                {/* Active dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                    isActive ? "bg-primary-400" : "bg-transparent"
                  }`}
                />
                {label}
              </a>
            );
          })}
        </nav>

        {/* Footer CTA */}
        <div className="px-4 py-6 border-t border-white/10">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("#contact");
            }}
            className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-400 hover:shadow-primary-400/40 transition-all duration-200 active:scale-95"
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
          <p className="text-center text-xs text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} Spire Infotech
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
