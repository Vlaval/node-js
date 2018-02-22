/**
 ЗАДАЧА - научиться работать с потоками (streams)
 Написать HTTP-сервер для загрузки и получения файлов
 - Все файлы находятся в директории files
 - Структура файлов НЕ вложенная.
 - Виды запросов к серверу
 GET /file.ext
 - выдаёт файл file.ext из директории files,
 POST /file.ext
 - пишет всё тело запроса в файл files/file.ext и выдаёт ОК
 - если файл уже есть, то выдаёт ошибку 409
 - при превышении файлом размера 1MB выдаёт ошибку 413
 DELETE /file
 - удаляет файл
 - выводит 200 OK
 - если файла нет, то ошибка 404
 Вместо file может быть любое имя файла.
 Так как поддиректорий нет, то при наличии / или .. в пути сервер должен выдавать ошибку 400.
 - Сервер должен корректно обрабатывать ошибки "файл не найден" и другие (ошибка чтения файла)
 - index.html или curl для тестирования
 */
// Пример простого сервера в качестве основы
'use strict';
let url = require('url');
let fs = require('fs');
let http = require('http');
const path = require('path');
const mime = require('mime');

http.Server(function(req, res) {
  let pathname = decodeURI(url.parse(req.url).pathname);
  const PUBLIC_DIR = path.join(__dirname, '/public');
  const filename = pathname.slice(1);

  function sendFile(filePath, res) {
    const file = fs.createReadStream(filePath);
    const mimeType = mime.getType(filePath);

    file
      .on('error', (err) => {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("No such file");
        } else {
          res.statusCode = 500;
          res.end('Server error');
        }
      })
      .on('open', () => {
        res.setHeader("Content-Type", mimeType);
      })
      .pipe(res)
      .on('close', () => {
        file.destroy();
      })
  }

  function receiveFile(filePath, req, res) {
    const maxSize = 1024*1024;
    const writeStream = fs.createWriteStream(filePath, {flags: 'wx'});
    let size = 0;

    if (req.headers['content-length'] > maxSize) {
      res.statusCode = 413;
      res.end('file is too big');
      return;
    }

    req
      .on('data', chunk => {
        size += chunk;
        if (size > maxSize) {
          res.statusCode = 413;
          res.setHeader('Connection', 'close');
          res.end('file is too big');

          writeStream.destroy();
          fs.unlink(filePath, err => console.error('err'))
        }
      })
      .pipe(writeStream);

    writeStream
      .on('error', (err) => {
        if (err.code = "EEXISTS") {
          res.statusCode = 409;
          res.end('file already exists');
        } else {
          res.statusCode = 500;
          res.setHeader('Connection', 'close');

          fs.unlink(filePath, err => {
            console.error('err');
            res.end('internal error');
          });
        }
      })
      .on('close', () => {
        res.statusCode = 200;
        res.end('OK');
      })




  }

  if(filename.indexOf(".." || "/") !== -1) {
    res.statusCode = 400;
    res.end("Nested paths not allowed");
    return;
  }

  switch(req.method) {
    case 'GET':
      if (pathname === '/') {
        sendFile(path.join(PUBLIC_DIR, '/index.html'), res);
      } else {
        const pathName = path.join(PUBLIC_DIR, pathname);
        sendFile(pathName, res);
      }
      break;
    case 'POST':
      receiveFile( (path.join(PUBLIC_DIR, filename)), req, res);
      break;
    default: {
      res.statusCode = 502;
      res.end("Not implemented");
    }
  }
}).listen(3001);