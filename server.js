require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')

const usersController = require('./controllers/users')
const gameController = require('./controllers/games')


const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', gameController)

mongoose.connect(dbURL, () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
    console.log('Server started at port', PORT);
})