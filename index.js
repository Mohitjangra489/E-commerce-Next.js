var express = require('express');
const { json } = require('body-parser');
console.log(process.env.STRIPE_PUBLIC_KEY)
var app = express();
const multer = require('multer');
var cors = require('cors')
const cloudinary = require('./backend/cloudinaryconfig');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `image-${Date.now()}.${file.originalname}`)
    }
})

const isImage = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    }
    else {
        cb(new Error("Upload only images"))
    }
}

const upload = multer({ storage: storage, fileFilter: isImage });

const jwt = require('jsonwebtoken');
const SECRET_KEY = "jsonwebtokensecretkey";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:"*"
}));

app.use((req, res, next) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://optimum-nutrition.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });



const initdb = require('./backend/dbConnect');
initdb();

const userModel = require('./backend/models/userModel');
const productModel = require('./backend/models/productModel');
const cartModel = require('./backend/models/cartModel');
const cartModel2 = require('./backend/models/cartModel2');
const addressModel = require('./backend/models/address');
const addressDetailsModel = require('./backend/models/addressModel')

const stripe = require('stripe')("sk_test_51Of4JlSHzjhUWugHHhm4A6eF2vroAzNZKzCG0cBF9pnnsVe6dvWQA04aCYnK80BhJPotirs01fSTaUqqJlQnBSbs00a4lY8p61");

function verifyToken(req, res, next) {

    const bearerheader = req.headers['authorization'];
    console.log("req is here", req, bearerheader, req.headers)
    if (typeof (bearerheader) !== "undefined") {

        const bearer = bearerheader.split(" ");
        const token = bearer[1];
        console.log(token);
        req.token = token;
        next();
    }
    else {
        console.log("inside else verifytoken")
        res.send({
            message: "Invalid Token!"
        })
    }
}


app.post('/checkoutsession', async (req, res) => {

    try {
        const { products } = req.body;
        console.log(products);

        const lineitems = products?.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price_per_piece * 100,
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineitems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000",
        });
        console.log("session=====", session);
        res.json({ id: session.id });
    } catch (error) {
        res.status(400).send(error);
    }


});

app.get('/stripetransactionslist', async (req, res) => {

    const transactions = await stripe.issuing.transactions.list();
    console.log(transactions);
    res.json(transactions);

})

app.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        let userfound = await userModel.findOne({ username: req.body.username });
        let registered;
        if (userfound == null) {
            let newuser = new userModel(req.body);
            registered = await newuser.save();
            res.status(200).send({ message: "Registered successfully!" });
        }
        else {
            res.status(400).send({ message: "User already exists!" });
        }
    } catch (error) {
        res.status(400).send(error);
    }


})

app.post('/logincheck', async (req, res) => {
    try {
        console.log(req.body);
        let { username, password } = req.body;
        let user = await userModel.findOne({ username: username });
        if (user != null) {
            if (user.username == username && user.password == password) {
                jwt.sign({ user }, SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.json({
                        data: {
                            user_id: user._id,
                            token: token,
                            name: user.name,
                            username: user.username,
                            role: user.role
                        },
                        message: "User Authenticated!"
                    });
                })

            }
            else {
                res.status(400).send({ message: "Invalid Credentails!" });
            }
        }
        else {
            res.status(400).send({ message: "User doesn't exists!" });
        }

    } catch (error) {
        res.status(400).send(error);
    }

})

app.post('/newproduct', upload.single("photo"), async (req, res) => {
    try {
        const upload = await cloudinary.uploader.upload(req.file.path).catch((err) => { console.log(err) });

        const img_url = upload.secure_url;
        const public_id = upload.public_id;
        const { name, description, price, seller, stock, category ,flavour,size} = req.body;

        const newProduct = {
            name,
            description,
            price,
            images:
            {
                public_id: public_id,
                url: img_url
            },
            category,
            seller,
            stock,
            flavour,
            size
        };
        console.log(newProduct);

        let newproduct = new productModel(newProduct);
        await newproduct.save();

        res.json(newProduct);
    } catch (error) {
        res.status(400).send(error);
    }


})

app.get('/allproducts', async (req, res) => {
    try {
        let data = await productModel.find({});
        res.json(data);
    } catch (error) {
        res.status(400).send(error);
    }

})
app.get('/getproductdetails', verifyToken, async (req, res) => {
    console.log(req.token);
    try {
        jwt.verify(req.token, SECRET_KEY, async (err, authdata) => {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Invalid Token", err: err });
            }
            else {
                console.log(authdata);
                let id = req.query.id;
                let data = await productModel.find({ _id: id });
                if (data) {
                    console.log("data", data);
                    res.json(data);
                }

            }
        })
    } catch (error) {
        res.status(400).send(error);
    }

})

app.post('/updateproductimage', upload.single("photo"), async (req, res) => {
    let id = req.query.id;
    try {
        const upload = await cloudinary.uploader.upload(req.file.path);
        const img_url = upload.secure_url;
        const public_id = upload.public_id;
        const newImage = {
            public_id: public_id,
            url: img_url
        }
        let updated = await productModel.findOneAndUpdate({ _id: id }, { images: newImage });
        res.json(updated);
    } catch (error) {
        console.log(error);

        res.status(400).send(error);
    }


});

app.post('/updateproduct', async (req, res) => {
    try {
        let id = req.query.id;
        let { name, description, price, seller, stock, category,flavour,size} = req.body;
        let toBeUpdated = {
            name: name,
            description: description,
            price: price,
            seller: seller,
            stock: stock,
            category: category,
            flavour:flavour,
            size:size
        }
        let updatedproduct = await productModel.findByIdAndUpdate({ _id: id }, { $set: toBeUpdated });

        res.json(updatedproduct);
    } catch (error) {
        res.status(400).send(error);

    }

})

app.delete('/deleteproduct', async (req, res) => {
    try {
        let id = req.query.id;
        let deletedproduct = await productModel.findByIdAndDelete({ _id: id });
        res.json(deletedproduct);
    } catch (error) {
        res.status(400).send(error);
    }

});

app.get('/allcartdata', async (req, res) => {

    let userid = req.query.id;
    const cartData = await cartModel.find({ user_id: userid });
    res.status(200).json(cartData);

})
app.post('/addcart', async (req, res) => {

    try {
        let { user_id, product_id, name, description, image, seller, category, quantity, price_per_piece } = req.body;
        let cart = new cartModel();
        cart.user_id = user_id;

        console.log(cart);

        let cart_items = new cartModel2();

        cart_items = {
            product_id,
            name,
            description,
            image,
            seller,
            category,
            quantity,
            price_per_piece,
            total_price: price_per_piece,
        }

        let cartData = await cartModel.findOne({ user_id: user_id });

        if (!cartData) {
            cart.cartItems.push(cart_items);
            console.log(cart);
            cart.save();
            res.status(200).send({message:"Added to Cart!"})
        }
        else {
            let alreadypresent = false;
            for (let i = 0; i < cartData.cartItems.length; i++) {
                if (cartData.cartItems[i].product_id == product_id) {
                    alreadypresent = true;
                    res.status(200).send({message:"Product Already Present in Cart!"})

                }
            }

            if (!alreadypresent) {
                cart.cartItems.push(cart_items);
                cartData.cartItems.push(cart_items);
                let updatedcart = await cartModel.updateOne({ user_id: user_id }, { cartItems: cartData.cartItems })
                res.status(200).send({message:"Added to Cart!"})

            }
        }

    } catch (error) {
        res.status(500).send(error);
    }

});

app.post('/pluscart', async (req, res) => {
    let { user_id, product_id } = req.query;
    const CartData = await cartModel.findOne({ user_id: user_id });
    const items = CartData.cartItems;

    for (let i = 0; i < items.length; i++) {
        if (items[i].product_id == product_id) {
            items[i].quantity = JSON.stringify(Number(items[i].quantity) + 1);
            items[i].total_price = JSON.stringify(Number(items[i].price_per_piece) * Number(items[i].quantity));
        }
    }
    let updated = await cartModel.updateOne({ user_id: user_id }, { cartItems: items })
    res.json(updated);
})

app.post('/minuscart', async (req, res) => {
    let { user_id, product_id } = req.query;
    const CartData = await cartModel.findOne({ user_id: user_id });
    const items = CartData.cartItems;

    for (let i = 0; i < items.length; i++) {
        if (items[i].product_id == product_id) {
            if (items[i].quantity > 1) {
                items[i].quantity = JSON.stringify(Number(items[i].quantity) - 1);
                items[i].total_price = JSON.stringify(Number(items[i].price_per_piece) * Number(items[i].quantity));
            }

        }
    }
    let updated = await cartModel.updateOne({ user_id: user_id }, { cartItems: items })
    res.json(updated);
})

app.delete('/deletecartitem', async (req, res) => {
    let { user_id, product_id } = req.query;
    const CartData = await cartModel.findOne({ user_id: user_id });
    const items = CartData.cartItems;

    const restitems = items.filter((item) => {
        return item.product_id != product_id
    })

    let updatedcart = await cartModel.updateOne({ user_id: user_id }, { cartItems: restitems });
    res.json(updatedcart);

})

app.post('/clearcart', async (req, res) => {
    let userid = req.query.id;
    let cartdata = [];

    let updatedcart = await cartModel.findOneAndUpdate({ user_id: userid }, { cartItems: cartdata });
    res.json("cart cleared successfully");
})

app.post('/newaddress', async (req, res) => {
    let { user_id, ...addressdata } = req.body;
    let address_id = Date.now();
    let fulladdress = new addressModel();
    fulladdress.user_id = user_id;

    let addressitems = new addressDetailsModel();
    console.log(addressitems);
    addressitems = addressdata;
    addressitems.address_id = address_id;

    let storedaddress = await addressModel.findOne({ user_id: user_id });

    if (!storedaddress) {
        fulladdress.addresses.push(addressitems);
        console.log(fulladdress);
        fulladdress.save();
    }
    else {
        storedaddress.addresses.push(addressitems);
        let updatedaddress = await addressModel.updateOne({ user_id: user_id }, { addresses: storedaddress.addresses })

    }
    res.send("added");
})

app.get('/alluseraddress', async (req, res) => {
    const user_id = req.query.id;
    const allAddresses = await addressModel.findOne({ user_id: user_id });
    res.json(allAddresses);
})

app.post('/changepassword', async (req, res) => {
    try {
        console.log(req.body);
        let { user_id, current_password, new_password } = req.body;
        const user = await userModel.findOne({ _id: user_id });
        if (user.password == current_password) {
            const updateduser = await userModel.updateOne({ _id: user_id }, { password: new_password });
            console.log(updateduser);
            res.json({ message: "Updated successfully!" });
        }
        else {
            res.json({ message: "Wrong current password!" });
        }
    } catch (error) {
        res.status(400).send(error);
    }

})
// start the server in the port 8000 !
app.listen(8000, function () {
    console.log('Example app listening on port 8000.');
});






