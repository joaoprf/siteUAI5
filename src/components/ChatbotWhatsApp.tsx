import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Seo from "./Seo";


export default function ChatbotWhatsApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Seo
        title="Chatbot para WhatsApp com Inteligência Artificial | Uai5"
        description="Automatize o atendimento da sua empresa com chatbots inteligentes no WhatsApp. A Uai5 é parceira da Botmaker e desenvolve soluções com IA sob medida."
        keywords={[
          "chatbot WhatsApp",
          "empresa de chatbot",
          "automação de atendimento",
          "inteligência artificial",
          "Botmaker",
          "Blip",
          "chatbot empresarial",
          "chatbot com IA",
          "atendimento automático WhatsApp",
          "Uai5",
        ]}
        url="https://uaifive.com/solutions/chatbot-whatsapp"
        image="https://uaifive.com/images/og-chatbot-whatsapp.jpg"
        type="service"
        schemaOrg={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Desenvolvimento de Chatbot para WhatsApp com IA",
          "provider": {
            "@type": "Organization",
            "name": "Uai5",
            "url": "https://uaifive.com",
            "logo": "https://uaifive.com/images/logo2.png",
          },
          "serviceType": "Automação de Atendimento via Chatbot",
          "areaServed": "Brasil",
          "description":
            "A Uai5 cria chatbots inteligentes para WhatsApp integrados à Botmaker e Blip, com automação de atendimento, IA e integração com sistemas de CRM.",
        }}
      />

      {/* HERO */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-green-800 to-green-700 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Chatbot para WhatsApp com Inteligência Artificial
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            Automatize o atendimento e aumente a eficiência do seu negócio com chatbots inteligentes e personalizados.
          </p>
          <button
            onClick={handleContactClick}
            className="bg-white text-green-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Fale com a Uai5
          </button>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-16 container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Por que escolher um Chatbot WhatsApp da Uai5?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Integração com IA",
              desc: "Utilize inteligência artificial para compreender mensagens, gerar respostas automáticas e oferecer experiências personalizadas.",
            },
            {
              title: "Atendimento 24/7",
              desc: "Mantenha seu atendimento ativo todos os dias, mesmo fora do horário comercial, reduzindo custos e aumentando satisfação.",
            },
            {
              title: "Integrações poderosas",
              desc: "Conecte seu chatbot com CRMs, ERPs e plataformas como Botmaker e Blip, garantindo automação completa do funil de atendimento.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Como funciona o processo</h2>
          <ol className="space-y-6 text-left">
            <li>
              <span className="font-semibold text-green-800">
                1. Diagnóstico da empresa
              </span>{" "}
              — analisamos seu fluxo de atendimento e objetivos.
            </li>
            <li>
              <span className="font-semibold text-green-800">
                2. Desenvolvimento do chatbot
              </span>{" "}
              — criamos o fluxo no Botmaker ou Blip com IA integrada.
            </li>
            <li>
              <span className="font-semibold text-green-800">
                3. Integrações e testes
              </span>{" "}
              — conectamos o chatbot aos seus sistemas e validamos cenários.
            </li>
            <li>
              <span className="font-semibold text-green-800">
                4. Monitoramento e otimização
              </span>{" "}
              — acompanhamos métricas e aprimoramos respostas.
            </li>
          </ol>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 text-center bg-green-800 text-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para automatizar o atendimento da sua empresa?
          </h2>
          <p className="text-lg mb-8">
            Fale com nosso time e descubra como a Uai5 pode transformar seu
            WhatsApp em um canal inteligente de vendas e suporte.
          </p>
          <button
            onClick={handleContactClick}
            className="bg-white text-green-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Solicitar Demonstração
          </button>
        </div>
      </section>
    </div>
  );
}
