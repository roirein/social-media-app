const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(process.env.DB_URL).then(() => {
    app.listen(process.env.PORT)
}).catch(err => console.log(err))