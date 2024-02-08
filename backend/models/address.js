const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
   user_id:String,
   addresses:Array,
});

const addressModel = mongoose.model('User Address', addressSchema);
module.exports = addressModel;
