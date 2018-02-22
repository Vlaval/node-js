// Generator Function
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

// Generator
var generator = generateSequence();
console.log(generator); // объект-генератор

do {
  var next = generator.next();

  console.log(next);
} while (!next.done);

/*
 { value: 1, done: false }
 { value: 2, done: false }
 { value: 3, done: false }
 { value: undefined, done: true }
 */

// ИЛИ так:

for(var value of generateSequence()) {
  console.log(value);
}

/*
1
2
3
 */
