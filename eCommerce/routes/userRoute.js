const express = require('express');
const { authController, getUserProfile, registerUser, updateUserProfile, getUser } = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// user register
router.route('/').post(registerUser);
router.route('/').get(getUser);
router.route('/login').post(authController);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router