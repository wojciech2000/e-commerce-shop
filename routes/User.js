const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', (req,res) => {
    const { username, password } = req.body

    User.findOne({username}, (err,user) => {
        if(err)
        res.status(500).json(err)
        if(user)
        res.json('Login jest zajęty')
        else
        {
            const newUser = new User({username, password})
            newUser.save(err => {
                if(err)
                res.status(500).json(err)
                else
                res.status(201).json('Dodano użytkownika')
            })
        }
    })
})

const signToken = userId => (
    jwt.sign({
        iss: 'secret',
        sub: userId
    }, 'secret')
)


router.post('/login', passport.authenticate('local', {session: false}) ,(req,res) => {
    if(req.isAuthenticated()){
        const { _id } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, { httpOnly: true, sameSite: true })
        res.status(201).json('user has been logged in')
    }
})

router.get('/logout', passport.authenticate('jwt', {session: false}) ,(req,res) => {
    res.clearCookie('access_token')
    res.json('user has been logged out')
})

module.exports = router