import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'
import uuid from 'uuid/v4'

const myId = uuid()
const socket = io('http://127.0.0.1:4000')
socket.on(
  'connect', 
  () => console.log('Nova conexão estabelecida')
)

export default function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const handleNewMessage = newMessage => {
      setMessages([...messages, newMessage])
    }

    socket.on('chat.message', handleNewMessage)
    return () => socket.off('chat.message', handleNewMessage)

  }, [messages])

  const handleInputChange = event => 
    setMessage(event.target.value)
  
  const handleFormSubmit = event => {
    event.preventDefault()

    if(message.trim()) {
      socket.emit('chat.message', {
        id: myId,
        message
      })
      setMessage('')
    }
  }


  return (
    <main className="container">
      <ul className="list">
        {messages.map((m, index) => (
          <li className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`} 
            key={index}>
          <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>{m.message}</span>
        </li>  
        ))}

        </ul>
        <form className="form" onSubmit={handleFormSubmit}>
          <input 
            className="form__field"
            placeholder="Insira uma nova mensagem aqui"
            onChange={handleInputChange}
            type="text"
            value={message}
          />
        </form>
      </main>
    )
}

