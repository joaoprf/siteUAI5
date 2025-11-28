/**
 * Cliente HTTP configurado para comunicação com a API
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Função auxiliar para fazer requisições HTTP
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers = {}, ...fetchOptions } = options;

  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Adiciona token JWT se a rota requer autenticação
  if (requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  // Trata erros HTTP
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro na requisição',
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Cliente API com métodos HTTP
 */
export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    fetchAPI<T>(endpoint, { method: 'GET', requiresAuth }),

  post: <T>(endpoint: string, data?: unknown, requiresAuth = false) =>
    fetchAPI<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  put: <T>(endpoint: string, data?: unknown, requiresAuth = false) =>
    fetchAPI<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      requiresAuth,
    }),

  delete: <T>(endpoint: string, requiresAuth = false) =>
    fetchAPI<T>(endpoint, { method: 'DELETE', requiresAuth }),
};

export default api;
