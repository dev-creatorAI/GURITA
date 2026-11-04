import React, { useState } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigateToStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToStudio }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang GURITA', href: '#tentang' },
    { label: 'Materi', href: '#materi' },
    { label: 'Prompt Lab', href: '#prompt-lab' },
    { label: 'Game Studio', href: '#game-studio' },
    { label: 'Generator Media', href: '#generator-media' }
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#071426]/85 border-b border-[#2979FF]/15 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#beranda');
          }}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-lg"
        >
          {/* Stylized Gurita Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2979FF] via-[#00E5FF] to-[#8B5CF6] p-0.5 shadow-md shadow-[#2979FF]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#071426] rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">
              G
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">
              GURITA
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Single-line, quiet hover underline) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="hover:text-[#00E5FF] transition-colors whitespace-nowrap shrink-0 py-1 relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF]"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00E5FF] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToStudio}
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-[#2979FF] to-[#00E5FF] rounded-xl hover:shadow-lg hover:shadow-[#2979FF]/30 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD166]" />
            <span>Buka Game Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka menu navigasi"
            className="p-2 text-slate-300 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#2979FF]/20 bg-[#071426]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:text-[#00E5FF] hover:bg-[#0E223D]/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToStudio();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#2979FF] to-[#00E5FF] rounded-xl shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFD166]" />
              <span>Buka Game Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
