const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema(
    {
        name: {type: String, required: true },
        developer: String,
        publisher: String,
        year: Number, 
        platform: [ { type: String } ],
        genre: [ { type: String } ],
        mode: [ { type: String } ],
        img: String,
        tags: [ { type: String } ]
    }, 
    {
        timestamps: true
    }
)

const Game = mongoose.model('Game', GameSchema)

module.exports = Game