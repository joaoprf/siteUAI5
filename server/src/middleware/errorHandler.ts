import { Request, Response, NextFunction } from 'express';

// Interface para erros customizados
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware de tratamento de erros
export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log do erro
  console.error('🔥 Erro:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Determina status code
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  
  // Resposta
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

// Middleware para rotas não encontradas
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Rota ${req.method} ${req.path} não encontrada`,
  });
}
