import React, { useState, useEffect } from 'react';
import logo from '../Fotos de servicios/Logo.png';
import { NavItem } from '../content';

const Header: React.FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-custom-ease ${
        isScrolled || isMobileMenuOpen ? 'bg-brand-beige/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div
        className={`container mx-auto px-6 transition-all duration-500 ease-custom-ease ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="flex justify-between items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            <img
              src={logo}
              alt="Be Aesthetic Logo"
              className={`max-w-full w-auto transition-all duration-500 ease-custom-ease ${isScrolled ? 'h-12' : 'h-14'}`}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-brand-brown font-sans text-sm font-medium tracking-wider relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-brown transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <a href="#admin" className="text-brand-brown/80 text-xs uppercase tracking-[0.2em] hover:text-brand-brown">
              Admin
            </a>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-brand-brown/20 text-brand-brown"
              aria-label="Abrir menu de navegacion"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-5 bg-brand-brown transition-transform duration-300 ${
                    isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-brand-brown transition-opacity duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-brand-brown transition-transform duration-300 ${
                    isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[70vh] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col border-t border-brand-brown/15 pt-4 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="py-3 text-left text-brand-brown font-sans text-sm font-medium tracking-wide"
              >
                {item.label}
              </button>
            ))}
            <a
              href="#admin"
              className="py-3 text-left text-brand-brown/80 text-xs uppercase tracking-[0.2em] hover:text-brand-brown"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
