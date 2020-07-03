const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../passport')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const Product = require('../models/Product')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './uploads/')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null,true)
    else
        cb(null,false)
}

const upload = multer({storage, fileFilter})

router.post('/add', passport.authenticate('jwt', {session: false}), upload.single('image'), (req,res) => {

    console.log(req.file)

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        brand: req.body.brand,
        quantity: req.body.quantity,
        image: req.file.filename
    })
    product.save(err => {
        if(err)
        res.status(500).json({message: {msgBody: 'error has occured', msgError: true}})
        else
        res.status(201).json({message: {msgBody: 'added product', msgError: false}})
    })
})

module.exports = router