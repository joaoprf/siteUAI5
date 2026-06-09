import { Helmet } from "react-helmet";
import { useI18n } from "../i18n/index.tsx";

type SEOProps = {
  title?: string;
  titleEs?: string;
  description?: string;
  descriptionEs?: string;
  keywords?: string[];
  keywordsEs?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "service";
  schemaOrg?: object;
};

export default function Seo({
  title = "Uai5 | Desenvolvimento de Software e Chatbots Inteligentes",
  titleEs = "Uai5 | Desarrollo de Software y Chatbots Inteligentes",
  description = "A Uai5 desenvolve soluções em software e chatbots com IA para automatizar o atendimento e aumentar a eficiência.",
  descriptionEs = "Uai5 desarrolla soluciones en software y chatbots con IA para automatizar la atención y aumentar la eficiencia.",
  keywords = [
    "Uai5", "chatbot WhatsApp", "automação de atendimento",
    "inteligência artificial", "desenvolvimento de software",
    "sistemas personalizados", "chatbot empresarial",
    "IA para empresas", "botmaker", "parceiro botmaker",
  ],
  keywordsEs = [
    "Uai5", "chatbot WhatsApp", "automatización de atención",
    "inteligencia artificial", "desarrollo de software",
    "sistemas personalizados", "chatbot empresarial",
    "IA para empresas", "botmaker", "socio botmaker",
  ],
  image = "https://uaifive.com/images/og-image.jpg",
  url = typeof window !== "undefined" ? window.location.href : "https://uaifive.com",
  type = "website",
  schemaOrg,
}: SEOProps) {
  const { lang } = useI18n();

  const isEs = lang === "es";
  const activeTitle = isEs ? titleEs : title;
  const activeDescription = isEs ? descriptionEs : description;
  const activeKeywords = isEs ? keywordsEs : keywords;
  const htmlLang = isEs ? "es" : "pt-BR";

  const baseUrl = typeof window !== "undefined"
    ? window.location.origin + window.location.pathname
    : "https://uaifive.com";

  const canonicalPt = baseUrl;
  const canonicalEs = `${baseUrl}?lang=es`;
  const canonical = isEs ? canonicalEs : canonicalPt;

  const jsonLd = schemaOrg
    ? JSON.stringify(schemaOrg)
    : JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Uai5",
        url: "https://uaifive.com",
        logo: "https://uaifive.com/images/logo2.png",
        sameAs: ["https://www.linkedin.com/company/uai5/"],
        description: activeDescription,
      });

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{activeTitle}</title>

      <meta name="description" content={activeDescription} />
      <meta name="keywords" content={activeKeywords.join(", ")} />
      <meta name="robots" content="index,follow,max-image-preview:large" />

      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="pt-BR" href={canonicalPt} />
      <link rel="alternate" hrefLang="es" href={canonicalEs} />
      <link rel="alternate" hrefLang="x-default" href={canonicalPt} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={activeTitle} />
      <meta property="og:description" content={activeDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={isEs ? "es_ES" : "pt_BR"} />
      <meta property="og:locale:alternate" content={isEs ? "pt_BR" : "es_ES"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={activeTitle} />
      <meta name="twitter:description" content={activeDescription} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{jsonLd}</script>
    </Helmet>
  );
}
