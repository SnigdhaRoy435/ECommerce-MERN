const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    rating: {
        type: Number,
        //required: true
    },
    comment: {
        type: String,
        //required: true
    },
}, { timestamps: true });

const productSchema = mongoose.Schema({
    // building relationship with User model to fetch id and details using User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User' // here User is User schema that we exported from userSchema

    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        //required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema], // we don't need to export reviewSchema because we already used it here
    rating: {
        type: Number,
        required: true
    },
    numReview: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Product = mongoose.model('Products', productSchema);
module.exports = Product;