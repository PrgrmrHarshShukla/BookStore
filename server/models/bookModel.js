const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors:[
        {
            type: String
        }
    ],
    price: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genres: [
        {
            type: String
        }
    ],
    coverImage: {
        type: String
    }
});

bookSchema.index({ genres: 1 })


module.exports = mongoose.model("books", bookSchema);