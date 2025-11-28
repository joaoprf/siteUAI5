import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { postService } from './post.service.js';
import { ApiError } from '../../middleware/errorHandler.js';

export class PostController {
  /**
   * GET /api/posts - Lista posts publicados
   */
  async listPublished(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, tag } = req.query;

      const posts = await postService.findPublished({
        categorySlug: category as string,
        tagSlug: tag as string,
      });

      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/posts/:slug - Detalhes de um post publicado
   */
  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      const post = await postService.findBySlug(slug);

      // Verifica se está publicado (para rota pública)
      if (post.status !== 'published') {
        throw new ApiError('Post não encontrado', 404);
      }

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/admin/posts - Lista todos os posts (admin)
   */
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, category, tag } = req.query;

      const posts = await postService.findAll({
        status: status as any,
        categorySlug: category as string,
        tagSlug: tag as string,
      });

      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/admin/posts/:id - Detalhes de um post (admin)
   */
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const post = await postService.findById(id);

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/admin/posts - Cria novo post
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('Dados inválidos', 400);
      }

      const user = (req as any).user;
      const post = await postService.createPost(req.body, user.id);

      res.status(201).json({
        success: true,
        data: post,
        message: 'Post criado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/admin/posts/:id - Atualiza post
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('Dados inválidos', 400);
      }

      const { id } = req.params;
      const user = (req as any).user;

      const post = await postService.updatePost(id, req.body, user.id);

      res.json({
        success: true,
        data: post,
        message: 'Post atualizado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/admin/posts/:id - Deleta post
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await postService.deletePost(id);

      res.json({
        success: true,
        message: 'Post deletado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const postController = new PostController();

// Validações
export const createPostValidation = [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  body('contentMarkdown').notEmpty().withMessage('Conteúdo é obrigatório'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status inválido'),
];

export const updatePostValidation = [
  body('title').optional().notEmpty().withMessage('Título não pode ser vazio'),
  body('description').optional().notEmpty().withMessage('Descrição não pode ser vazia'),
  body('contentMarkdown').optional().notEmpty().withMessage('Conteúdo não pode ser vazio'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status inválido'),
];
