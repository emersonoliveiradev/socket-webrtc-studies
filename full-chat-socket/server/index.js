const express  = require('express')
const socketIO = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 4000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('Nova conexão!');

  socket.on('join', ({name, room}, callback) => {
    console.log(name, room)

    //const error = true
    //if(error) {
    //  callback({error: 'error'});
    //}

    
  })

  socket.on('disconnect', () => {
    console.log("Uma conexão foi encerrada!")
  })
})

app.use(router)

 server.listen(PORT, () =>
   console.log(`Escutando na porta ${PORT}` )
 )

