const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema(
    {
        name: {type: String, required: true },
        developer: String,
        publisher: String,
        year: Number, 
        genre: String,
        img: [ String ],
    }, 
    {
        timestamps: true
    }
)

const Game = mongoose.model('Game', GameSchema)

module.exports = Game