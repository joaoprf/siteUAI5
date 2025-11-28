import { prisma } from '../../config/db.js';
import { slugify } from '../../utils/slugify.js';
import { ApiError } from '../../middleware/errorHandler.js';
import { CreatePostDTO, UpdatePostDTO, PostFilters } from './post.types.js';

export class PostService {
  /**
   * Cria um novo post
   */
  async createPost(data: CreatePostDTO, authorId: string) {
    // Gera slug se não fornecido
    let slug = data.slug || slugify(data.title);

    // Verifica se slug já existe
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      throw new ApiError(`Slug "${slug}" já está em uso`, 400);
    }

    // Define publishedAt se status for published
    const publishedAt = data.status === 'published' ? new Date() : null;

    // Cria o post
    const post = await prisma.post.create({
      data: {
        title: data.title,
        description: data.description,
        contentMarkdown: data.contentMarkdown,
        slug,
        status: data.status || 'draft',
        publishedAt,
        authorId,
        // Relacionamentos N:N
        categories: data.categoryIds
          ? {
              create: data.categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
        tags: data.tagIds
          ? {
              create: data.tagIds.map((tagId) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    });

    return this.formatPost(post);
  }

  /**
   * Atualiza um post
   */
  async updatePost(id: string, data: UpdatePostDTO, editorId: string) {
    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new ApiError('Post não encontrado', 404);
    }

    // Verifica se slug foi alterado e se já existe
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({ where: { slug: data.slug } });
      if (slugExists) {
        throw new ApiError(`Slug "${data.slug}" já está em uso`, 400);
      }
    }

    // Define coautor se editor diferente do autor original
    const coauthorId = editorId !== existingPost.authorId ? editorId : existingPost.coauthorId;

    // Atualiza publishedAt se mudou para published
    let publishedAt = existingPost.publishedAt;
    if (data.status === 'published' && !existingPost.publishedAt) {
      publishedAt = new Date();
    }

    // Atualiza o post
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.contentMarkdown && { contentMarkdown: data.contentMarkdown }),
        ...(data.slug && { slug: data.slug }),
        ...(data.status && { status: data.status }),
        publishedAt,
        coauthorId,
        // Atualiza relacionamentos N:N
        ...(data.categoryIds && {
          categories: {
            deleteMany: {},
            create: data.categoryIds.map((categoryId) => ({
              category: { connect: { id: categoryId } },
            })),
          },
        }),
        ...(data.tagIds && {
          tags: {
            deleteMany: {},
            create: data.tagIds.map((tagId) => ({
              tag: { connect: { id: tagId } },
            })),
          },
        }),
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        coauthor: {
          select: { id: true, name: true, email: true },
        },
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    });

    return this.formatPost(post);
  }

  /**
   * Deleta um post
   */
  async deletePost(id: string) {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new ApiError('Post não encontrado', 404);
    }

    await prisma.post.delete({ where: { id } });
    return { message: 'Post deletado com sucesso' };
  }

  /**
   * Busca post por ID
   */
  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        coauthor: {
          select: { id: true, name: true, email: true },
        },
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    });

    if (!post) {
      throw new ApiError('Post não encontrado', 404);
    }

    return this.formatPost(post);
  }

  /**
   * Busca post por slug
   */
  async findBySlug(slug: string) {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        coauthor: {
          select: { id: true, name: true, email: true },
        },
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    });

    if (!post) {
      throw new ApiError('Post não encontrado', 404);
    }

    return this.formatPost(post);
  }

  /**
   * Lista posts com filtros
   */
  async findAll(filters: PostFilters = {}) {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.authorId) {
      where.authorId = filters.authorId;
    }

    if (filters.categorySlug) {
      where.categories = {
        some: {
          category: {
            slug: filters.categorySlug,
          },
        },
      };
    }

    if (filters.tagSlug) {
      where.tags = {
        some: {
          tag: {
            slug: filters.tagSlug,
          },
        },
      };
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        coauthor: {
          select: { id: true, name: true, email: true },
        },
        categories: {
          include: { category: true },
        },
        tags: {
          include: { tag: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => this.formatPost(post));
  }

  /**
   * Lista apenas posts publicados
   */
  async findPublished(filters: Omit<PostFilters, 'status'> = {}) {
    return this.findAll({ ...filters, status: 'published' });
  }

  /**
   * Formata post com relacionamentos
   */
  private formatPost(post: any) {
    return {
      ...post,
      categories: post.categories?.map((pc: any) => pc.category) || [],
      tags: post.tags?.map((pt: any) => pt.tag) || [],
    };
  }
}

export const postService = new PostService();
