import React from 'react';

const Hero = () => {
  return (
    <section 
      id="home"
      className="relative pt-28 lg:pt-36 pb-20 lg:pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-green-50 opacity-70 z-0"></div>
      
      <div 
        className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-5 z-0"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Transforme seu negócio com <span className="text-green-800">IA Conversacional</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Somos especialistas em chatbots e soluções de IA conversacional, 
              ajudando empresas a melhorar o atendimento ao cliente e automatizar 
              interações com tecnologia de ponta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300 text-center"
              >
                Solicitar Consultoria
              </a>
              
              <a 
                href="#services" 
                className="px-6 py-3 bg-white border border-gray-300 hover:border-green-700 text-gray-800 hover:text-green-700 font-medium rounded-md transition-colors duration-300 text-center"
              >
                Conhecer Serviços
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                alt="IA Conversacional" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white p-4 rounded-lg shadow-xl">
              <div className="bg-green-50 rounded-lg p-6 h-full flex flex-col justify-center">
                <p className="text-gray-700">Transformar a comunicação entre empresas e pessoas por meio de soluções inteligentes, acessíveis e humanas em inteligência artificial conversacional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#services" className="text-green-800">
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
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;