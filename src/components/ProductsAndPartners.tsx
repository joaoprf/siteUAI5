import React from "react";
import { ArrowRight, BadgeCheck, CalendarCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsAndPartners = () => {
  return (
    <section id="produtos-parcerias" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <span className="text-sm font-semibold uppercase tracking-wide text-green-800">
            Produtos e parcerias
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Duas frentes para fortalecer sua operação digital
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Além de projetos sob medida em IA conversacional, a Uai5 também
            desenvolve produtos próprios e atua com parceiros estratégicos para
            entregar soluções completas ao mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article
            aria-labelledby="uai5-solutions-title"
            className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-800 flex items-center justify-center mb-6">
              <CalendarCheck size={26} aria-hidden="true" />
            </div>

            <span className="text-sm font-semibold text-green-800">
              Produto próprio Uai5
            </span>
            <h3
              id="uai5-solutions-title"
              className="text-2xl font-bold text-gray-900 mt-2 mb-4"
            >
              Uai5 Solutions
            </h3>
            <p className="text-gray-700 leading-relaxed mb-5">
              Plataforma de controle de agendamentos criada pela Uai5 para
              organizar horários, atendimentos e disponibilidade da equipe em um
              único lugar.
            </p>

            <ul className="space-y-3 mb-7">
              <li className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                Gestão centralizada de agendas e horários.
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                Mais organização para reservas, atendimentos e operações.
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                Visão clara da disponibilidade para reduzir falhas no processo.
              </li>
            </ul>

            <a
              href="https://www.uai5solutions.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-800 font-semibold hover:text-green-700 transition-colors"
            >
              Conheça a plataforma de agendamentos Uai5 Solutions
              <ExternalLink size={18} className="ml-2" aria-hidden="true" />
            </a>
          </article>

          <article
            aria-labelledby="botmaker-partner-title"
            className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-800 flex items-center justify-center mb-6">
              <BadgeCheck size={26} aria-hidden="true" />
            </div>

            <span className="text-sm font-semibold text-green-800">
              Parceria certificada
            </span>
            <h3
              id="botmaker-partner-title"
              className="text-2xl font-bold text-gray-900 mt-2 mb-4"
            >
              Parceiros certificados Botmaker
            </h3>
            <p className="text-gray-700 leading-relaxed mb-5">
              A Uai5 atua como parceira certificada Botmaker na criação,
              evolução e sustentação de chatbots, automações de atendimento e
              fluxos de IA conversacional.
            </p>

            <ul className="space-y-3 mb-7">
              <li className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                Chatbots para WhatsApp e canais digitais.
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                Integrações com CRM, atendimento humano e sistemas internos.
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="mt-2 h-2 w-2 rounded-full bg-green-800 flex-shrink-0" />
                Suporte para melhoria contínua dos fluxos conversacionais.
              </li>
            </ul>

            <Link
              to="/chatbot-whatsapp"
              className="inline-flex items-center text-green-800 font-semibold hover:text-green-700 transition-colors"
            >
              Ver soluções de chatbots com Botmaker
              <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProductsAndPartners;
