import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { categoriesService, Category } from '../../services/categories.service';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2, LogOut, X, Check } from 'lucide-react';
import Seo from '../../components/Seo';

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar categorias');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        await categoriesService.update(editingId, { name, description });
      } else {
        await categoriesService.create({ name, description });
      }
      resetForm();
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar categoria');
    }
  };

  const handleEdit = (category: Category) => {
    setIsEditing(true);
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || '');
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja deletar a categoria "${name}"?`)) {
      return;
    }

    try {
      await categoriesService.delete(id);
      loadCategories();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar categoria');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setName('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Categorias | Admin Uai5"
        description="Gerenciar categorias"
        url="https://uaifive.com/admin/categories"
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-blue-600 hover:text-blue-700">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: IA e Automação"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descrição opcional da categoria"
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600">{error}</div>
                )}

                <div className="flex gap-2">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <X size={18} />
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Check size={18} />
                    {isEditing ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Todas as Categorias ({categories.length})
                </h2>
              </div>

              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 text-sm">Carregando...</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  Nenhuma categoria cadastrada
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <div key={category.id} className="p-4 hover:bg-gray-50 flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Slug: {category.slug}
                        </p>
                        {category.description && (
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Deletar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
