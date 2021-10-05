//requiring data from database
const Product = require('../models/ProductModel');

// install npm i express-async-handler for better async await performance
//we use this to avoid try catch block and custom middleware
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
    //we are inserting all the data from Product Model to the constant products.
    const products = await Product.find({});
    // throw new Error("Some error");
    return res.json(products);
})

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product)
    } else {
        //status code 404 means not found
        res.status(404).json({ message: "Product not found" })
    }
})





module.exports = { getProducts, getProduct }