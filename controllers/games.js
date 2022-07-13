const express = require('express')

const gameRouter = express.Router()

const upload = require('../middlewares/upload')
const Game = require('../models/games')

// INDEX---GET---/
gameRouter.get('/', (req, res) => {
    Game.find()
        .exec()
        .then((games) => {
            res.render('games/index.ejs', {
                games: games,
                tabTitle: 'Games Index'
            })
            console.log(games);
            // res.send(games);
        })
})

// NEW---GET---/new 
gameRouter.get('/new', (req, res) => {
    res.render('games/new.ejs', {
        tabTitle: 'Add a New Game',
        baseUrl: req.baseUrl
    })
})

// SHOW---GET---/:id 
gameRouter.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .exec()
        .then((game) => {
            res.render('games/show.ejs', {
                game: game,
                tabTitle: game.name
            })
        })
})

// EDIT         GET     /:id/edit
gameRouter.get('/:id/edit', (req, res) => {
    Game.findById(req.params.id)
        .exec
        .then((game) => {
            res.render('games/edit.ejs', {
                game: game,
                tabTitle: `Edit ` + game.name
            })
        })
})

// CREATE       POST    /
gameRouter.post('/', upload.single('image'), (req, res) => {
    req.body.img = req.file.path
    Game.create(req.body)
        .then((game) => {
            console.log('New game added:', game);
            res.redirect(req.baseUrl + game.id)
        })
})

// UPDATE       PUT     /:id
gameRouter.put('/:id', (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body)
        .exec()
        .then(() => {
            res.redirect('/' + req.params.id)
        })
})

// DESTROY      DELETE  /:id
gameRouter.delete('/:id', (req, res) => {
    Game.findByIdAndDelete(req.params.id)
        exec()
        then((game) => {
            console.log('Deleted game:', game);
            res.redirect(req.baseUrl)
        })
})

module.exports = gameRouter