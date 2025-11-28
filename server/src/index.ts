import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Inicializa o app Express
const app = express();

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================
app.use(cors({
  origin: env.cors.origin,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROTAS
// ============================================

// Importação de rotas
import authRoutes from './modules/auth/auth.routes.js';
import postRoutes from './modules/posts/post.routes.js';
import categoryRoutes from './modules/categories/category.routes.js';
import tagRoutes from './modules/tags/tag.routes.js';

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'API Uai5 Blog rodando!',
    timestamp: new Date().toISOString(),
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

// ============================================
// TRATAMENTO DE ERROS
// ============================================
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================
async function startServer() {
  try {
    // Conecta ao banco de dados
    await connectDatabase();

    // Inicia o servidor
    app.listen(env.server.port, () => {
      console.log(`🚀 Servidor rodando na porta ${env.server.port}`);
      console.log(`🌍 Ambiente: ${env.server.nodeEnv}`);
      console.log(`📍 Health check: http://localhost:${env.server.port}/health`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();
