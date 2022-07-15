const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TabletopSchema = new Schema(
    {
        name: { type: String, required: true },
        type: String,
        designers: [ { type: String } ],
        publisher: String,
        year: Number,
        genre: [ { type: String } ],
        img: { type: String, default: "https://res.cloudinary.com/dgb2gz29u/image/upload/v1657851570/empty-image_urwddn.jpg" },
        tags: [ { type: String } ]
    }, 
    {
        timestamps: true
    }
)

const Tabletop = mongoose.model('Tabletop', TabletopSchema)

module.exports = Tabletop