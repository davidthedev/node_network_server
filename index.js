const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Welcome new client!\n');

  socket.on('data', data => {
    // log data as Buffer
    console.log('data is:', data);
    // send data back to client with the default utf8 encoding
    socket.write(`data is: ${data}`);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8000, () => console.log('Server bound'));
