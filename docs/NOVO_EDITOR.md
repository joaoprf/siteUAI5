# 🎨 Novo Editor de Markdown - Guia de Recursos

Melhorias implementadas no editor de posts do CMS Uai5.

---

## ✨ Novos Recursos

### 1. **Upload de Imagens** 📤

Agora você pode fazer upload de imagens diretamente do seu computador!

**Como usar:**
1. Clique no ícone de **Upload** (seta para cima) na toolbar
2. Selecione uma imagem do seu computador
3. A imagem será enviada para o servidor
4. O Markdown será inserido automaticamente: `![nome-da-imagem](url-completa)`

**Formatos suportados:**
- JPG/JPEG
- PNG
- GIF
- WebP

**Tamanho máximo:** 5MB por imagem

**Onde as imagens são salvas:**
- Servidor: pasta `server/uploads/`
- URL pública: `http://localhost:3001/uploads/nome-da-imagem.jpg`

---

### 2. **Inserir Imagem por URL** 🔗

Além do upload, você também pode inserir imagens usando uma URL externa.

**Como usar:**
1. Clique no ícone de **Imagem** (quadro com montanha) na toolbar
2. Um modal será aberto
3. Digite a URL da imagem
4. Clique em **Inserir**
5. O Markdown será adicionado: `![Descrição da imagem](url)`

**Exemplo de URLs:**
- `https://exemplo.com/imagem.jpg`
- `https://cdn.example.com/foto.png`

---

### 3. **Layout Flexível do Preview** 🔄

Escolha como visualizar o preview do Markdown:

#### **Preview ao Lado** (padrão)
- Editor e preview lado a lado
- Ideal para telas grandes
- Altura: 500px

#### **Preview Abaixo**
- Preview embaixo do editor
- Ideal para telas menores ou foco no texto
- Editor: 300px, Preview: 300px

**Como alternar:**
- Clique no ícone de **Layout** (grade ou painel) na toolbar
- Grade = Preview ao lado
- Painel = Preview abaixo

---

### 4. **Área de Edição Maior** 📏

**Antes:**
- Área de edição pequena e fixa

**Agora:**
- **Preview ao lado:** 500px de altura
- **Preview abaixo:** 300px para editor + 300px para preview
- Campo redimensionável verticalmente (arraste o canto)

---

## 🎯 Toolbar Completa

### Formatação de Texto
- **B** - Negrito (`**texto**`)
- **I** - Itálico (`*texto*`)
- **<>** - Código inline (`` `código` ``)

### Títulos
- **H1** - Título nível 1 (`# Título`)
- **H2** - Título nível 2 (`## Título`)
- **H3** - Título nível 3 (`### Título`)

### Listas
- **≡** - Lista com marcadores (`- item`)
- **1.** - Lista numerada (`1. item`)

### Elementos Especiais
- **"** - Citação (`> citação`)
- **🔗** - Link (`[texto](url)`)
- **🖼️** - Imagem por URL
- **⬆️** - Upload de Imagem

### Controles de Visualização
- **👁️ / 👁️‍🗨️** - Mostrar/Ocultar preview
- **☷ / ▦** - Alternar layout (lado/abaixo)

---

## 💡 Dicas de Uso

### 1. Seleção Inteligente
Se você selecionar texto antes de clicar em um botão da toolbar, o texto selecionado será formatado automaticamente.

**Exemplo:**
1. Digite: `meu texto importante`
2. Selecione: `importante`
3. Clique em **B** (negrito)
4. Resultado: `meu texto **importante**`

### 2. Upload Rápido
Enquanto a imagem está sendo enviada, o ícone de upload mostra um spinner animado. Aguarde o upload completar antes de fazer outro.

### 3. Preview em Tempo Real
O preview é atualizado instantaneamente conforme você digita, usando a mesma biblioteca (`marked`) que renderiza o blog público.

### 4. Contador de Caracteres
Abaixo do editor, você vê quantos caracteres já digitou.

### 5. Erros de Upload
Se houver erro no upload (arquivo muito grande, tipo inválido, etc.), uma mensagem vermelha aparece abaixo da toolbar.

---

## 🔧 Configuração Backend

### Endpoint de Upload

```
POST /api/upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- image: (arquivo)
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "url": "/uploads/nome-1234567890.jpg",
    "filename": "nome-1234567890.jpg",
    "originalName": "foto.jpg",
    "size": 102400,
    "mimetype": "image/jpeg"
  }
}
```

### Arquivos Criados

**Backend:**
- `server/src/modules/upload/upload.controller.ts` - Controller de upload
- `server/src/modules/upload/upload.routes.ts` - Rotas de upload
- `server/uploads/` - Pasta onde as imagens são salvas

**Frontend:**
- `src/services/upload.service.ts` - Service de upload
- `src/components/MarkdownEditor.tsx` - Editor melhorado

---

## 🚀 Como Testar

### 1. Iniciar o backend
```bash
cd server
npm run dev
```

### 2. Iniciar o frontend
```bash
# Na raiz
npm run dev
```

### 3. Criar um post
1. Acesse: http://localhost:5173/admin/posts/new
2. Preencha título e descrição
3. No editor:
   - **Teste upload:** Clique no ícone de upload e selecione uma imagem
   - **Teste URL:** Clique no ícone de imagem e insira uma URL
   - **Teste layout:** Alterne entre preview ao lado e abaixo
4. Veja o preview atualizar em tempo real
5. Salve o post
6. Visualize no blog público

---

## 📸 Exemplos de Uso

### Upload de Imagem

```markdown
![screenshot-1701234567890](http://localhost:3001/uploads/screenshot-1701234567890.png)
```

### Imagem Externa

```markdown
![Logo do Site](https://exemplo.com/logo.png)
```

### Post Completo com Imagens

```markdown
# Tutorial: Como Criar um Chatbot

## Introdução

Neste tutorial, vamos criar um chatbot incrível!

![Arquitetura do Chatbot](http://localhost:3001/uploads/arquitetura.png)

## Passo 1: Setup

Primeiro, instale as dependências:

\`\`\`bash
npm install
\`\`\`

![Terminal](http://localhost:3001/uploads/terminal.jpg)

## Resultado Final

![Chatbot em Ação](https://cdn.exemplo.com/demo.gif)
```

---

## ⚠️ Limitações e Observações

### Tamanho de Arquivo
- Máximo: **5MB** por imagem
- Se precisar de imagens maiores, edite em `server/src/modules/upload/upload.routes.ts`:
  ```typescript
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
  ```

### Tipos de Arquivo
- Apenas imagens: JPG, PNG, GIF, WebP
- Não suporta: PDF, DOCX, MP4, etc.

### Armazenamento
- Imagens são salvas localmente em `server/uploads/`
- Para produção, considere usar:
  - **AWS S3**
  - **Cloudinary**
  - **ImgBB**
  - **Cloudflare Images**

### Nomes de Arquivo
- São gerados automaticamente: `nome-timestamp-random.ext`
- Exemplo: `minha-foto-1701234567890-123456789.jpg`
- Isso evita conflitos de nomes

---

## 🎉 Resultado Final

Agora você tem um editor profissional com:
- ✅ Upload de imagens
- ✅ Inserção por URL
- ✅ Preview em tempo real
- ✅ Layout flexível
- ✅ Área de edição maior
- ✅ Toolbar completa
- ✅ Feedback visual

**Aproveite o novo editor! 🚀**
