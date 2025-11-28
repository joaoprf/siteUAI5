/**
 * Converte string para slug URL-friendly
 * Exemplo: "Meu Título Aqui" -> "meu-titulo-aqui"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-') // Espaços -> hífens
    .replace(/[^\w\-]+/g, '') // Remove caracteres especiais
    .replace(/\-\-+/g, '-') // Remove hífens duplicados
    .replace(/^-+/, '') // Remove hífen do início
    .replace(/-+$/, ''); // Remove hífen do fim
}

/**
 * Gera slug único adicionando sufixo numérico se necessário
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
