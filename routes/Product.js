const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../passport')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
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

    Product.find({name: req.body.name}, (err, product) => {

        if(err)
            res.status(500).json(err)

        if(product.length == 0)
        {
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                size: req.body.size.split(',') ,
                brand: req.body.brand,
                quantity: req.body.quantity,
                image: req.file.filename
            })
            product.save(err => {
                if(err)
                    res.status(500).json(err)
                else
                    res.status(201).json('Produkt został dodany')
            })
        }
        else
        {
            res.json('Podana nazwa produku jest zajęta')
        }

    })

})

router.delete('/delete/:id/:filename', passport.authenticate('jwt', {session: false}), (req,res) => {

    Product.findOneAndDelete({_id: req.params.id}, err => {
        if(err)
            res.status(500).json(err)
        else
            req.params.filename != "undefined" && fs.unlinkSync(`uploads/${req.params.filename}`)
            res.status(201).json('removed')
    })
})

router.patch('/update/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), (req,res) => {

    const { name, price, size, brand, quantity } = req.body

    Product.updateOne({_id: req.params.id},
        {$set: { name, price, size, brand, quantity, image: req.file.filename }},
        err => {
        if(err)
            res.status(500).json(err)
        else
            res.status(201).json('updated')
    })
})

router.get('/datas', (req,res) => {

    Product.find({}, (err, products) => {
        if(err)
            res.status(500).json(err)
        else
            res.status(201).json(products)
    })
})

module.exports = router