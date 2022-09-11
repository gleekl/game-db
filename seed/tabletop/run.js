require('dotenv').config()

const mongoose = require('mongoose')
const Tabletop = require('../../models/tabletops')

const dummyTabletops = require('./data')

dbURL = process.env.MONGODB_URL

mongoose.connect(dbURL, () => {
    console.log('Connected to Games db');
    console.log('Resetting Games collection');

    // Tabletop.insertMany(dummyTabletops);

    Tabletop.collection.drop()
        .then(() => {
            console.log('Games collection dropped.');
            console.log('Inserting updated Games collection dropped.');
            return Tabletop.insertMany(dummyTabletops)
        })

        .then((insertedTabletops) => {
            console.log('Tabletop data inserted.');
            console.log(insertedTabletops);
            mongoose.connection.close();
        })
})