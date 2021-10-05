const cors = require("cors")
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware')
require('colors');
//const products = require('./data/product')
const dotenv = require('dotenv')
const connectDb = require('./config/config');
// importing product route from route/productRoute
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');

//dotenv config
dotenv.config();
// connecting to mongodb database comming from config.js file inside config folder
connectDb();

const app = express();
app.use(cors());

//using middleware or inbuild express bodyparser
app.use(express.json())

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
    app.use(express.static('shopping-app/build'));
}

// using productRoute here
app.use('/api', productRoute);
app.use('/api/users', userRoute);
app.use('/api/order', orderRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.get('/', (req, res) => {
    res.send('<h1>Welcome to nodejs server</h1>')
});

//using error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on  ${process.env.NODE_ENV} Mode on ${PORT}`.inverse)
});