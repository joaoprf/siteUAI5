import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import matter from "gray-matter";
import { marked } from "marked";
import Seo from "./Seo";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    import(`../posts/${slug}.md?raw`)
      .then((module) => {
        const { data, content } = matter(module.default);
        const html = marked(content);
        setContent({ ...data, html });
      })
      .catch((err) => console.error("Erro ao carregar post:", err));
  }, [slug]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href === "#contact") {
      e.preventDefault();
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
    }
  };

  if (!content) return <p className="p-6">Carregando...</p>;

  return (
    <div className="prose mx-auto p-6">
      <Seo
        title={`${content.title} | Blog Uai5`}
        description={content.description}
        url={`https://uaifive.com/blog/${slug}`}
      />
      <h1>{content.title}</h1>
      <p className="text-sm text-gray-500">{content.date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: content.html }}
        onClick={(e) => {
          const target = e.target as HTMLAnchorElement;
          if (target.tagName === "A") {
            const href = target.getAttribute("href");

            // ✅ Detecta links de âncora internos (começam com #)
            if (href && href.startsWith("#")) {
              e.preventDefault();

              // Se já estiver na home, só faz o scroll
              if (location.pathname === "/") {
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              } else {
                // Se estiver no blog, navega até a home e depois faz scroll
                navigate("/");
                setTimeout(() => {
                  const el = document.querySelector(href);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 400);
              }
            }
          }
        }}
      />
    </div>
  );
}
