const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required:[true]
    },
    username: {
        type: String,
        required:[true]
    },
    password: {
        type: String,
        Request:[true]
    },
    role: {
        type: String,
        default: "User"
    }

});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
