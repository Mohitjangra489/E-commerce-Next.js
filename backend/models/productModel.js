const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"]
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:String,
        required:[true,"Please enter product price"]
    },
    flavour:{
        type:String,
        required:[true,"Please enter product flavour"]
    },
    size:{
        type:String,
        required:[true,"Please enter product size"]
    },
    images:
        {
            public_id:{
                type:String,
            },
            url:{
                type:String
            }
        }
    ,

    category:{
        type:String,
        required:[true,"Please enter product category"],
        enum:{
            values:[
                "Whey Protein",
                "Advanced Fitness",
                "Energy",
                "Plant Protein",
                "Weight Gainer",
            ],
            message:"Please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter seller name"]
    },
    stock:{
        type:String,
        required:[true,"Please enter product stock"]
    },
    ratings:{
        type:String,
        default:0
    },
    reviews:[
        {
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }

});

const productModel = mongoose.model('Products', productSchema);
module.exports = productModel;
