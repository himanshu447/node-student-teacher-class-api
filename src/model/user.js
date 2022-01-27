const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid Email Address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 20,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            if (val !== 'admin' && val !== 'teacher' && val !== 'student') {
                throw new Error('Invalid user');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
});

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Password Incorrect');
    }

    return user;
}

userSchema.methods.createToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;