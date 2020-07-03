const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', (req,res) => {
    const { username, password } = req.body

    User.findOne({username}, (err,user) => {
        if(err)
        res.status(500).json({message: {msgBody: 'error has occured', msgError: true}})
        if(user)
        res.status(400).json({message: {msgBody: 'username is already taken', msgError: true}})
        else
        {
            const newUser = new User({username, password})
            newUser.save(err => {
                if(err)
                res.status(500).json({message: {msgBody: 'error has occured', msgError: true}})
                else
                res.status(201).json({message: {msgBody: 'account successfully create', msgError: false}})
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
        res.status(201).json({message: {msgBody: 'user has been logged', msgError: false}})
    }
})

module.exports = router