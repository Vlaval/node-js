const {createServer} = require('http');

const server = createServer(function(req, res) {

  switch (req.url) {

  case '/shutdown':
    res.end('shutting down');

    console.log('closing, waiting for keep-alive connections to finish');

    server.destroy(() => {
      console.log("closed");
    });
    // server.close(() => {
    //   console.log("closed");
    // });

    break;

  default:
    res.end('up and running!');
  }

});

const connections = {}
let id = 0;
server.on('connection', conn => {
  id++;
  connections[id] = conn;

  conn.on('close', () => {
    delete connections[id];
  });
});

// track is connections are busy, kill them as they finish working
server.on('request', function(req, res) {
  let conn = req.socket; // = res.socket
  conn.isIdle = false;
  res.on('finish', () => {
    conn.isIdle = true;
    conn.emit('idle');
  });
});

server.destroy = function(cb) {
  this.close(cb);
  this.isClosing = true;
  for (let key in connections) {
    const conn = connections[key];
    if (conn.isIdle) {
      conn.destroy();
    } else {
      conn.once('idle', () => conn.destroy());
    }
  }
};


// server.timeout = 6000;

server.listen(3000);


// каждые 5 сек смотрим - нет ли утечек?
// было много версий ноды с утечками, они ещё есть
const timer = setInterval(() => {
  console.log(process.memoryUsage());
}, 5000);
timer.unref();
