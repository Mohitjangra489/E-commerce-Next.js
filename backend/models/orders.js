const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    session_id: {
        type: String,
        required:[true]
    },
    user_id: {
        type: String,
        required:[true]
    },
    subtotal: {
        type: String,
        required:[true]
    },
    name: {
        type: String,
        Required:[true]
    },
    email: {
        type: String,
    },
    address:{
        type:Array,
        
    },
    line_items:{
        type:Array,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});

const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;
