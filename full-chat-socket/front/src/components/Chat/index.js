import React, {useEffect, useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

export default function Chat({location}) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'http://127.0.0.1:4000'


  useEffect(() => {
    const {name, room} = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)
    
    socket.emit('join', { name: name, room: room}, () => {
        
    })

    return () => {
      socket.emit('disconnect')
    }
  }, [ENDPOINT, location.search])

  return <h1>Chat</h1>
}