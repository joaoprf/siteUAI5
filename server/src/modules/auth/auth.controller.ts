import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { authService } from './auth.service.js';
import { ApiError } from '../../middleware/errorHandler.js';

export class AuthController {
  /**
   * POST /api/auth/login
   * Realiza login e retorna token JWT
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // Validação dos campos
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('Dados inválidos', 400);
      }

      const { email, password } = req.body;

      // Realiza login
      const result = await authService.login({ email, password });

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/auth/me
   * Retorna dados do usuário logado
   */
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      // O usuário já foi injetado pelo middleware de auth
      const user = (req as any).user;

      res.json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

// Validações
export const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
];
