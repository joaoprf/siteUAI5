import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { postsService, CreatePostData } from '../../services/posts.service';
import { categoriesService, Category } from '../../services/categories.service';
import { tagsService, Tag } from '../../services/tags.service';
import { useAuth } from '../../contexts/AuthContext';
import MarkdownEditor from '../../components/MarkdownEditor';
import { Save, X, LogOut } from 'lucide-react';
import Seo from '../../components/Seo';

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isEditing = !!id;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Options
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    loadOptions();
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadOptions = async () => {
    try {
      const [cats, tgs] = await Promise.all([
        categoriesService.getAll(),
        tagsService.getAll(),
      ]);
      setCategories(cats);
      setTags(tgs);
    } catch (err) {
      console.error('Erro ao carregar opções:', err);
    }
  };

  const loadPost = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const post = await postsService.getPostById(id);
      setTitle(post.title);
      setDescription(post.description);
      setSlug(post.slug);
      setContentMarkdown(post.contentMarkdown);
      setStatus(post.status);
      setSelectedCategories(post.categories.map((c) => c.id));
      setSelectedTags(post.tags.map((t) => t.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar post');
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = () => {
    if (!title) return;
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setSlug(slug);
  };

  const handleSubmit = async (e: FormEvent, publishNow = false) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    const data: CreatePostData = {
      title,
      description,
      contentMarkdown,
      slug: slug || undefined,
      status: publishNow ? 'published' : status,
      categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
      tagIds: selectedTags.length > 0 ? selectedTags : undefined,
    };

    try {
      if (isEditing && id) {
        await postsService.updatePost(id, data);
      } else {
        await postsService.createPost(data);
      }
      navigate('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar post');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={`${isEditing ? 'Editar' : 'Novo'} Post | Admin Uai5`}
        description="Editor de posts"
        url="https://uaifive.com/admin/posts/editor"
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/posts" className="text-blue-600 hover:text-blue-700">
                ← Posts
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Editar Post' : 'Novo Post'}
              </h1>
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
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Título e Slug */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={generateSlug}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o título do post"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug (URL)
                </label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Gerar automaticamente
                </button>
              </div>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="url-amigavel-do-post"
              />
              {slug && (
                <p className="text-xs text-gray-500 mt-1">
                  URL: /blog/{slug}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Breve descrição do post (aparece em listagens e SEO)"
                required
              />
            </div>
          </div>

          {/* Categorias e Tags */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categorias
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategories.includes(category.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                {categories.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Nenhuma categoria cadastrada.{' '}
                    <Link to="/admin/categories" className="text-blue-600 hover:text-blue-700">
                      Criar categoria
                    </Link>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag.id)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
                {tags.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Nenhuma tag cadastrada.{' '}
                    <Link to="/admin/tags" className="text-blue-600 hover:text-blue-700">
                      Criar tag
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Editor Markdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Conteúdo *
            </label>
            <MarkdownEditor value={contentMarkdown} onChange={setContentMarkdown} />
          </div>

          {/* Status e Ações */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/admin/posts"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <X size={18} />
                  Cancelar
                </Link>
                
                {status === 'draft' && (
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    <Save size={18} />
                    Salvar e Publicar
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={18} />
                  {isSaving ? 'Salvando...' : status === 'draft' ? 'Salvar Rascunho' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
