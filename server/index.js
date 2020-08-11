const express = require('express');
const socketio = require("socket.io");
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
// created an instance of io
const io = socketio(server);

// socket that is connected to client side socket
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const {error, user} = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // this welcomes users to chat (admin generated message); happening on frontend
    socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
    // socket.broadcast sends a message to everyone BUT the user
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} had joined!`})
    socket.join(user.room);
    callback();
  });

  // user generated message; we wil be waiting (expecting) on sendMessage
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

  });

  socket.on('disconnect', () => {
    console.log('user just left!!!!!!!')
  })
});


app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
