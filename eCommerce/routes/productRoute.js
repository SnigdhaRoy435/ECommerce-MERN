const express = require('express');
// importing product controller
const { getProduct, getProducts } = require('../controllers/productControllers')
//inside express we have a build in routing function which help to perform routing 
//in different files

const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const Product = require('../models/ProductModel')

//GET ROUTE FOR ALL PRODUCTS
router.route('/products').get(getProducts)
//router.route('/addproduct').post(addProduct)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/snigdha/Desktop/MERNProject/eCommerce/backend/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/products').post(upload.single('image'), (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const user = req.body.user;
    const brand = req.body.brand;
    const price = req.body.price;
    const category = req.body.category;
    const countInStock = req.body.countInStock;
    const rating = req.body.rating;
    const numReview = req.body.numReview;
    const image = req.file.filename;

    const newProductAdded = {
        name, description, user, brand, price, category, countInStock, rating, numReview, image

    }

    const newProduct = new Product(newProductAdded);

    newProduct.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});



/*router.get('/product/:id', (req, res) => {
    const product = products.find((p) => Number(p._id) === Number(req.params.id));
    res.json(product);
})*/
//GET ROUTE FOR SINGLE PRODUCT FROM DATABASE
router.route('/product/:id').get(getProduct);





module.exports = router;