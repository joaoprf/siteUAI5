import React, { useState } from 'react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Eduardo",
    company: "TechSolutions Brasil",
    content: "A implementação do chatbot pela Uai5 transformou nosso atendimento ao cliente. Tivemos uma redução de 40% nas chamadas de suporte e um aumento significativo na satisfação dos clientes. A equipe foi extremamente profissional e atenciosa durante todo o processo.",
    image: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: 2,
    name: "Mariana Silva",
    company: "Grupo Inovação",
    content: "Os serviços de consultoria em IA da Uai5 nos ajudaram a identificar oportunidades de automação que não havíamos considerado. O resultado foi uma economia anual de R$350 mil e processos muito mais eficientes. Recomendo sem hesitação.",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  },
  {
    id: 3,
    name: "Rafael Costa",
    company: "E-commerce Express",
    content: "Nossa experiência com a Uai5 foi excepcional. A solução de análise preditiva que implementaram melhorou drasticamente nossa capacidade de prever demanda e otimizar estoque. Em apenas três meses, reduzimos custos de armazenamento em 25%.",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-green-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg text-green-100">
            Conheça as histórias de sucesso de empresas que transformaram seus negócios com nossas soluções.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-xl">
            <div className="absolute -top-6 -left-6 text-6xl text-green-500 opacity-50">"</div>
            
            <div className="mb-8">
              <p className="text-lg md:text-xl italic text-green-50 leading-relaxed">
                {testimonials[activeIndex].content}
              </p>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">{testimonials[activeIndex].name}</h3>
                <p className="text-green-200">{testimonials[activeIndex].company}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                } transition-colors duration-300`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 hidden md:block">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 hidden md:block">
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
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