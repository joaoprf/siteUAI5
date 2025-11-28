import { prisma } from '../../config/db.js';
import { slugify } from '../../utils/slugify.js';
import { ApiError } from '../../middleware/errorHandler.js';

export class CategoryService {
  async create(data: { name: string; slug?: string; description?: string }) {
    const slug = data.slug || slugify(data.name);

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError(`Categoria com slug "${slug}" já existe`, 400);
    }

    return await prisma.category.create({ data: { ...data, slug } });
  }

  async update(id: string, data: { name?: string; slug?: string; description?: string }) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new ApiError('Categoria não encontrada', 404);
    }

    if (data.slug && data.slug !== category.slug) {
      const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
      if (existing) {
        throw new ApiError(`Slug "${data.slug}" já está em uso`, 400);
      }
    }

    return await prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new ApiError('Categoria não encontrada', 404);
    }

    await prisma.category.delete({ where: { id } });
    return { message: 'Categoria deletada com sucesso' };
  }

  async findAll() {
    return await prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new ApiError('Categoria não encontrada', 404);
    }
    return category;
  }
}

export const categoryService = new CategoryService();
