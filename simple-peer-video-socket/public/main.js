let Peer = require('simple-peer')
let socket = io()
const video = document.querySelector('video')

const filter = document.querySelector('#filter')
let client = []
console.log("main");
//get stream
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(stream => {
    socket.emit('NewClient')
    video.srcObject = stream
    video.play()

    console.log("UserMedia");

    // used to initialize a peer
    function InitPeer(type) {
      console.log("InitPeer");
      let peer = new Peer({ initiator : (type == 'init') ? true : false, stream:stream, 
      trickle: 
        peer.on('stream', (stream) => {
          CreateVideo(stream);
        })
      })


      peer.on('close', function() {
        document.getElementById("peerVideo").remove()
        peer.destroy()
      })

      return peer
    }

    // For peer of type init
    function MakePeer() {
      client.gotAnswer = false
      let peer = InitPeer('init')

      peer.on('signal', function(data) {
        if(!client.gotAnswer) {
          socket.emit('Offer', data)
        }
      })

      client.peer = peer
    }

    // for peer of type not init
    function FrontAnswer(offer) {
      let peer = InitPeer('notEmit')

      peer.on('signal', function(data) {
        socket.emit('Answer', data)
      })
      peer.signal(offer)
    }

    function SignalAnswer(answer) {
      client.gotAnswer = true
      let peer = client.peer
      peer.signal(answer)
    }

    function CreateVideo(stream) {
      let video = document.createElement('video')
      video.id = 'peerVideo'
      video.srcObject = stream
      video.class = 'embed-responsive'
      document.querySelector('#peerDiv').appendChild(video)
      video.play()
    }

    function SessionActive() {
      document.write('Esta sessão já está ativa, por favor retorne mais tarde!')
    }

    socket.on('BackOffer', FrontAnswer)
    socket.on('BackAnswer', SignalAnswer)
    socket.on('CreatePeer', MakePeer)
    socket.on('SessionActive', SessionActive)
  })
  .catch(err => document.write(err))