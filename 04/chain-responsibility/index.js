// Chain of Responsibility design pattern

const {Server} = require('http');

module.exports = class WebServer {
  constructor() {
    this._server = null;
    this._handlers = [];
  }

  _handler(req, res) {
    // context will share between all middlewares
    const ctx = {
      req, res, body: undefined
    };

    const callMiddleware = index => {
      const middleware = this._handlers[index];

      // last or single
      if (index === this._handlers.length || !middleware) return Promise.resolve();

      return Promise.resolve(middleware(ctx, () => {
        return callMiddleware(index + 1);
      }));
    }

    callMiddleware(0)
      .then(() => {
        if (!ctx.body) {
          res.statusCode = 404;
          res.end("Not found");
        } else {
          res.end(ctx.body.toString());
        }
      })
      .catch(err => {
        res.statusCode = 500;
        res.end("Internal Error");
      });
  }

  /*
    middleware - async function, that received ctx and next parameters
    ctx - object that contains req and res
    next - next function in chain
  */
  use(middleware) {
    this._handlers.push(middleware);
  }

  listen(port) {
    if (this._server) throw new Error('Server already exists');
    this._server = new Server(this._handler.bind(this));
    this._server.listen(port);
  }

  close() {
    if (!this._server) throw new Error('Server does not exist');
    this._server.close();
  }
}
