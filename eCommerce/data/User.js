const bcrypt = require('bcryptjs')
const Users = [
    {
        name: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: "Snigdha",
        email: 'snigdha@gmail.com',
        password: bcrypt.hashSync('12345', 10),

    },
    {
        name: "Guddi",
        email: 'guddi@gmail.com',
        password: bcrypt.hashSync('12345', 10),

    },

];

module.exports = Users;