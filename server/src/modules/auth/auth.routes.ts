import { Router } from 'express';
import { authController, loginValidation } from './auth.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// POST /api/auth/login
router.post('/login', loginValidation, (req, res, next) => {
  authController.login(req, res, next);
});

// GET /api/auth/me (rota protegida)
router.get('/me', authMiddleware, (req, res, next) => {
  authController.me(req, res, next);
});

export default router;
