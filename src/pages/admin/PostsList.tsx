import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsService, Post } from '../../services/posts.service';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Edit, Trash2, Eye, Plus, LogOut } from 'lucide-react';
import Seo from '../../components/Seo';

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    loadPosts();
  }, [filter]);

  const loadPosts = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const filterParam = filter === 'all' ? undefined : filter;
      const data = await postsService.getAllPosts({ status: filterParam });
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      return;
    }

    try {
      await postsService.deletePost(id);
      loadPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar post');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Posts | Admin Uai5"
        description="Gerenciar posts do blog"
        url="https://uaifive.com/admin/posts"
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-blue-600 hover:text-blue-700">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.name}</span>
              <button onClick={logout} className="text-red-600 hover:text-red-700">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-md ${
                filter === 'published'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Publicados
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-md ${
                filter === 'draft'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Rascunhos
            </button>
          </div>

          <Link
            to="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus size={20} />
            Novo Post
          </Link>
        </div>

        {/* Posts List */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhum post encontrado</p>
            <Link
              to="/admin/posts/new"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700"
            >
              Criar primeiro post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.description.substring(0, 80)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.author.name}
                      {post.coauthor && (
                        <span className="block text-xs text-gray-400">
                          Editado por: {post.coauthor.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {post.status === 'published' && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900"
                            title="Ver no site"
                          >
                            <Eye size={18} />
                          </a>
                        )}
                        <Link
                          to={`/admin/posts/${post.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-600 hover:text-red-900"
                          title="Deletar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
