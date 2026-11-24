const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8'
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/songs') {
    const songsDir = path.join(root, 'songs');
    const songs = fs.readdirSync(songsDir, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.mp3'))
      .map(entry => entry.name)
      .sort((a, b) => a.localeCompare(b, 'es'));
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify(songs));
  }
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(file).toLowerCase();
    const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': ext === '.mp3' ? 'public, max-age=3600' : 'no-cache' };
    const range = req.headers.range;
    if (ext === '.mp3' && range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (match) {
        const start = match[1] ? Number(match[1]) : 0;
        const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
        if (start <= end && start < stat.size) {
          res.writeHead(206, { ...headers, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 });
          return fs.createReadStream(file, { start, end }).pipe(res);
        }
      }
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
      return res.end();
    }
    headers['Content-Length'] = stat.size;
    if (ext === '.mp3') headers['Accept-Ranges'] = 'bytes';
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  });
});
server.listen(port, '0.0.0.0', () => console.log(`CHICAGO Football Manager listo en http://localhost:${port}`));
