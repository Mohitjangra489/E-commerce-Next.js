const mongoose = require('mongoose');

module.exports = async function init() {
    try {
        await mongoose.connect("mongodb+srv://mohit489:mohit489@cluster0.8ol98zz.mongodb.net/NextjsEcommerceProject");
        console.log(" MongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }

}