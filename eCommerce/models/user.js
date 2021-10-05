const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false // default false because all the user may not be admin
    }
},
    { timestamps: true }
);

//comparing the user password with the password saved in database
//here arrow function is not allow to use
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

// middleware for hashing the password .pre method is used before saving the data
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) { next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);
module.exports = User;