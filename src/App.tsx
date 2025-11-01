import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Solutions from './components/Solutions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seo from "./components/Seo";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Uai5 | Desenvolvimento de Software e Chatbots Inteligentes"
        description="A Uai5 cria soluções sob medida em software, automação e chatbots com inteligência artificial. Inove o atendimento e aumente a eficiência do seu negócio."
        keywords={[
          "Uai5",
          "chatbot WhatsApp",
          "automação de atendimento",
          "inteligência artificial",
          "desenvolvimento de software",
          "sistemas personalizados",
          "chatbot empresarial",
          "IA para empresas",
          "botmaker",
          "parceiro botmaker",
        ]}
        image="https://uaifive.com/images/og-image.jpg"
        url="https://uaifive.com"
      />      
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Solutions />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;