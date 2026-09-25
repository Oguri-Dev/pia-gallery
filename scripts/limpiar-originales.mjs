// Después del build: elimina de dist/_astro las fotos originales que ninguna página usa
// (Astro las copia igual, pero el sitio solo sirve las versiones WebP optimizadas).
import { readdir, readFile, rm, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

async function archivos(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await archivos(p)));
    else out.push(p);
  }
  return out;
}

const todos = await archivos(dist);
const textos = todos.filter((f) => ['.html', '.css', '.js', '.xml', '.json'].includes(extname(f)));
let contenido = '';
for (const f of textos) contenido += await readFile(f, 'utf8');

let borrados = 0, bytes = 0;
for (const f of todos) {
  if (!f.includes('/_astro/') || !/\.(jpe?g|png)$/i.test(f)) continue;
  const nombre = f.split('/').pop();
  if (!contenido.includes(nombre)) {
    bytes += (await stat(f)).size;
    await rm(f);
    borrados++;
  }
}
console.log(`limpieza: ${borrados} originales sin uso eliminados (${(bytes / 1e6).toFixed(1)} MB)`);
