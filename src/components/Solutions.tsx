import React, { useState } from 'react';
import { useI18n } from '../i18n/index.tsx';

const images = [
  "https://www.dnkinfotelecom.com.br/wp-content/uploads/2021/04/chatbot-no-atendimento.png",
  "https://zapmizer.com/blog/wp-content/uploads/2024/12/THUMB-BLOG-Ferias-sem-estresse-A-importancia-de-automatizar-o-atendimento-no-WhatsApp-Business-1170x658.jpg",
  "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

const Solutions = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = t.solutions.items[activeIndex];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.solutions.heading}</h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">{t.solutions.subheading}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-4">
              {t.solutions.items.map((solution, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${activeIndex === idx ? 'bg-green-800 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  <h3 className="font-bold text-lg mb-2">{solution.title}</h3>
                  <p className={`text-sm ${activeIndex === idx ? 'text-green-100' : 'text-gray-600'}`}>
                    {solution.description.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="h-64 md:h-80 relative">
                <img src={images[activeIndex]} alt={active.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{active.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6">{active.description}</p>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{t.solutions.features_heading}</h4>
                <ul className="space-y-3">
                  {active.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a href="#contact" className="inline-flex items-center px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300">
                    {t.solutions.cta}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
