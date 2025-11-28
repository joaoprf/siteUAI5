// Tipos relacionados a usuários

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Remove informações sensíveis do usuário
export function sanitizeUser(user: User): UserResponse {
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
