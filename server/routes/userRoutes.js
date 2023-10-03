const express = require('express');
const router = express.Router();
const Users = require('../models/userModel')


router.get('/', async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).json({
            users: users
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


router.get('/:email', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.params.email });

        if(user === null){
            return res.status(400).json({
                msg: "No user found with the given emailID."
            })
        }

        res.status(200).json({
            user: user
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


router.post('/register', async (req, res) => {
    try {
        const user = new Users({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })

        const userExists = await Users.findOne({ email: req.body.email })

        if(userExists){
            return res.status(400).json({
                msg: "Email already in use!"
            })
        }

        const newUser = await user.save();
        res.status(201).json({
            msg: "New user created successfully.",
            user: user
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


router.patch('/deleteFromBasket/:email', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.params.email });

        const oldUserBasket = [...user.inBasket];
        const newUserBasket = oldUserBasket.filter(index => index !== parseInt(req.body.index));
        user.inBasket = newUserBasket;

        await user.save();
        res.status(200).json({
            msg: "Basket updated successfully."
        })
        
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


router.patch('/addToBasket/:email', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.params.email });

        const oldUserBasket = [...user.inBasket];
        oldUserBasket.push(req.body.index);
        user.inBasket = oldUserBasket;

        await user.save();
        res.status(200).json({
            msg: "Basket updated successfully."
        })
        
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


router.delete('/:email', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.params.email });

        await user.deleteOne()
        
        res.status(200).json({
            msg: `Deleted user with email: ${req.params.email}`
        })
        
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})






module.exports = router;