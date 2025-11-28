import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Verifica se já existe um usuário admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@uaifive.com' },
  });

  if (existingAdmin) {
    console.log('ℹ️  Usuário admin já existe. Pulando seed de usuários.');
    return;
  }

  // Cria usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@uaifive.com',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Usuário admin criado:', {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  });

  // Cria algumas categorias padrão
  const categorias = [
    { name: 'IA e Automação', slug: 'ia-e-automacao', description: 'Artigos sobre Inteligência Artificial e Automação' },
    { name: 'Chatbots', slug: 'chatbots', description: 'Tudo sobre chatbots e atendimento automatizado' },
    { name: 'Desenvolvimento', slug: 'desenvolvimento', description: 'Desenvolvimento web e tecnologias' },
  ];

  for (const cat of categorias) {
    await prisma.category.create({ data: cat });
  }

  console.log('✅ Categorias padrão criadas');

  // Cria algumas tags padrão
  const tags = [
    { name: 'IA', slug: 'ia' },
    { name: 'WhatsApp', slug: 'whatsapp' },
    { name: 'Automação', slug: 'automacao' },
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'React', slug: 'react' },
  ];

  for (const tag of tags) {
    await prisma.tag.create({ data: tag });
  }

  console.log('✅ Tags padrão criadas');
  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('   Email: admin@uaifive.com');
  console.log('   Senha: admin123');
  console.log('\n⚠️  IMPORTANTE: Altere a senha em produção!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
