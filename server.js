const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const markerPath = path.join(__dirname, 'marker.txt');

async function marker() {
  return (await readFile(markerPath, 'utf8')).trimEnd();
}

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET') {
    response.writeHead(405, { Allow: 'GET' });
    response.end('Method Not Allowed\n');
    return;
  }

  if (request.url === '/' || request.url === '/marker') {
    try {
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(`${await marker()}\n`);
    } catch (error) {
      console.error('Unable to read marker.txt', error);
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('marker unavailable\n');
    }
    return;
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not Found\n');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});

