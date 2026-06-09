import React, { useState } from 'react';
import { useI18n } from '../i18n/index.tsx';

const images = [
  "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
];

const Testimonials = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % t.testimonials.items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  const active = t.testimonials.items[activeIndex];

  return (
    <section id="testimonials" className="py-20 bg-green-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonials.heading}</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-green-100">{t.testimonials.subheading}</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-xl">
            <div className="absolute -top-6 -left-6 text-6xl text-green-500 opacity-50">"</div>
            <div className="mb-8">
              <p className="text-lg md:text-xl italic text-green-50 leading-relaxed">{active.content}</p>
            </div>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img src={images[activeIndex]} alt={active.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{active.name}</h3>
                <p className="text-green-200">{active.company}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {t.testimonials.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'} transition-colors duration-300`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 hidden md:block">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Previous">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 hidden md:block">
            <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Next">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
