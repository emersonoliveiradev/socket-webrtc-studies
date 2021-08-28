class Bussines {
    constructor({room, media, view}) {
        this.room = room
        this.media = media
        this.view = view

        this.currentStream = {}
    }

    initialize(deps) {
        const instace = new Bussines(deps)
        return instace._init()
    }
    
    _init() {
        this.currentStream = this.media.getCamera()
    }
}