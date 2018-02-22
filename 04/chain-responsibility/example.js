const WebServer = require('./index');

const server = new WebServer();

server.use(async (ctx, next) => {
  if (ctx.req.url !== '/favicon') return next();

  ctx.body = fs.readFileSync('./favicon.ico');
});

server.use(async (ctx, next) => {
  if (ctx.req.url !== '/') return next();

  ctx.body = 'Hello, world!';
});

server.listen(3000);
