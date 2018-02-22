const {Server} = require('http');

let i = 0;

const server = new Server((req, res) => {
  debugger;
  i += 10;
  res.end(i.toString()); // (!!! toString) Buffer
});

server.listen(8000);

/*
  node debug
  webstorm
*/
