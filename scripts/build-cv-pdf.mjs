// Genera public/cv-{es,en,ca}.pdf a partir de las páginas /{lang}/cv-print/ ya compiladas en dist/.
// Uso: npm run cv:pdf (compila la web y después ejecuta este script).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const outDir = path.join(root, 'public');
const langs = ['es', 'en', 'ca'];

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  for (const name of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try {
      return execFileSync('which', [name], { encoding: 'utf8' }).trim();
    } catch {}
  }
  throw new Error('No se encuentra Chrome ni Chromium. Define CHROME_BIN con la ruta del ejecutable.');
}

// Servidor estático mínimo: la página usa rutas absolutas (/_astro/...), que no funcionarían con file://.
const server = createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.join(dist, urlPath);
  if (!file.startsWith(dist)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404).end();
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const chrome = findChrome();
let failed = false;

try {
  for (const lang of langs) {
    const target = path.join(outDir, `cv-${lang}.pdf`);
    // Asíncrono: el servidor de este mismo proceso tiene que seguir atendiendo a Chrome.
    await run(
      chrome,
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--no-pdf-header-footer',
        '--virtual-time-budget=5000',
        `--print-to-pdf=${target}`,
        `http://127.0.0.1:${port}/${lang}/cv-print/`,
      ],
      { timeout: 60000 },
    );
    const pdf = (await readFile(target)).toString('latin1');
    const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    if (pages !== 1) {
      failed = true;
      console.error(`cv-${lang}.pdf tiene ${pages} páginas; el CV debe caber en 1. Reduce el contenido de src/data/cv.ts.`);
    } else {
      console.log(`cv-${lang}.pdf generado (1 página)`);
    }
  }
} finally {
  server.close();
}

if (failed) process.exit(1);
