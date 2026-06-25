import { cpSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outputDir = join(root, '.vercel', 'output')

rmSync(outputDir, { recursive: true, force: true })
mkdirSync(join(outputDir, 'static'), { recursive: true })
mkdirSync(join(outputDir, 'functions', 'index.func'), { recursive: true })

// Serve client assets statically
cpSync(join(root, 'dist', 'client'), join(outputDir, 'static'), { recursive: true })

// Bundle server build into the function
cpSync(join(root, 'dist', 'server'), join(outputDir, 'functions', 'index.func'), { recursive: true })

// ESM support for the function directory
writeFileSync(
  join(outputDir, 'functions', 'index.func', 'package.json'),
  JSON.stringify({ type: 'module' }, null, 2),
)

// Wrapper that converts Node.js req/res to the fetch handler
writeFileSync(
  join(outputDir, 'functions', 'index.func', 'index.js'),
  `import { Readable } from 'node:stream';
import server from './server.js';

export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = \`\${protocol}://\${host}\${req.url}\`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const request = new Request(url, {
    method: req.method,
    headers,
    ...(hasBody ? { body: Readable.toWeb(req), duplex: 'half' } : {}),
  });

  const response = await server.fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.appendHeader(key, value);
  });

  if (response.body) {
    Readable.fromWeb(response.body).pipe(res);
  } else {
    res.end();
  }
}`,
)

writeFileSync(
  join(outputDir, 'functions', 'index.func', '.vc-config.json'),
  JSON.stringify({ runtime: 'nodejs22.x', handler: 'index.js', maxDuration: 10 }, null, 2),
)

writeFileSync(
  join(outputDir, 'config.json'),
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: 'filesystem' },
        { src: '/(.*)', dest: '/index' },
      ],
    },
    null,
    2,
  ),
)

console.log('✓ Vercel output created')
