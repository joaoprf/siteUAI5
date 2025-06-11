import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#services' },
  { label: 'Sobre', href: '#about' },
  { label: 'Soluções', href: '#solutions' },
  { label: 'Contato', href: '#contact' }, // O link para contato já existe aqui
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-gray-900">Uai</span>
            <span className="text-green-800">5</span>
            <img src="/images/logo2.png" alt="Logo Uai5" className="h-8 w-8 ml-2" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${
                  scrolled
                    ? 'text-gray-800 hover:text-green-700'
                    : 'text-gray-800 hover:text-green-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botão Fale Conosco - Desktop */}
          {/* Alterado de <button> para <a> e adicionado href */}
          <a
            href="#contact" // Redireciona para a seção #contact
            className="hidden md:block px-5 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
          >
            Fale Conosco
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-900"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                  className="font-medium text-gray-800 hover:text-green-700"
                >
                  {item.label}
                </a>
              ))}
              {/* Botão Fale Conosco - Mobile */}
              {/* Alterado de <button> para <a> e adicionado href */}
              <a
                href="#contact" // Redireciona para a seção #contact
                onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                className="w-full px-5 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                Fale Conosco
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
