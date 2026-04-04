import { promises as fs } from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

/**
 * Rewrites root-local URLs to relative URLs for static hosting under subpaths.
 * Keeps external protocols and hash/mailto/tel links untouched.
 */
function rewriteContent(content, ext) {
  let output = content;

  if (ext === '.html') {
    output = output
      .replace(/(href|src)="\/\.\//g, '$1="./')
      .replace(/(href|src)="\/(?!\/|#|[a-zA-Z][a-zA-Z\d+\-.]*:)/g, '$1="./');
  }

  if (ext === '.css') {
    output = output.replace(/url\(\/(?!\/|#|[a-zA-Z][a-zA-Z\d+\-.]*:)/g, 'url(./');
  }

  return output;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name);
    if (ext !== '.html' && ext !== '.css') continue;

    const original = await fs.readFile(fullPath, 'utf8');
    const rewritten = rewriteContent(original, ext);
    if (rewritten !== original) {
      await fs.writeFile(fullPath, rewritten, 'utf8');
    }
  }
}

await walk(DIST_DIR);
