import { Router } from 'express';
import { postController, createPostValidation, updatePostValidation } from './post.controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

// ============================================
// ROTAS PÚBLICAS
// ============================================

// GET /api/posts - Lista posts publicados
router.get('/', (req, res, next) => {
  postController.listPublished(req, res, next);
});

// GET /api/posts/:slug - Detalhes de um post publicado
router.get('/:slug', (req, res, next) => {
  postController.getBySlug(req, res, next);
});

// ============================================
// ROTAS ADMIN (protegidas)
// ============================================

// GET /api/admin/posts - Lista todos os posts
router.get('/admin/all', authMiddleware, (req, res, next) => {
  postController.listAll(req, res, next);
});

// GET /api/admin/posts/:id - Detalhes de um post
router.get('/admin/:id', authMiddleware, (req, res, next) => {
  postController.getById(req, res, next);
});

// POST /api/admin/posts - Cria novo post
router.post('/admin', authMiddleware, createPostValidation, (req, res, next) => {
  postController.create(req, res, next);
});

// PUT /api/admin/posts/:id - Atualiza post
router.put('/admin/:id', authMiddleware, updatePostValidation, (req, res, next) => {
  postController.update(req, res, next);
});

// DELETE /api/admin/posts/:id - Deleta post
router.delete('/admin/:id', authMiddleware, (req, res, next) => {
  postController.delete(req, res, next);
});

export default router;
