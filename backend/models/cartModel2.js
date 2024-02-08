const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
   product_id:String,
   name:String,
   description:String,
   price_per_piece:String,
   total_price:String,
   seller:String,
   quantity:String,
   image:String,
   category:String,

})

const cartModel2 = mongoose.model('cartItems', cartSchema);
module.exports = cartModel2;