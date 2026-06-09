import React, { createContext, useContext, useState, useEffect } from "react";
import pt from "./pt";
import es from "./es";

export type Lang = "pt" | "es";

const translations = { pt, es };

function detectLanguage(): Lang {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang") as Lang | null;
    if (urlLang === "pt" || urlLang === "es") return urlLang;
  }

  const saved = localStorage.getItem("lang") as Lang | null;
  if (saved === "pt" || saved === "es") return saved;

  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser === "es") return "es";

  return "pt";
}

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof pt;
}

const I18nContext = createContext<I18nContextType>({
  lang: "pt",
  setLang: () => {},
  t: pt,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (l === "pt") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", l);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
