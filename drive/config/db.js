const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const db= mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Connected to database')
}).catch((err) => {
    console.log(err)
})
module.exports = db