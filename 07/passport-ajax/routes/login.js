
const passport = require('koa-passport');

exports.post = function(ctx, next) {

  // @see node_modules/koa-passport/lib/framework/koa.js for passport.authenticate
  // it returns the middleware to delegate
  return passport.authenticate('local', async function(err, user, info) {
    // only callback-form of authenticate allows to assign ctx.body=info on 401
    // in passport.authenticate callback: this == global, so we need a wrapper to access context
    if (err) throw err;

    if (user === false) {
      ctx.status = 401;
      ctx.body = { error: info };
    } else {
      ctx.body = {
        user: user.getPublicFields()
      };
      await ctx.login(user);
    }
  })(ctx, next);

};
