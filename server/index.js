const express = require('express');
const socketio = require("socket.io");
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
// created an instance of io
const io = socketio(server);

// socket that is connected to client side socket
io.on('connection', (socket) => {
  console.log('we have a new connection!!!!!!!!!')

  socket.on('disconnect', () => {
    console.log('user just left!!!!!!!')
  })
});


app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
