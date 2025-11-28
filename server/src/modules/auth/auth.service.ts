import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { userService } from '../users/user.service.js';
import { ApiError } from '../../middleware/errorHandler.js';
import { JWTPayload, LoginDTO, LoginResponse } from './auth.types.js';

export class AuthService {
  /**
   * Realiza login e retorna token JWT
   */
  async login(data: LoginDTO): Promise<LoginResponse> {
    const { email, password } = data;

    // Busca usuário
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new ApiError('Email ou senha incorretos', 401);
    }

    // Verifica senha
    const isPasswordValid = await userService.verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new ApiError('Email ou senha incorretos', 401);
    }

    // Gera token JWT
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Gera token JWT
   */
  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });
  }

  /**
   * Verifica e decodifica token JWT
   */
  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, env.jwt.secret) as JWTPayload;
    } catch (error) {
      throw new ApiError('Token inválido ou expirado', 401);
    }
  }
}

export const authService = new AuthService();
