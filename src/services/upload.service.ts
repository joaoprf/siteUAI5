export interface UploadResponse {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
}

/**
 * Service para upload de imagens
 */
export const uploadService = {
  /**
   * Fazer upload de uma imagem
   */
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao fazer upload');
    }

    const result = await response.json();
    return result.data;
  },

  /**
   * Deletar uma imagem
   */
  async deleteImage(filename: string): Promise<void> {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/upload/image/${filename}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar imagem');
    }
  },

  /**
   * Obter URL completa da imagem
   */
  getImageUrl(path: string): string {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    const baseUrl = apiUrl.replace('/api', '');
    
    // Se já é uma URL completa, retorna como está
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Remove /uploads/ se já existir no caminho
    const cleanPath = path.startsWith('/uploads/') ? path : `/uploads/${path}`;
    
    return `${baseUrl}${cleanPath}`;
  },
};
