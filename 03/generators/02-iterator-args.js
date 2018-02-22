// при вызове sequence(start, end) создаётся объект генератора,
// фиксируются параметры, но код ещё не запускается
function* generateSequence(start, end) {

  for (var i = start; i <= end; i++) {
    yield i;
  }

}

// Композиция генераторов для генерации буквенно-числовых кодов символов
function* alphaNumericCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

// Использование для генерации набора символов для случайного URL
// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~
function alphaNumericChars() {
  var chars = [];

  for(let num of alphaNumericCodes()) {
    chars.push(String.fromCharCode(num));
  }

  chars.push('-', '_', '~');

  return chars.join('');
}

console.log(alphaNumericChars());
