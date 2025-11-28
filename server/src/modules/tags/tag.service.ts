import { prisma } from '../../config/db.js';
import { slugify } from '../../utils/slugify.js';
import { ApiError } from '../../middleware/errorHandler.js';

export class TagService {
  async create(data: { name: string; slug?: string }) {
    const slug = data.slug || slugify(data.name);

    const existing = await prisma.tag.findUnique({ where: { slug } });
    if (existing) {
      throw new ApiError(`Tag com slug "${slug}" já existe`, 400);
    }

    return await prisma.tag.create({ data: { ...data, slug } });
  }

  async update(id: string, data: { name?: string; slug?: string }) {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new ApiError('Tag não encontrada', 404);
    }

    if (data.slug && data.slug !== tag.slug) {
      const existing = await prisma.tag.findUnique({ where: { slug: data.slug } });
      if (existing) {
        throw new ApiError(`Slug "${data.slug}" já está em uso`, 400);
      }
    }

    return await prisma.tag.update({ where: { id }, data });
  }

  async delete(id: string) {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new ApiError('Tag não encontrada', 404);
    }

    await prisma.tag.delete({ where: { id } });
    return { message: 'Tag deletada com sucesso' };
  }

  async findAll() {
    return await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  }

  async findById(id: string) {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new ApiError('Tag não encontrada', 404);
    }
    return tag;
  }
}

export const tagService = new TagService();
