import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";
import { postsService } from "../services/posts.service";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await postsService.getPublishedPosts();
      
      // Mapeia para o formato esperado
      const mappedPosts = data.map((post) => ({
        slug: post.slug,
        title: post.title,
        date: post.publishedAt || post.createdAt,
        description: post.description,
      }));

      // Ordena por data
      mappedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setPosts(mappedPosts);
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      setError("Erro ao carregar posts. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Seo
        title="Blog Uai5 | Chatbots, IA e Automação"
        description="Artigos sobre chatbots, IA, automação e desenvolvimento."
        url="https://uaifive.com/blog"
      />
      
      <h1 className="text-3xl font-bold mb-6">Blog Uai5</h1>
      
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando posts...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {!isLoading && !error && posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhum post publicado ainda.
        </div>
      )}
      
      {!isLoading && !error && posts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="block border-b py-4 hover:text-blue-600 transition"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-1">
            {new Date(post.date).toLocaleDateString('pt-BR')}
          </p>
          <p className="text-gray-700">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}
