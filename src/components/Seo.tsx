import { Helmet } from "react-helmet";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  schemaOrg?: object;
};

export default function Seo({
  title = "Uai5 | Desenvolvimento de Software e Chatbots Inteligentes",
  description = "A Uai5 desenvolve soluções em software e chatbots com IA para automatizar o atendimento e aumentar a eficiência.",
  keywords = [
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
    "chatbots Blip",
    "integração com Blip"
  ],
  image = "https://uaifive.com/images/og-image.jpg",
  url = typeof window !== 'undefined' ? window.location.href : "https://uaifive.com",
  type = "website",
  schemaOrg,
}: SEOProps) {
  const jsonLd = schemaOrg ? JSON.stringify(schemaOrg) : JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uai5",
    "url": "https://uaifive.com",
    "logo": "https://uaifive.com/images/logo2.png",
    "sameAs": ["https://www.linkedin.com/company/uai5/"],
    "description": description
  });

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content="index,follow,max-image-preview:large" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />

      {/* JSON-LD */}
      <script type="application/ld+json">{jsonLd}</script>
    </Helmet>
  );
}
