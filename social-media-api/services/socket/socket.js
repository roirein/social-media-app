const socketio = require('socket.io')

let io

const socketioHelper = {
    init: (server) => {
        io = socketio(server)
        return io
    },
    getIo: () => {
        if (!io) {
            throw new Error('io instance is not initialized')
        }
        return io
    }
}

module.exports = socketioHelper