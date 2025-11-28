# 🧪 Testes Automatizados - Guia Completo

Este guia explica como executar e criar testes para o backend da API.

---

## 📋 Tipos de Testes

### 1. **Testes Unitários** (`__tests__/utils/`)
Testam funções e utilitários isoladamente.

**Exemplo:** `slugify.test.ts`
- Testa a função `slugify`
- Testa a geração de slugs únicos
- Rápidos e sem dependências externas

### 2. **Testes de Integração** (`__tests__/integration/`)
Testam endpoints da API com requisições reais.

**Exemplo:** `auth.test.ts`
- Testa login
- Testa autenticação com JWT
- Requer banco de dados configurado

### 3. **Testes E2E** (Futuros)
Testam fluxos completos da aplicação usando Playwright ou Cypress.

---

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
cd server
npm test
```

### Executar em modo watch (auto-reload)
```bash
npm run test:watch
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

O relatório será gerado em `server/coverage/`

---

## ⚙️ Pré-requisitos para Testes de Integração

Os testes de integração precisam do banco de dados configurado:

```bash
# 1. Configure o .env
cp .env.example .env

# 2. Execute as migrations
npm run prisma:migrate

# 3. Execute o seed (cria usuário admin)
npm run prisma:seed

# 4. Execute os testes
npm test
```

---

## 📝 Criar Novos Testes

### Teste Unitário

Crie um arquivo `*.test.ts` em `src/__tests__/utils/`:

```typescript
import { describe, it, expect } from '@jest/globals';
import { myFunction } from '../../utils/myUtil.js';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

### Teste de Integração

Crie um arquivo `*.test.ts` em `src/__tests__/integration/`:

```typescript
import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import myRoutes from '../../modules/my-module/my.routes.js';

const app = express();
app.use(express.json());
app.use('/api/my-route', myRoutes);

describe('My API Tests', () => {
  it('should return data', async () => {
    const response = await request(app)
      .get('/api/my-route')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });
});
```

---

## 🎯 Boas Práticas

### 1. **Nomenclatura**
- Use nomes descritivos: `should return 404 when post not found`
- Organize em blocos `describe` por funcionalidade

### 2. **Isolamento**
- Cada teste deve ser independente
- Não dependa da ordem de execução
- Use `beforeAll` e `afterAll` para setup/cleanup

### 3. **Cobertura**
- Teste casos de sucesso E erro
- Teste edge cases (valores vazios, nulos, etc.)
- Teste validações

### 4. **Mocking**
- Mock dependências externas (API, banco de dados)
- Use factories para criar dados de teste

---

## 📊 Exemplo de Estrutura de Testes

```
src/
└── __tests__/
    ├── README.md                    # Este arquivo
    ├── utils/                       # Testes unitários
    │   ├── slugify.test.ts
    │   └── validators.test.ts
    ├── integration/                 # Testes de integração
    │   ├── auth.test.ts
    │   ├── posts.test.ts
    │   ├── categories.test.ts
    │   └── tags.test.ts
    └── e2e/                         # Testes E2E (futuros)
        └── blog-flow.test.ts
```

---

## 🛠️ Comandos Úteis

```bash
# Executar testes específicos
npm test slugify

# Executar testes com verbose
npm test -- --verbose

# Executar apenas testes de integração
npm test integration

# Limpar cache do Jest
npm test -- --clearCache

# Ver cobertura no navegador
npm run test:coverage
# Abra: coverage/lcov-report/index.html
```

---

## ✅ Checklist de Testes

Antes de considerar um módulo completo, certifique-se de ter:

- [ ] Testes unitários para funções/utils
- [ ] Testes de integração para endpoints
- [ ] Testes de casos de erro
- [ ] Testes de validação
- [ ] Cobertura > 80%

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
npm run prisma:generate
npm install
```

### Erro: "User not found" nos testes
```bash
npm run prisma:seed
```

### Testes travando
- Verifique se o banco está acessível
- Verifique variáveis de ambiente
- Use `--detectOpenHandles` para debugar

---

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Próximos passos:**
1. Adicionar mais testes de integração (posts, categories, tags)
2. Implementar testes E2E com Playwright
3. Adicionar CI/CD com GitHub Actions
