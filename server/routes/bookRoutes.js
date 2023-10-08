const express = require('express');
const router = express.Router();
const Books = require('../models/bookModel')

router.get('/all', async (req, res) => {
    try {
        const books = await Books.find();
        res.status(200).json({
            data: books
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})



router.post('/add', async (req, res) => {
    try {
        const book = new Books({
            title: await req.body.title,
            authors: await req.body.authors,
            price: await req.body.price,
            language: await req.body.language,
            genres: await req.body.genres,
            coverImage: await req.body.coverImage
        })

        await book.save();

        res.status(200).json({
            msg: "Added successfully.",
            book
        })

        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

router.delete('/', async (req, res) => {
    try {
        const book = Books.findOne({ "title": req.body.title });
        await book.deleteOne();

        res.status(200).json({
            msg: "Book deleted.",
            book: book
        })


    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})




module.exports = router;