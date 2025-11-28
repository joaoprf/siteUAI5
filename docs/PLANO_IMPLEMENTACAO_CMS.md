# Plano de Implementação do CMS para Blog Uai5

**Data de criação:** 25/11/2025  
**Objetivo:** Adicionar um sistema de gerenciamento de conteúdo (CMS) ao site Uai5, permitindo login, criação, edição e publicação de artigos do blog através de uma interface administrativa, mantendo o formato Markdown e armazenando tudo em banco de dados.

---

## 📋 Visão Geral

### Estado Atual
- Blog estático que lê arquivos `.md` da pasta `src/posts/`
- Front-end: React + TypeScript + Vite + React Router
- Posts com frontmatter YAML (title, date, description)
- Renderização com `gray-matter` + `marked`

### Estado Futuro
- Backend Node.js/Express com API REST
- Banco de dados SQLite (migração futura para PostgreSQL)
- Painel administrativo integrado ao site
- Editor Markdown com preview
- Controle de autor/coautor e timestamps automáticos
- Sistema de categorias e tags/hashtags
- Autenticação JWT

---

## 🗂️ Estrutura de Pastas

```
siteUAI5/
├── src/                    # Front-end React (já existe)
│   ├── components/
│   ├── pages/
│   │   └── admin/         # 🆕 Páginas administrativas
│   ├── contexts/          # 🆕 Context de autenticação
│   └── services/          # 🆕 Chamadas à API
├── server/                # 🆕 Backend Node.js
│   ├── src/
│   │   ├── index.ts
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── posts/
│   │   │   ├── categories/
│   │   │   └── tags/
│   │   ├── middleware/
│   │   └── utils/
│   ├── prisma/            # 🆕 Schema e migrations
│   ├── package.json       # 🆕 Dependências do servidor
│   └── tsconfig.json      # 🆕 Config TypeScript do servidor
└── docs/                  # Documentação
```

---

## 📊 Modelo de Dados

### Tabelas

- **users**: id, name, email, password_hash, role, created_at, updated_at
- **posts**: id, slug, title, description, content_markdown, status, published_at, author_id, coauthor_id, created_at, updated_at
- **categories**: id, name, slug, description, created_at, updated_at
- **tags**: id, name, slug, created_at, updated_at
- **posts_categories**: post_id, category_id (N:N)
- **posts_tags**: post_id, tag_id (N:N)

---

## ✅ Checklist de Implementação

### FASE 1: Setup Inicial do Backend

#### 1.1. Configuração do Projeto Backend
- [ ] Criar pasta `server/` na raiz do projeto
- [ ] Inicializar `package.json` no servidor
- [ ] Instalar dependências principais
- [ ] Criar `tsconfig.json` do servidor
- [ ] Criar `.env` com variáveis (DATABASE_URL, JWT_SECRET, PORT, NODE_ENV)
- [ ] Adicionar `.env` ao `.gitignore`

#### 1.2. Configuração do Prisma
- [ ] Inicializar Prisma com SQLite
- [ ] Criar schema no `prisma/schema.prisma` com todas as tabelas
- [ ] Gerar primeira migration
- [ ] Gerar Prisma Client

#### 1.3. Estrutura Base do Servidor
- [ ] Criar `server/src/index.ts` (bootstrap do Express)
- [ ] Criar `server/src/config/db.ts` (cliente Prisma)
- [ ] Criar `server/src/config/env.ts` (validação de env vars)
- [ ] Configurar CORS
- [ ] Configurar body parser (JSON)
- [ ] Criar middleware de error handling
- [ ] Testar servidor básico rodando

---

### FASE 2: Módulo de Autenticação

#### 2.1. Model e Service de Usuários
- [ ] Criar `server/src/modules/users/user.model.ts`
- [ ] Criar `server/src/modules/users/user.service.ts`

#### 2.2. Autenticação JWT
- [ ] Criar `server/src/modules/auth/auth.service.ts`
- [ ] Criar `server/src/modules/auth/auth.controller.ts`
- [ ] Criar `server/src/modules/auth/auth.routes.ts`
- [ ] Criar `server/src/middleware/authMiddleware.ts`

#### 2.3. Seed de Usuário Admin
- [ ] Criar script `prisma/seed.ts`
- [ ] Adicionar primeiro usuário admin
- [ ] Executar seed

#### 2.4. Testes de Autenticação
- [ ] Testar `POST /api/auth/login` 
- [ ] Verificar geração de token JWT
- [ ] Testar middleware de autenticação

---

### FASE 3: CRUD de Posts (Backend)

#### 3.1. Model e Service de Posts
- [ ] Criar `server/src/modules/posts/post.model.ts`
- [ ] Criar `server/src/modules/posts/post.service.ts`

#### 3.2. Utilitários
- [ ] Criar `server/src/utils/slugify.ts`
- [ ] Criar validações de dados

#### 3.3. Rotas Públicas de Posts
- [ ] `GET /api/posts` - listar posts publicados
- [ ] `GET /api/posts/:slug` - detalhes de um post publicado

#### 3.4. Rotas Admin de Posts
- [ ] `GET /api/admin/posts` - listar todos
- [ ] `POST /api/admin/posts` - criar post
- [ ] `GET /api/admin/posts/:id` - detalhe completo
- [ ] `PUT /api/admin/posts/:id` - atualizar post
- [ ] `DELETE /api/admin/posts/:id` - deletar post

#### 3.5. Testes de API de Posts
- [ ] Testar criação de post via API
- [ ] Testar atualização (verificar coautor e updated_at)
- [ ] Testar listagem pública vs admin
- [ ] Testar busca por slug

---

### FASE 4: Categorias e Tags (Backend)

#### 4.1. Model e Service de Categorias
- [ ] Criar `server/src/modules/categories/category.model.ts`
- [ ] Criar `server/src/modules/categories/category.service.ts`
- [ ] Criar rotas públicas e admin

#### 4.2. Model e Service de Tags
- [ ] Criar `server/src/modules/tags/tag.model.ts`
- [ ] Criar `server/src/modules/tags/tag.service.ts`
- [ ] Criar rotas públicas e admin

#### 4.3. Relacionamentos
- [ ] Implementar associação de categorias ao criar/editar post
- [ ] Implementar associação de tags ao criar/editar post
- [ ] Testar inclusão de categorias/tags nas queries

---

### FASE 5: Front-End - Autenticação

#### 5.1. Configuração de Services
- [ ] Criar `src/services/api.ts`
- [ ] Criar `src/services/auth.service.ts`

#### 5.2. Context de Autenticação
- [ ] Criar `src/contexts/AuthContext.tsx`
- [ ] Envolver app com `AuthProvider`

#### 5.3. Componentes de Autenticação
- [ ] Criar `src/pages/admin/Login.tsx`
- [ ] Criar `src/components/PrivateRoute.tsx`

#### 5.4. Rotas de Admin
- [ ] Adicionar rotas no `main.tsx`

---

### FASE 6: Front-End - Painel de Posts

#### 6.1. Service de Posts
- [ ] Criar `src/services/posts.service.ts`

#### 6.2. Lista de Posts Admin
- [ ] Criar `src/pages/admin/PostsList.tsx`

#### 6.3. Editor de Posts - Estrutura Base
- [ ] Criar `src/pages/admin/PostEditor.tsx`

#### 6.4. Editor Markdown
- [ ] Implementar textarea com preview lado a lado
- [ ] Toolbar com botões de formatação
- [ ] Funções de inserção de sintaxe Markdown
- [ ] Identação automática para código

#### 6.5. Upload de Imagens
- [ ] Criar endpoint `POST /api/upload/image` (backend)
- [ ] Botão "Upload Imagem" no editor
- [ ] Inserir URL da imagem no Markdown após upload

#### 6.6. Integração Create/Update
- [ ] Ao salvar: POST ou PUT para API
- [ ] Feedback de sucesso/erro
- [ ] Redirecionamento após salvar

---

### FASE 7: Categorias e Tags (Front-End)

#### 7.1. Services
- [ ] Criar `src/services/categories.service.ts`
- [ ] Criar `src/services/tags.service.ts`

#### 7.2. Gerenciamento de Categorias
- [ ] Criar `src/pages/admin/CategoriesList.tsx`
- [ ] Criar modal/form para criar/editar categoria

#### 7.3. Gerenciamento de Tags
- [ ] Criar `src/pages/admin/TagsList.tsx`
- [ ] Criar modal/form para criar/editar tag

#### 7.4. Seletores no Editor
- [ ] Componente multi-select para categorias
- [ ] Componente de input com chips para tags

---

### FASE 8: Integração Blog Público com API

#### 8.1. Atualizar Blog.tsx
- [ ] Remover `import.meta.glob` dos arquivos `.md`
- [ ] Chamar `GET /api/posts` para listar posts publicados
- [ ] Manter layout e SEO existentes

#### 8.2. Atualizar BlogPost.tsx
- [ ] Remover import de `.md`
- [ ] Chamar `GET /api/posts/:slug`
- [ ] Continuar usando `marked` para renderizar HTML
- [ ] Exibir autor, data, categorias e tags

#### 8.3. Navegação por Categorias/Tags
- [ ] Criar `src/pages/BlogCategory.tsx`
- [ ] Criar `src/pages/BlogTag.tsx`
- [ ] Adicionar rotas
- [ ] Links de categorias/tags nos posts

---

### FASE 9: Migração de Dados

#### 9.1. Script de Migração
- [ ] Criar `scripts/migrate-posts-to-db.ts`
- [ ] Ler arquivos `.md` de `src/posts/`
- [ ] Inserir no banco via Prisma

#### 9.2. Backup
- [ ] Fazer backup dos arquivos `.md` originais
- [ ] Versionar no Git antes da migração

#### 9.3. Executar Migração
- [ ] Rodar script
- [ ] Validar posts no banco
- [ ] Testar blog público com novos dados

#### 9.4. Limpeza
- [ ] Mover `.md` antigos para pasta `archive/`

---

### FASE 10: Melhorias e Refinamentos

#### 10.1. UI/UX do Admin
- [ ] Layout responsivo para o painel
- [ ] Menu de navegação admin
- [ ] Dashboard com estatísticas
- [ ] Loading states e spinners
- [ ] Mensagens de confirmação

#### 10.2. Validações e Segurança
- [ ] Validar unicidade de slugs
- [ ] Sanitizar HTML gerado do Markdown
- [ ] Rate limiting no endpoint de login
- [ ] HTTPS em produção

#### 10.3. SEO e Performance
- [ ] Manter componente `Seo` atualizado
- [ ] Meta tags Open Graph
- [ ] Sitemap dinâmico
- [ ] Lazy loading de imagens
- [ ] Cache de posts no front

#### 10.4. Testes
- [ ] Testes unitários backend (Jest)
- [ ] Testes de integração da API
- [ ] Testes E2E do painel admin (opcional)

---

### FASE 11: Deploy e Produção

#### 11.1. Backend
- [ ] Configurar variáveis de ambiente de produção
- [ ] Deploy do servidor
- [ ] Configurar banco de dados em produção
- [ ] Rodar migrations em produção
- [ ] Seed do usuário admin em produção

#### 11.2. Frontend
- [ ] Atualizar URLs da API
- [ ] Build do front
- [ ] Deploy do build

#### 11.3. Domínio e SSL
- [ ] Configurar domínio para o backend
- [ ] Certificado SSL (Let's Encrypt)
- [ ] Testar HTTPS

#### 11.4. Monitoramento
- [ ] Logs de erro (Winston, Sentry)
- [ ] Monitoramento de uptime
- [ ] Backup automático do banco

---

## 🔄 Migração SQLite → PostgreSQL (Futuro)

Quando necessário:

- [ ] Provisionar servidor PostgreSQL
- [ ] Atualizar `DATABASE_URL` no `.env`
- [ ] Atualizar provider no `schema.prisma` para `postgresql`
- [ ] Rodar migrations no novo banco
- [ ] Migrar dados do SQLite para PostgreSQL
- [ ] Testar aplicação completa
- [ ] Atualizar backup strategy

---

## 📝 Observações Importantes

### Controle de Autoria
- **Autor**: definido automaticamente na criação do post (usuário logado)
- **Coautor**: definido automaticamente quando outro usuário edita o post
- **Timestamps**: `created_at` e `updated_at` são gerenciados pelo banco

### Status de Posts
- **draft**: rascunho (não aparece no site público)
- **published**: publicado (visível no site)

### Slugs
- Gerados automaticamente a partir do título
- Podem ser editados manualmente
- Devem ser únicos no banco

### Markdown
- Conteúdo armazenado em texto puro no banco
- Renderizado no front com `marked`
- Preview em tempo real no editor

---

## 🚀 Próximos Passos

1. Revisar este plano e ajustar conforme necessário
2. Começar pela **FASE 1** (Setup Backend)
3. Implementar fase a fase, testando cada funcionalidade
4. Documentar problemas e soluções encontradas
5. Fazer commits frequentes com mensagens descritivas

---

**Última atualização:** 25/11/2025
