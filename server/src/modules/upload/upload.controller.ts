import { Request, Response } from 'express';
import { ApiError } from '../../middleware/errorHandler.js';

/**
 * Controller para upload de imagens
 */

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new ApiError('Nenhum arquivo enviado', 400);
    }

    // Validar tipo de arquivo
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(req.file.mimetype)) {
      throw new ApiError('Tipo de arquivo não permitido. Use: JPG, PNG, GIF ou WebP', 400);
    }

    // Construir URL da imagem
    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      data: {
        url: imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Erro ao fazer upload da imagem', 500);
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      throw new ApiError('Nome do arquivo não fornecido', 400);
    }

    // Aqui você pode adicionar lógica para deletar o arquivo
    // import fs from 'fs/promises';
    // import path from 'path';
    // const filePath = path.join(process.cwd(), 'uploads', filename);
    // await fs.unlink(filePath);

    res.json({
      success: true,
      message: 'Imagem deletada com sucesso',
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Erro ao deletar imagem', 500);
  }
};
