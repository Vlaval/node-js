// unit, integration, e2e
const assert = require('assert');
const server = require('../server');
const request = require('request');
const fs = require('fs');

function sum(a, b) {
  return a + b;
}

// sum(getPair(9));
describe('sum tests', () => {
  it('should sum 2 numbers', () => {
    assert.equal(sum(2, 3), 5);
  });
});

// getPair(6) => [3, 3]
function getPair(n) {
  const base = Math.floor(n / 2);
  return [base, n - base];
}

describe('getPair', () => {
  it('should split 9', () => {
    assert.deepEqual(getPair(9), [4, 5]);
  });
});

describe('server tests', () => {
  let app;

  before(done => {
    app = server.listen(3000, done);
  });

  after(done => {
    app.close(done);
  });

  it('should return index.html', done => {
    /*
      1. запустить сервер (before)
      2. сделать запрос
      3. прочесть файл с диска
      4. дождаться ответа от сервера
      5. сравнить файл с диска с тем, что пришел с сервера
    */

    request('http://localhost:3000', function (error, response, body) {
      if (error) return done(error);

      const file = fs.readFileSync('public/index.html', { encoding: 'utf-8' });
      assert.equal(body, file);

      done();
    });
  });
});
