# Backend API - CMS Blog Uai5

API REST em Node.js/Express para o sistema de gerenciamento de conteúdo do blog Uai5.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** - framework web
- **Prisma** - ORM
- **SQLite** - banco de dados (migração futura para PostgreSQL)
- **JWT** - autenticação
- **bcryptjs** - hash de senhas

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## ⚙️ Instalação

1. Entre na pasta do servidor:
```bash
cd server
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:
- `JWT_SECRET` - gere uma string aleatória segura
- `PORT` - porta do servidor (padrão: 3001)
- `FRONTEND_URL` - URL do frontend (padrão: http://localhost:5173)

4. Execute as migrations do Prisma:
```bash
npm run prisma:migrate
```

5. Execute o seed para criar usuário admin e dados iniciais:
```bash
npm run prisma:seed
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### Produção
```bash
npm run build
npm start
```

## 📡 Endpoints

### Health Check
- `GET /health` - verifica se a API está rodando

### Autenticação
- `POST /api/auth/login` - login (retorna JWT)

### Posts (Público)
- `GET /api/posts` - lista posts publicados
- `GET /api/posts/:slug` - detalhes de um post

### Posts (Admin - requer autenticação)
- `GET /api/admin/posts` - lista todos os posts
- `POST /api/admin/posts` - cria novo post
- `GET /api/admin/posts/:id` - detalhes de um post
- `PUT /api/admin/posts/:id` - atualiza post
- `DELETE /api/admin/posts/:id` - deleta post

### Categorias
- `GET /api/categories` - lista categorias
- `POST /api/admin/categories` - cria categoria (admin)
- `PUT /api/admin/categories/:id` - atualiza categoria (admin)
- `DELETE /api/admin/categories/:id` - deleta categoria (admin)

### Tags
- `GET /api/tags` - lista tags
- `POST /api/admin/tags` - cria tag (admin)
- `PUT /api/admin/tags/:id` - atualiza tag (admin)
- `DELETE /api/admin/tags/:id` - deleta tag (admin)

## 🔐 Credenciais Padrão

Após executar o seed:

- **Email:** admin@uaifive.com
- **Senha:** admin123

⚠️ **IMPORTANTE:** Altere a senha em produção!

## 🗄️ Prisma Commands

```bash
# Gerar Prisma Client após alterar o schema
npm run prisma:generate

# Criar nova migration
npm run prisma:migrate

# Abrir Prisma Studio (GUI para o banco)
npm run prisma:studio

# Executar seed novamente
npm run prisma:seed
```

## 📁 Estrutura de Pastas

```
server/
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── seed.ts            # Script de seed
├── src/
│   ├── config/            # Configurações (db, env)
│   ├── middleware/        # Middlewares Express
│   ├── modules/           # Módulos da aplicação
│   │   ├── auth/         # Autenticação
│   │   ├── users/        # Usuários
│   │   ├── posts/        # Posts
│   │   ├── categories/   # Categorias
│   │   └── tags/         # Tags
│   └── index.ts          # Entry point
├── .env                   # Variáveis de ambiente (não versionar)
├── .env.example          # Exemplo de variáveis
├── package.json
└── tsconfig.json
```

## 🔄 Migração SQLite → PostgreSQL

Para migrar para PostgreSQL no futuro:

1. Provisione um servidor PostgreSQL
2. Atualize o `DATABASE_URL` no `.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```
3. Altere o provider no `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
4. Execute as migrations:
```bash
npm run prisma:migrate
```

## 🐛 Debug

Para ver as queries SQL sendo executadas, o Prisma já está configurado para logar em desenvolvimento.

## 📝 Próximos Passos

- [ ] Implementar módulo de autenticação completo
- [ ] Implementar CRUD de posts
- [ ] Implementar upload de imagens
- [ ] Adicionar testes automatizados
- [ ] Documentação Swagger/OpenAPI
