
// снаружи можно "вернуть" не только результат, но и ошибку!
function* gen() {
  // Если убрать try..catch из генератора - ошибка выпадет из generator.throw
  try {
    var result = yield "Сколько будет 2 + 2?";
    console.log("Result:", result);
  } catch (e) {
    console.log("Error:", e.message);
  }
}

var generator = gen();

console.log("<--", generator.next());

generator.throw(new Error("and quite a problem here!"));
