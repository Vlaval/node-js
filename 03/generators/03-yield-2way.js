// yield - дорога в обе стороны, не только генерация данных,
// но и получение их из следующего next

function* gen() {
  console.log("Hello");

  var result = yield "Сколько будет 2 + 2?";
  // Пауза, пока внешний код не ответит

  console.log("Result: ", result);
  // ...
}

var generator = gen();

console.log("<--", generator.next());
// { value: "Сколько будет 2 + 2?", done: false }

setTimeout(function() {
  generator.next("4");
}, 5000);
