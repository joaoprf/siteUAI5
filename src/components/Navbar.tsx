import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavItem } from "../types";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navItems: NavItem[] = [
  { label: "Início", href: "#home" },
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
  { label: "Soluções", href: "#solutions" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta rolagem para aplicar sombra e mudar padding
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Função para lidar com clique em âncoras (#)
  const handleAnchorClick = (href: string) => {
    const elementId = href.replace("#", "");
    const element = document.getElementById(elementId);

    // Se estiver fora da Home, redireciona para "/" antes de rolar
    if (location.pathname !== "/") {
      navigate("/");

      // Aguarda o React Router trocar de rota e depois faz scroll suave
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      // Já está na Home, apenas faz o scroll suave
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleAnchorClick("#home");
            }}
            className="text-2xl md:text-3xl font-bold flex items-center"
          >
            <span className="text-gray-900">Uai</span>
            <span className="text-green-800">5</span>
            <img
              src="/images/logo2.png"
              alt="Logo Uai5"
              className="h-8 w-8 ml-2"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isRoute = item.href.startsWith("/");
              const isAnchor = item.href.startsWith("#");

              if (isRoute) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`font-medium transition-colors ${
                      location.pathname.startsWith(item.href)
                        ? "text-green-800 font-semibold"
                        : "text-gray-800 hover:text-green-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              if (isAnchor) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleAnchorClick(item.href)}
                    className="font-medium text-gray-800 hover:text-green-700 transition-colors"
                  >
                    {item.label}
                  </button>
                );
              }

              return null;
            })}
          </nav>

          {/* Botão Fale Conosco - Desktop */}
          <button
            onClick={() => handleAnchorClick("#contact")}
            className="hidden md:block px-5 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
          >
            Fale Conosco
          </button>

          {/* Botão Menu Mobile */}
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
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isRoute = item.href.startsWith("/");
                const isAnchor = item.href.startsWith("#");

                if (isRoute) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-medium text-gray-800 hover:text-green-700 transition-colors ${
                        location.pathname.startsWith(item.href)
                          ? "text-green-800 font-semibold"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                if (isAnchor) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        handleAnchorClick(item.href);
                        setIsOpen(false);
                      }}
                      className="font-medium text-gray-800 hover:text-green-700 text-left"
                    >
                      {item.label}
                    </button>
                  );
                }

                return null;
              })}

              {/* Botão Fale Conosco - Mobile */}
              <button
                onClick={() => {
                  handleAnchorClick("#contact");
                  setIsOpen(false);
                }}
                className="w-full px-5 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                Fale Conosco
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
