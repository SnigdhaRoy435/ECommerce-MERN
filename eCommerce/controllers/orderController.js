const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');

const addOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, taxPrice, totalPrice, itemsPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: "No order found" });
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice,
            itemsPrice
        })
        const createOrder = await order.save();
        res.status(200).json(createOrder);
    }
});

const getOrderById = asyncHandler(async (req, res) => {
    // we populate user to get name and email to get the product details the user filled
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404).json({ message: 'Order not found' })
    }

})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        (order.isPaid = true),
            (order.paidAt = Date.now()),
            (order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            })
        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404).json({ message: "Order Not Found" })
    }


});

const getMyOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });

    res.json(order)
})

module.exports = { addOrder, getOrderById, updateOrderToPaid, getMyOrder };