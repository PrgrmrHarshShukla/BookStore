const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    userName: {
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
    inBucket: [
        {
            type: Number
        }
    ]
});



userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified){
        return next();
    }

    const saltRounds = 1;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
})



module.exports = mongoose.model('Users', userSchema);