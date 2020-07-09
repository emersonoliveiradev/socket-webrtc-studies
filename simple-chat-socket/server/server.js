const express  = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = new express()
const server = http.createServer(app)
const io = socketIO(server)

const PORT = '4000'


io.on('connection', socket => {
  console.log("Nova conexão no servidor")

  socket.on('chat.message', (data) => {
    console.log("Chat.message", data)
    io.emit('chat.message', data)
  })

  socket.on('disconnect', () => {
    console.log("Uma conexão foi encerrada")
  })
}

)

server.listen(PORT, () => {
  console.log(`Escutando em ${PORT}`)
})