import React, { useState } from 'react';
import { Solution } from '../types';

const solutions: Solution[] = [
  {
    id: 1,
    title: "Chatbots para Atendimento",
    description: "Chatbots inteligentes que utilizam processamento de linguagem natural para atender clientes 24/7 com respostas precisas e personalizadas.",
    image: "https://www.dnkinfotelecom.com.br/wp-content/uploads/2021/04/chatbot-no-atendimento.png",
    features: [
      "Atendimento 24 horas por dia, 7 dias por semana",
      "Integração com múltiplos canais de comunicação",
      "Personalização de respostas baseada no histórico do cliente",
      "Escalabilidade para lidar com grandes volumes de interações"
    ]
  },
  {
    id: 2,
    title: "Automação de Conversas",
    description: "Soluções de automação inteligente que identificam padrões em conversas, aprendem com interações anteriores e melhoram continuamente.",
    image: "https://zapmizer.com/blog/wp-content/uploads/2024/12/THUMB-BLOG-Ferias-sem-estresse-A-importancia-de-automatizar-o-atendimento-no-WhatsApp-Business-1170x658.jpg",
    features: [
      "Automação de respostas frequentes",
      "Análise de sentimento em tempo real",
      "Aprendizado contínuo para melhor atendimento",
      "Integração com sistemas de CRM"
    ]
  },
  {
    id: 3,
    title: "Análise de Conversas",
    description: "Utilizamos algoritmos avançados para analisar conversas, identificar padrões e melhorar continuamente a experiência do cliente.",
    image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    features: [
      "Identificação de temas recorrentes",
      "Análise de satisfação do cliente",
      "Otimização de fluxos de conversa",
      "Relatórios detalhados de performance"
    ]
  }
];

const Solutions = () => {
  const [activeSolution, setActiveSolution] = useState(solutions[0]);

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossas Soluções
          </h2>
          <div className="w-20 h-1 bg-green-800 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Conheça algumas das soluções que desenvolvemos para transformar o 
            atendimento ao cliente com chatbots inteligentes.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-4">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  onClick={() => setActiveSolution(solution)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeSolution.id === solution.id
                      ? 'bg-green-800 text-white shadow-md'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <h3 className="font-bold text-lg mb-2">{solution.title}</h3>
                  <p className={`text-sm ${
                    activeSolution.id === solution.id ? 'text-green-100' : 'text-gray-600'
                  }`}>
                    {solution.description.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="h-64 md:h-80 relative">
                <img 
                  src={activeSolution.image} 
                  alt={activeSolution.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {activeSolution.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  {activeSolution.description}
                </p>
                
                <h4 className="text-lg font-bold text-gray-900 mb-4">Recursos Principais:</h4>
                <ul className="space-y-3">
                  {activeSolution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-green-800" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center px-6 py-3 bg-green-800 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
                  >
                    Solicitar Demonstração
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
