// ./show.js
const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seasonNumber: { type: Number, required: true, default: 1 },
    episodeNumber: { type: Number, required: true, default: 1 },
    guestStars: [{
        name: { type: String, required: true },
        role: { type: String, required: true },
        timeCodeAppearancesInSeconds: [{ type: Number, required: true , default: 0 }]
    }],
    cast: [String]
    // source: , {type: String}
})

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
