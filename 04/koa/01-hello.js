// The simplest example of Koa

const Koa = require('koa');

const app = new Koa();

/**
 * Основные объекты:
 * ctx.req / ctx.res
 * ctx.request / ctx.response
 * ctx (контекст)
 *
 * Основные методы:
 * ctx.set/get
 * ctx.body=
 */
app.use(async function(ctx, next) {

  /* sleep(1000); */
  await new Promise(res => setTimeout(res, 1000));

  // ctx.response.body = "hello"
  await next();
});

app.use(async (ctx, next) => {
  await new Promise(res => setTimeout(res, 50));
  // ctx.body = {result: "hello"};
  ctx.body = 'hello';
});

app.listen(3000);
