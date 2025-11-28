import { Router } from 'express';
import { body } from 'express-validator';
import { categoryService } from './category.service.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { ApiError } from '../../middleware/errorHandler.js';
import { validationResult } from 'express-validator';

const router = Router();

const validateCategory = [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
];

// GET /api/categories - Lista todas as categorias (público)
router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.findAll();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/categories - Cria categoria (admin)
router.post('/admin', authMiddleware, validateCategory, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError('Dados inválidos', 400);
    }

    const category = await categoryService.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/categories/:id - Atualiza categoria (admin)
router.put('/admin/:id', authMiddleware, async (req, res, next) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/categories/:id - Deleta categoria (admin)
router.delete('/admin/:id', authMiddleware, async (req, res, next) => {
  try {
    const result = await categoryService.delete(req.params.id);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

export default router;
