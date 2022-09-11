const express = require('express')

const tabletopRouter = express.Router()

const upload = require('../middlewares/upload')
const Tabletop = require('../models/tabletops')

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/login')
    }
    next()
}

tabletopRouter.use(isLoggedIn)

// INDEX---GET---/
tabletopRouter.get('/', (req, res) => {
    Tabletop.find()
        .exec()
        .then((tabletops) => {
            res.render('tabletops/index.ejs', {
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                tabletops: tabletops,
                tabTitle: 'Tabletop Games Index'
            })
            console.log('Tabletop page loaded.');
        })
})

// NEW---GET---/new 
tabletopRouter.get('/new', (req, res) => {
    res.render('tabletops/new.ejs', {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
        tabTitle: 'Add a New Tabletop Game',
    })
})

// SHOW---GET---/:id 
tabletopRouter.get('/:id', (req, res) => {
    Tabletop.findById(req.params.id)
        .exec()
        .then((tabletop) => {
            res.render('tabletops/show.ejs', {
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                tabletop: tabletop,
                tabTitle: tabletop.name
            })
        })
})

// EDIT         GET     /:id/edit
tabletopRouter.get('/:id/edit', (req, res) => {
    Tabletop.findById(req.params.id)
        .exec()
        .then((tabletop) => {
            res.render('tabletops/edit.ejs', {
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                tabletop: tabletop,
                tabTitle: `Edit tabletop: ` + tabletop.name
            })
        })
})

// CREATE       POST    /
tabletopRouter.post('/', upload.single('img'), (req, res) => {
    const genreArray = req.body.genre.split(',')
    req.body.genre = genreArray

    const tagsArray = req.body.tags.split(',')
    req.body.tags = tagsArray

    Tabletop.create(req.body)
        .then((tabletop) => {
            console.log('New game added:', tabletop);
            res.redirect('/tabletop/' + tabletop.id)
        })
})

// UPDATE       PUT     /:id
tabletopRouter.put('/:id', upload.single('img'), (req, res) => {
    const genreArray = req.body.genre.split(',')
    req.body.genre = genreArray

    const tagsArray = req.body.tags.split(',')
    req.body.tags = tagsArray

    Tabletop.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec()
        .then(() => {
            res.redirect('/tabletop/' + req.params.id)
        })
})

// DESTROY      DELETE  /:id
tabletopRouter.delete('/:id', (req, res) => {
    Tabletop.findByIdAndDelete(req.params.id)
        .exec()
        .then((tabletop) => {
            console.log('Deleted tabletop:', tabletop);
            res.redirect('/tabletop')
        })
})

module.exports = tabletopRouter