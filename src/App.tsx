import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductsAndPartners from './components/ProductsAndPartners';
import About from './components/About';
import Solutions from './components/Solutions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seo from "./components/Seo";

function App() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uai5",
    "url": "https://uaifive.com",
    "logo": "https://uaifive.com/images/logo2.png",
    "sameAs": [
      "https://www.linkedin.com/company/uai5/",
      "https://www.instagram.com/uai.five/"
    ],
    "description": "A Uai5 cria software, automação e chatbots com IA, atua como parceira certificada Botmaker e desenvolve a Uai5 Solutions para agendamentos.",
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "Uai5 Solutions",
          "applicationCategory": "BusinessApplication",
          "url": "https://www.uai5solutions.com.br/",
          "description": "Plataforma de controle de agendamentos criada pela Uai5."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Chatbots e automações Botmaker",
          "serviceType": "IA conversacional e automação de atendimento",
          "description": "Criação, evolução e sustentação de chatbots como parceira certificada Botmaker."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Uai5 | Desenvolvimento de Software e Chatbots Inteligentes"
        description="A Uai5 cria software, automação e chatbots com IA, atua como parceira certificada Botmaker e desenvolve a Uai5 Solutions para agendamentos."
        keywords={[
          "Uai5",
          "Uai5 Solutions",
          "plataforma de agendamentos",
          "controle de agendamentos",
          "chatbot WhatsApp",
          "automação de atendimento",
          "inteligência artificial",
          "desenvolvimento de software",
          "sistemas personalizados",
          "chatbot empresarial",
          "IA para empresas",
          "botmaker",
          "parceiro botmaker",
          "parceira certificada Botmaker",
        ]}
        image="https://uaifive.com/images/og-image.jpg"
        url="https://uaifive.com"
        schemaOrg={homeSchema}
      />      
      <Navbar />
      <Hero />
      <Services />
      <ProductsAndPartners />
      <About />
      <Solutions />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
