const express = require('express')

const gameRouter = express.Router()

const upload = require('../middlewares/upload')
const Game = require('../models/games')

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/login')
    }
    next()
}

gameRouter.use(isLoggedIn)