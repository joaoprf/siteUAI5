import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import authRoutes from '../../modules/auth/auth.routes.js';

/**
 * Testes de integração para autenticação
 * 
 * NOTA: Para executar estes testes, você precisa:
 * 1. Ter o banco de dados configurado
 * 2. Ter executado o seed (npm run prisma:seed)
 * 3. Ter as variáveis de ambiente configuradas
 */

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Integration Tests', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@uaifive.com',
          password: 'admin123',
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty('email', 'admin@uaifive.com');
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@email.com',
          password: 'admin123',
        })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@uaifive.com',
          password: 'wrongpassword',
        })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@uaifive.com',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('GET /api/auth/me', () => {
    let authToken: string;

    beforeAll(async () => {
      // Login para obter token
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@uaifive.com',
          password: 'admin123',
        });

      authToken = response.body.data.token;
    });

    it('should return user data with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data.user).toHaveProperty('email', 'admin@uaifive.com');
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token_here')
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});
