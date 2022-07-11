require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const gameRouter = require('./controllers/games')

const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/', gameRouter)

mongoose.connect(dbURL, () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
    console.log('Server started at port', PORT);
})