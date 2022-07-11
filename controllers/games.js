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


// SHOW---GET---/:id 
gameRouter.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .exec()
        .then((game) => {
            res.render('games/show.ejs', {
                game: game
            })
        })
})

module.exports = gameRouter