const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    materials: [String],
    quality: String,
    descriptors: [String],
    contents: [{"item": String, "quantity": Number}]
});

const Box = mongoose.model('Box', boxSchema);


// exports.addContents = function (req, res, next)
// {
// var newContent = {"item": req.body.contentsItem, "quantity": req.body.contentsQuantity};
// boxes.findOneAndUpdate({name: req.user.name}, {$push: {contents: newContent}});
// };

module.exports = Box;
