const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
    image: String,
    snack: String,
    price: Number,
    quantity: Number,
});

const MySnack = mongoose.model('mysnacks', snackSchema);

module.exports = MySnack;