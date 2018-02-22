const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  server: {
    siteHost: 'http://localhost'
  },
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'course.test.mailer',
      password: 'course-test-password'
    },
    senders:  {
      // transactional emails, register/forgot pass etc
      default:  {
        fromEmail: 'course.test.mailer@gmail.com',
        fromName:  'JavaScript.ru',
        signature: "<em>С уважением,<br>LearnJS.ru</em>"
      },
      /* newsletters example
      informer: {
        fromEmail: 'informer@gmail.com',
        fromName:  'Newsletters',
        signature: "<em>Have fun!</em>"
      }
      */
    }
  },
  mongoose: {
    uri:     'mongodb://localhost/app',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize:      5
      }
    }
  },
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.root, 'templates');
    })
  },
  root:     process.cwd()
};
