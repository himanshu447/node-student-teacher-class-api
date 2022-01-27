const mongoose = require('mongoose');
const db = require('../db/mongoose');
const { Address } = require('../model/address');
const { NationalDetail } = require('../model/pincode');
const User = require('../model/user');

async function registerUser() {
    const session = await db.startSession();

    try {
        session.startTransaction();

        const user = await User.create([{
            name: "temp",
            email: "temp@gmail.com",
            password: "temp",
            role: "teacher",
        }], { session });

        const address = await Address.create([{
            street1,
            street2,
            landMark,
        }], { session });

        const otherData = await NationalDetail.create([{
            country,
            city,
        }], { session });

        await session.commitTransaction();
        console.log('success');
    } catch (e) {
        console.log(e.toString());
        await session.abortTransaction();
    }

    session.endSession();
}




exports.UserService = {

    async createUser(values) {
        try {
            const user = User(values);
            await user.save();
            const token = await user.createToken();
            return { user, token };
        } catch (e) {
            throw e;
        }
    },

    async loginUser(email, password) {
        try {
            const user = await User.findUserByEmailAndPassword(email, password);
            const token = await user.createToken();
            return { user, token };
        } catch (e) {
            throw e;
        }
    },
    
    async logout(user, token) {
        try {
            user.tokens = user.tokens.filter((e) => e.token !== token);
            await user.save();
            return { user };
        } catch (e) {
            throw e;
        }
    },
    
    async logoutAll(user) {
        try {
            user.tokens = [];
            await user.save();
            return { user };
        } catch (e) {
            throw e;
        }
    },
}