import React, { useState, useEffect } from 'react';
// this module will help retrieve data from URL
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'

let socket;

function Chat({location}) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    // passing an endpoint to the server
    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room });

    return () => {
      socket.emit('disconnect')

      // turning an instance of a chat component off
      socket.off();
    }

  }, [ENDPOINT, location.search])

  return (
    <h1>Chat</h1>
  )
}

export default Chat;
