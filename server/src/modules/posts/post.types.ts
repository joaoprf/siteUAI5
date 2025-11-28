// Tipos relacionados a posts

export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentMarkdown: string;
  status: 'draft' | 'published';
  publishedAt: Date | null;
  authorId: string;
  coauthorId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDTO {
  title: string;
  description: string;
  contentMarkdown: string;
  slug?: string;
  status?: 'draft' | 'published';
  categoryIds?: string[];
  tagIds?: string[];
}

export interface UpdatePostDTO {
  title?: string;
  description?: string;
  contentMarkdown?: string;
  slug?: string;
  status?: 'draft' | 'published';
  categoryIds?: string[];
  tagIds?: string[];
}

export interface PostFilters {
  status?: 'draft' | 'published';
  categorySlug?: string;
  tagSlug?: string;
  authorId?: string;
}

export interface PostWithRelations extends Post {
  author: {
    id: string;
    name: string;
    email: string;
  };
  coauthor?: {
    id: string;
    name: string;
    email: string;
  } | null;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}
