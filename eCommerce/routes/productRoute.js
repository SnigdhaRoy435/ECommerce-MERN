const express = require('express');
// importing product controller
const { getProduct, getProducts, postProduct } = require('../controllers/productControllers')
//inside express we have a build in routing function which help to perform routing 
//in different files
//const Product = require('../models/ProductModel');

const router = express.Router();

//GET ROUTE FOR ALL PRODUCTS
router.route('/products').get(getProducts)
router.route('/products').post(postProduct);

//GET ROUTE FOR SINGLE PRODUCT FROM DATABASE
router.route('/product/:id').get(getProduct);





module.exports = router;
