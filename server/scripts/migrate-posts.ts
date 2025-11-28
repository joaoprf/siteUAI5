import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import matter from 'gray-matter';

// ES Modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

/**
 * Script para migrar posts .md para o banco de dados
 * 
 * Uso:
 * npx tsx server/scripts/migrate-posts.ts
 */

interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  categories?: string[];
  tags?: string[];
}

async function migratePost(filePath: string, adminUserId: string) {
  const fileName = path.basename(filePath, '.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as PostFrontmatter;

  console.log(`\n📄 Migrando: ${fileName}`);

  try {
    // Verifica se já existe
    const existing = await prisma.post.findUnique({
      where: { slug: fileName },
    });

    if (existing) {
      console.log(`⚠️  Post "${fileName}" já existe no banco. Pulando...`);
      return;
    }

    // Processa categorias
    const categoryIds: string[] = [];
    if (frontmatter.categories && frontmatter.categories.length > 0) {
      for (const catName of frontmatter.categories) {
        const slug = catName.toLowerCase().replace(/\s+/g, '-');
        let category = await prisma.category.findUnique({ where: { slug } });
        
        if (!category) {
          category = await prisma.category.create({
            data: { name: catName, slug },
          });
          console.log(`  ✅ Categoria criada: ${catName}`);
        }
        
        categoryIds.push(category.id);
      }
    }

    // Processa tags
    const tagIds: string[] = [];
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      for (const tagName of frontmatter.tags) {
        const slug = tagName.toLowerCase().replace(/\s+/g, '-');
        let tag = await prisma.tag.findUnique({ where: { slug } });
        
        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName, slug },
          });
          console.log(`  ✅ Tag criada: ${tagName}`);
        }
        
        tagIds.push(tag.id);
      }
    }

    // Cria o post
    const post = await prisma.post.create({
      data: {
        title: frontmatter.title,
        slug: fileName,
        description: frontmatter.description,
        contentMarkdown: content.trim(),
        status: 'published',
        authorId: adminUserId,
        publishedAt: frontmatter.date ? new Date(frontmatter.date) : new Date(),
        categories: {
          create: categoryIds.map((id) => ({ categoryId: id })),
        },
        tags: {
          create: tagIds.map((id) => ({ tagId: id })),
        },
      },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    console.log(`✅ Post migrado com sucesso!`);
    console.log(`   ID: ${post.id}`);
    console.log(`   Categorias: ${post.categories.length}`);
    console.log(`   Tags: ${post.tags.length}`);
  } catch (error) {
    console.error(`❌ Erro ao migrar "${fileName}":`, error);
  }
}

async function main() {
  console.log('🚀 Iniciando migração de posts .md para banco de dados\n');

  try {
    // Busca o usuário admin
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' },
    });

    if (!adminUser) {
      console.error('❌ Nenhum usuário admin encontrado!');
      console.log('💡 Execute o seed primeiro: npm run prisma:seed');
      process.exit(1);
    }

    console.log(`👤 Usando autor: ${adminUser.name} (${adminUser.email})`);

    // Caminho para a pasta de posts
    const postsDir = path.resolve(__dirname, '../../src/posts');

    if (!fs.existsSync(postsDir)) {
      console.error(`❌ Pasta de posts não encontrada: ${postsDir}`);
      process.exit(1);
    }

    // Lista todos os arquivos .md
    const files = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'));

    if (files.length === 0) {
      console.log('⚠️  Nenhum arquivo .md encontrado na pasta src/posts/');
      process.exit(0);
    }

    console.log(`📚 Encontrados ${files.length} arquivo(s) .md\n`);

    // Migra cada post
    for (const file of files) {
      const filePath = path.join(postsDir, file);
      await migratePost(filePath, adminUser.id);
    }

    console.log('\n✅ Migração concluída!');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Verifique os posts em: http://localhost:3001/api/posts');
    console.log('   2. Acesse o painel admin: http://localhost:5173/admin/posts');
    console.log('   3. Opcional: Mova os arquivos .md para uma pasta archive/');
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
