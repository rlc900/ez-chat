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
    // console.log(user.name)

    if (error) return callback(error);
    socket.join(user.room);
    // this welcomes users to chat (admin generated message); happening on frontend
    socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
    // socket.broadcast sends a message to everyone BUT the user
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
    // logic to see which users are inside of room
    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    callback();
  });

  // user generated message; we wil be waiting (expecting) on sendMessage
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    // console.log(user)
    io.to(user.room).emit('message', {user: user.name, text: message});
    // when user leaves
    io.to(user.room).emit('roomData', {room: user.room, text: getUsersInRoom(user.room)});
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
    }
  })
});


app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
