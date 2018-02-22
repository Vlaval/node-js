const fs = require('fs');

// хотим читать данные из потока в цикле

function readStream() {
  // TBD
}

async function read(path) {

  let stream = fs.createReadStream(path, {highWaterMark: 60, encoding: 'utf-8'});

  let data;

  // ЗАДАЧА: написать такой readStream
  let reader = readStream(stream);

  while(data = await reader()) {
    console.log(data);
  }
  // stream finished
});

read(__filename).catch(console.error);
