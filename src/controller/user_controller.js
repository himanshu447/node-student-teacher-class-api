const { UserService } = require('../services/user_services');
const { sendSuccessResponse, sendErrorResponse } = require('../util/response');


exports.createUser = async (req, res) => {
    try {
        const result = await UserService.createUser(req.body);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
};

exports.loginUser = async (req, res) => {
    try {
        const result = await UserService.loginUser(req.body.email, req.body.password);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
};

exports.logout = async (req, res) => {
    try {
        const result = await UserService.logout(req.user, req.token);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
};

exports.logoutAll = async (req, res) => {
    try {
        const result = await UserService.logoutAll(req.user);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
};
