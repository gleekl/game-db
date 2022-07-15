require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')

// Controllers
const usersController = require('./controllers/users')
const sessionsController = require('./controllers/sessions')
const gameController = require('./controllers/games')
const tabletopController = require('./controllers/tabletops')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})
// Middlewares
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', sessionsController)
app.use('/games', gameController)
app.use('/users', usersController)
app.use('/tabletop', tabletopController)

mongoose.connect(dbURL, () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
    console.log('Server started at port', PORT);
})