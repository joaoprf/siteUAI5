import React from 'react';
import { useI18n } from '../i18n/index.tsx';

const images = [
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

const linkedins = [
  "https://linkedin.com",
  "https://linkedin.com",
  "https://linkedin.com",
  "https://linkedin.com",
];

const Team = () => {
  const { t } = useI18n();

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.team.heading}</h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">{t.team.subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.team.members.map((member, idx) => (
            <div key={idx} className="group">
              <div className="relative rounded-lg overflow-hidden mb-4 aspect-[3/4] transition-all duration-300 transform group-hover:-translate-y-2 shadow-md group-hover:shadow-xl">
                <img src={images[idx]} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <p className="text-white font-bold text-xl mb-1">{member.name}</p>
                    <p className="text-green-100">{member.role}</p>
                    <a href={linkedins[idx]} className="mt-4 inline-flex items-center text-white hover:text-green-200 transition-colors" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 mb-6">{t.team.join}</p>
          <a href="#contact" className="inline-flex items-center px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300">
            {t.team.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;
