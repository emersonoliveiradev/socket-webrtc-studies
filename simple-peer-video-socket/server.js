const express = require('express')
const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http)
const port = process.env.PORT || 4000

app.use(express.static(__dirname + "/public"))
let clients = 0

io.on('connection', function(socket) {
  console.log("Servidor");

  socket.on("NewClient", function() {
    console.log("Novo cliente");

    if(clients < 3) {
      if(clients == 1) {
        this.emit('CreatePeer') 
        console.log("Criar par ");        
      } 
    } else 
      this.emit('SessionActive') 
    
              
      clients++;        
  })

  socket.on('Offer', SendOffer)
  socket.on('Answer', SendAnswer)
  socket.on('disconnect', Disconnect)
})

function Disconnect() {
  console.log("Disconnect");
  if(clients > 0)
    clients--
}

function SendOffer(offer) {
  console.log("Send offer");
  this.broadcast.emit("BackOffer", offer)
}

function SendAnswer(data) {
  console.log("Send answer");
  this.broadcast.emit("BackAnswer", data)
}

http.listen(port, () => console.log(`Listening on ${port} port`))