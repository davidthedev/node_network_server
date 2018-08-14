const server = require('net').createServer();
let counter = 0;
let sockets = {};

function getTimestamp() {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}

server.on('connection', socket => {
  socket.id = counter++;

  console.log('Client connected');
  socket.write('Please type your name: ');

  socket.on('data', data => {

    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }

    // log data as Buffer
    // console.log('socket id: ' + socket.id + ', data is: ', data);

    // send data back to client with the default utf8 encoding
    Object.entries(sockets).forEach(([key, cs]) => {
      // do not send message to the client that posted it
      if (socket.id == key) return;
      cs.write(`${getTimestamp()} | ${socket.name} says: ${data}`);
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log('Client disconnected');
  });
});

server.listen(8000, () => console.log('Server bound'));
