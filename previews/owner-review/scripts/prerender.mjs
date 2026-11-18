import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const root = path.resolve(import.meta.dirname, '..');
process.chdir(root);
const allVariants = ['original','light','mobile'];
const requested = process.env.REFRESH_BUILD_VARIANTS?.split(',').filter(Boolean);
if (requested?.some(v => !allVariants.includes(v))) throw new Error('Unknown REFRESH_BUILD_VARIANTS');
const variants = requested?.length ? requested : allVariants;
const previewRoute = process.env.REFRESH_PREVIEW_ROUTE;
if (previewRoute && (variants.length !== 1 || variants[0] !== 'light' || !/^refresh-owner-review-[a-z0-9-]+$/.test(previewRoute))) throw new Error('Invalid preview route');
const outputRoot = path.join(root, 'dist-static');
await mkdir(outputRoot,{recursive:true});
for (const variant of variants) {
  const route = previewRoute || `refresh-${variant}`;
  process.env.VITE_REFRESH_VARIANT = variant;
  process.env.FIGMA_PUBLIC_URL = `/${route}`;
  const outDir = path.join(outputRoot,route);
  await build({root, build:{outDir,emptyOutDir:true}});
  const serverDir = path.join(root,'.prerender',variant);
  await build({root,publicDir:false,build:{ssr:'src/entry-server.tsx',outDir:serverDir,emptyOutDir:true,rollupOptions:{output:{entryFileNames:'entry-server.mjs'}}}});
  const {render} = await import(pathToFileURL(path.join(serverDir,'entry-server.mjs')).href);
  const template = await readFile(path.join(outDir,'index.html'),'utf8');
  for (const [suffix,lang] of [['','en'],['en','en'],['ru','ru']]) {
    const appHtml = render(lang);
    let html = template.replace(/<html\s+lang="[^"]*"/,`<html lang="${lang}"`)
      .replace(/<title>[\s\S]*?<\/title>/,`<title>${lang==='ru'?'Refresh Clinic — медицинское снижение веса в Дубае':'Refresh Clinic — Medical Weight Loss in Dubai'}</title>`)
      .replace(/<div id="root"><\/div>/,`<div id="root" data-language="${lang}">${appHtml}</div>`);
    html=html.replace(/<meta\s+name="robots"[^>]*>/gi,'');
    html=html.replace(/href="\/refresh-hero-lab\/favicon.png"/g,`href="/${route}/favicon.png"`);
    html=html.replace('<head>','<head><script>document.documentElement.classList.add("js")</script>');
    html=html.replace('</head>','<meta name="robots" content="noindex, nofollow, noarchive" />\n</head>');
    if (!html.includes('data-enhanced="false"') || !html.includes('SLIM Trial') || !html.includes('faq-answer-')) throw new Error(`Incomplete prerender: ${route}/${suffix}`);
    const directory=path.join(outDir,suffix);await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'index.html'),html);
  }
  await writeFile(path.join(outDir,'robots.txt'),'User-agent: *\nDisallow: /\n');
}
console.log(`Prerendered ${variants.length * 3} HTML documents in ${outputRoot}`);
