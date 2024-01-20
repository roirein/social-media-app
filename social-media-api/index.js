const express = require('express')
const path = require('path')
const http = require('http')
const socketioHelper = require('./services/socket/socket')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.use((err, req, res ,next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({message: err.message})
})

const server = http.createServer(app)
socketioHelper.init(server)


mongoose.connect(process.env.DB_URL).then(() => {
    server.listen(process.env.PORT)
}).catch(err => console.log(err))