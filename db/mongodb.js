const mongoose = require('mongoose')
require('dotenv').config()

module.exports = {
    db : mongoose.connect(process.env.MONGO_CHARS)
}

