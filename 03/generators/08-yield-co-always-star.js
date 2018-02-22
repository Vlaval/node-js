Error.stackTraceLimit = 100;

var co = require('co');

co(function*() {

  // при запуске в стеке не будет видно, что ошибка в этой строке
  // нужно yield*
  yield g();

}).catch(function(err) {
  console.log(err.message, err.stack);
});

function* g() {
  throw new Error("No stack");
}
