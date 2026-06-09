import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/index.tsx";

const LangSwitcher = () => {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button onClick={() => setLang("pt")} className={`px-2 py-0.5 rounded transition-colors ${lang === "pt" ? "bg-green-800 text-white" : "text-gray-600 hover:text-green-800"}`}>PT</button>
      <span className="text-gray-300">|</span>
      <button onClick={() => setLang("es")} className={`px-2 py-0.5 rounded transition-colors ${lang === "es" ? "bg-green-800 text-white" : "text-gray-600 hover:text-green-800"}`}>ES</button>
    </div>
  );
};

const Logo = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="text-2xl md:text-3xl font-bold flex items-center bg-transparent border-0 p-0 cursor-pointer">
    <span className="text-gray-900">Uai</span>
    <span className="text-green-800">5</span>
    <img src="/images/logo2.png" alt="Logo Uai5" className="h-8 w-8 ml-2" />
  </button>
);

const Navbar = () => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.solutions, href: "#solutions" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleAnchorClick = (href: string) => {
    const elementId = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo onClick={() => handleAnchorClick("#home")} />
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.href.startsWith("/")) {
                return (
                  <Link key={item.label} to={item.href} className={`font-medium transition-colors ${location.pathname.startsWith(item.href) ? "text-green-800 font-semibold" : "text-gray-800 hover:text-green-700"}`}>
                    {item.label}
                  </Link>
                );
              }
              return (
                <button key={item.label} onClick={() => handleAnchorClick(item.href)} className="font-medium text-gray-800 hover:text-green-700 transition-colors">
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <LangSwitcher />
            <button onClick={() => handleAnchorClick("#contact")} className="px-5 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300">
              {t.nav.cta}
            </button>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-900" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                if (item.href.startsWith("/")) {
                  return (
                    <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)} className="font-medium text-gray-800 hover:text-green-700 transition-colors">
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <button key={item.label} onClick={() => { handleAnchorClick(item.href); setIsOpen(false); }} className="font-medium text-gray-800 hover:text-green-700 text-left">
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-gray-100">
                <LangSwitcher />
              </div>
              <button onClick={() => { handleAnchorClick("#contact"); setIsOpen(false); }} className="w-full px-5 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300">
                {t.nav.cta}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
