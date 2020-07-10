import React, {useEffect, useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './index.css'

import InfoBar from './../InfoBar'
import Input from './../Input'
import Messages from './../Messages'
import TextContainer from './../TextContainer'

let socket

export default function Chat({location}) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'http://127.0.0.1:4000'


  useEffect(() => {
    const {name, room} = queryString.parse(location.search)
    console.log(name)
    console.log(room)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)
    
    socket.emit('join', { name: name, room: room}, (error) => {
      if(error) {
        alert(error);
        alert("ok");
      }
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search]) 

  useEffect(() =>{
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        <TextContainer users={users} />
      </div>
    </div>
  )
}