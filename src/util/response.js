exports.sendSuccessResponse = (res, data, statusCode = 200, message = 'Success') => {
    const response = {
        message,
        data : data,
    }
    return res.status(statusCode).send(response);
}

exports.sendErrorResponse = (res, data, statusCode = 500, message = 'Error') => {
    const response = {
        message,
        error: data,
    }
    return res.status(statusCode).send(response);
}