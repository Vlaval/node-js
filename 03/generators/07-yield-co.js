var fs = require('mz/fs');

function* read(path) {
  var stat = yield fs.stat(path);

  if (stat.isDirectory()) {
    var files = yield fs.readdir(path);
    return files;
  }

  var content = yield fs.readFile(path, 'utf-8');
  return content;
}

var co = require('co');

co(function*() {
  // yield thunk
  // yield promise
  // yield generator
  // yield generator function
  // {}  []

  var result = yield* read('.');
  console.log(result);

  // return result

}).then(console.log, console.log);
