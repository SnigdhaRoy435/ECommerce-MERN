const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// controller for register post  method
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({ email, name, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// controller for user get method
const getUser = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users);
})

// controller for login
const authController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //matching the password that is coming from userModel or userSchema
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isAdmin: user.isAdmin
        })
    } else {
        // 401 means unauthorised user
        res.status(401).json({ message: 'Invalid email or password' });
    }

})

// controller for view or get user data in front end.
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

// controller for updating user
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const userProfile = await user.save();

        res.json({
            _id: userProfile._id,
            name: userProfile.name,
            email: userProfile.email,
            token: generateToken(userProfile._id),
        })
    } else {
        res.status(404).json({ message: "Profile not updated" })
    }

})

module.exports = { authController, getUserProfile, registerUser, updateUserProfile, getUser }