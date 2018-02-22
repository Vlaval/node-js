const passport = require('koa-passport');

exports.get = async (ctx, next) => {
  await passport.authenticate('jwt', {session: false})(ctx, next);

  if (!ctx.state.user) {
    ctx.status = 400;
    ctx.body = {error: 'invalid credentials'};
    return;
  }

  ctx.body = {
    private: 'top most secret info',
    email: ctx.state.user.email
  };
};
