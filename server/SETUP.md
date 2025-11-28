# 🚀 Setup do Backend - Guia Passo a Passo

Este guia irá te orientar na configuração e execução do backend da API do CMS.

---

## ✅ O que foi criado

### Estrutura completa do backend:

```
server/
├── src/
│   ├── config/
│   │   ├── db.ts              # Configuração Prisma
│   │   └── env.ts             # Variáveis de ambiente
│   ├── middleware/
│   │   ├── authMiddleware.ts  # JWT authentication
│   │   └── errorHandler.ts    # Tratamento de erros
│   ├── modules/
│   │   ├── auth/              # Autenticação (login, JWT)
│   │   ├── users/             # Gerenciamento de usuários
│   │   ├── posts/             # CRUD de posts
│   │   ├── categories/        # CRUD de categorias
│   │   └── tags/              # CRUD de tags
│   ├── utils/
│   │   └── slugify.ts         # Geração de slugs
│   └── index.ts               # Entry point
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   └── seed.ts                # Dados iniciais
├── package.json
├── tsconfig.json
└── .env.example
```

### Funcionalidades implementadas:

✅ **Autenticação JWT**
✅ **CRUD completo de Posts** (com autor/coautor automático)
✅ **CRUD de Categorias**
✅ **CRUD de Tags**
✅ **Relacionamentos N:N** (posts ↔ categorias, posts ↔ tags)
✅ **Timestamps automáticos** (created_at, updated_at)
✅ **Geração automática de slugs**
✅ **Validações de dados**
✅ **Tratamento de erros centralizado**

---

## 📦 Passo 1: Instalar Dependências

Abra o terminal na pasta `server/` e execute:

```bash
cd server
npm install
```

Isso instalará todas as dependências listadas no `package.json`.

---

## 🔧 Passo 2: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e configure as variáveis:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="troque-por-uma-chave-secreta-segura"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

⚠️ **IMPORTANTE:** Gere uma chave secreta forte para `JWT_SECRET`!

Você pode gerar uma com Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ Passo 3: Configurar o Banco de Dados

Execute as migrations do Prisma para criar as tabelas:

```bash
npm run prisma:migrate
```

Quando solicitado, dê um nome para a migration (ex: `init`).

---

## 🌱 Passo 4: Popular o Banco com Dados Iniciais

Execute o seed para criar o usuário admin e dados padrão:

```bash
npm run prisma:seed
```

Isso criará:
- ✅ Usuário admin (email: `admin@uaifive.com`, senha: `admin123`)
- ✅ 3 categorias padrão
- ✅ 5 tags padrão

⚠️ **Anote as credenciais!** Você precisará delas para fazer login.

---

## 🏃 Passo 5: Iniciar o Servidor

Execute em modo desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:3001**

Você verá algo assim:
```
✅ Conectado ao banco de dados
🚀 Servidor rodando na porta 3001
🌍 Ambiente: development
📍 Health check: http://localhost:3001/health
```

---

## ✨ Passo 6: Testar a API

### 1. Health Check

Acesse no navegador ou use curl:
```bash
curl http://localhost:3001/health
```

Resposta esperada:
```json
{
  "success": true,
  "message": "API Uai5 Blog rodando!",
  "timestamp": "2024-..."
}
```

### 2. Login

Teste o login com o usuário admin:

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uaifive.com",
    "password": "admin123"
  }'
```

Resposta esperada:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Administrador",
      "email": "admin@uaifive.com",
      "role": "admin"
    }
  }
}
```

**Copie o token!** Você precisará dele para acessar rotas protegidas.

### 3. Criar um Post (rota protegida)

```bash
curl -X POST http://localhost:3001/api/posts/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "Meu Primeiro Post",
    "description": "Descrição do post",
    "contentMarkdown": "# Olá Mundo\n\nEste é meu primeiro post!",
    "status": "published"
  }'
```

### 4. Listar Posts Publicados

```bash
curl http://localhost:3001/api/posts
```

---

## 📚 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário logado (protegido)

### Posts (Público)
- `GET /api/posts` - Lista posts publicados
- `GET /api/posts/:slug` - Detalhes de um post

### Posts (Admin - requer token)
- `GET /api/posts/admin/all` - Lista todos os posts
- `GET /api/posts/admin/:id` - Detalhes de um post
- `POST /api/posts/admin` - Cria post
- `PUT /api/posts/admin/:id` - Atualiza post
- `DELETE /api/posts/admin/:id` - Deleta post

### Categorias
- `GET /api/categories` - Lista categorias
- `POST /api/categories/admin` - Cria categoria (admin)
- `PUT /api/categories/admin/:id` - Atualiza categoria (admin)
- `DELETE /api/categories/admin/:id` - Deleta categoria (admin)

### Tags
- `GET /api/tags` - Lista tags
- `POST /api/tags/admin` - Cria tag (admin)
- `PUT /api/tags/admin/:id` - Atualiza tag (admin)
- `DELETE /api/tags/admin/:id` - Deleta tag (admin)

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor em modo watch

# Build
npm run build            # Compila TypeScript para JavaScript
npm start                # Executa versão compilada

# Prisma
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Cria/aplica migrations
npm run prisma:studio    # Abre GUI do banco de dados
npm run prisma:seed      # Executa seed novamente
```

---

## 🔍 Visualizar o Banco de Dados

Abra o Prisma Studio para ver e editar dados:

```bash
npm run prisma:studio
```

Isso abrirá uma interface web em **http://localhost:5555**

---

## 🐛 Solução de Problemas

### Erro: "Cannot find module '@prisma/client'"
```bash
npm run prisma:generate
```

### Erro: "JWT_SECRET not defined"
Verifique se o arquivo `.env` existe e contém a variável.

### Erro de porta em uso
Mude a `PORT` no `.env` ou mate o processo:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

### Resetar banco de dados
```bash
rm prisma/dev.db
npm run prisma:migrate
npm run prisma:seed
```

---

## ✅ Próximos Passos

Agora que o backend está rodando:

1. **Testar todos os endpoints** com Postman/Insomnia
2. **Criar o front-end admin** (FASE 5 do plano)
3. **Integrar o blog público** com a API (FASE 8)
4. **Migrar posts existentes** do `.md` para o banco (FASE 9)

---

## 📝 Notas Importantes

- **Senha padrão:** Altere a senha do admin após o primeiro login!
- **JWT Secret:** Nunca commite o arquivo `.env` no Git
- **CORS:** Atualize `FRONTEND_URL` quando deployar
- **SQLite:** Para produção, considere migrar para PostgreSQL

---

## 🎉 Tudo Pronto!

Se você chegou até aqui e tudo funcionou, parabéns! 🚀  
O backend do CMS está **completamente funcional**.

Consulte o `README.md` para mais detalhes sobre a arquitetura.
