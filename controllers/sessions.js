const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/users')

const sessionsRouter = express.Router()

// Login
sessionsRouter.get('/login', (req, res) => {
    res.render('sessions/login.ejs', {
        tabTitle: 'Log In',
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})

sessionsRouter.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
        .exec()
        .then((user) => {
            if (!user) {
                req.flash('error', 'Username or password is incorrect')
                return res.redirect(req.baseUrl + '/login')
            }
            const correctPassword = bcrypt.compareSync(req.body.password, user.password)
            if (!correctPassword) {
                console.log('Password is wrong.');
                req.flash('error', 'Username or password is incorrect.')
                res.redirect(req.baseUrl + '/login')
            } else {
                console.log(user, 'logged in.');
                req.session.currentUser = user
                res.redirect('/')
            }
        })
})

// Logout
sessionsRouter.get('logout', (req, res) => {
    res.render('sessions/logout.ejs', {
        tabTitle: 'Log Out',
        baseUrl: req.baseUrl,
        currentUser: req.session.currentUser
    })
})

sessionsRouter.delete('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/')
    })
  })
  
  module.exports = sessionsRouter