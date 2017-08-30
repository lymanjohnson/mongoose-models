const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    material: [{ type: Number}],
    quality: {type: String, required: true, enum:{"Shabby","Competent","High Quality","Masterwork"}},
    descriptors: [String],
    contents: [{item: String, quantity: Number}]
})

const Box = mongoose.model('Box', boxSchema);

module.exports = Box;
