import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
  {console.log(users)}
    <div>
      <h1>Welcome to EZ-Chat!</h1>
      <h2>A user-friendly chatting application that lets you chat EZ-ily with your friends!<span role="img" aria-label="emoji">✨👾</span></h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting({users.length}):</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
