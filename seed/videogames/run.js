require('dotenv').config()

const mongoose = require('mongoose')
const Game = require('../../models/games')

const dummyGames = require('./data')

dbURL = process.env.MONGODB_URL

mongoose.connect(dbURL, () => {
    console.log('Connected to Games db');
    console.log('Resetting Games collection');

    Game.collection.drop()
        .then(() => {
            console.log('Games collection dropped.');
            console.log('Inserting updated Games collection dropped.');
            return Game.insertMany(dummyGames)
        })

        .then((insertedGames) => {
            console.log('Games data inserted.');
            console.log(insertedGames);
            mongoose.connection.close();
        })
})