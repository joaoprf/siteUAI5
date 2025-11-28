import { PrismaClient } from '@prisma/client';

// Instância única do Prisma Client
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Função para conectar ao banco
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

// Função para desconectar do banco
export async function disconnectDatabase() {
  await prisma.$disconnect();
  console.log('🔌 Desconectado do banco de dados');
}

// Tratamento de encerramento gracioso
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});
