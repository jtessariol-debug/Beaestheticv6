
import React, { useState, useEffect } from 'react';
import logo from '../Fotos de servicios/Logo.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'quienes-somos', label: 'Quienes Somos' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'equipo', label: 'Equipo' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-custom-ease ${
        isScrolled ? 'bg-brand-beige/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div
        className={`container mx-auto px-6 transition-all duration-500 ease-custom-ease ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src={logo}
              alt="Be Aesthetic Logo"
              className={`transition-all duration-500 ease-custom-ease ${isScrolled ? 'h-12' : 'h-14'}`}
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
          </nav>

          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

