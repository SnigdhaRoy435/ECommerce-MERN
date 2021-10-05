const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/User');
const User = require('./models/user');
const Product = require('./models/ProductModel');
const Order = require('./models/OrderModel');
const products = require('./data/product');
const connectDB = require('./config/config');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // we are clearing database before using it
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //importing dummy data from users
        const createUser = await User.insertMany(users);
        const adminUser = await createUser[0]._id;
        const sampleData = products.map(product => {
            return {
                ...product,
                user: adminUser
            }
        })
        await Product.insertMany(sampleData);
        console.log('Data Imported');
        process.exit();

    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data is deleted')
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }

}
//here we are compareing 2 argument passsed in package.json file data:destroy -d
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

