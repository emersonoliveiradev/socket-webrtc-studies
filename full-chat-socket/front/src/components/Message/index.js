import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom'

import ReactEmoji from 'react-emoji'

import './index.css'

export default function Message({message : {user, text}, name}) {
  let isSendByCurrentUser = false

  const trimmedName = name.trim().toLowerCase()

  if(user === trimmedName) {
    isSendByCurrentUser = true
  }

  return (
    <div>
      {
        isSendByCurrentUser 
          ? (
              <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                  <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
              </div>
            ) 
          : (
              <div className="messageContainer justifyStart">                
                <div className="messageBox backgroundLight">
                  <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
              </div>
            )        
      }

    </div>
  )
}

