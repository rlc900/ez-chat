import React, { useState, useEffect } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader.js'
import Input from '../Input/Input.js'
// this module will help retrieve data from URL
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  // store all messages
  const [messagesArr, setMessagesArr] = useState([])

  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    console.log(name, room)
    // passing an endpoint to the server
    socket = io(ENDPOINT)

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {

    });

    return () => {
      socket.emit('disconnect')
      // turning an instance of a chat component off
      socket.off();
    }
  }, [ENDPOINT, location.search]);


  useEffect(() => {
    socket.on('message', (message) => {
      setMessagesArr([...messagesArr, message]);
    })
  }, [messagesArr])

  // func for sending messages
  const sendMessage = (evt) => {
    evt.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messagesArr)

  return (
    <div className='outerContainer'>
      <div className='container'>
        <ChatHeader room={room}/>
        <Input />

      </div>
    </div>
  )
}

export default Chat;
