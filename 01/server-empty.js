const {Server} = require('http');

// same as http.createServer((req, res) => ...)
const server = new Server();

server.on('request', (req, res) => {
  // empty
  res.end('hello');
});

server.listen(8000);
