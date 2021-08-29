class Business {
    constructor({room, media, view, peerBuilder}) {
        this.room = room
        this.media = media
        this.view = view

        this.socketBuilder = socketBuilder        
        this.peerBuilder = peerBuilder
        
        this.socket = {}
        this.currentStream = {}        
        this.currentPeer = {}
    }
    
    static initialize(deps) {
        const instace = new Business(deps)
        return instace._init()
    }
    
    async _init() {
        this.currentStream = await this.media.getCamera(true)
        
        this.socket = this.socketBuilder
        .setOnUserConnected(this.onUserConnected())
        .setOnUserDisconnected(this.onUserDisconnected())
        .build()
        
        this.currentPeer = this.peerBuilder
        .setOnError(this.onPeerError) 
        .setOnUserConnectionOpened()
        .build()
                
        this.addVideoStream('User01')
    }
    
    addVideoStream(userId, stream=this.currentStream) {
        const isCurrentId = false
        this.view.renderVideo({
            userId,
            muted: true,
            stream,
            isCurrentId
        }) 
    }
    
    onUserConnected = function() {
        return userId => {
            console.log('user connected', userId)
        }
    }
    
    onUserDisconnected = function() {
        return userId => {
            console.log('user disconnected', userId)
        }
    }
    
    onPeerError = function() {
        return error => {
            console.error('error on peer!', error)
        }
    }
    
    onUserConnectionOpened = function() {
        return (peer) => {
            const id = peer.id
            this.socket.emit('join-room', this.room, 'User01')            
        }
    }
}