import React, { useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

interface HeaderProps {
  onEnrollClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onEnrollClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#details', label: 'Details' },
    { href: '#outcomes', label: 'What We Learn' },
    { href: '#faq', label: 'FAQs' },
    { href: '#register', label: 'Register' },
  ];

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0">
            <div className="bg-brand-500 text-white p-1.5 sm:p-2 rounded-xl shadow-md flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-bold text-xl sm:text-2xl tracking-tight text-slate-800">
                Kid<span className="text-creative-500">rove</span>
              </span>
              <span className="hidden sm:block text-[10px] font-medium tracking-widest text-slate-400 uppercase -mt-1">
                Learn & Play
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-brand-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={onEnrollClick}
              className="bg-brand-500 hover:bg-brand-600 text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:shadow-brand-100 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onEnrollClick}
              className="bg-brand-500 hover:bg-brand-600 text-white font-poppins font-semibold px-4 py-2 rounded-full text-xs transition-all duration-200"
            >
              Enroll
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-64 border-t border-slate-100' : 'max-h-0'
          }`}
        >
          <nav className="px-4 py-4 flex flex-col gap-1 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-brand-50 hover:text-brand-600 transition-colors duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};
