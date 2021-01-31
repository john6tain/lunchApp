const mongoose = require('mongoose');

let orderMenuSchema = mongoose.Schema({
    orderMenu: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true }
});

let OrderMenu = mongoose.model('OrderMenu', orderMenuSchema);

module.exports = OrderMenu;