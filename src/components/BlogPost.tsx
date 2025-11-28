import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { marked } from "marked";
import Seo from "./Seo";
import { postsService } from "../services/posts.service";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const post = await postsService.getPostBySlug(slug!);
      
      // Converte Markdown para HTML
      const html = marked(post.contentMarkdown);
      
      setContent({
        title: post.title,
        description: post.description,
        date: post.publishedAt || post.createdAt,
        html,
        categories: post.categories,
        tags: post.tags,
      });
    } catch (err) {
      console.error("Erro ao carregar post:", err);
      setError("Post não encontrado.");
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || "Post não encontrado."}
        </div>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          ← Voltar para o blog
        </button>
      </div>
    );
  }

  return (
    <div className="prose mx-auto p-6">
      <Seo
        title={`${content.title} | Blog Uai5`}
        description={content.description}
        url={`https://uaifive.com/blog/${slug}`}
      />
      
      <h1>{content.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(content.date).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      
      {/* Categorias e Tags */}
      {(content.categories?.length > 0 || content.tags?.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6 not-prose">
          {content.categories?.map((cat: any) => (
            <span
              key={cat.id}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {cat.name}
            </span>
          ))}
          {content.tags?.map((tag: any) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
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
