const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
const DATABASE_URL=process.env.DATABASE_URL

const connection = mongoose.connect(DATABASE_URL).then(()=>{
    console.log("Connected to MongoDB");
})

module.exports = connection;