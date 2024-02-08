const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id:String,
    cartItems:Array
})

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;