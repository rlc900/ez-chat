import React from 'react';
import './ChatHeader.css'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'

const ChatHeader = () => {

  return (
    <div className='chatHeader'>
      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online image'/>
        <h3>roomName</h3>
      </div>
      <div className='reftInnerContainer'>
        <a href='/'><img src={closeIcon} alt='close image'/></a>
      </div>
    </div>
  )}

export default ChatHeader;
