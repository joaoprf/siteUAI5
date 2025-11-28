import { api } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

interface MeResponse {
  success: boolean;
  data: {
    user: User;
  };
}

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const authService = {
  /**
   * Realiza login
   */
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    // Salva token e usuário no localStorage
    this.setToken(response.data.token);
    this.setUser(response.data.user);
    
    return response.data;
  },

  /**
   * Realiza logout
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Verifica se está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Retorna o token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Salva o token
   */
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Retorna o usuário
   */
  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Salva o usuário
   */
  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Busca dados do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<MeResponse>('/auth/me', true);
    return response.data.user;
  },
};
