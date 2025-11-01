import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import { Buffer } from "buffer";
import Seo from "./Seo";

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}
window.Buffer = Buffer;

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function Blog() {
  <Seo
    title="Blog Uai5 | Chatbots, IA e Automação"
    description="Artigos sobre chatbots, IA, automação e desenvolvimento."
    url="https://uaifive.com/blog"
  />;
  
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // importa o conteúdo bruto dos .md
    const modules = import.meta.glob("../posts/*.md", {
      eager: true,
      as: "raw",
    });
    const allPosts = Object.entries(modules).map(([path, rawContent]: any) => {
      const slug = path.split("/").pop()?.replace(".md", "");
      const { data } = matter(rawContent);

      return {
        slug,
        title: data.title || "Sem título",
        date: data.date || "",
        description: data.description || "",
      };
    });

    // ordena os posts por data
    allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPosts(allPosts);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Uai5</h1>
      {posts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="block border-b py-4 hover:text-blue-600 transition"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{post.date}</p>
          <p className="text-gray-700">{post.description}</p>
        </Link>
      ))}
    </div>
  );
}
