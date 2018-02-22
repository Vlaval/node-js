// ЗАДАЧА - сделать readFile, возвращающее promise
const fs = require('fs');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) return reject(err);

      resolve(file);
    });
  });
}

readFile(__filename).then(console.log, console.error);

// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
