// слишком простой чат, в коде есть минимум 7 серьёзных ошибок - КАКИХ?

const http = require('http');
const fs = require('fs');

let clients = [];

http.createServer((req, res) => {

  switch (req.method + ' ' + req.url) {
  case 'GET /':
    // 1. нет обработки ошибок
    // 2. не обработан обрыв соединения
    fs.createReadStream('index.html').pipe(res);
    break;

  case 'GET /subscribe':
    console.log("subscribe");
    // 3. нет обработки закрытия соединение - пользователь не удаляется из массива
    clients.push(res);
    break;

  case 'POST /publish':
    let body = '';
    // 4. Кодировка

    req
      .on('data', data => {
        // 5. размер запроса слишком большой
        body += data;
      })
      .on('end', () => {
        // 6. может быть невалидный JSON
        body = JSON.parse(body);

        console.log("publish '%s'", body.message);

        clients.forEach(res => {
          // замечание: заголовки для предотвращения кэширования
          // 7. привести к строке!
          res.end(body.message);
        });

        clients = [];

        res.end("ok");
      });

    break;

  default:
    res.statusCode = 404;
    res.end("Not found");
  }


}).listen(3000);
