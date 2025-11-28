import { api } from './api';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const tagsService = {
  async getAll(): Promise<Tag[]> {
    const response = await api.get<ApiResponse<Tag[]>>('/tags');
    return response.data;
  },

  async create(data: { name: string; slug?: string }): Promise<Tag> {
    const response = await api.post<ApiResponse<Tag>>('/tags/admin', data, true);
    return response.data;
  },

  async update(id: string, data: Partial<Tag>): Promise<Tag> {
    const response = await api.put<ApiResponse<Tag>>(`/tags/admin/${id}`, data, true);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tags/admin/${id}`, true);
  },
};
