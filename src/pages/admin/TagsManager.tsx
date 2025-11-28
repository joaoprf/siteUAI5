import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { tagsService, Tag } from '../../services/tags.service';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit, Trash2, LogOut, X, Check, Hash } from 'lucide-react';
import Seo from '../../components/Seo';

export default function TagsManager() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    setIsLoading(true);
    try {
      const data = await tagsService.getAll();
      setTags(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tags');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        await tagsService.update(editingId, { name });
      } else {
        await tagsService.create({ name });
      }
      resetForm();
      loadTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar tag');
    }
  };

  const handleEdit = (tag: Tag) => {
    setIsEditing(true);
    setEditingId(tag.id);
    setName(tag.name);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja deletar a tag "${name}"?`)) {
      return;
    }

    try {
      await tagsService.delete(id);
      loadTags();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar tag');
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setName('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title="Tags | Admin Uai5"
        description="Gerenciar tags"
        url="https://uaifive.com/admin/tags"
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-blue-600 hover:text-blue-700">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
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
                {isEditing ? 'Editar Tag' : 'Nova Tag'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="chatbots"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Não inclua o # no nome, ele é adicionado automaticamente
                  </p>
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
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
                  Todas as Tags ({tags.length})
                </h2>
              </div>

              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 text-sm">Carregando...</p>
                </div>
              ) : tags.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  Nenhuma tag cadastrada
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="group flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full border border-purple-200 hover:border-purple-300"
                      >
                        <Hash size={16} />
                        <span className="font-medium">{tag.name}</span>
                        <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(tag)}
                            className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                            title="Editar"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(tag.id, tag.name)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                            title="Deletar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
