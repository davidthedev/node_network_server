const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {
  socket.id = counter++;
  sockets[socket.id] = socket;

  console.log('Client connected');
  socket.write('Welcome new client!\n');

  socket.on('data', data => {
    // log data as Buffer
    console.log('socket id: ' + socket.id + ', data is: ', data);
    // send data back to client with the default utf8 encoding
    Object.entries(sockets).forEach(([key, cs]) => {
      cs.write(`${socket.id} ${data}`);
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log('Client disconnected');
  });
});

server.listen(8000, () => console.log('Server bound'));
