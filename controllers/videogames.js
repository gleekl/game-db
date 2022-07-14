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

// INDEX---GET---/
gameRouter.get('/', (req, res) => {
    Game.find()
        .exec()
        .then((games) => {
            res.render('games/index.ejs', {
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                games: games,
                tabTitle: 'Games Index'
            })
            console.log('Homepage loaded.');
        })
})

// NEW---GET---/new 
gameRouter.get('/new', (req, res) => {
    res.render('games/new.ejs', {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
        tabTitle: 'Add a New Game',
    })
})

// SHOW---GET---/:id 
gameRouter.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .exec()
        .then((game) => {
            res.render('games/show.ejs', {
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                game: game,
                tabTitle: game.name
            })
        })
})

// EDIT         GET     /:id/edit
gameRouter.get('/:id/edit', (req, res) => {
    Game.findById(req.params.id)
        .exec()
        .then((game) => {
            res.render('games/edit.ejs', {
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                game: game,
                tabTitle: `Edit game: ` + game.name
            })
        })
})

// CREATE       POST    /
gameRouter.post('/', upload.single('img'), (req, res) => {
    if (req.file !== undefined) {
        req.body.img = req.file.path
    }

    const platformArray = req.body.platform.split(/[\s,]+/)
    req.body.platform = platformArray

    const genreArray = req.body.genre.split(/[\s,]+/)
    req.body.genre = genreArray

    const tagsArray = req.body.tags.split(/[\s,]+/)
    req.body.tags = tagsArray

    Game.create(req.body)
        .then((game) => {
            console.log('New game added:', game);
            res.redirect('/' + game.id)
        })
})

// UPDATE       PUT     /:id
gameRouter.put('/:id', upload.single('img'), (req, res) => {
    if (req.body.mode === 'on')  {
        req.body.mode = 'Single-player'
    } else {
        req.body.mode = "Single-player, Multiplayer"
    }

    const tagsArray = req.body.tags.split(/[\s,]+/)
    req.body.tags = tagsArray

    Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then(() => {
            res.redirect('/' + req.params.id)
        })
})

// DESTROY      DELETE  /:id
gameRouter.delete('/:id', (req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .exec()
        .then((game) => {
            console.log('Deleted game:', game);
            res.redirect('/')
        })
})

module.exports = gameRouter