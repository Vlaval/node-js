// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const app = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

// keys for in-koa KeyGrip cookie signing (used in session, maybe other modules)
app.keys = [config.secret];

const path = require('path');
const fs = require('fs');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/' + middleware));
});

// ---------------------------------------

// can be split into files too
const Router = require('koa-router');

const router = new Router();

router.get('/', require('./routes/frontpage').get);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);
router.post('/register', require('./routes/register').post);
router.get('/register', require('./routes/register').get);

router.get('/verify-email/:verifyEmailToken', require('./routes/verifyEmail').get);

const passport = require('koa-passport');

// login
router.get('/login/facebook', passport.authenticate('facebook', config.providers.facebook.passportOptions));
// connect with existing profile
router.get('/connect/facebook', passport.authorize('facebook', config.providers.facebook.passportOptions));

// http://stage.javascript.ru/auth/callback/facebook?error=access_denied&error_code=200&error_description=Permissions+error&error_reason=user_denied#_=_
router.get('/oauth/facebook', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true // req.flash
}));

app.use(router.routes());

module.exports = app;

if (!module.parent) {
  app.listen(3000);
}
