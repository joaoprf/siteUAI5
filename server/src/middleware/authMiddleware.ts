import { Request, Response, NextFunction } from 'express';
import { authService } from '../modules/auth/auth.service.js';
import { ApiError } from './errorHandler.js';

/**
 * Middleware de autenticação JWT
 * Verifica o token no header Authorization e injeta o usuário no request
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Pega o token do header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiError('Token não fornecido', 401);
    }

    // Formato esperado: "Bearer TOKEN"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new ApiError('Formato de token inválido', 401);
    }

    const token = parts[1];

    // Verifica e decodifica o token
    const decoded = authService.verifyToken(token);

    // Injeta dados do usuário no request
    (req as any).user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware para verificar se o usuário é admin
 */
export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    throw new ApiError('Acesso negado. Apenas administradores.', 403);
  }

  next();
}
