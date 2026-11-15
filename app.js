import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/sketch.js': ['sketch.js', 'text/javascript'],
  '/assets/umbrella.png': ['assets/umbrella.png', 'image/png'],
};

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const entry = files[pathname];

  if (!entry) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const [name, type] = entry;
  try {
    const body = await fs.readFile(path.join(import.meta.dirname, name));
    res.writeHead(200, { 'Content-Type': type });
    res.end(body);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`Could not read ${name}`);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
