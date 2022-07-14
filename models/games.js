const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema(
    {
        name: { type: String, required: true },
        type: String,
        developer: String,
        publisher: String,
        year: Number, 
        platform: [ { type: String } ],
        genre: [ { type: String } ],
        mode: [ { type: String } ],
        img: { type: String, default: "https://res.cloudinary.com/dgb2gz29u/image/upload/v1657782092/u9gafnc1ylatfmat0il0.jpg" },
        tags: [ { type: String } ]
    }, 
    {
        timestamps: true
    }
)

const Game = mongoose.model('Game', GameSchema)

module.exports = Game