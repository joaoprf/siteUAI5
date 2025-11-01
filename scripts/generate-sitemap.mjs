/**
 * Generate sitemap.xml for Uai5 (run at build or manually).
 * Usage: node scripts/generate-sitemap.mjs
 */
import { promises as fs } from 'node:fs';
import { globby } from 'globby';
import path from 'node:path';

const site = 'https://uaifive.com';

async function getBlogRoutes() {
  const mdFiles = await globby('src/posts/*.md');
  return mdFiles.map((f) => {
    const slug = path.basename(f, '.md');
    return `/blog/${slug}`;
  });
}

function url(loc, priority='0.7') {
  return `<url><loc>${site}${loc}</loc><priority>${priority}</priority></url>`;
}

async function main() {
  const staticRoutes = ['/', '/blog'];
  const blogRoutes = await getBlogRoutes();
  const routes = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => url(r, r==='/'?'1.0':'0.8')).join('\n')}
</urlset>`;

  await fs.mkdir('public', { recursive: true });
  await fs.writeFile('public/sitemap.xml', xml, 'utf8');
  console.log('✅ sitemap.xml generated with', routes.length, 'routes');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
