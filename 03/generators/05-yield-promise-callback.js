var fs = require('fs');

// Обычный async-код для чтения файла/директории path
//  dir -> return files list
//  file -> return contents
function readAsync(path, callback) {

  fs.stat(path, function(err, stat) {
    if (err) return callback(err);

    if (stat.isDirectory()) {
      fs.readdir(path, function(err, files) {
        if (err) return callback(err);
        callback(null, files);
      });
    } else {
      fs.readFile(path, function(err, content) {
        if (err) return callback(err);
        callback(null, content);
      });
    }

  });
}

readAsync(".", function(err, res) {
  console.log(arguments);
});
