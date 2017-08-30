const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/test');


var episode = new Episode({name: "Yankee White",seasonNumber:1,episodeNumber:1});
episode.guestStars.push({name: 'Tom Cruise', role: "Ethan Hunt"});


console.log(recipe.toObject());

// { name: 'Pancakes',
//   _id: 59553335625ccdda459e09b4,
//   steps: [],
//   ingredients:
//    [ { ingredient: 'sugar',
//        measure: 'tbsp',
//        _id: 59553335625ccdda459e09b5,
//        amount: 1 } ] }
