var fs = require('mz/fs');

// можно yield Promise, который execute выполняет и отсылает результат в генератор
function* read(path) {
  var stat = yield fs.stat(path);

  if (stat.isDirectory()) {
    var files = yield fs.readdir(path);
    return files;
  } else {
    var content = yield fs.readFile(path);
    return content;
  }
}


/**
 * Выполняет promise и возвращает его значение в генератор
 * @param generator
 * @param yieldValue
 */
function execute(generator, yieldValue) {

  var next = generator.next(yieldValue);

  if (!next.done) {
    var promise = next.value;
    setImmediate(function() { // от слишком глубокой рекурсии, пока нет tail call optimization
      promise.then(function(result) {
        execute(generator, result);
      }, function(err) {
        generator.throw(err);
      });
    });
  } else {
    // return из генератора попадает в последний next с done: true
    console.log(next.value);
  }

}

execute(read("."));
