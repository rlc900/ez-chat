import React, { useState, useEffect } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader.js'
import Input from '../Input/Input.js'
import Messages from '../Messages/Messages.js'
import TextContainer from '../TextContainer/TextContainer.js'
// this module will help retrieve data from URL
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState('');
  // store all messages
  const [messagesArr, setMessagesArr] = useState([])

  const ENDPOINT = 'https://react-ez-chat.herokuapp.com/'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    // console.log(name, room)
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

  // handles messages; listens for messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessagesArr([...messagesArr, message]);
    });

    socket.on('roomData', ({users}) => {
      setUsers(users);
    });
  }, [messagesArr])

  // func for sending messages
  const sendMessage = (evt) => {
    evt.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(users)

  return (
    <div className='outerContainer'>
      <div className='container'>
        <ChatHeader room={room}/>
        <Messages messagesArr={messagesArr} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat;
