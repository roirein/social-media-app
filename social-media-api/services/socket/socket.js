const socketio = require('socket.io')

let io

const socketioHelper = {
    init: (server) => {
        io = socketio(server)

        io.on('connection', socket => {
            console.log('new user connected')

            socket.on('login', (userId) => {
                socket.userId = userId
                socket.join(userId.userId)
            })

            socket.on('disconnect', () => {
                console.log('user disconnected')
            })
        })

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