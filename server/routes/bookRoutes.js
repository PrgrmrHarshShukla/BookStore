const express = require('express');
const router = express.Router();
const Books = require('../models/bookModel')

// Gets all books
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

// Gets books based on author
router.get('/author_query', async (req, res) => {
    const { author } = req.query;
    try {
        const books = await Books.find({ author: author });
        res.status(200).json({
            data: books
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// Gets book(s) based on title
router.get('/title_query', async (req, res) => {
    const { title } = req.query;
    try {
        const books = await Books.find({ title: title });
        res.status(200).json({
            data: books
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// Gets books based on price
router.get('/price_query', async (req, res) => {
    const { price_low, price_high } = req.query;
    try {
        const books = await Books.find({ price: {
            $gte: price_low,
            $lte: price_high,
        } });
        res.status(200).json({
            data: books
        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})


// Adds a book
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

// Deletes a book
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