const express = require('express');
const app = express()
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const databaseURL = process.env.DATABASE_URL

mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.log("##### Database connection Error ###### \n", error.message))
db.once('open', () => console.log("DB connected."))




app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/users', userRoutes)

app.use((err, req, res, next) => {
    res.status(500).json({
        msg: err.message,
        extraMsg: "Internal server error from main file."
    })
})





app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}...`);
})