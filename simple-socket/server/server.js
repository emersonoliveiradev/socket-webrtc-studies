const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const PORT = 4000

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {
  console.log("Novo usuário conectado!")

  socket.on('chaveimportedevesercomum', (info) => {
    console.log(`Informação recebida:${info}`)
    io.sockets.emit('chaveimportedevesercomum', info)
  })


  socket.on('disconnect', () => {
    console.log('Usuário desconectado!')
  })
})

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}` ))