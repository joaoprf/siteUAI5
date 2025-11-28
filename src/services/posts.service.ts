import { api } from './api';

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentMarkdown: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  author: {
    id: string;
    name: string;
    email: string;
  };
  coauthor?: {
    id: string;
    name: string;
    email: string;
  } | null;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  description: string;
  contentMarkdown: string;
  slug?: string;
  status?: 'draft' | 'published';
  categoryIds?: string[];
  tagIds?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const postsService = {
  /**
   * Lista todos os posts (admin)
   */
  async getAllPosts(filters?: { status?: string; category?: string; tag?: string }): Promise<Post[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.tag) params.append('tag', filters.tag);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get<ApiResponse<Post[]>>(`/posts/admin/all${query}`, true);
    return response.data;
  },

  /**
   * Lista posts publicados (público)
   */
  async getPublishedPosts(): Promise<Post[]> {
    const response = await api.get<ApiResponse<Post[]>>('/posts');
    return response.data;
  },

  /**
   * Busca post por ID (admin)
   */
  async getPostById(id: string): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/posts/admin/${id}`, true);
    return response.data;
  },

  /**
   * Busca post por slug (público)
   */
  async getPostBySlug(slug: string): Promise<Post> {
    const response = await api.get<ApiResponse<Post>>(`/posts/${slug}`);
    return response.data;
  },

  /**
   * Cria novo post
   */
  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<ApiResponse<Post>>('/posts/admin', data, true);
    return response.data;
  },

  /**
   * Atualiza post
   */
  async updatePost(id: string, data: UpdatePostData): Promise<Post> {
    const response = await api.put<ApiResponse<Post>>(`/posts/admin/${id}`, data, true);
    return response.data;
  },

  /**
   * Deleta post
   */
  async deletePost(id: string): Promise<void> {
    await api.delete<ApiResponse<{ message: string }>>(`/posts/admin/${id}`, true);
  },
};
