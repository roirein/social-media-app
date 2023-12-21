const express = require('express')
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
app.use(cors())

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.use((err, req, res ,next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({message: err.message})
})

mongoose.connect(process.env.DB_URL).then(() => {
    app.listen(process.env.PORT)
}).catch(err => console.log(err))