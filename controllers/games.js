const express = require('express')

const gameRouter = express.Router()

const Game = require('../models/games')

// INDEX---GET---/
gameRouter.get('/', (req, res) => {
    Game.find()
        .exec()
        .then((games) => {
            console.log(games);
            res.send(games);
        })
})

// NEW---GET---/new 
gameRouter.get('/new', (req, res) => {
    res.render('games/new.ejs')
})

module.exports = gameRouter