const mongoose = require('mongoose');

let menuSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.String, required: true },
    comment: { type: mongoose.Schema.Types.String, required: false},
    menu: { type: mongoose.Schema.Types.Array, required: true},
    price: { type: mongoose.Schema.Types.Number, required: false}
});

let Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;