const { ClassServices } = require('../services/class_services');
const { sendSuccessResponse, sendErrorResponse } = require('../util/response');

exports.createClass = async (req, res) => {
    try {
        const result = await ClassServices.createClass(req.body);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}

exports.addStudent = async (req, res) => {
    try {
        const result = await ClassServices.addStudent(req.body, req.params.id, req.teacherUser._id);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}

exports.removeStudent = async (req, res) => {
    try {
        const result = await ClassServices.removeStudent(req.params.id, req.teacherUser._id, req.query.studentId);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}

exports.getClassDetail = async (req, res) => {
    try {
        const result = await ClassServices.getClass(req.params.id);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}

exports.starClass = async (req, res) => {
    try {
        const result = await ClassServices.startClass(req.params.id, req.teacherUser._id);
        sendSuccessResponse(res, result);
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}

exports.endClass = async () => {
    try {
    } catch (e) {
        sendErrorResponse(res, e.toString());
    }
}