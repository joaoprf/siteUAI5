import { api } from './api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data;
  },

  async create(data: { name: string; slug?: string; description?: string }): Promise<Category> {
    const response = await api.post<ApiResponse<Category>>('/categories/admin', data, true);
    return response.data;
  },

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const response = await api.put<ApiResponse<Category>>(`/categories/admin/${id}`, data, true);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/admin/${id}`, true);
  },
};
