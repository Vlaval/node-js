'use strict';

if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('config');

// keys for in-koa KeyGrip cookie signing (used in session, maybe other modules)
app.keys = [config.secret];

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();

handlers.forEach(handler => require('./handlers/' + handler).init(app));

// ---------------------------------------

const Router = require('koa-router');

const router = new Router();

let clients = [];

// const eventEmitter = new events.Emitter();

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve, reject) => {
    clients.push(resolve);
    // eventEmitter.on('message', resolve);
  });

  ctx.body = message;
});

router.post('/publish', async (ctx, next) => {
  // console.log(ctx.request.body);
  const message = ctx.request.body.message;

  if (!message) {
    ctx.throw(400);
  }

  clients.forEach(resolve => {
    resolve(message);
  });

  // eventEmitter.emit('message', message);

  clients = [];

  ctx.body = 'Ok';

});

app.use(router.routes());

app.listen(3000);
