import React from "react";
import { ArrowRight, BadgeCheck, CalendarCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/index.tsx";

const ProductsAndPartners = () => {
  const { t } = useI18n();
  const p = t.products;

  return (
    <section id="produtos-parcerias" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <span className="text-sm font-semibold uppercase tracking-wide text-green-800">
            {p.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            {p.heading}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">{p.subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-800 flex items-center justify-center mb-6">
              <CalendarCheck size={26} aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-green-800">{p.solutions_tag}</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{p.solutions_title}</h3>
            <p className="text-gray-700 leading-relaxed mb-5">{p.solutions_desc}</p>
            <ul className="space-y-3 mb-7">
              {p.solutions_items.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="https://www.uai5solutions.com.br/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-800 font-semibold hover:text-green-700 transition-colors">
              {p.solutions_cta}
              <ExternalLink size={18} className="ml-2" aria-hidden="true" />
            </a>
          </article>

          <article className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-800 flex items-center justify-center mb-6">
              <BadgeCheck size={26} aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-green-800">{p.botmaker_tag}</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{p.botmaker_title}</h3>
            <p className="text-gray-700 leading-relaxed mb-5">{p.botmaker_desc}</p>
            <ul className="space-y-3 mb-7">
              {p.botmaker_items.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/chatbot-whatsapp" className="inline-flex items-center text-green-800 font-semibold hover:text-green-700 transition-colors">
              {p.botmaker_cta}
              <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProductsAndPartners;
