import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden aspect-square shadow-2xl">
              <img 
                src="https://i0.wp.com/people.com.ai/wp-content/uploads/2022/01/6-mitos-sobre-chatbots-com-inteligencia-artificial.jpg?fit=1000%2C667&ssl=1" 
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
              Sobre a <span className="text-green-800">Uai5</span>
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Fundada em 2025, a Uai5 nasceu com o propósito de democratizar o acesso a soluções inteligentes e personalizadas por meio de automação, 
              inteligência artificial, chatbots e integrações, de forma acessível para empresas de todos os tamanhos. 
              Queremos transformar a forma como as empresas se conectam com seus clientes e otimizam processos, utilizando tecnologias que agregam valor real ao seu negócio.
            </p>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Nossa equipe é formada por especialistas com mais de 10 anos de experiência em desenvolvimento de 
              chatbots e implementação de soluções de IA conversacional para diversos segmentos do mercado.
            </p>
            
            
            
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              Fale com um Especialista
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
