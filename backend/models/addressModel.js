const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressdetailsSchema = new Schema({
    address_id:String,
    fullname:String,
    mobile:String,
    address1: String,
    address2: String,
    landmark:String,
    pincode:String,
    country:String,
    city:String,
    state:String,
});

const addressDetailsModel= mongoose.model('Address', addressdetailsSchema);
module.exports = addressDetailsModel;
