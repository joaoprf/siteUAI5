import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { tagService } from './tag.service.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { ApiError } from '../../middleware/errorHandler.js';

const router = Router();

const validateTag = [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
];

// GET /api/tags - Lista todas as tags (público)
router.get('/', async (req, res, next) => {
  try {
    const tags = await tagService.findAll();
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/tags - Cria tag (admin)
router.post('/admin', authMiddleware, validateTag, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError('Dados inválidos', 400);
    }

    const tag = await tagService.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/tags/:id - Atualiza tag (admin)
router.put('/admin/:id', authMiddleware, async (req, res, next) => {
  try {
    const tag = await tagService.update(req.params.id, req.body);
    res.json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/tags/:id - Deleta tag (admin)
router.delete('/admin/:id', authMiddleware, async (req, res, next) => {
  try {
    const result = await tagService.delete(req.params.id);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
});

export default router;
