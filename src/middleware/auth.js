const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../util/response');

const adminAuthentication = async (req, res, next) => {

    try {
        const userProviderToken = req.header('Authorization').replace('Bearer ', '');
        const decodeToken = await jwt.verify(userProviderToken, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decodeToken._id });

        if (!user) {
            throw new Error('User Not found');
        }

        if (user.role !== 'admin') {
            throw new Error('You have not access this request');
        }

        req.adminUser = user;
        req.adminToken = userProviderToken;

        next();
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }

}

const teacherAuthentication = async (req, res, next) => {

    try {
        const userProviderToken = req.header('Authorization').replace('Bearer ', '');
        const decodeToken = await jwt.verify(userProviderToken, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decodeToken._id });

        if (!user) {
            throw new Error('User Not found');
        }
        
        if (user.role !== 'teacher') {
            throw new Error('You have not access this request');
        }

        req.teacherUser = user;
        req.teacherToken = userProviderToken;

        next();
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }

}

const authMiddleWare = async (req, res, next) => {
    try {
        const userProviderToken = req.header('Authorization').replace('Bearer ', '');
        const decodeToken = await jwt.verify(userProviderToken, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decodeToken._id });
        
        if (!user) {
            throw new Error('User Not found');
        }
        req.user = user;
        req.token = userProviderToken;
        next();
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}
module.exports = {
    adminAuthentication,
    teacherAuthentication,
    authMiddleWare,
}