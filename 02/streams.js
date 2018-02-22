// stream1, stream2, stream3

// Readable, Writable, Duplex, Transform

const fs = require('fs');

const stream = fs.createReadStream(__filename);

// object, .on, .emit, .buffer = []

// paused | flowing
stream.pipe(out)
.on('data', chunk => ...)
// stream.resume() / stream.pause()
// --------------------

.on('readable', () => {
  const chunk = stream.read();
});

http.createServer((req, res) => {
  req.on('end')
  req.on('close')
});