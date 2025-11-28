# 🎨 Setup do Frontend - Painel Admin

Guia para configurar e usar o painel administrativo do blog Uai5.

---

## ✅ O que foi implementado (FASES 5, 6 e 7)

### **FASE 5: Autenticação** ✅
- ✅ Services de comunicação com API (`api.ts`, `auth.service.ts`)
- ✅ Context de autenticação global (`AuthContext`)
- ✅ Componente de rota privada (`PrivateRoute`)
- ✅ Página de login (`/admin/login`)
- ✅ Persistência de sessão com localStorage

### **FASE 6: Painel de Posts** ✅
- ✅ Dashboard admin (`/admin`)
- ✅ Lista de posts com filtros (`/admin/posts`)
- ✅ Editor de posts completo (`/admin/posts/new` e `/admin/posts/:id/edit`)
- ✅ **Editor Markdown** com preview em tempo real
- ✅ Toolbar de formatação (negrito, itálico, títulos, listas, links, imagens, etc.)
- ✅ Seleção de categorias e tags
- ✅ Geração automática de slugs
- ✅ Status draft/published

### **FASE 7: Gerenciamento de Categorias e Tags** ✅
- ✅ CRUD completo de categorias (`/admin/categories`)
- ✅ CRUD completo de tags (`/admin/tags`)
- ✅ Interface amigável com formulários inline

---

## 📦 Arquivos Criados

### Services (5 arquivos)
- `src/services/api.ts` - Cliente HTTP base
- `src/services/auth.service.ts` - Autenticação
- `src/services/posts.service.ts` - Posts
- `src/services/categories.service.ts` - Categorias
- `src/services/tags.service.ts` - Tags

### Contexts (1 arquivo)
- `src/contexts/AuthContext.tsx` - Estado global de autenticação

### Components (2 arquivos)
- `src/components/PrivateRoute.tsx` - Proteção de rotas
- `src/components/MarkdownEditor.tsx` - Editor Markdown com preview

### Pages Admin (6 arquivos)
- `src/pages/admin/Login.tsx` - Página de login
- `src/pages/admin/Dashboard.tsx` - Dashboard principal
- `src/pages/admin/PostsList.tsx` - Lista de posts
- `src/pages/admin/PostEditor.tsx` - Editor de posts
- `src/pages/admin/CategoriesManager.tsx` - Gerenciar categorias
- `src/pages/admin/TagsManager.tsx` - Gerenciar tags

### Config (1 arquivo)
- `.env.example` - Template de variáveis de ambiente

---

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Copie o `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` se necessário:

```env
VITE_API_URL=http://localhost:3001/api
```

### 2. Certifique-se de que o Backend está rodando

O backend deve estar rodando em `http://localhost:3001`.

Veja o guia em `server/SETUP.md` para instruções.

### 3. Inicie o Frontend

```bash
npm run dev
```

O site estará disponível em: **http://localhost:5173**

---

## 🎯 Fluxo de Uso

### 1. Login

1. Acesse: **http://localhost:5173/admin/login**
2. Use as credenciais:
   - **Email:** admin@uaifive.com
   - **Senha:** admin123
3. Você será redirecionado para `/admin/posts`

### 2. Criar um Post

1. No painel, clique em **"Novo Post"**
2. Preencha:
   - Título (obrigatório)
   - Descrição (obrigatório)
   - Slug (gerado automaticamente, mas editável)
   - Categorias (selecione clicando)
   - Tags (selecione clicando)
   - Conteúdo em Markdown
3. Use a toolbar para formatar:
   - **Negrito**, *Itálico*, `Código`
   - Títulos (H1, H2, H3)
   - Listas, citações
   - Links e imagens
4. Veja o preview em tempo real ao lado
5. Escolha o status:
   - **Rascunho** - não aparece no site público
   - **Publicado** - visível no site
6. Clique em **"Salvar"**

### 3. Editar um Post

1. Na lista de posts, clique no ícone de **editar** (lápis)
2. Faça as alterações
3. Salve
4. O **coautor** será automaticamente definido se você não for o autor original

### 4. Gerenciar Categorias

1. Acesse: **http://localhost:5173/admin/categories**
2. No formulário lateral:
   - Digite o nome da categoria
   - Opcionalmente, adicione uma descrição
   - Clique em **"Criar"**
3. Para editar: clique no ícone de editar
4. Para deletar: clique no ícone de lixeira

### 5. Gerenciar Tags

1. Acesse: **http://localhost:5173/admin/tags**
2. No formulário lateral:
   - Digite o nome da tag (sem #)
   - Clique em **"Criar"**
3. Para editar/deletar: use os ícones que aparecem ao passar o mouse

---

## 📱 Rotas Disponíveis

### Públicas
- `/` - Home
- `/blog` - Lista de posts
- `/blog/:slug` - Post individual
- `/chatbot-whatsapp` - Página chatbot

### Admin (requer login)
- `/admin` - Dashboard
- `/admin/posts` - Lista de posts
- `/admin/posts/new` - Criar post
- `/admin/posts/:id/edit` - Editar post
- `/admin/categories` - Gerenciar categorias
- `/admin/tags` - Gerenciar tags

---

## 🎨 Recursos do Editor Markdown

### Toolbar de Formatação

| Botão | Atalho | Resultado |
|-------|--------|-----------|
| **B** | - | `**negrito**` |
| *I* | - | `*itálico*` |
| `<>` | - | `` `código inline` `` |
| H1 | - | `# Título 1` |
| H2 | - | `## Título 2` |
| H3 | - | `### Título 3` |
| Lista | - | `- item` |
| Lista numerada | - | `1. item` |
| Citação | - | `> citação` |
| Link | - | `[texto](url)` |
| Imagem | - | `![alt](url)` |

### Preview em Tempo Real

- O preview é atualizado automaticamente conforme você digita
- Usa a mesma biblioteca (`marked`) que o blog público
- Mostra exatamente como ficará no site

### Inserção Inteligente

- Se você selecionar texto e clicar em **Negrito**, ele envolve o texto com `**`
- Se não houver seleção, insere um placeholder que você pode substituir

---

## 🔒 Segurança

### JWT Token

- Token armazenado no `localStorage`
- Enviado automaticamente em todas as requisições admin
- Expira em 24 horas (configurável no backend)

### Rotas Protegidas

- Todas as rotas `/admin/*` (exceto login) requerem autenticação
- Se não autenticado, redireciona para `/admin/login`
- Se o token expirar, você precisa fazer login novamente

---

## 🐛 Solução de Problemas

### "Network Error" ao fazer login

- Verifique se o backend está rodando (`http://localhost:3001/health`)
- Verifique a variável `VITE_API_URL` no `.env`
- Verifique o console do navegador para erros CORS

### "Unauthorized" ao acessar rotas admin

- Faça logout e login novamente
- O token pode ter expirado
- Limpe o `localStorage` se necessário

### Preview do Markdown não aparece

- Verifique o console do navegador
- Pode ser erro de sintaxe no Markdown
- Clique no ícone de olho para mostrar/ocultar o preview

### Slugs duplicados

- O backend valida slugs únicos
- Se houver conflito, edite manualmente o slug
- Use o botão "Gerar automaticamente" para criar um novo

---

## 📝 Próximas Melhorias (Opcionais)

### Upload de Imagens
- Atualmente, você precisa usar URLs externas para imagens
- Pode ser implementado um sistema de upload:
  - Arrastar e soltar imagens no editor
  - Upload automático para servidor/CDN
  - Inserção automática da URL no Markdown

### Editor Markdown Avançado
- Substituir o editor atual por um mais completo:
  - `react-markdown-editor-lite`
  - `SimpleMDE`
  - `CodeMirror`
- Recursos adicionais:
  - Syntax highlighting para código
  - Tabelas
  - Emojis
  - Atalhos de teclado (Ctrl+B, Ctrl+I, etc.)

### Dashboard com Estatísticas
- Número total de posts
- Posts publicados vs rascunhos
- Posts mais recentes
- Gráficos de publicações por mês

### Busca e Filtros Avançados
- Busca por título/conteúdo
- Filtro por data de criação
- Filtro por autor
- Ordenação customizada

---

## ✅ Status Atual

| Funcionalidade | Status |
|----------------|--------|
| Login/Logout | ✅ Completo |
| Dashboard | ✅ Completo |
| Criar Post | ✅ Completo |
| Editar Post | ✅ Completo |
| Deletar Post | ✅ Completo |
| Editor Markdown | ✅ Completo |
| Preview Markdown | ✅ Completo |
| Categorias | ✅ Completo |
| Tags | ✅ Completo |
| Autor/Coautor automático | ✅ Completo |
| Timestamps automáticos | ✅ Completo |
| Validações | ✅ Completo |
| Rotas protegidas | ✅ Completo |

---

## 🎉 Conclusão

O painel admin está **100% funcional**!

Você pode:
- ✅ Fazer login
- ✅ Criar, editar e deletar posts
- ✅ Escrever em Markdown com preview
- ✅ Gerenciar categorias e tags
- ✅ Publicar ou salvar como rascunho

**Próxima fase:** Integrar o blog público com a API (FASE 8) para consumir os posts do banco em vez dos arquivos `.md`.
