// В какой момент срабатывают - до или после чтения файла?
const fs = require('fs');

/*
  macrotasks: [immediate, fs.open]
  microtasks: [nextTick, nextTick, nextTick, promise]
*/
//
// a(() => console.log('done'));
//
// 1 + 2;

const a = (parameter, cb) => {
  if (parameter < 10)
    process.nextTick(() => {
      cb(new Error('parameter should be greater than 10'));
    });

  setTimeout(cb, 1000);
}

fs.open(__filename, 'r', (err, fd) => {
  console.log('IO!');
});

setImmediate(() => {
  console.log('immediate');
});

new Promise(resolve => {
  resolve('promise');
}).then(console.log);

process.nextTick(() => {
  console.log('nextTick1');
  process.nextTick(() => {
    console.log('nextTick4');
  });
});

process.nextTick(() => {
  console.log('nextTick2');
});
process.nextTick(() => {
  console.log('nextTick3');
});

console.log('start!'); // 1

/*
  libUV (C++) - IO
  V8 (C++) - javascript
*/
