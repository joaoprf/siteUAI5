import { config } from 'dotenv';

// Carrega variáveis de ambiente
config();

// Validação de variáveis obrigatórias
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variável de ambiente ${envVar} não foi definida`);
  }
}

// Exporta configurações
export const env = {
  database: {
    url: process.env.DATABASE_URL!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  server: {
    port: parseInt(process.env.PORT || '3001'),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
};
