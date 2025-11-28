import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, FolderOpen, Tag, LogOut } from 'lucide-react';
import Seo from '../../components/Seo';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Dashboard Admin | Uai5 Blog"
        description="Painel administrativo"
        url="https://uaifive.com/admin"
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Uai5 Blog Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Olá, <strong>{user?.name}</strong>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Gerenciamento de Conteúdo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Posts */}
            <Link
              to="/admin/posts"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Posts</h3>
                  <p className="text-sm text-gray-600">Gerenciar artigos</p>
                </div>
              </div>
            </Link>

            {/* Categorias */}
            <Link
              to="/admin/categories"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FolderOpen className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Categorias</h3>
                  <p className="text-sm text-gray-600">Organizar conteúdo</p>
                </div>
              </div>
            </Link>

            {/* Tags */}
            <Link
              to="/admin/tags"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Tag className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tags</h3>
                  <p className="text-sm text-gray-600">Hashtags dos posts</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/posts/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Novo Post
            </Link>
            <Link
              to="/blog"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Ver Blog Público
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
