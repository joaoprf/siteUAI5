import React from 'react';
import { useI18n } from '../i18n/index.tsx';

const About = () => {
  const { t } = useI18n();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden aspect-square shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="Uai5 Team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-green-800/10"></div>
            </div>
            
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-xs hidden lg:block">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 border-2 border-white font-bold">U</div>
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white border-2 border-white font-bold">5</div>
                </div>
                <div className="h-1 flex-1 bg-gray-200"></div>
              </div>
              <p className="text-gray-700 italic">
                "Transformamos atendimento ao cliente com chatbots inteligentes"
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.about.heading} <span className="text-green-800">Uai5</span>
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t.about.p1}</p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{t.about.p2}</p>
            
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              {t.about.cta}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
